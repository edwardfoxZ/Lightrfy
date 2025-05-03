import {
  MdOutlineKeyboardArrowDown,
  MdSkipPrevious,
  MdSkipNext,
} from "react-icons/md";
import { FaPause, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { SongRange } from "../../components/SongRange";

export const SongBoardMobile = ({
  image,
  name,
  artist,
  mobileSong,
  setMobileSong,
  isPlay,
  setIsPlay,
  currentTime,
  duration,
  handleSeek,
  progressSongRef,
}: any) => {
  const valueSong = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={mobileSong ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-[#191515] w-full h-full"
    >
      <div className="w-full p-5 py-8 text-white">
        <button onClick={() => setMobileSong(false)}>
          <MdOutlineKeyboardArrowDown size={30} />
        </button>
      </div>
      <div className="px-10">
        <div className="max-w-[350px] mx-auto pt-10">
          <img src={image} alt="SongImg" />
        </div>

        <div className="mt-3 flex flex-col gap-0">
          <p className="text-white text-3xl">{name}</p>
          <p className="text-white/50 ml-1">{artist}</p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-5 mt-10">
        <button>
          <MdSkipPrevious size={30} className="text-white/60" />
        </button>
        <button onClick={() => setIsPlay(!isPlay)} className="text-white/50">
          {isPlay ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        <button>
          <MdSkipNext size={30} className="text-white/60" />
        </button>
      </div>
      <div className="max-w-[330px] relative mx-auto">
        <div
          ref={progressSongRef}
          className="absolute top-[16px] h-0.5 bg-[#8f364e] rounded-lg pointer-events-none
                         transition-colors duration-300 peer-hover:block"
        ></div>
        <SongRange
          valueSong={valueSong}
          handleSeek={handleSeek}
          className="w-full h-0.5 peer appearance-none accent-[#8f364e] bg-[#d3d3d3]"
        />
      </div>
    </motion.div>
  );
};
