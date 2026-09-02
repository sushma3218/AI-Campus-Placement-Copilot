import { AppBar, Toolbar, Typography, Button, Box, Chip, Stepper, Step, StepLabel } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function Header({ pageStep, setPageStep, onReset, isDashboard }) {
  const steps = ["Overview", "Upload", "Dashboard"];
  
  const activeStep = pageStep === "landing" ? 0 : pageStep === "upload" ? 1 : 2;

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid #e2e8f0",
        bgcolor: "rgba(255, 255, 255, 0.85)",
        mb: 2,
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1.2, px: { xs: 2, md: 4 } }}>
        {/* Brand Logo & Title */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          onClick={() => setPageStep("landing")}
          sx={{ cursor: "pointer" }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              boxShadow: "0 4px 14px rgba(124, 58, 237, 0.35)",
            }}
          >
            ✓
          </Box>
          <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: "-0.8px", color: "#0f172a" }}>
            Placify
          </Typography>
        </Box>

        {/* Right Navigation Controls */}
        <Box display="flex" alignItems="center" gap={2}>

          {isDashboard && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<RestartAltIcon />}
              onClick={onReset}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: 700,
                borderColor: "#cbd5e1",
                color: "#0f172a",
                "&:hover": {
                  borderColor: "#7c3aed",
                  color: "#7c3aed",
                  bgcolor: "rgba(124, 58, 237, 0.05)",
                },
              }}
            >
              New Analysis
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;