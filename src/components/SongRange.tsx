export const SongRange = ({ valueSong, handleSeek }: any) => {
  return (
    <>
      <input
        id="musicRange"
        type="range"
        className="relative peer w-[650px] h-1 md:h-1.5 bg-gray-300 rounded-lg appearance-none
              cursor-pointer thumb-on-hover"
        min="0"
        max="100"
        value={valueSong}
        onChange={(e) => handleSeek(Number(e.target.value))}
      />
    </>
  );
};
