import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import React from "react";

function SdgScoreboard({ response, urlGiven }) {
  // Determine progress bar color
  const getColor = (score) => {
    if (score < 40) return "#e53935"; // Red for low scores
    if (score < 70) return "#fbc02d"; // Yellow for medium scores
    return "#43a047"; // Green for high scores
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ height: "100%", p: 2 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            SDG3 Score
          </Typography>
        </Box>
        <CardContent>
          {!urlGiven ? (
            <Typography variant="body2" color="text.secondary">
              No GitHub URL given. Please enter the URL in the search box.
            </Typography>
          ) : response === "-1" ? (
            <Typography variant="body2" color="text.secondary">
              No SDG3 Score Available, raise a new issue by filling the SDG Form
              component.
            </Typography>
          ) : (
            <>
              <Box display="flex" justifyContent="flex-end" mb={2}>
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
