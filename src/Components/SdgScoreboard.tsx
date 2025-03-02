import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import React from "react";

function SdgScoreboard({ response }) {
  // Determine progress bar color
  const getColor = (score) => {
    if (score < 40) return "#e53935"; // Red for low scores
    if (score < 70) return "#fbc02d"; // Yellow for medium scores
    return "#43a047"; // Green for high scores
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ height: "100%", p: 2 }}>
        <CardContent>
          {response == "-1" && (
            <Typography>
              {" "}
              No SDG3 Score Available, raise new issue by filling SDG Form
              component
            </Typography>
          )}
          {response !== "-1" && (
            <>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  SDG3 Score
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {response}%
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: 12,
                  bgcolor: "#e0e0e0",
                  borderRadius: 6,
                }}
              >
                <Box
                  sx={{
                    width: `${response}%`,
                    height: "100%",
                    bgcolor: getColor(response),
                    borderRadius: 6,
                    transition: "width 0.5s ease-in-out",
                  }}
                />
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SdgScoreboard;
