import Navbar from "./components/Navbar";
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
