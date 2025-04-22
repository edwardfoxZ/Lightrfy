import { IoMdAddCircleOutline } from "react-icons/io";

export const SongBoard = ({ image, name, artist }: any) => {
  return (
    <div className="max-w-[500px]">
      <h1 className="py-5 text-5xl">Popular</h1>
      <div className="w-[400px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="py-3 flex flex-row justify-between items-center">
        <div className="pl-3">
          <h1 className="text-3xl text-white">{name}</h1>
          <h3 className="text-white/50">{artist}</h3>
        </div>
        <div className="pr-3">
          <button className="text-white/50">
            <IoMdAddCircleOutline size={25}/>
          </button>
        </div>
      </div>
    </div>
  );
};
