import Library from "./Library";
import { Footer } from "./FooterMobile";
import { useState } from "react";
import { Search } from "./Search";

const Songs = () => {
  const [isSearchOpen, setIsSearchOpend] = useState(false);
  const [isLibraryOn, setIsLibraryOn] = useState(false);

  return (
    <div className="md:flex flex-row gap-3 w-full h-full md:p-3 pb-16 md:pb-32 pt-5">
      {/* library */}
      <Library isLibraryOn={isLibraryOn} setIsLibraryOn={setIsLibraryOn} />

      <div
        className="max-sm:max-w-[1260px] w-full h-full mx-auto bg-gray-950/20 backdrop-blur-lg 
                rounded-3xl p-10"
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
            <div
              className="absolute top-0 bg-transparent group-hover:bg-[#111111]/50 w-full h-full 
                    md:rounded-xl transition-colors duration-300"
            ></div>
            <img
              className="w-full h-full object-fill md:rounded-xl"
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
