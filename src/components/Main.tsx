import mainP from "../assets/main/man-in-plane-near-porthole-large.png";
import headphoneIcon from "../assets/main/headphoneIcon.png"

export const Main = () => {
  return (
    <div className="relative max-w-[1270px] h-[100vh] max-sm:p-16 md:p-5 mx-auto overflow-hidden">
      <div className="text-white space-y-6 mt-40">
        <h1 className="md:w-1/4 font-bold">Time to recreate!</h1>
        <h2 className="text-xl md:text-4xl">Join the waitlist</h2>
        <button className="bg-[#8f364e] p-3 px-5 rounded-xl font-bold hover:shadow-[0_0_15px_#8f364e] transition-shadow duration-300">
          Join Now!
        </button>
      </div>

      <div className="absolute top-[350px] left-[250px] md:left-[300px]">
        <img src={headphoneIcon} alt="headphone_Icon" className="w-[120px] md:w-[200px]" />
      </div>

      <div className="absolute md:w-[700px] bottom-0 right-0 z-[-1]">
        <img src={mainP} alt="main_P" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
