import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import ProjectDetails from "./pages/ProjectDetails";
import NewProject from "./components/NewProject";
import NewExpense from "./components/NewExpense";

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
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/new-project" element={<NewProject />} />
          <Route path="/new-expense" element={<NewExpense />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
