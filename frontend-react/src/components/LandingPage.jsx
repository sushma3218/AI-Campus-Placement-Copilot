import {
  Box,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function LandingPage({ onGetStarted }) {
  return (
    <Box
      className="page-fade-in"
      sx={{
        textAlign: "center",
        pt: { xs: 1, md: 1.5 },
        pb: 0,
        maxWidth: 1100,
        mx: "auto",
        px: 2,
        position: "relative",
      }}
    >
      {/* Hero Headlines */}
      <Typography
        variant="h1"
        fontWeight={900}
        sx={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: { xs: "3rem", sm: "4.2rem", md: "5.4rem" },
          letterSpacing: "-2.8px",
          color: "#0f172a",
          lineHeight: 1.02,
          mb: 0.8,
        }}
      >
        Placify
      </Typography>

      <Typography
        variant="h3"
        fontWeight={800}
        className="purple-gradient-text"
        sx={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: { xs: "1.5rem", sm: "2.2rem", md: "2.8rem" },
          letterSpacing: "-1px",
          mb: 1.5,
        }}
      >
        Your AI Placement Companion
      </Typography>

      {/* Subtitle Paragraph */}
      <Typography
        variant="body1"
        color="#64748b"
        sx={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: { xs: "1rem", sm: "1.12rem" },
          maxWidth: 680,
          mx: "auto",
          mb: 0.5,
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        Match your resume with your target job, uncover skill gaps, enhance your profile, and get interview-ready with AI
      </Typography>

      {/* Central Character & Bottom CTA Button Stage */}
      <Box
        sx={{
          position: "relative",
          maxWidth: 600,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: -3.5,
        }}
      >
        {/* Soft Purple Backlight Ambient Vignette */}
        <Box
          sx={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 260, sm: 340, md: 400 },
            height: { xs: 260, sm: 340, md: 400 },
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(139, 92, 246, 0.03) 60%, transparent 80%)",
            filter: "blur(35px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Central Waving AI Assistant Character Image (Moved Up) */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src="/assets/ai_assistant_waving.png"
            alt="Placify AI Companion"
            style={{
              width: "100%",
              maxWidth: "340px",
              height: "auto",
              display: "block",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
              filter: "drop-shadow(0 15px 30px rgba(124, 58, 237, 0.12))",
            }}
          />
        </Box>

        {/* Primary CTA Button Positioned at Bottom of Image */}
        <Box sx={{ zIndex: 10, mt: -4.5, position: "relative" }}>
          <Button
            variant="contained"
            className="dark-pill-button"
            onClick={onGetStarted}
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: { xs: 4, sm: 5 },
              py: 1.5,
              fontSize: { xs: "0.98rem", sm: "1.05rem" },
            }}
          >
            Get Started Free
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LandingPage;
