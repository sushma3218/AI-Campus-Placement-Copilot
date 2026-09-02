import { Box, Typography, Grid, Paper } from "@mui/material";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function HeroSection() {
  const features = [
    {
      icon: <DynamicFormIcon sx={{ fontSize: 28, color: "#6366f1" }} />,
      title: "Dynamic Skill Gap Analysis",
      desc: "Automatically extracts required target skills & maps candidate competencies without artificial ATS formulas.",
    },
    {
      icon: <AutoFixHighIcon sx={{ fontSize: 28, color: "#ec4899" }} />,
      title: "AI Resume Optimizer",
      desc: "Generates tailored executive summaries, STAR project bullets, and customized cover letters.",
    },
    {
      icon: <RecordVoiceOverIcon sx={{ fontSize: 28, color: "#10b981" }} />,
      title: "Interactive Mock Interviewer",
      desc: "Evaluates your live interview answers with real-time scoring, constructive feedback, and ideal sample responses.",
    },
    {
      icon: <SmartToyIcon sx={{ fontSize: 28, color: "#f59e0b" }} />,
      title: "Contextual Placement Chatbot",
      desc: "Answers questions directly from your Resume and target JD context (e.g. project pitch, self intro, HR answers).",
    },
  ];

  return (
    <Box sx={{ textAlignment: "center", mb: 5, pt: 1 }}>
      <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight={900}
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
            letterSpacing: "-1px",
            lineHeight: 1.15,
          }}
        >
          Accelerate Your Campus Placements with <span className="gradient-text">AI Precision</span>
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 680, mx: "auto" }}>
          Upload your Resume and Job Description to instantly analyze skill gaps, generate tailored interview prep, optimize your resume content, and download a placement report.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {features.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={0}
              className="glass-panel"
              sx={{
                p: 2.5,
                height: "100%",
                boxSizing: "border-box",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 24px -6px rgba(99, 102, 241, 0.25)",
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: "action.hover",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                {item.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HeroSection;
