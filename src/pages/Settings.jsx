import Title from "../ui/Title";
import Profile from "../components/Profile";
import SecuritySettings from "../components/SecuritySettings";

const Settings = () => {
  return (
    <div className=" mx-4 p-4 ">
      <Title
        text=" Settings"
        des="Manage your account preferences and application settings"
      />

      <div className=" mt-10">
        <Profile />
        <SecuritySettings />
      </div>
    </div>
  );
};

export default Settings;
