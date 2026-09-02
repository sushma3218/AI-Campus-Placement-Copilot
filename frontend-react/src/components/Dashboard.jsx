import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DownloadIcon from "@mui/icons-material/Download";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import SkillChips from "./SkillChips";
import ResumeOptimizer from "./ResumeOptimizer";
import MockInterview from "./MockInterview";

function Dashboard({ result }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);

  if (!result) return null;

  const skillsAnalysis = result.skills_analysis || { skills: [], missing_skills: [] };
  const feedback = result.feedback || { strengths: [], areas_to_improve: [] };
  const interviewQuestions = result.interview_questions || "";

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await axios.post(
        "https://pan-tradition-century-punch.trycloudflare.com/download-report",
        {
          skills_found: skillsAnalysis.skills,
          missing_skills: skillsAnalysis.missing_skills,
          strengths: feedback.strengths,
          areas_to_improve: feedback.areas_to_improve,
          interview_questions: interviewQuestions,
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Placement_Analysis_Report_${result.filename || "Candidate"}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF report.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Box className="page-fade-in">
      {/* Top Header Card */}
      <Paper
        elevation={0}
        className="glass-panel"
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "18px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: "-0.5px", color: "#0f172a" }}>
            Placement Profile Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analyzed File: <b style={{ color: "#7c3aed" }}>{result.filename || "Uploaded Resume.pdf"}</b>
          </Typography>
        </Box>

        <Button
          variant="contained"
          className="gradient-button"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
          disabled={downloading}
          sx={{ borderRadius: "12px", py: 1.2, px: 3 }}
        >
          {downloading ? "Generating PDF..." : "Download PDF Report"}
        </Button>
      </Paper>

      {/* Tabs Navigation */}
      <Paper
        elevation={0}
        className="glass-panel"
        sx={{ mb: 4, borderRadius: "16px", overflow: "hidden" }}
      >
        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#7c3aed",
              height: 3,
              borderRadius: 3,
            },
          }}
          sx={{
            px: 2,
            "& .MuiTab-root": {
              py: 2,
              fontWeight: 700,
              fontSize: "0.95rem",
              textTransform: "none",
              color: "rgba(15, 23, 42, 0.6)",
              "&.Mui-selected": {
                color: "#7c3aed !important",
              },
            },
          }}
        >
          <Tab icon={<AnalyticsIcon />} iconPosition="start" label="Skill Gap & Analysis" />
          <Tab icon={<AutoFixHighIcon />} iconPosition="start" label="Resume Optimizer" />
          <Tab icon={<RecordVoiceOverIcon />} iconPosition="start" label="Mock Interview Prep" />
          <Tab icon={<PictureAsPdfIcon />} iconPosition="start" label="PDF Report Export" />
        </Tabs>
      </Paper>

      {/* Tab 0: Overview & Skill Gap */}
      {tabIndex === 0 && (
        <Box>
          <Paper elevation={0} className="glass-panel" sx={{ p: 3.5, mb: 4, borderRadius: "20px" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <SkillChips
                  title="Skills Found in Resume"
                  skills={skillsAnalysis.skills || []}
                  type="found"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SkillChips
                  title="Missing Skills (from Target JD)"
                  skills={skillsAnalysis.missing_skills || []}
                  type="missing"
                />
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                className="glass-panel"
                sx={{
                  p: 3.5,
                  height: "100%",
                  borderRadius: "18px",
                  borderLeft: "4px solid #10b981 !important",
                }}
              >
                <Box display="flex" alignItems="center" gap={1.2} mb={2}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="h6" fontWeight={800} color="#0f172a">
                    Key Strengths
                  </Typography>
                </Box>
                <List disablePadding>
                  {(feedback.strengths || []).map((item, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 0.85 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{ fontSize: "0.95rem", color: "rgba(15, 23, 42, 0.9)", lineHeight: 1.5 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                className="glass-panel"
                sx={{
                  p: 3.5,
                  height: "100%",
                  borderRadius: "18px",
                  borderLeft: "4px solid #7c3aed !important",
                }}
              >
                <Box display="flex" alignItems="center" gap={1.2} mb={2}>
                  <TrendingUpIcon sx={{ color: "#7c3aed" }} />
                  <Typography variant="h6" fontWeight={800} color="#0f172a">
                    Actionable Areas to Improve
                  </Typography>
                </Box>
                <List disablePadding>
                  {(feedback.areas_to_improve || []).map((item, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 0.85 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <TrendingUpIcon sx={{ color: "#7c3aed", fontSize: "1.2rem" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{ fontSize: "0.95rem", color: "rgba(15, 23, 42, 0.9)", lineHeight: 1.5 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>

          {feedback.tailored_content && feedback.tailored_content.length > 0 && (
            <Paper
              elevation={0}
              className="glass-panel"
              sx={{
                p: 3.5,
                mt: 3,
                borderRadius: "18px",
                borderLeft: "4px solid #8b5cf6 !important",
              }}
            >
              <Box display="flex" alignItems="center" gap={1.2} mb={2}>
                <CheckCircleIcon sx={{ color: "#8b5cf6" }} />
                <Typography variant="h6" fontWeight={800} color="#0f172a">
                  Tailored Content (Based on Target JD)
                </Typography>
              </Box>
              <List disablePadding>
                {feedback.tailored_content.map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 0.85 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon sx={{ color: "#8b5cf6", fontSize: "1.2rem" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontSize: "0.95rem", color: "rgba(15, 23, 42, 0.9)", lineHeight: 1.5 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      )}

      {/* Tab 1: Resume Optimizer */}
      {tabIndex === 1 && (
        <Paper elevation={0} className="glass-panel" sx={{ p: 3.5, borderRadius: "20px" }}>
          <ResumeOptimizer />
        </Paper>
      )}

      {/* Tab 2: Mock Interview Prep */}
      {tabIndex === 2 && (
        <Paper elevation={0} className="glass-panel" sx={{ p: 3.5, borderRadius: "20px" }}>
          <MockInterview rawQuestions={interviewQuestions} />


        </Paper>
      )}

      {/* Tab 3: PDF Report Export */}
      {tabIndex === 3 && (
        <Paper elevation={0} className="glass-panel" sx={{ p: 5, textAlign: "center", borderRadius: "20px" }}>
          <PictureAsPdfIcon sx={{ fontSize: 68, color: "#7c3aed", mb: 2 }} />
          <Typography variant="h4" fontWeight={900} gutterBottom sx={{ color: "#0f172a" }}>
            Download Your Placement Report
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, mx: "auto", mb: 4, lineHeight: 1.6 }}>
            Get a beautifully structured PDF document summarizing your extracted skills, target missing skills, candidate strengths, action points, and complete interview preparation questions.
          </Typography>

          <Button
            variant="contained"
            size="large"
            className="gradient-button"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
            disabled={downloading}
            sx={{ px: 6, py: 1.7, fontSize: "1.1rem", borderRadius: "14px !important" }}
          >
            {downloading ? "Generating PDF Report..." : "Download Placement Report PDF"}
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Dashboard;
