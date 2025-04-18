export const Nav = () => {
  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-row-reverse md:flex-row md:justify-between items-center px-3 md:px-10 pt-2 text-white">
        <h3 className="hidden md:block">
            
        </h3>
        <div className="flex flex-row items-center space-x-2">
          <p>connect</p>
          <div className="w-[30px] md:w-[50px]">
            <img
              className="w-full h-full object-fill rounded-full"
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
