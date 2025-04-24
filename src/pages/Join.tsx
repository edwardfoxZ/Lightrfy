import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaWallet } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import emailSubmission from "../assets/Join/emailSubmissoin.gif";
import { useConnection } from "../hooks/setConnection";

export const Join = () => {
  const [isEmailOpened, setIsEmailOpened] = useState(false);
  const { loading, open } = useConnection();

  return (
    <div className="max-w-[1270px] max-sm:px-10 py-32 mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: "backInOut",
            type: "spring",
          }}
          className="flex flex-col-reverse md:flex-row justify-between max-w-[1200px] bg-[#0d0d0d]/50 rounded-xl 
                backdrop-blur-md shadow-xl mx-auto"
        >
          <div className="md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.5,
                delay: 0.2,
                ease: "backInOut",
                type: "spring",
              }}
              className="font-bold pt-8 pl-10 text-4xl text-white md:text-5xl"
            >
              Join Waitlist
            </motion.h2>

            {isEmailOpened ? (
              <motion.div
                key="emailForm"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{
                  duration: 1.5,
                  delay: 0.2,
                  ease: "backInOut",
                  type: "spring",
                }}
                className="relative max-w-[700px] mx-auto grid grid-cols-1 md:mt-36 py-10"
              >
                <button
                  onClick={() => setIsEmailOpened(false)}
                  className="absolute text-white top-[-90px] md:top-1/2 left-[-25px] md:left-5 text-3xl"
                >
                  {"<"}
                </button>
                <div className="flex flex-col items-center">
                  <h3 className="text-start text-xl">Email</h3>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-2/3 p-2 rounded-lg md:text-xl text-black"
                  />
                  <button className="w-1/4 mx-auto mt-5 bg-[#ff8d5d] text-black py-2 md:px-6 rounded-lg font-bold">
                    Submit
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.2,
                  ease: "backInOut",
                  type: "spring",
                }}
                className="flex flex-col items-center space-y-5 md:mt-36 py-10"
              >
                <button
                  className="flex items-center justify-center gap-1 md:text-xl font-bold bg-white 
                    text-black py-2 w-2/3 rounded-xl"
                >
                  <FcGoogle
                    size={window.innerWidth <= 721 ? 20 : 25}
                    className="inline-block"
                  />
                  Google
                </button>
                <button
                  className="flex items-center justify-center gap-1 md:text-xl font-bold bg-black 
                    text-white py-2 w-2/3 rounded-xl"
                >
                  <FaApple
                    size={window.innerWidth <= 721 ? 20 : 25}
                    className="inline-block"
                  />
                  Apple
                </button>
                <button
                  onClick={() => open()}
                  className="flex items-center justify-center gap-1 md:text-xl font-bold bg-[#ff8d5d]
                     text-black py-2 w-2/3 rounded-xl"
                >
                  <FaWallet
                    size={window.innerWidth <= 721 ? 18 : 25}
                    className="inline-block"
                  />
                  Wallets
                </button>
                <button
                  onClick={() => setIsEmailOpened(true)}
                  className="flex items-center justify-center gap-1 md:text-xl font-bold bg-[#6c6c6c]
                    py-2 w-2/3 rounded-xl"
                >
                  <MdEmail
                    size={window.innerWidth <= 721 ? 18 : 25}
                    className="inline-block"
                  />
                  Email
                </button>
              </motion.div>
            )}
          </div>
          <div className="md:w-1/2 md:min-h-[700px]">
            <motion.img
              key={isEmailOpened ? "joinP" : "emailSubmission"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
              src={
                isEmailOpened
                  ? "https://i.postimg.cc/XYJX2J4M/winter-drive-large.jpg"
                  : emailSubmission
              }
              alt="join_P"
              className="w-full h-full object-cover max-sm:rounded-t-xl md:rounded-tr-xl md:rounded-br-xl"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};
