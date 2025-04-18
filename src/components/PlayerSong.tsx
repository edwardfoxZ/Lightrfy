import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { VscUnmute, VscMute } from "react-icons/vsc";

export const PlayerSong = ({ isPlay, setIsPlay }: any) => {
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
              <MdSkipPrevious size={30} className="hidden md:block" />
            </button>
            <button
              onClick={() => setIsPlay(!isPlay)}
              className="md:bg-white md:p-3 md:rounded-full max-sm:translate-x-8"
            >
              {isPlay ? <FaPlay size={20} /> : <FaPause size={20} />}
            </button>
            <button>
              <MdSkipNext size={30} className="hidden md:block" />
            </button>
          </div>
          <div className="max-sm:absolute bottom-[-8px] left-1 text-white">
            --------------------------------
          </div>
        </div>

        <div className="hidden md:block pr-10">
          <div className="flex flex-row items-center">
            <VscMute size={20} />
            <h2>-----------</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
