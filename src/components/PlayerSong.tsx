import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { VscUnmute, VscMute } from "react-icons/vsc";
// import { motion } from "framer-motion";

export const PlayerSong = ({ isPlay, setIsPlay, isMute, setIsMute }: any) => {
  const [valueSong, setValueSong] = useState(60);
  const progressSongRef = useRef<HTMLDivElement>(null);

  const [valueSound, setValueSound] = useState(100);
  const progressSoundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const percent = (valueSong / 100) * 100;
    if (progressSongRef.current) {
      progressSongRef.current.style.width = `${percent}%`;
    }
  }, [valueSong]);

  return (
    <div className="fixed w-full bottom-[70px] md:bottom-3 bg-[#8f364e] rounded-md md:bg-transparent z-50">
      <div className="relative flex flex-row items-center justify-between py-3 px-5">
        <div className="flex flex-row">
          <div className="flex flex-row space-x-2 items-center">
            <img
              className="object-cover w-[45px] md:w-[80px] md:rounded-sm"
              src="https://i.etsystatic.com/36277573/r/il/32b696/5675418143/il_600x600.5675418143_rxe1.jpg"
              alt=""
            />
            <div>
              <h2 className="text-black">name</h2>
              <p className="text-black">detail</p>
            </div>
            <button className="hidden md:block">+</button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center space-x-8">
            <button>
              <MdSkipPrevious
                size={30}
                className="hidden md:block text-white/60"
              />
            </button>
            <button
              onClick={() => setIsPlay(!isPlay)}
              className="md:bg-white md:p-3 md:rounded-full max-sm:translate-x-8"
            >
              {isPlay ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button>
              <MdSkipNext size={30} className="hidden md:block text-white/60" />
            </button>
          </div>
          <div
            className="relative max-sm:absolute max-sm:bottom-[-18px] left-1 pt-4 pb-3 w-full  
              md:w-auto"
          >
            <input
              id="musicRange"
              type="range"
              className="peer w-[650px] h-1.5 bg-[#c4647e] md:bg-gray-300 rounded-lg appearance-none
                 cursor-pointer thumb-on-hover"
              min="0"
              max="100"
              value={valueSong}
              onChange={(e) => setValueSong(Number(e.target.value))}
            />
            <div
              ref={progressSongRef}
              className="absolute bottom-[18px] left-0 h-1.5 bg-white/50 md:bg-[#8f364e] rounded-lg pointer-events-none 
                    transition-colors duration-300 peer-hover:block"
            ></div>
          </div>
        </div>

        <div className="hidden relative md:flex pr-10">
          <div className="flex flex-row items-center space-x-2">
            <button className="text-white" onClick={() => setIsMute(!isMute)}>
              {isMute ? (
                <VscMute size={18} onClick={() => setValueSong(valueSong)} />
              ) : (
                <VscUnmute size={19} onClick={() => setValueSound(0)} />
              )}
            </button>
            <input
              id="soundRange"
              max="100"
              min="0"
              onChange={(e) => setValueSound(Number(e.target.value))}
              value={valueSound}
              type="range"
              className="hidden md:block w-[90px] h-1 bg-gray-300 rounded-lg appearance-none
                 cursor-pointer peer thumb-on-hover"
            />
            <div
              ref={progressSoundRef}
              className="absolute bottom-[0px] left-2 h-1.5 bg-[#8f364e] rounded-lg pointer-events-none 
                    transition-colors duration-300 peer-hover:block"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
