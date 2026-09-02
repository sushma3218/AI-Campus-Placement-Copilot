import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Alert,
  Divider,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ArticleIcon from "@mui/icons-material/Article";
import CheckIcon from "@mui/icons-material/Check";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CodeIcon from "@mui/icons-material/Code";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

function ResumeOptimizer() {
  const [activeOption, setActiveOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const options = [
    { key: "summary", label: "Improve Summary", icon: <ArticleIcon /> },
    { key: "skills", label: "Improve Skills Section", icon: <CodeIcon /> },
    { key: "projects", label: "Improve Projects (STAR)", icon: <AutoFixHighIcon /> },
    { key: "tailor", label: "Tailor to Target JD", icon: <TrackChangesIcon /> },
    { key: "cover_letter", label: "Generate Cover Letter", icon: <HandshakeIcon /> },
  ];

  const handleOptimize = async (key) => {
    setActiveOption(key);
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/optimize-resume", {
        option: key,
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate optimization output. Ensure documents are uploaded.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.content) {
      navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h6" fontWeight={800} color="#0f172a" gutterBottom>
          AI Resume Content & Application Optimizer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click an action below to rewrite and tailor your resume sections using AI career coaching principles.
        </Typography>
      </Box>

      <Grid container spacing={1.5} mb={3}>
        {options.map((opt) => (
          <Grid item xs={6} sm={4} md={2.4} key={opt.key}>
            <Button
              fullWidth
              variant={activeOption === opt.key ? "contained" : "outlined"}
              startIcon={opt.icon}
              onClick={() => handleOptimize(opt.key)}
              disabled={loading}
              className={activeOption === opt.key ? "gradient-button" : ""}
              sx={{
                py: 1.2,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderColor: activeOption === opt.key ? "transparent" : "rgba(124, 58, 237, 0.3)",
                color: activeOption === opt.key ? "#ffffff" : "#7c3aed",
                "&:hover": {
                  borderColor: "#7c3aed",
                  bgcolor: "rgba(124, 58, 237, 0.08)",
                },
              }}
            >
              {opt.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box display="flex" flexDirection="column" alignItems="center" py={5}>
          <CircularProgress size={36} sx={{ color: "#7c3aed", mb: 2 }} />
          <Typography color="#7c3aed" variant="body2">
            Crafting tailored resume optimization...
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: "10px", mb: 3 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Paper
          elevation={0}
          className="glass-panel"
          sx={{
            p: 3.5,
            position: "relative",
            borderRadius: "16px",
            borderLeft: "4px solid #7c3aed !important",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={800} color="#7c3aed">
              {result.title}
            </Typography>
            <Tooltip title={copied ? "Copied!" : "Copy to Clipboard"}>
              <IconButton onClick={handleCopy} sx={{ color: copied ? "#10b981" : "#7c3aed" }}>
                {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ mb: 2.5, borderColor: "rgba(15, 23, 42, 0.1)" }} />

          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              fontFamily: "monospace, monospace",
              fontSize: "0.95rem",
              lineHeight: 1.65,
              color: "#1e293b",
            }}
          >
            {result.content}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default ResumeOptimizer;
