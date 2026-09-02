import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  LinearProgress,
  Divider,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function UploadPage({ uploadResume, loading, onBack }) {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume || !jd) {
      alert("Please upload both Resume PDF and Job Description.");
      return;
    }
    uploadResume(resume, jd);
  };

  return (
    <Box className="page-fade-in" sx={{ py: 3, maxWidth: 880, mx: "auto" }}>
      <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            color: "#7c3aed",
            "&:hover": { bgcolor: "rgba(124, 58, 237, 0.08)" },
          }}
        >
          Back to Overview
        </Button>

        <Chip
          label="Step 2 of 3 • Upload Placement Documents"
          sx={{
            bgcolor: "#ffffff",
            color: "#7c3aed",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            fontWeight: 700,
          }}
        />
      </Box>

      <Paper
        elevation={0}
        className="glass-panel-light"
        sx={{
          p: { xs: 3.5, sm: 5 },
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {loading && (
          <LinearProgress
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              bgcolor: "rgba(124, 58, 237, 0.15)",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#7c3aed",
              },
            }}
          />
        )}

        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={900} gutterBottom sx={{ color: "#0f172a" }}>
            Upload Placement Documents
          </Typography>
          <Typography variant="body1" color="#64748b" sx={{ maxWidth: 540, mx: "auto" }}>
            Select your candidate Resume (PDF) and target Job Description (.pdf or .txt) to generate your personalized placement profile.
          </Typography>
        </Box>

        <Grid container spacing={3} mb={4}>
          {/* Resume Upload Card */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 3.5,
                border: resume
                  ? "2px solid #7c3aed"
                  : "2px dashed #cbd5e1",
                borderRadius: "18px",
                bgcolor: resume ? "rgba(124, 58, 237, 0.04)" : "#ffffff",
                textAlign: "center",
                transition: "all 0.25s ease",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  borderColor: "#7c3aed",
                  bgcolor: "rgba(124, 58, 237, 0.05)",
                },
              }}
            >
              <PictureAsPdfIcon sx={{ fontSize: 48, color: resume ? "#7c3aed" : "#6366f1", mb: 1 }} />
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: "1.05rem", color: "#0f172a" }}>
                Candidate Resume
              </Typography>
              <Typography variant="caption" color="#64748b" display="block" mb={2.5}>
                PDF Format (.pdf)
              </Typography>

              <Button
                variant={resume ? "outlined" : "contained"}
                component="label"
                startIcon={resume ? <CheckCircleIcon sx={{ color: "#7c3aed !important" }} /> : <UploadFileIcon />}
                className={resume ? "" : "dark-pill-button"}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: resume ? "#7c3aed" : "transparent",
                  color: resume ? "#7c3aed" : "#ffffff",
                }}
              >
                {resume ? "Change Resume" : "Upload PDF"}
                <input
                  hidden
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0] || null)}
                />
              </Button>

              {resume && (
                <Box mt={2}>
                  <Chip
                    icon={<PictureAsPdfIcon sx={{ color: "#7c3aed !important" }} />}
                    label={`${resume.name} (${(resume.size / 1024).toFixed(1)} KB)`}
                    size="small"
                    onDelete={() => setResume(null)}
                    sx={{
                      bgcolor: "rgba(124, 58, 237, 0.1)",
                      color: "#7c3aed",
                      border: "1px solid rgba(124, 58, 237, 0.3)",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>

          {/* Job Description Upload Card */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 3.5,
                border: jd
                  ? "2px solid #7c3aed"
                  : "2px dashed #cbd5e1",
                borderRadius: "18px",
                bgcolor: jd ? "rgba(124, 58, 237, 0.04)" : "#ffffff",
                textAlign: "center",
                transition: "all 0.25s ease",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  borderColor: "#7c3aed",
                  bgcolor: "rgba(124, 58, 237, 0.05)",
                },
              }}
            >
              <DescriptionIcon sx={{ fontSize: 48, color: jd ? "#7c3aed" : "#6366f1", mb: 1 }} />
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: "1.05rem", color: "#0f172a" }}>
                Job Description (JD)
              </Typography>
              <Typography variant="caption" color="#64748b" display="block" mb={2.5}>
                PDF or Text (.pdf, .txt)
              </Typography>

              <Button
                variant={jd ? "outlined" : "contained"}
                component="label"
                startIcon={jd ? <CheckCircleIcon sx={{ color: "#7c3aed !important" }} /> : <UploadFileIcon />}
                className={jd ? "" : "dark-pill-button"}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: jd ? "#7c3aed" : "transparent",
                  color: jd ? "#7c3aed" : "#ffffff",
                }}
              >
                {jd ? "Change JD" : "Upload JD"}
                <input
                  hidden
                  type="file"
                  accept=".pdf,.txt"
                  onChange={(e) => setJd(e.target.files[0] || null)}
                />
              </Button>

              {jd && (
                <Box mt={2}>
                  <Chip
                    icon={<DescriptionIcon sx={{ color: "#7c3aed !important" }} />}
                    label={`${jd.name} (${(jd.size / 1024).toFixed(1)} KB)`}
                    size="small"
                    onDelete={() => setJd(null)}
                    sx={{
                      bgcolor: "rgba(124, 58, 237, 0.1)",
                      color: "#7c3aed",
                      border: "1px solid rgba(124, 58, 237, 0.3)",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3.5, borderColor: "#e2e8f0" }} />

        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            className="dark-pill-button"
            disabled={!resume || !jd || loading}
            onClick={handleSubmit}
            startIcon={<AnalyticsIcon />}
            sx={{
              px: 6,
              py: 1.8,
              fontSize: "1.05rem",
            }}
          >
            {loading ? "Analyzing Placement Profile..." : "See Analysis"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default UploadPage;
