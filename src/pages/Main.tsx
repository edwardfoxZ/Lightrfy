import visuallizer from "../assets/main/visualizer-unscreen.gif";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Main = () => {
  const [isJoin, setIsJoin] = useState(false);

  return (
    <div className="relative max-w-[1270px] h-[100vh] max-sm:p-16 md:p-5 mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={isJoin ? { opacity: 0, x: -100 } : { opacity: 1, x: 3 }}
        transition={{ duration: 0.3, ease: "backInOut" }}
        className="space-y-6 mt-40"
      >
        <h1 className="md:w-1/4 font-bold text-white">Time to recreate!</h1>
        <h2 className="text-xl md:text-4xl text-white">Join the waitlist</h2>
        <Link
          className="inline-flex text-white bg-[#8f364e] shadow-[0_0_15px_#8f364e] p-3 px-5
               rounded-xl font-bold hover:shadow-[0_0_0px_#8f364e] transition-shadow duration-300"
          onClick={() => setIsJoin(true)}
          to="/join-waitlist"
        >
          Join Now!
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={isJoin ? { opacity: 0, x: -100 } : { opacity: 1, x: 3 }}
        transition={{ duration: 0.3, ease: "backInOut" }}
        className="absolute top-[350px] left-[250px] md:left-[300px]"
      >
        <img
          src="https://i.postimg.cc/0QfsRY0V/headphone-Icon.png"
          alt="headphone_Icon"
          className="w-[120px] md:w-[200px]"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={isJoin ? { opacity: 0, x: -100 } : { opacity: 1, x: 3 }}
        transition={{ duration: 0.3, ease: "backInOut" }}
      >
        <img
          src={visuallizer}
          alt="visuallizer"
          className="w-[200px] md:w-[300px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={isJoin ? { opacity: 0, x: -100 } : { opacity: 1, x: 3 }}
        transition={{ duration: 0.3, ease: "backInOut" }}
        className="absolute md:w-[700px] bottom-0 right-0 z-[-1]"
      >
        <img
          src="https://i.postimg.cc/5y2MxXPb/man-in-plane-near-porthole-large.png"
          alt="main_P"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};
