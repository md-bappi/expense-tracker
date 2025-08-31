import { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProjectDetails from "./pages/ProjectDetails";
import NewProject from "./components/NewProject";
import NewExpense from "./components/NewExpense";
import EditProject from "./components/EditProject";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

export const AuthContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);

  console.log("User : ", user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
        }
        const data = await res.json();
        console.log(data);
        console.log(data.payload.currentUser);
        setUser(data.payload.currentUser);
        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <p className=" text-center text-xl font-semibold mt-3">Loading...</p>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ToastContainer />

      <div className="app grid grid-cols-6 gap-2 h-screen w-full bg-[var(--body-bg-color)] ">
        {user && (
          <div className="hidden md:grid md:col-span-1 ">
            <Sidebar
              isMobileSidebar={isMobileSidebar}
              setIsMobileSidebar={setIsMobileSidebar}
            />
          </div>
        )}

        <div
          className={`col-span-6 ${
            user ? "md:col-span-5" : "col-span-6"
          } border-l border-[var(--border-color)] `}
        >
          {user && (
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          )}
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/new-project" element={<NewProject />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
            <Route path="/new-expense/:id" element={<NewExpense />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
