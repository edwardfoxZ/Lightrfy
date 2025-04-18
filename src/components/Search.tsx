import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";

export const Search = ({ isSearchOpen, setIsSearchOpend }: any) => {
  return (
    <div
      className="fixed top-10 right-10 hidden w-full md:flex flex-row-reverse justify-between 
        overflow-hidden"
    >
      <motion.label
        className="relative h-[45px] bg-[#8f364e] text-white rounded-full transition-transform 
            duration-500 focus-within:outline-none p-2 px-4"
        animate={{
          width: isSearchOpen ? "500px" : "45px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {isSearchOpen && (
          <input
            type="text"
            name="searchBar"
            placeholder="What do you want to play?"
            className="bg-transparent w-full outline-none placeholder:text-white"
          />
        )}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsSearchOpend(!isSearchOpen);
          }}
          className="absolute right-4 top-3 bg-transparent"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoSearch size={20} className="" />
        </motion.button>
      </motion.label>
    </div>
  );
};
