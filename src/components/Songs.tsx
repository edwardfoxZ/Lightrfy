import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Library from "./Library";
import { Footer } from "./Footer";

const Songs = () => {
  const [isSearchOpen, setIsSearchOpend] = useState(false);

  return (
    <div className="md:flex flex-row gap-1 w-full h-full">
      {/* library */}
      <Library />

      <div className="max-sm:max-w-[1260px] w-full h-full mx-auto bg-gray-950/20 backdrop-blur-lg rounded-3xl p-10">
        <div className="hidden max-sm:max-w-[560px] w-full md:flex flex-row-reverse justify-between">
          <button
            onClick={() => setIsSearchOpend(!isSearchOpen)}
            className={`bg-[#8f364e] text-white p-3 md:p-5 rounded-full 
                ${
                  isSearchOpen ? "w-full" : ""
                } transition-transform duration-500`}
          >
            <IoSearch size={20} className="" />
          </button>
        </div>

        <h1 className="max-sm:text-2xl text-5xl text-white font-bold mt-10">
          Popular
        </h1>
        <div className="flex flex-row overflow-hidden mt-10">
          <div
            className="relative cursor-pointer w-[130px] min-h-[130px] md:min-h-[230px] md:w-[230px]
                 bg-[#191515]/50 md:rounded-3xl group"
          >
            <div
              className="absolute top-0 bg-transparent group-hover:bg-[#111111]/50 w-full h-full 
                    md:rounded-3xl transition-colors duration-300"
            ></div>
            <img
              className="w-full h-full object-fill md:rounded-3xl"
              src="https://cdn.dribbble.com/userupload/7193851/file/original-568e704bac2a87138f4dd6b7213184c6.png?resize=752x&vertical=center"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Songs;
