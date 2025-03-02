import { useState } from 'react'
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

function TopContributors(prop) {
  return (
      <Grid item xs={12}>
           <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Top Contributors</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Here are the top contributors to the GitHub repository:
              </Typography>

              {/* Loop through contributors and display their details */}
              {prop.response.length > 0 ? (
                prop.response.map((contributor) => (
                  <Box key={contributor.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px',  paddingBottom: '10px' }}>
                    <Avatar alt={contributor.login} src={contributor.avatar_url} sx={{ width: 60, height: 60, marginRight: '20px' }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{contributor.login}</Typography>
                      <Typography variant="body2" color="text.secondary">Contributions: {contributor.contributions}</Typography>
                      <Typography variant="body2" color="primary">
                        <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                          View Profile
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No data available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
  )
}

export default TopContributors