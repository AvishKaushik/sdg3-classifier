import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

function TopContributors({ contributorSet, response }) {
  return (
    <Grid item xs={12}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Top Contributors
          </Typography>

          {contributorSet ? (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                paragraph
                marginTop={3}
              >
                Here are the top contributors to the GitHub repository:
              </Typography>

              {response?.length > 0 ? (
                response.map((contributor) => (
                  <Box
                    key={contributor.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                      paddingBottom: "10px",
                    }}
                  >
                    <Avatar
                      alt={contributor.login}
                      src={contributor.avatar_url}
                      sx={{ width: 60, height: 60, marginRight: "20px" }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {contributor.login}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Contributions: {contributor.contributions}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        <a
                          href={contributor.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#1976d2", textDecoration: "none" }}
                        >
                          View Profile
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginTop={3}
                >
                  No data available.
                </Typography>
              )}
            </>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              paragraph
              marginTop={3}
            >
              No GitHub URL given.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default TopContributors;
