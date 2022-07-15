import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BackButton({ url }) {
  return (
    <Link
      to={url}
      className="mt-4 ml-4 flex items-center border-2 border-black w-fit px-8 py-2 rounded-md "
    >
      <FaArrowAltCircleLeft /> Back
    </Link>
  );
}

export default BackButton;
