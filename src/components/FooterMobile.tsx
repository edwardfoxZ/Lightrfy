import { GiStoneBlock } from "react-icons/gi";
import { IoSearch, IoLibraryOutline } from "react-icons/io5";

const Bars = [
  { id: 1, icon: <GiStoneBlock size={25} />, title: "Your Block" },
  { id: 2, icon: <IoSearch size={25} />, title: "Search" },
  { id: 3, icon: <IoLibraryOutline size={25} />, title: "Library" },
];

export const Footer = () => {
  return (
    <div className="md:hidden block fixed bottom-0 w-full h-20 bg-[#191515] p-5">
      <ul className="text-white text-sm flex flex-row space-x-8 justify-center">
        {Bars.map((bar) => (
          <li key={bar.id} className="flex flex-col items-center cursor-pointer">
            {bar.icon}
            <h3 className="pt-1">{bar.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
