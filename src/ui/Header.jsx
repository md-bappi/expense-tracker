import Title from "../ui/Title";
import Button from "../ui/Button";
import { GoPlus } from "react-icons/go";

const Header = () => {
  return (
    <div className="bg-[var(--bg-primary-color)] p-4 md:flex md:justify-between md:items-center md:bg-[var(--body-bg-color)]">
      <Title text="dashboard" des="Overview of your projects and expenses" />
      <Button
        icon={<GoPlus />}
        text="new project"
        href="/new-project"
        style="bg-[var(--btn-bg-color)] text-[var(--btn-text-color)] rounded-lg mt-4"
      />
    </div>
  );
};

export default Header;
