import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Alert,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

function MockInterview({ rawQuestions }) {
  const parseQuestions = (text) => {
    if (!text) return ["Tell me about yourself and your background.", "Why are you interested in this position?"];
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 10 && /[a-zA-Z]{5,}/.test(l) && !l.startsWith("#") && !l.startsWith("=") && !l.toLowerCase().includes("questions"));
    return lines.length > 0 ? lines.slice(0, 15) : ["Explain your key technical project."];
  };

  const questions = parseQuestions(rawQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      if (finalTranscript) {
        setUserAnswer((prev) => prev + finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const currentQuestion = questions[currentIndex] || questions[0];

  const handleEvaluate = async () => {
    if (isRecording) toggleRecording();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    if (!userAnswer.trim()) return;
    setLoading(true);
    setError(null);
    setEvaluation(null);

    try {
      const response = await axios.post("https://pan-tradition-century-punch.trycloudflare.com/evaluate-answer", {
        question: currentQuestion,
        user_answer: userAnswer,
      });
      setEvaluation(response.data);
      
      if ("speechSynthesis" in window) {
        const textToSpeak = `Your score is ${response.data.score} out of 10. ${response.data.fluency_feedback} ${response.data.feedback} Here is an improved answer: ${response.data.ideal_answer}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to evaluate answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (isRecording) toggleRecording();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    
    setUserAnswer("");
    setEvaluation(null);
    setError(null);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
        <Box>
          <Typography variant="h6" fontWeight={800} color="#0f172a">
            Interactive AI Mock Interviewer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Practice answering real interview questions and receive instant AI grading and sample answers.
          </Typography>
        </Box>

        <Chip
          label={`Question ${currentIndex + 1} of ${questions.length}`}
          sx={{
            bgcolor: "rgba(124, 58, 237, 0.1)",
            color: "#7c3aed",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            fontWeight: 800,
          }}
        />
      </Box>

      {/* Active Question Box */}
      <Paper
        elevation={0}
        className="glass-panel"
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          borderLeft: "4px solid #7c3aed !important",
          bgcolor: "rgba(124, 58, 237, 0.03)",
        }}
      >
        <Box display="flex" alignItems="flex-start" gap={1.5}>
          <QuizIcon sx={{ color: "#7c3aed", mt: 0.3 }} />
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.1rem", color: "#0f172a" }}>
            {currentQuestion}
          </Typography>
        </Box>
      </Paper>

      {/* Answer Input Box */}
      <Box mb={3}>
        <Box
          sx={{
            mb: 2,
            minHeight: "140px",
            p: 2.5,
            borderRadius: "14px",
            bgcolor: "rgba(248, 250, 252, 0.7)",
            border: "1px solid",
            borderColor: isRecording ? "#ef4444" : "rgba(124, 58, 237, 0.2)",
            color: userAnswer ? "#0f172a" : "#94a3b8",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            transition: "all 0.2s",
            boxShadow: isRecording ? "0 0 0 4px rgba(239, 68, 68, 0.1)" : "none",
          }}
        >
          {userAnswer ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" flex={1} opacity={0.8}>
              <CheckCircleIcon sx={{ fontSize: 40, mb: 1, color: "#10b981" }} />
              <Typography variant="body1" align="center" color="#10b981" fontWeight={600}>
                Voice Response Recorded! Ready to evaluate.
              </Typography>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" flex={1} opacity={0.6}>
              <MicIcon sx={{ fontSize: 40, mb: 1, color: isRecording ? "#ef4444" : "inherit" }} />
              <Typography variant="body1" align="center">
                {isRecording ? "Listening..." : "Tap 'Start Recording' and speak your response..."}
              </Typography>
            </Box>
          )}
          {isRecording && (
             <Box sx={{ position: "absolute", bottom: 12, right: 12, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ef4444", animation: "pulse 1.5s infinite" }} />
                <Typography variant="caption" color="#ef4444" fontWeight="bold">Recording</Typography>
             </Box>
          )}
        </Box>

        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={toggleRecording}
            startIcon={isRecording ? <StopIcon /> : <MicIcon />}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              color: isRecording ? "#ef4444" : "#7c3aed",
              borderColor: isRecording ? "#ef4444" : "rgba(124, 58, 237, 0.5)",
              "&:hover": {
                borderColor: isRecording ? "#dc2626" : "#7c3aed",
                bgcolor: isRecording ? "rgba(239, 68, 68, 0.05)" : "rgba(124, 58, 237, 0.05)"
              }
            }}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>

          <Button
            variant="outlined"
            onClick={handleNextQuestion}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              color: "#94a3b8",
              borderColor: "rgba(15, 23, 42, 0.2)",
            }}
          >
            Skip Question
          </Button>

          <Button
            variant="contained"
            className="gradient-button"
            disabled={!userAnswer.trim() || loading}
            onClick={handleEvaluate}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{ px: 3.5 }}
          >
            {loading ? "Evaluating Answer..." : "Submit Answer"}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
          {error}
        </Alert>
      )}

      {/* AI Feedback Output */}
      {evaluation && (
        <Paper
          elevation={0}
          className="glass-panel"
          sx={{
            p: 3.5,
            borderRadius: "18px",
            border: "1px solid rgba(16, 185, 129, 0.4) !important",
            bgcolor: "rgba(16, 185, 129, 0.02)",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <CheckCircleIcon color="success" />
              <Typography variant="h6" fontWeight={800} color="#0f172a">
                AI Evaluation Result
              </Typography>
            </Box>

            <Chip
              icon={<StarIcon sx={{ color: "#facc15 !important" }} />}
              label={`Score: ${evaluation.score} / 10`}
              sx={{
                bgcolor: evaluation.score >= 7 ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                color: evaluation.score >= 7 ? "#10b981" : "#f59e0b",
                border: "1px solid",
                borderColor: evaluation.score >= 7 ? "#10b981" : "#f59e0b",
                fontWeight: 900,
                fontSize: "0.95rem",
                px: 1,
              }}
            />
          </Box>

          <Divider sx={{ mb: 2.5, borderColor: "rgba(15, 23, 42, 0.1)" }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box mb={2.5}>
                <Typography variant="subtitle2" fontWeight={700} color="#3b82f6" gutterBottom>
                  English Fluency & Delivery:
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.65, color: "#334155" }}>
                  {evaluation.fluency_feedback}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={700} color="#7c3aed" gutterBottom>
                  Technical Feedback:
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.65, color: "#334155" }}>
                  {evaluation.feedback}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={700} color="#10b981" gutterBottom>
                Sample Ideal Answer:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  bgcolor: "rgba(241, 245, 249, 0.7)",
                  p: 2,
                  borderRadius: "12px",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  color: "#1e293b",
                }}
              >
                {evaluation.ideal_answer}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              className="gradient-button"
              onClick={handleNextQuestion}
              endIcon={<AutoAwesomeIcon />}
              sx={{ px: 3 }}
            >
              Next Interview Question
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default MockInterview;
