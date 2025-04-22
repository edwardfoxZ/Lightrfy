export const Nav = () => {
  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-row md:justify-between items-center px-3 md:px-10 pt-2 text-white">
        <h3 className="hidden md:block"></h3>
        <div className="flex flex-row-reverse md:flex-row gap-2 items-center">
          <p>connect</p>
          <div className="w-[30px] md:w-[40px]">
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
