import { Box, CircularProgress, Typography, Paper } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function LoadingScreen() {
  return (
    <Paper
      elevation={0}
      className="glass-panel page-fade-in"
      sx={{
        p: 6,
        my: 6,
        textAlign: "center",
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(0, 212, 255, 0.3) !important",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex", mb: 3 }}>
        <CircularProgress size={76} thickness={4} sx={{ color: "#00f0ff" }} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AutoAwesomeIcon sx={{ color: "#0066ff", fontSize: 28 }} />
        </Box>
      </Box>

      <Typography variant="h5" fontWeight={900} gutterBottom className="pulse-animation" sx={{ color: "#00f0ff" }}>
        Analyzing Placement Profile with Llama 3.2...
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, lineHeight: 1.6 }}>
        Extracting candidate technical skills, parsing target job requirements, and synthesizing placement interview preparation.
      </Typography>
    </Paper>
  );
}

export default LoadingScreen;