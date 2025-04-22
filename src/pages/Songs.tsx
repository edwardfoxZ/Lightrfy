import Library from "../components/Library";
import { Footer } from "../components/FooterMobile";
import { useState, useEffect } from "react";
import { Search } from "../components/Search";
import { PlayerSong } from "../components/PlayerSong";
import { FaPlay, FaPause } from "react-icons/fa";
import Metadata from "../../server/metadata.json";
import { SongBoard } from "../components/SongBoard";
import { useBoard } from "../hooks/setBoard";

const Songs = () => {
  const [isSearchOpen, setIsSearchOpend] = useState(false);
  const [isLibraryOn, setIsLibraryOn] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const { isBoard } = useBoard();

  useEffect(() => {
    console.log("isBoard state changed:", isBoard);
  }, [isBoard]);

  interface Song {
    ipfs_url: string;
    image_url: string;
    title: string;
  }

  const [song, setSong] = useState<Song | null>(null);
  const [artist, setArtist] = useState<Song | null>(null);

  function togglePlaySong(data: any) {
    if (song?.ipfs_url === data.ipfs_url && isPlay) {
      setIsPlay(false);
    } else {
      setSong(data);
      setArtist(data.artist);
      setIsPlay(true);
    }
  }

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

          <div className="md:max-w-[1500px] mx-auto flex flex-col items-start">
            <h1 className="max-sm:text-2xl text-3xl font-bold mt-10">
              Popular
            </h1>
            <div className="grid grid-cols-3 md:flex md:flex-wrap gap-5 overflow-hidden mt-5">
              {Metadata.map((data, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer bg-[#191515]/50 md:rounded-xl group"
                >
                  {/* Layer */}
                  <div
                    className="absolute top-0 bg-transparent group-hover:bg-[#111111]/50 w-full h-full 
              md:rounded-xl transition-colors duration-300 flex items-center justify-center"
                  >
                    <button
                      onClick={() => togglePlaySong(data)}
                      className="hidden md:block absolute bottom-5 right-3 opacity-0 group-hover:opacity-100 bg-[#8f364e] text-white p-3 md:p-4 
                    rounded-full transition-opacity duration-300"
                    >
                      {isPlay && song?.ipfs_url === data.ipfs_url ? (
                        <FaPause size={20} />
                      ) : (
                        <FaPlay size={20} />
                      )}
                    </button>
                  </div>
                  <div className="w-[120px] md:w-[250px]">
                    <img
                      className="w-full h-full object-cover md:rounded-xl"
                      src={data.image_url}
                      alt={data.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Song Board */}

        <div className="hidden md:block px-10 py-32 bg-[#151215] rounded-xl">
          <SongBoard
            artist={artist}
            image={song?.image_url}
            name={song?.title}
          />
        </div>
      </div>
      <PlayerSong
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        isMute={isMute}
        setIsMute={setIsMute}
        song={song}
      />
      <Footer />
    </div>
  );
};

export default Songs;
