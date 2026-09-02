import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Chip,
  LinearProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function UploadCard({ uploadResume, loading }) {
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
    <Paper
      elevation={0}
      className="glass-panel"
      sx={{
        p: { xs: 2.5, sm: 4 },
        mb: 6,
        borderRadius: "20px",
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
          }}
        />
      )}

      <Box textAlignment="center" mb={3}>
        <Typography variant="h5" fontWeight={800} align="center" gutterBottom>
          Upload Placement Documents
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Provide your candidate resume and target role description to generate your placement analysis.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Resume Input Box */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              border: resume ? "2px solid #6366f1" : "2px dashed rgba(148, 163, 184, 0.4)",
              borderRadius: "16px",
              bgcolor: resume ? "rgba(99, 102, 241, 0.04)" : "transparent",
              textAlign: "center",
              transition: "all 0.25s ease",
            }}
          >
            <PictureAsPdfIcon sx={{ fontSize: 44, color: resume ? "#6366f1" : "#94a3b8", mb: 1 }} />
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Candidate Resume
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
              PDF Format Supported (.pdf)
            </Typography>

            <Button
              variant={resume ? "outlined" : "contained"}
              component="label"
              startIcon={resume ? <CheckCircleIcon /> : <UploadFileIcon />}
              color={resume ? "success" : "primary"}
              sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600 }}
            >
              {resume ? "Change Resume PDF" : "Choose Resume PDF"}
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
                  icon={<PictureAsPdfIcon />}
                  label={`${resume.name} (${(resume.size / 1024).toFixed(1)} KB)`}
                  color="primary"
                  variant="filled"
                  onDelete={() => setResume(null)}
                />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Job Description Input Box */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              border: jd ? "2px solid #a855f7" : "2px dashed rgba(148, 163, 184, 0.4)",
              borderRadius: "16px",
              bgcolor: jd ? "rgba(168, 85, 247, 0.04)" : "transparent",
              textAlign: "center",
              transition: "all 0.25s ease",
            }}
          >
            <DescriptionIcon sx={{ fontSize: 44, color: jd ? "#a855f7" : "#94a3b8", mb: 1 }} />
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Job Description (JD)
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
              PDF or Text File (.pdf, .txt)
            </Typography>

            <Button
              variant={jd ? "outlined" : "contained"}
              component="label"
              startIcon={jd ? <CheckCircleIcon /> : <UploadFileIcon />}
              color={jd ? "success" : "secondary"}
              sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600 }}
            >
              {jd ? "Change Job Description" : "Choose Job Description"}
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
                  icon={<DescriptionIcon />}
                  label={`${jd.name} (${(jd.size / 1024).toFixed(1)} KB)`}
                  color="secondary"
                  variant="filled"
                  onDelete={() => setJd(null)}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          size="large"
          className="gradient-button"
          disabled={!resume || !jd || loading}
          onClick={handleSubmit}
          startIcon={<AnalyticsIcon />}
          sx={{
            px: 5,
            py: 1.5,
            fontSize: "1.1rem",
          }}
        >
          {loading ? "Analyzing Placement Profile..." : "See Analysis"}
        </Button>
      </Box>
    </Paper>
  );
}

export default UploadCard;