import { MdOutlineCheck } from "react-icons/md";

const NextButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <span
      className="px-20 py-2 bg-gradient select-none text-white text-xl rounded-lg transtition duration-500 ease-in-out hover:shadow-lg cursor-pointer flex flex-row justify-center items-center"
      onClick={onClick}
      >
        <span className="mr-2">Next</span> <MdOutlineCheck />
        </span>
  );
};

export default NextButton;
