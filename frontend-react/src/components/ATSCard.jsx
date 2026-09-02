import { Card, CardContent, Typography } from "@mui/material";

function ATSCard({ score }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5">
          ATS Score
        </Typography>

        <Typography
          variant="h2"
          color="primary"
          fontWeight="bold"
        >
          {score ? `${score}/100` : "--"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ATSCard;