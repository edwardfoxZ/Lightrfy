import { useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { VscUnmute, VscMute } from "react-icons/vsc";
import { IoMdAddCircleOutline, IoIosArrowDropup } from "react-icons/io";
import { SongRangeInterface } from "./SongRangeInterface";
import { SongRange } from "./SongRange";

export const PlayerSong = ({
  isPlay,
  setIsPlay,
  isMute,
  setIsMute,
  song,
  isBoard,
  setIsBoard,
  setMobileSong,
  setLastVolume,
  lastVolume,
  setValueSound,
  valueSound,
  valueSong,
  audioRef,
  progressSongRefMobile,
  progressSongRef,
  progressSoundRef,
  currentTime,
  handleSeek,
}: any) => {
  const handleSound = (value: number) => {
    const volume = value / 100;

    if (value > 0) {
      setLastVolume(value);
    }

    if (audioRef.current) {
      audioRef.current.volume = volume;
      setIsMute(volume == 0);
    }

    setValueSound(value);
  };

  const handleUnMute = () => {
    const restoredVolume = lastVolume || 100;
    const volume = restoredVolume / 100;
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }

    setIsMute(false);
    setValueSound(restoredVolume);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMute;
    }
  }, [isMute]);

  // Ui of song ranges
  useEffect(() => {
    const percent = (valueSong / 100) * 100;
    if (progressSongRef.current) {
      progressSongRef.current.style.width = `${percent}%`;
    }

    if (progressSongRefMobile.current) {
      progressSongRefMobile.current.style.width = `${percent}%`;
    }
  }, [valueSong]);

  // Ui of sound range
  useEffect(() => {
    const percent = (valueSound / 100) * 100;
    if (progressSoundRef.current && !isNaN(progressSongRef.current.volume)) {
      progressSoundRef.current.style.width = `${percent}%`;
    }
  }, [valueSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMute;
    }

    if (isPlay) {
      audioRef.current?.play().catch((err: Error) => {
        console.log(err.message);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlay, isMute, song]);

  const handleBoard = () => {
    if (isBoard) {
      setIsBoard(!isBoard);
    }
  };

  // For opening the song board
  const mobileClick = () => {
    if (window.innerWidth <= 760 && song) {
      setMobileSong(true);
      console.log("Mobile song board opened!");
    } else {
      setMobileSong(false);
    }
  };

  return (
    <div
      className="fixed w-full bottom-[70px] md:bottom-3 bg-[#8f364e] rounded-md md:bg-transparent 
      z-40"
    >
      <div className="relative flex flex-row items-center justify-between py-3 px-5">
        <div onClick={mobileClick} className="flex flex-row cursor-pointer">
          <div className="flex flex-row space-x-3 items-center">
            <div className="relative group hover:bg-black/60 w-fit">
              <img
                className="object-cover w-[45px] md:w-[80px] md:rounded-sm"
                src={
                  song
                    ? song.image_url
                    : "https://i.iheart.com/v3/url/aHR0cCUzQSUyRiUyRmltYWdlLmloZWFydC5jb20lMkZpaHItaW5nZXN0aW9uLXBpcGVsaW5lLXByb2R1Y3Rpb24ta2RtJTJGS0RNMjAyMzEyMTUxMjQwMjQlMkY4ODA5ODkwODg5NzMxJTJGcmVzb3VyY2VzJTJGMWU0NjFlOGFmZTI1MWE0YTNmOGVjYWVmN2JiNWExNGYuanBn?ops=fit(480,480)"
                }
                alt={song ? song.title : "song_lightr"}
              />
              {song && (
                <div
                  className="absolute top-0 right-0 text-white/70 opacity-0 group-hover:opacity-100
                    transition-opacity duration-200"
                >
                  <button
                    onClick={handleBoard}
                    className="hidden md:block bg-[#4b4b4b] rounded-full"
                  >
                    {isBoard ? (
                      <IoIosArrowDropup
                        size={30}
                        onClick={() => setIsBoard(false)}
                      />
                    ) : (
                      <IoIosArrowDropup
                        size={30}
                        className="rotate-180"
                        onClick={() => setIsBoard(true)}
                      />
                    )}
                  </button>
                </div>
              )}
            </div>
            <div className="-space-y-1 md:-space-y-0">
              <h2 className="text-white/70 font-bold">
                {song ? song.title : "..."}
              </h2>
              <p className="text-white/30">{song ? song.artist : "..."}</p>
            </div>
            <button className="hidden md:block font-bold text-2xl text-white/50">
              <IoMdAddCircleOutline />
            </button>
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
              className="md:bg-white md:p-3 md:rounded-full max-sm:translate-x-8 z-40"
            >
              {isPlay ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button>
              <MdSkipNext size={30} className="hidden md:block text-white/60" />
            </button>
          </div>
          {/* Song Range Large */}
          <div
            className="relative max-sm:absolute max-sm:bottom-[-18px] left-0 pb-3 
               max-sm:pointer-events-none w-full md:w-auto"
          >
            <h4 className="absolute left-[-40px] top-1 font-medium text-sm text-[#8f364e]">{`${Math.floor(
              currentTime / 60
            )}:${String(Math.floor(currentTime % 60)).padStart(2, "0")}`}</h4>
            <div className="hidden md:block">
              <SongRange
                className={`relative peer w-[650px] h-1 md:h-1.5 bg-gray-300 rounded-lg appearance-none
                  cursor-pointer thumb-on-hover`}
                handleSeek={handleSeek}
                valueSong={valueSong}
              />
              <div
                ref={progressSongRef}
                className="absolute top-[12px] h-1.5 bg-[#8f364e] rounded-lg pointer-events-none
                         transition-colors duration-300 peer-hover:block"
              ></div>
            </div>
            <div className="md:hidden">
              <div
                ref={progressSongRefMobile}
                className="absolute top-[14px] md:top-[12px] z-10 left-0 h-1 md:h-1.5 bg-white/50 
                    md:bg-[#8f364e] rounded-lg pointer-events-none transition-colors duration-300 peer-hover:block"
              ></div>
              <SongRangeInterface
                valueSong={valueSong}
                handleSeek={handleSeek}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:flex pr-10 space-x-2">
          <button className="text-white" onClick={() => setIsMute(!isMute)}>
            {isMute ? (
              <VscMute size={19} onClick={handleUnMute} />
            ) : (
              <VscUnmute size={19} onClick={() => handleSound(0)} />
            )}
          </button>
          <div className="relative flex flex-row items-center space-x-2">
            {/* Sound Range */}
            <input
              id="soundRange"
              max="100"
              min="0"
              onChange={(e) => handleSound(Number(e.target.value))}
              value={valueSound}
              type="range"
              className="hidden md:block w-[90px] h-1.5 bg-gray-300 rounded-lg appearance-none
                 cursor-pointer peer thumb-on-hover"
            />
            <div
              ref={progressSoundRef}
              className="absolute bottom-[7px] left-[-8px] h-1.5 bg-[#8f364e] rounded-lg pointer-events-none"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
