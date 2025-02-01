import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import HomePage from "./pages/HomePage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import DatasetDetails from "./components/DatasetDetails.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { AuthProvider } from "./contexts/authContext";  // Import the AuthProvider
import UserProfile from "./components/UserProfile.tsx";

const theme = {
  colors: {
    background: "#0B0E17",
    text: "#E0E7FF",
    primary: "#4A5AEF",
    secondary: "#FF6B6B",
    accent: "#50E3C2",
  },
  fonts: {
    main: "'Space Grotesk', sans-serif",
  },
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.fonts.main};
  }

  * {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>  {/* Wrap the Router inside the AuthProvider to provide authentication context */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/dataset/:id" element={<DatasetDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/terms" element={<TermsPage />} />
            </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
