// src/App.jsx
import { useState } from "react";
import React from "react";
import sdg3Data from "./sdg3.json"; // Import JSON directly
import Question from "./Questions";
import Card from "@mui/material/Card";
import { Box, Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Main App Component
function SdgForm() {
  const [sdgData, setSdgData] = useState(sdg3Data); // Initialize directly with imported data
  const [repositoryUrl, setRepositoryUrl] = useState("");

  const handleResponseChange = (id, value) => {
    setSdgData((prev) => {
      const updatedQuestions = prev.questions.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            response: value,
            targets:
              value !== "yes"
                ? q.targets.map((t) => ({ ...t, response: null }))
                : q.targets,
          };
        } else if (q.targets.some((t) => t.id === id)) {
          return {
            ...q,
            targets: q.targets.map((t) =>
              t.id === id ? { ...t, response: value } : t
            ),
          };
        }
        return q;
      });
      return { ...prev, questions: updatedQuestions };
    });
  };

  const generateCodeJson = () => {
    const output = {
      sdg: sdgData.sdg,
      title: sdgData.title,
      projectName: "MentalHealthTracker",
      projectDescription: "",
      repositoryUrl: "",
      organization: "Centers for Medicare & Medicaid Services",
      tags: ["healthcare", "mental-health", "open-source"],
      status: "Release",
      version: "2.1.0",
      permissions: {
        license: [
          {
            name: "MIT",
            URL: "https://opensource.org/licenses/MIT",
          },
        ],
        usageType: "openSource",
        exemptionText: "",
      },
      sdgAlignments: {
        sdg: sdgData.sdg,
        title: sdgData.title,
        alignments: [] as {
          id: string;
          question: string;
          response: string;
          targets: { id: string; question: string; response: string }[];
        }[],
        nonAlignments: [] as {
          id: string;
          question: string;
          response: string;
          targets: { id: string; question: string; response: string }[];
        }[],
      },
    };

    // Process the main question and its targets
    const mainQuestion = sdgData.questions[0];
    if (mainQuestion.response === "yes") {
      const alignmentEntry = {
        id: mainQuestion.id,
        question: mainQuestion.question,
        response: mainQuestion.response,
        targets: mainQuestion.targets.map((target) => ({
          id: target.id,
          question: target.question,
          response: target.response || "no",
        })),
      };
      output.sdgAlignments.alignments.push(alignmentEntry);
    } else if (mainQuestion.response === "no") {
      const nonAlignmentEntry = {
        id: mainQuestion.id,
        question: mainQuestion.question,
        response: mainQuestion.response,
        targets: [],
      };
      output.sdgAlignments.nonAlignments.push(nonAlignmentEntry);
    }
    return JSON.stringify(output, null, 2);
  };

  const createIssue = async () => {

    const token = import.meta.env.VITE_ALL_ACCESS_TOKEN_GIT; // ⚠️ Replace with your token
    const jsonContent = generateCodeJson();
    const urlParts = repositoryUrl.split("/");
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1]; // ⚠️ Replace with your repository name
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;
    const gistData = {
      description: "Attached JSON file for GitHub issue",
      public: false, // Set to true if you want it public
      files: {
        "sdg3.json": {
          content: jsonContent,
        },
      },
    };

    try {
      const gistResponse = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gistData),
      });
      if (!gistResponse.ok) {
        throw new Error("Failed to create Gist");
      }

      const gistResult = await gistResponse.json();
      const gistUrl = gistResult.html_url;
      
      const issueData = {
        title: "SDG 3 Questionnaire Results",
        body: `Please find the SDG 3 questionnaire results attached (Make sure to add it as sdg3.json). [sdg3.json](${gistUrl})`,
        labels: ["bug"], // Optional labels
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>SDG 3 Questionnaire</h1>
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
          }}
          InputLabelProps={{ style: { color: "white" } }}
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
        />
      </Box>
      {sdgData.questions.map((question) => (
        <Question
          key={question.id}
          questionData={question}
          onChange={handleResponseChange}
        />
      ))}
      <button
        disabled={repositoryUrl === ""}
        onClick={createIssue}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Generate sdg3.json
      </button>
    </div>
  );
}

export default SdgForm;
