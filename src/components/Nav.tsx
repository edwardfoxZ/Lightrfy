import { useState } from "react";
import { useConnection } from "../hooks/setConnection";

export const Nav = () => {
  const { isConnected, address, disconnect, open } = useConnection();
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  const handleDisconnect = () => {
    if (isConnected) {
      setShowDisconnectConfirm(true);
    } else {
      open();
    }
  };

  const confirmDisconnect = () => {
    disconnect();
    setShowDisconnectConfirm(false);
  };

  const profileStatus = () => {
    if (address) {
      open();
    }
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="w-full flex flex-row md:justify-between items-center px-3 md:px-10 pt-2 text-white">
        <h3 className="hidden md:block"></h3>
        <div className="flex flex-row-reverse md:flex-row gap-2 items-center">
          <button onClick={handleDisconnect} className="text-xs md:text-lg">
            {isConnected ? "disconnect" : "connect"}
          </button>
          {address && <p className="text-xs">{address.slice(0, 6)}...</p>}
          <div className="w-[30px] md:w-[40px]">
            <img
              onClick={profileStatus}
              className="w-full h-full object-fill rounded-full cursor-pointer"
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="Profile"
            />
          </div>
        </div>
      </div>

      {/* Disconnect Confirmation Modal */}
      {showDisconnectConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="max-w-[260px] bg-[#3f3535]/50 rounded-xl backdrop-blur-xl p-6">
            <p className="text-white mb-4">
              Are you sure you want to disconnect?
            </p>
            <div className="flex gap-2 text-white">
              <button
                onClick={confirmDisconnect}
                className="px-4 py-2 bg-[#8f364e] rounded-lg"
              >
                Yes, Disconnect
              </button>
              <button
                onClick={() => setShowDisconnectConfirm(false)}
                className="px-4 py-2 bg-gray-500 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
