import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  console.log(showSidebar);
  return (
    <div className="app grid grid-cols-6 gap-2 h-screen w-full bg-[var(--body-bg-color)] ">
      <div className="hidden md:grid md:col-span-1 ">
        <Sidebar isMobileSidebar={false} />
      </div>

      <div className="col-span-6 md:col-span-5 border-l border-[var(--border-color)] ">
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
