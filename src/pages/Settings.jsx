import { useState } from "react";
import Title from "../ui/Title";
import Profile from "../components/Profile";
import SecuritySettings from "../components/SecuritySettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className=" mx-4 p-4">
      <Title
        text=" Settings"
        des="Manage your account preferences and application settings"
      />

      {/* Profile Tabs */}
      <div className="mx-4">
        <div
          className="bg-[var(--body-bg-color)] flex flex-wrap justify-center items-center gap-2 p-2 my-4 rounded-full text-sm 
               md:border md:border-[var(--border-color)] w-full"
        >
          {["Profile", "Preferences", "Notifications", "Projects", "Data"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full capitalize transition-all duration-300 cursor-pointer text-xs sm:text-sm md:text-base ${
                  activeTab === tab
                    ? "bg-[var(--bg-primary-color)] shadow-md"
                    : "hover:bg-[var(--hover-bg-color)]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {activeTab === "Profile" && (
        <>
          <Profile />
          <SecuritySettings />
        </>
      )}
    </div>
  );
};

export default Settings;
