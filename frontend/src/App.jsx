// App.jsx
import { useState, useEffect } from "react";

// Layout mới
import Layout from "./components/Layout";

// Pages
import VocabularyPage from "./pages/VocabularyPage";
import GrammarPage from "./pages/GrammarPage";
import QuizPage from "./pages/QuizPage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const [page, setPage] = useState("vocab");
  const [user, setUser] = useState(null);

  // Load user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("jsp_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login thành công
  const handleAuthSuccess = ({ token, user }) => {
    setUser(user);
    // token đã được lưu trong AuthPage.jsx rồi
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("jsp_token");
    localStorage.removeItem("jsp_user");
    setUser(null);
  };

  // Render trang theo sidebar
  const renderPage = () => {
    switch (page) {
      case "vocab":
        return <VocabularyPage />;
      case "grammar":
        return <GrammarPage />;
      case "quiz":
        return <QuizPage />;
      case "auth":
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
      default:
        return <VocabularyPage />;
    }
  };

  return (
    <Layout
      currentPage={page}
      onChangePage={setPage}
      user={user}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}
