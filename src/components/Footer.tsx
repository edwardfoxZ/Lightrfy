import { GiStoneBlock } from "react-icons/gi";
import { IoSearch, IoLibraryOutline } from "react-icons/io5";

export const Footer = () => {
  return (
    <div className="md:hidden block fixed bottom-0 w-full h-20 bg-[#191515] p-5">
      <ul className="text-white text-sm flex flex-row space-x-8 justify-center">
        <li className="flex flex-col items-center">
          <GiStoneBlock size={25} />
          <h3>Your Block</h3>
        </li>

        <li className="flex flex-col items-center">
          <IoSearch size={25} />
          <h3>Search</h3>
        </li>

        <li className="flex flex-col items-center">
          <IoLibraryOutline size={25} />
          <h3>Search</h3>
        </li>
      </ul>
    </div>
  );
};
