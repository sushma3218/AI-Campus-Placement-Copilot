import { useState, useMemo } from "react";
import axios from "axios";
import { Container, ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import UploadPage from "./components/UploadPage";
import Dashboard from "./components/Dashboard";
import LoadingScreen from "./components/LoadingScreen";
import ChatbotPopup from "./components/ChatbotPopup";

function App() {
  const [pageStep, setPageStep] = useState("landing"); // 'landing' | 'upload' | 'dashboard'
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#7c3aed",
          },
          secondary: {
            main: "#6366f1",
          },
          background: {
            default: "#f8fafc",
            paper: "#ffffff",
          },
          text: {
            primary: "#0f172a",
            secondary: "#64748b",
          },
        },
        typography: {
          fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, -apple-system, sans-serif",
          h1: { fontFamily: "'Outfit', sans-serif" },
          h2: { fontFamily: "'Outfit', sans-serif" },
          h3: { fontFamily: "'Outfit', sans-serif" },
          h4: { fontFamily: "'Outfit', sans-serif" },
          h5: { fontFamily: "'Outfit', sans-serif" },
          h6: { fontFamily: "'Outfit', sans-serif" },
        },
        shape: {
          borderRadius: 14,
        },
      }),
    []
  );

  const uploadResume = async (resume, jd) => {
    if (!resume || !jd) {
      alert("Please upload both Resume PDF and Job Description.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/upload-resume`,
        formData
      );

      setResult(response.data);
      setPageStep("dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong during file processing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setPageStep("landing");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", pb: 14, position: "relative", zIndex: 1 }}>
        <Header
          pageStep={pageStep}
          setPageStep={setPageStep}
          onReset={handleReset}
          isDashboard={pageStep === "dashboard" && !!result}
        />

        <Container maxWidth="lg">
          {pageStep === "landing" && !loading && (
            <LandingPage onGetStarted={() => setPageStep("upload")} />
          )}

          {pageStep === "upload" && !loading && (
            <UploadPage
              uploadResume={uploadResume}
              loading={loading}
              onBack={() => setPageStep("landing")}
            />
          )}

          {loading && <LoadingScreen />}

          {pageStep === "dashboard" && result && !loading && (
            <Dashboard result={result} />
          )}
        </Container>

        {/* Floating Chatbot Popup widget anchored at bottom center */}
        {pageStep === "dashboard" && result && !loading && (
          <ChatbotPopup />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;