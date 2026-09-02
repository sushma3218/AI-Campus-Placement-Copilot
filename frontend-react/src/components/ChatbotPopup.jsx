import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Fab,
  TextField,
  Chip,
  CircularProgress,
  Avatar,
  Divider,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import botAvatar from "../assets/hi.png";

function ChatbotPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I am your AI Placement Assistant. Ask me anything about your uploaded resume or target job description!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const samplePrompts = [
    "Explain my Parkinson project",
    "Generate self introduction",
    "Why am I suitable?",
    "Explain Cloud Run",
    "Generate HR answers",
    "Tailor my answer",
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleSend = async (questionText) => {
    const query = questionText || input;
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/resume-chat`, {
        question: query,
      });

      const aiMsg = {
        sender: "ai",
        text: response.data.answer || "I parsed your query based on your uploaded resume and JD.",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Ensure you have uploaded your Resume PDF and Job Description before chatting.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <Box sx={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 1300 }}>
          <Fab
            variant="extended"
            onClick={() => setOpen(true)}
            sx={{
              px: 2.8,
              py: 1.2,
              bgcolor: "#7c3aed !important",
              color: "#ffffff !important",
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(124, 58, 237, 0.4)",
              "&:hover": {
                bgcolor: "#6d28d9 !important",
              },
            }}
          >
            <ChatIcon sx={{ mr: 1, color: "#ffffff" }} />
            Ask your Placement Companion
          </Fab>
        </Box>
      )}

      {/* Floating Chat Modal Window */}
      {open && (
        <Draggable handle=".chat-header">
          <Paper
            elevation={16}
            sx={{
              position: "fixed",
              bottom: 24,
              left: { xs: "5vw", sm: "calc(50% - 195px)" }, // Center it horizontally initially
              width: { xs: "90vw", sm: 390 },
              height: 540,
              borderRadius: "22px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
              boxShadow: "0 24px 48px rgba(15, 23, 42, 0.15)",
              zIndex: 1300,
            }}
          >
            {/* Header Bar */}
            <Box
              className="chat-header"
              sx={{
                p: 2,
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "move", // Indicate draggability
              }}
            >
              <Box display="flex" alignItems="center" gap={1.2}>
                <Avatar 
                  src={botAvatar} 
                  sx={{ bgcolor: "#000000", width: 44, height: 44 }} 
                  imgProps={{ style: { objectFit: "cover", objectPosition: "center" } }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={900} sx={{ lineHeight: 1.2 }}>
                    Placement Assistant
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600 }}>
                    Grounded in Resume & JD
                  </Typography>
                </Box>
              </Box>

              <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#ffffff" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Messages Area */}
            <Box
              sx={{
                flexGrow: 1,
                p: 2,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
                  gap={1}
                >
                  {msg.sender === "ai" && (
                    <Avatar 
                      src={botAvatar} 
                      sx={{ bgcolor: "#000000", width: 32, height: 32, mt: 0.5 }} 
                      imgProps={{ style: { objectFit: "cover", objectPosition: "center" } }}
                    />
                  )}

                  <Box
                    sx={{
                      maxWidth: "80%",
                      p: 1.5,
                      borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      bgcolor: msg.sender === "user" ? "#7c3aed" : "#f1f5f9",
                      color: msg.sender === "user" ? "#ffffff" : "#0f172a",
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                      border: msg.sender === "user" ? "none" : "1px solid #e2e8f0",
                    }}
                  >
                    {msg.text}
                  </Box>

                  {msg.sender === "user" && (
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#1e1e2d", color: "#ffffff", mt: 0.5 }}>
                      <PersonIcon sx={{ fontSize: 16 }} />
                    </Avatar>
                  )}
                </Box>
              ))}

              {loading && (
                <Box display="flex" alignItems="center" gap={1} color="#7c3aed">
                  <CircularProgress size={16} sx={{ color: "#7c3aed" }} />
                  <Typography variant="caption" sx={{ color: "#7c3aed", fontWeight: 500 }}>Finding your opening...</Typography>
                </Box>
              )}

              <div ref={chatEndRef} />
            </Box>

            <Divider sx={{ borderColor: "#e2e8f0" }} />

            {/* Quick Prompt Chips */}
            <Box
              sx={{
                p: 1.5,
                pb: 1.5,
                bgcolor: "#f8fafc",
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                gap: 1,
                "&::-webkit-scrollbar": { height: "6px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": { 
                  background: "rgba(124, 58, 237, 0.3)", 
                  borderRadius: "4px" 
                },
                "&::-webkit-scrollbar-thumb:hover": { 
                  background: "rgba(124, 58, 237, 0.6)" 
                },
              }}
            >
              {samplePrompts.map((prompt, idx) => (
                <Chip
                  key={idx}
                  label={prompt}
                  onClick={() => handleSend(prompt)}
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    px: 0.5,
                    height: "32px",
                    bgcolor: "rgba(124, 58, 237, 0.08)",
                    color: "#7c3aed",
                    border: "1px solid rgba(124, 58, 237, 0.25)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "rgba(124, 58, 237, 0.16)",
                      borderColor: "rgba(124, 58, 237, 0.4)",
                      transform: "translateY(-1px)",
                    },
                  }}
                />
              ))}
            </Box>

            {/* Input Footer */}
            <Box
              sx={{
                p: 1.5,
                borderTop: "1px solid #e2e8f0",
                bgcolor: "#ffffff",
                display: "flex",
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Ask about your project, Cloud Run..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#f8fafc",
                    color: "#0f172a",
                    "& fieldset": { borderColor: "#cbd5e1" },
                    "&:hover fieldset": { borderColor: "#7c3aed" },
                    "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
                  },
                }}
              />
              <IconButton
                disabled={!input.trim() || loading}
                onClick={() => handleSend()}
                sx={{
                  bgcolor: "#7c3aed",
                  color: "#ffffff",
                  "&:hover": { bgcolor: "#6d28d9" },
                  "&.Mui-disabled": { bgcolor: "#e2e8f0" },
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        </Draggable>
      )}
    </>
  );
}

export default ChatbotPopup;
