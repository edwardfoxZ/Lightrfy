import Library from "../components/Library";
import { Footer } from "../components/FooterMobile";
import { useState } from "react";
import { Search } from "../components/Search";
import { PlayerSong } from "../components/PlayerSong";
import { FaPlay, FaPause } from "react-icons/fa";
import Metadata from "../../server/metadata.json";

const Songs = () => {
  const [isSearchOpen, setIsSearchOpend] = useState(false);
  const [isLibraryOn, setIsLibraryOn] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(false);

  return (
    <div className="w-full h-full md:p-3 md:pb-48 pt-5">
      <div className="flex flex-row gap-3 w-full h-full">
        {/* library */}
        <Library isLibraryOn={isLibraryOn} setIsLibraryOn={setIsLibraryOn} />

        <div
          className="max-sm:max-w-[1260px] w-full h-full mx-auto bg-gray-950/20 backdrop-blur-lg 
          md:rounded-3xl p-10"
        >
          <Search
            isSearchOpen={isSearchOpen}
            setIsSearchOpend={setIsSearchOpend}
          />

          <h1 className="max-sm:text-2xl text-3xl font-bold mt-10">Popular</h1>
          <div className="flex flex-row overflow-hidden mt-5">
            <div
              className="relative cursor-pointer w-[130px] min-h-[130px] md:min-h-[230px] md:w-[230px]
           bg-[#191515]/50 md:rounded-xl group"
            >
              {/* Layer */}
              <div
                className="absolute top-0 bg-transparent group-hover:bg-[#111111]/50 w-full h-full 
              md:rounded-xl transition-colors duration-300 flex items-center justify-center"
              >
                <button
                  className="hidden md:block absolute bottom-5 right-3 opacity-0 group-hover:opacity-100 bg-[#8f364e] text-white p-3 md:p-4 
                    rounded-full transition-opacity duration-300"
                >
                  <FaPlay size={20} />
                </button>
              </div>
              <img
                className="w-full h-full object-fill md:rounded-xl"
                src=""
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <PlayerSong
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        isMute={isMute}
        setIsMute={setIsMute}
      />
      <Footer />
    </div>
  );
};

export default Songs;
