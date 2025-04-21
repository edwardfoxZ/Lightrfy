import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { VscUnmute, VscMute } from "react-icons/vsc";
import { IoMdAddCircleOutline } from "react-icons/io";

export const PlayerSong = ({
  isPlay,
  setIsPlay,
  isMute,
  setIsMute,
  song,
}: any) => {
  const [valueSong, setValueSong] = useState(60);
  const progressSongRef = useRef<HTMLDivElement>(null);

  const [valueSound, setValueSound] = useState(100);
  const progressSoundRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [_, setSound] = useState(0);
  const [lastVolume, setLastVolume] = useState(100);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Set ranges in useEffects
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const onLoadedMetaData = () => {
      setDuration(audio.duration);
    };

    const onTimeUpdata = () => {
      setCurrentTime(audio.currentTime);
      const percent = (audio.currentTime / audio.duration) * 100;
      setValueSong(percent || 0);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetaData);
    audio.addEventListener("timeupdate", onTimeUpdata);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetaData);
      audio.removeEventListener("timeupdate", onTimeUpdata);
    };
  }, [song]);

  const handleSeek = (value: number) => {
    if (audioRef.current && duration) {
      const seekTime = (value / 100) * duration;
      audioRef.current.currentTime = seekTime;
    }
    setValueSong(value);
  };

  useEffect(() => {
    if (audioRef.current) {
      setSound(audioRef.current.volume);
    }
  }, [valueSong]);

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

  // Ui of ranges
  useEffect(() => {
    const percent = (valueSong / 100) * 100;
    if (progressSongRef.current) {
      progressSongRef.current.style.width = `${percent}%`;
    }
  }, [valueSong]);

  useEffect(() => {
    const percent = (valueSound / 100) * 100;
    if (progressSoundRef.current) {
      progressSoundRef.current.style.width = `${percent}%`;
    }
  }, [valueSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMute;
    }

    if (isPlay) {
      audioRef.current?.play().catch((err) => {
        console.log(err.message);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlay, isMute, song]);

  return (
    <div className="fixed w-full bottom-[70px] md:bottom-3 bg-[#8f364e] rounded-md md:bg-transparent z-50">
      <div className="relative flex flex-row items-center justify-between py-3 px-5">
        <div className="flex flex-row">
          <div className="flex flex-row space-x-3 items-center">
            <img
              className="object-cover w-[45px] md:w-[80px] md:rounded-sm"
              src={
                song
                  ? song.image_url
                  : "https://i.iheart.com/v3/url/aHR0cCUzQSUyRiUyRmltYWdlLmloZWFydC5jb20lMkZpaHItaW5nZXN0aW9uLXBpcGVsaW5lLXByb2R1Y3Rpb24ta2RtJTJGS0RNMjAyMzEyMTUxMjQwMjQlMkY4ODA5ODkwODg5NzMxJTJGcmVzb3VyY2VzJTJGMWU0NjFlOGFmZTI1MWE0YTNmOGVjYWVmN2JiNWExNGYuanBn?ops=fit(480,480)"
              }
              alt={song ? song.title : "song_lightr"}
            />
            <audio
              ref={audioRef}
              src={song ? song.ipfs_url : undefined}
              preload="auto"
            />

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
              className="md:bg-white md:p-3 md:rounded-full max-sm:translate-x-8"
            >
              {isPlay ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button>
              <MdSkipNext size={30} className="hidden md:block text-white/60" />
            </button>
          </div>
          {/* Song Range Large */}
          <div
            className="relative hidden md:block max-sm:absolute max-sm:bottom-[-18px] left-1 pb-3 w-full  
              md:w-auto"
          >
            <h4 className="absolute left-[-40px] top-1 font-medium text-sm text-[#8f364e]">{`${Math.floor(
              currentTime / 60
            )}:${String(Math.floor(currentTime % 60)).padStart(2, "0")}`}</h4>
            <input
              id="musicRange"
              type="range"
              className="peer w-[650px] h-1.5 bg-[#c4647e] md:bg-gray-300 rounded-lg appearance-none
                 cursor-pointer thumb-on-hover"
              min="0"
              max="100"
              value={valueSong}
              onChange={(e) => handleSeek(Number(e.target.value))}
            />
            <div
              ref={progressSongRef}
              className="absolute bottom-[18px] left-0 h-1.5 bg-white/50 md:bg-[#8f364e] rounded-lg pointer-events-none 
                    transition-colors duration-300 peer-hover:block"
            ></div>
          </div>

          {/* Song Range Mobile */}
          <div
            className="relative md:hidden max-sm:absolute max-sm:bottom-[-18px] left-0 pb-3 w-full  
              pointer-events-none md:w-auto"
          >
            <h4 className="absolute left-[-40px] top-1 font-medium text-sm text-[#8f364e]">{`${Math.floor(
              currentTime / 60
            )}:${String(Math.floor(currentTime % 60)).padStart(2, "0")}`}</h4>
            <input
              id="musicRange"
              type="range"
              className="peer w-[650px] h-1 bg-[#c4647e] md:bg-gray-300 rounded-lg appearance-none
                 cursor-pointer thumb-on-hover"
              min="0"
              max="100"
              value={valueSong}
              onChange={(e) => handleSeek(Number(e.target.value))}
            />
            <div
              ref={progressSongRef}
              className="absolute bottom-[18px] left-0 h-1 bg-white/50 md:bg-[#8f364e] rounded-lg pointer-events-none 
                    transition-colors duration-300 peer-hover:block"
            ></div>
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
