export const SongRange = ({
  valueSong,
  handleSeek,
  className,
}: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      handleSeek(value);
    }
  };

  return (
    <>
      <input
        id="musicRange"
        type="range"
        className={className}
        min="0"
        max="100"
        value={valueSong || 0}
        onChange={handleChange}
      />
    </>
  );
};
