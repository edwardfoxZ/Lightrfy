export const SongRange = ({ valueSong, handleSeek, className }: any) => {
  return (
    <>
      <input
        id="musicRange"
        type="range"
        className={className}
        min="0"
        max="100"
        value={valueSong}
        onChange={(e) => handleSeek(Number(e.target.value))}
      />
    </>
  );
};
