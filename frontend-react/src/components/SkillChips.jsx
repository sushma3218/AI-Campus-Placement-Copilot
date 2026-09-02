import { Box, Typography, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

function SkillChips({ title, skills, type }) {
  const isFound = type === "found";
  const icon = isFound ? (
    <CheckCircleIcon sx={{ fontSize: "1rem !important", color: "#10b981 !important" }} />
  ) : (
    <ErrorIcon sx={{ fontSize: "1rem !important", color: "#f59e0b !important" }} />
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" alignItems="center" gap={1.5} mb={2}>
        <Typography variant="h6" fontWeight={800} sx={{ color: "#0f172a" }}>
          {title}
        </Typography>
        <Chip
          label={skills.length}
          size="small"
          sx={{
            fontWeight: 800,
            borderRadius: "8px",
            bgcolor: isFound ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
            color: isFound ? "#10b981" : "#f59e0b",
            border: "1px solid",
            borderColor: isFound ? "#10b981" : "#f59e0b",
          }}
        />
      </Box>

      {skills && skills.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={1}>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              icon={icon}
              sx={{
                fontWeight: 700,
                borderRadius: "10px",
                px: 0.5,
                py: 0.5,
                fontSize: "0.85rem",
                bgcolor: isFound ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                color: isFound ? "#34d399" : "#fbbf24",
                border: "1px solid",
                borderColor: isFound ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  borderColor: isFound ? "#10b981" : "#f59e0b",
                },
              }}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
          {isFound ? "No direct skill matches detected." : "All required target job skills are matched!"}
        </Typography>
      )}
    </Box>
  );
}

export default SkillChips;