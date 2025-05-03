import Library from "../components/Library";
import { Footer } from "../components/FooterMobile";
import { useState, useMemo, useRef, useEffect } from "react";
import { Search } from "../components/Search";
import { PlayerSong } from "../components/PlayerSong";
import { FaPlay, FaPause } from "react-icons/fa";
import Metadata from "../../server/metadata.json";
import { SongBoard } from "../components/SongBoard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import React from "react";
import "../../node_modules/swiper/swiper.css";
import { useBoard } from "../hooks/setBoard";
import { useMobileBoard } from "../hooks/setMobileBoard";
import { SongBoardMobile } from "./mobile/SongBoardMobile";

interface Song {
  ipfs_url: string;
  image_url: string;
  title: string;
}

const Songs = () => {
  const [isSearchOpen, setIsSearchOpend] = useState(false);
  const [isLibraryOn, setIsLibraryOn] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const { isBoard, setIsBoard } = useBoard();
  const { mobileSong, setMobileSong } = useMobileBoard();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [song, setSong] = useState<Song | null>(null);
  const [artist, setArtist] = useState<Song | null>(null);
  const [valueSong, setValueSong] = useState(60);
  const progressSongRef = useRef<HTMLDivElement>(null);
  const progressSongRefMobile = useRef<HTMLDivElement>(null);
  const [valueSound, setValueSound] = useState(100);
  const progressSoundRef = useRef<HTMLDivElement>(null);
  const [_, setSound] = useState(0);
  const [lastVolume, setLastVolume] = useState(100);
  const [currentSong, setCurrnetSong] = useState<Song | null>(null);

  // Audio playback control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetaData = () => {
      setDuration(audio?.duration || 0);
    };

    const onTimeUpdata = () => {
      if (audio.duration && !isNaN(audio.currentTime) && audio.duration > 0) {
        setCurrentTime(audio.currentTime);
        const percent = (audio.currentTime / audio.duration) * 100;
        if (!isNaN(percent)) {
          setValueSong(percent);
        }
      }
    };

    const onError = (e: Event) => {
      console.error("Audio Error: ", e);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetaData);
    audio.addEventListener("timeupdate", onTimeUpdata);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetaData);
      audio.removeEventListener("timeupdate", onTimeUpdata);
      audio.removeEventListener("error", onError);
    };
  }, []);

  // Handle Seek
  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio && duration > 0 && !isNaN(value) && value >= 0 && value <= 100) {
      const seekTime = (value / 100) * duration;
      if (!isNaN(seekTime)) {
        audio.currentTime = seekTime;
        setCurrentTime(seekTime);
        setValueSong(value);
      }
    }
  };

  // useEffect(() => {
  //   if (audioRef.current) {
  //     setSound(audioRef.current.volume);
  //   }
  // }, [valueSong]);

  function togglePlaySong(data: any) {
    if (song?.ipfs_url === data.ipfs_url && isPlay) {
      setIsPlay(false);
    } else {
      setSong(data);
      setArtist(data.artist);
      setIsPlay(true);
    }
  }

  const songItems = useMemo(
    () =>
      Metadata.map((data, index) => ({
        id: index,
        desktopItem: (
          <div
            key={index}
            className="relative cursor-pointer bg-[#191515]/50 md:rounded-xl group"
          >
            <div
              className="absolute top-0 bg-transparent group-hover:bg-[#111111]/50 w-full h-full md:rounded-xl 
                transition-colors duration-300 flex items-center justify-center"
            >
              <button
                type="button"
                onClick={() => togglePlaySong(data)}
                className="hidden md:block absolute bottom-5 right-3 opacity-0 group-hover:opacity-100 bg-[#8f364e]
                     text-white p-3 md:p-4 rounded-full transition-opacity duration-300"
              >
                {isPlay && song?.ipfs_url === data.ipfs_url ? (
                  <FaPause size={20} />
                ) : (
                  <FaPlay size={20} />
                )}
              </button>
            </div>
            <div className="w-[130px] md:w-[250px]">
              <img
                className="w-full h-full object-cover md:rounded-xl"
                src={data.image_url}
                alt={data.title}
              />
            </div>
          </div>
        ),
        mobileItem: (
          <div
            key={index}
            className="relative cursor-pointer bg-[#191515]/50 rounded-xl group h-full"
          >
            <div
              className="bg-transparent group-hover:bg-[#111111]/50 w-full h-full 
                rounded-xl transition-colors duration-300 flex items-center justify-center"
            >
              <button
                type="button"
                onClick={() => togglePlaySong(data)}
                className="absolute bottom-5 right-3 opacity-0 group-hover:opacity-100 bg-[#8f364e] text-white p-3 
                    rounded-full transition-opacity duration-300"
              >
                {isPlay && song?.ipfs_url === data.ipfs_url ? (
                  <FaPause size={20} />
                ) : (
                  <FaPlay size={20} />
                )}
              </button>
            </div>
            <img
              className="w-full h-full object-cover rounded-xl"
              src={data.image_url}
              alt={data.title}
            />
          </div>
        ),
      })),
    [Metadata, isPlay, song?.ipfs_url]
  );

  return (
    <div className="w-full h-full md:p-3 md:pb-48 pt-5">
      <audio
        ref={audioRef}
        src={song ? song.ipfs_url : undefined}
        preload="auto"
      />
      <div className="flex flex-row gap-3 w-full h-full">
        {/* library */}
        <Library isLibraryOn={isLibraryOn} setIsLibraryOn={setIsLibraryOn} />
        {mobileSong && (
          <div className="fixed inset-0 z-50">
            <SongBoardMobile
              artist={artist}
              image={song?.image_url}
              name={song?.title}
              mobileSong={mobileSong}
              setMobileSong={setMobileSong}
              isPlay={isPlay}
              setIsPlay={setIsPlay}
              currentTime={currentTime}
              duration={duration}
              handleSeek={handleSeek}
              progressSongRef={progressSongRef}
            />
          </div>
        )}

        <div
          className="max-sm:max-w-[1260px] w-full h-full mx-auto bg-gray-950/20 backdrop-blur-lg 
          md:rounded-3xl p-3 md:p-10"
        >
          <Search
            isSearchOpen={isSearchOpen}
            setIsSearchOpend={setIsSearchOpend}
          />

          <div className="md:max-w-[1500px] mx-auto flex flex-col items-start">
            <h1 className="max-sm:text-2xl text-3xl font-bold mt-10">
              Popular
            </h1>

            {/* Desktop Grid */}
            <div className="hidden md:flex md:flex-wrap gap-5 overflow-hidden mt-5">
              {songItems.map(({ id, desktopItem }) => (
                <React.Fragment key={id}>{desktopItem}</React.Fragment>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden w-full mt-5">
              <Swiper
                modules={[Navigation, Pagination]}
                direction="horizontal"
                slidesPerView={2.5}
                spaceBetween={15}
                freeMode={true}
                pagination={{ clickable: true }}
                style={{
                  paddingBottom: "30px",
                }}
              >
                {songItems.map(({ id, mobileItem }) => (
                  <SwiperSlide key={id} className="w-auto">
                    <div className="h-full">{mobileItem}</div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Song Board */}

        {isBoard && (
          <div className="hidden md:block px-10 py-32 bg-[#151215] rounded-xl">
            <SongBoard
              artist={artist}
              image={song?.image_url}
              name={song?.title}
            />
          </div>
        )}
      </div>
      <PlayerSong
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        isMute={isMute}
        setIsMute={setIsMute}
        song={song}
        isBoard={isBoard}
        setIsBoard={setIsBoard}
        setMobileSong={setMobileSong}
        setLastVolume={setLastVolume}
        lastVolume={lastVolume}
        setValueSound={setValueSound}
        valueSound={valueSound}
        valueSong={valueSong}
        audioRef={audioRef}
        progressSongRefMobile={progressSongRefMobile}
        progressSongRef={progressSongRef}
        progressSoundRef={progressSoundRef}
        currentTime={currentTime}
        handleSeek={handleSeek}
      />
      <Footer />
    </div>
  );
};

export default Songs;
