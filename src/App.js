import React, { useState } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Portfolio from "./components/Portfolio.jsx";
import ContactMe from "./components/ContactMe.jsx";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("loading");
  const [targetScreen, setTargetScreen] = useState("home");

  const handleLoadingComplete = () => {
    setCurrentScreen(targetScreen);
  };

  const navigateTo = (path) => {
    const screen = path.replace("/", "") || "home";
    setTargetScreen(screen);
    setCurrentScreen("loading");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "loading":
        return <LoadingScreen onComplete={handleLoadingComplete} />;
      case "home":
        return <HomeScreen onNavigate={navigateTo} />;
      case "about":
        return <AboutMe onNavigate={navigateTo} />;
      case "portfolio":
        return <Portfolio onNavigate={navigateTo} />;
      case "contact":
        return <ContactMe onNavigate={navigateTo} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return <div>{renderScreen()}</div>;
};

export default App;
