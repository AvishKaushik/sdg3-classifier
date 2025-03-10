import React, { useState } from "react";
import {
  TextField,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TopContributors from "./TopContributors";
import LanguageChart from "./LanguageChart";
import OpenClosedIssues from "./OpenClosedIssues";
import SdgScoreboard from "./SdgScoreboard";
import HealthScoreboard from "./HealthScoreBoard";

const Dashboard = () => {
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [openIssue, setOpenIssue] = useState("");
  const [closedIssue, setClosedIssue] = useState("");
  const [topContributors, setTopContributors] = useState<Contributor[]>([]);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [sdgScore, setSdgScore] = useState("-1");
  const [contributorSet, setContributorSet] = useState(false);
  const [languagesSet, setLanguagesSet] = useState(false);
  const [openCloseSet, setOpenCloseSet] = useState(false);
  const [sdgScoreSet, setsdgScoreSet] = useState(false);
  const [healthScore, setHealthScore] = useState("-1");

  interface Contributor {
    id: number;
    login: string;
    avatar_url: string;
    contributions: number;
    html_url: string;
  }

  const computeSdgScore = (jsonData) => {
    const questions = jsonData.sdgAlignments?.alignments[0].targets || [];
    const totalQuestions = questions.length;
    const yesCount = questions.filter(
      (q) => q.response.toLowerCase() === "yes"
    ).length;

    return totalQuestions > 0 ? (yesCount / totalQuestions) * 100 : 0;
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const urlParts = repositoryUrl.split("/");
        const owner = urlParts[urlParts.length - 2];
        const repo = urlParts[urlParts.length - 1];
        const token = import.meta.env.VITE_GH_TOKEN;

        // Fetch contributors data
        const contributorsResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        const contributorsData = await contributorsResponse.json();
        console.log(contributorsData);
        if (contributorsData) {
          const topFiveContributors = contributorsData.slice(0, 5);
          setTopContributors(topFiveContributors);
          setContributorSet(true);
        }

        const fileResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/sdg3.json`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!fileResponse.ok) {
          if (fileResponse.status === 404) {
            setSdgScore("-1");
            setsdgScoreSet(true);
          } else {
            throw new Error("Failed to fetch file.");
          }
        } else {
          const fileData = await fileResponse.json();

          // Step 2: Decode the Base64 content of the file
          const jsonContent = JSON.parse(atob(fileData.content));

          const computedScore = computeSdgScore(jsonContent);
          setSdgScore(computedScore.toFixed(2).toString());
          setsdgScoreSet(true);
        }

        // Fetch languages data
        const languagesResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/languages`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        const languagesData = await languagesResponse.json();
        setLanguages(languagesData); // Set languages data
        setLanguagesSet(true);

        // OPEN CLOSE ISSUE RESPONSE
        const openCloseIssueResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        const healthsResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/community/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        const healthScore = await healthsResponse.json();
        console.log(healthScore)
        if (healthsResponse.status != 404) {
          setHealthScore(healthScore.health_percentage);
          setLanguagesSet(true);
        }
        else {
          setHealthScore("-1");
        }
        const issuesUrl = `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`;
        const issuesResponse = await fetch(issuesUrl);
        const issuesData = await issuesResponse.json();

        const openIssues = issuesData.filter(
          (issue) => issue.state === "open"
        ).length;
        const closedIssues = issuesData.filter(
          (issue) => issue.state === "closed"
        ).length;

        setClosedIssue(closedIssues);
        setOpenIssue(openIssues);
        setOpenCloseSet(true);
      } catch (error) {
        console.error("Error fetching the data: ", error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Enter GitHub URL
        </Typography>
        <TextField
          label="GitHub Repository URL"
          variant="outlined"
          fullWidth
          focused
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
          InputProps={{
            notched: true,
            style: { color: "white" },
            endAdornment: <SearchIcon sx={{ color: "white" }} />,
          }}
          InputLabelProps={{ style: { color: "white" } }}
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          onKeyDown={handleKeyDown} // Capture Enter key press
        />
      </Box>

      <Grid container spacing={3}>
        {/* Top Contributors Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <TopContributors
              response={topContributors}
              contributorSet={contributorSet}
            />
          </Card>
        </Grid>

        {/* Languages Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                Top Languages Used
              </Typography>

              {languagesSet ? (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    marginTop={3}
                  >
                    The number of languages used in this repo are:
                  </Typography>
                  <LanguageChart data={languages} />
                </>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginTop={3}
                >
                  No GitHub URL given
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                Open/Closed Issues
              </Typography>

              {openCloseSet ? (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    marginTop={3}
                  >
                    The number of open and closed issues are:
                  </Typography>
                  <OpenClosedIssues open={openIssue} closed={closedIssue} />
                </>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginTop={3}
                >
                  No GitHub URL given
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ height: "100%" }}>
            <SdgScoreboard response={sdgScore} urlGiven={sdgScoreSet} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ height: "100%" }}>
            <HealthScoreboard response={healthScore} urlGiven={sdgScoreSet} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
