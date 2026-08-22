import { useState } from "react";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [view, setView] = useState<"landing" | "home">(() => {
    try {
      return localStorage.getItem("marksix-skip-landing") === "1" ? "home" : "landing";
    } catch {
      return "landing";
    }
  });

  const goHome = () => {
    try {
      localStorage.setItem("marksix-skip-landing", "1");
    } catch {
      /* ignore */
    }
    setView("home");
  };

  const goLanding = () => {
    try {
      localStorage.removeItem("marksix-skip-landing");
    } catch {
      /* ignore */
    }
    setView("landing");
  };

  if (view === "landing") {
    return (
      <Landing
        language={language}
        onToggleLanguage={toggleLanguage}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onStart={goHome}
      />
    );
  }

  return (
    <Home
      language={language}
      onToggleLanguage={toggleLanguage}
      isDark={isDark}
      onToggleTheme={toggleTheme}
      onBackHome={goLanding}
    />
  );
}

export default App;
