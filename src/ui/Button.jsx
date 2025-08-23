import { Link } from "react-router-dom";

const Button = ({ icon, text, href, style }) => {
  return (
    <Link
      to={href ? href : "#"}
      className={` pt-1 pb-2  mt-4 w-full ${
        style ? style : ""
      } flex justify-center items-center gap-1  text-center text-sm md:w-auto md:px-4`}
    >
      <span className=" pt-1">{icon}</span>
      <span className=" capitalize ">{text}</span>
    </Link>
  );
};

export default Button;
