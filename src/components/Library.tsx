import { IoLibraryOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Library = ({ isLibraryOn, setIsLibraryOn }: any) => {
  return (
    <motion.div
      animate={{
        width: isLibraryOn ? "auto" : "auto",
        opacity: isLibraryOn ? 1 : 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="hidden md:flex items-start bg-[#151215] rounded-3xl overflow-hidden p-5"
    >
      <motion.div
        animate={{
          paddingRight: isLibraryOn ? "350px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 50,
        }}
        className="text-white items-center ml-1"
      >
        <span
          onClick={() => setIsLibraryOn(!isLibraryOn)}
          className="flex flex-row space-x-2 cursor-pointer"
        >
          <IoLibraryOutline
            size={30}
            className="text-[#8f364e] hover:text-[#d48fa2]/50 
              transition-colors duration-300"
          />
          <motion.h3
            animate={{
              width: isLibraryOn ? "auto" : "0px",
              opacity: isLibraryOn ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="text-2xl whitespace-nowrap overflow-hidden"
          >
            Your Library
          </motion.h3>
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Library;
