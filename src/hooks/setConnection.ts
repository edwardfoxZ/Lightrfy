import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useConnection = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [loading, setLoading] = useState(false);
  const { disconnect } = useDisconnect();

  const navigate = useNavigate();

  useEffect(() => {
    const connection = async () => {
      if (isConnected) {
        setLoading(true);
        console.log("Connected to: ", address);
        navigate("/lightr-songs-user");
        setLoading(false);
      } else {
        console.log("disconnected");
        navigate("/join-waitlist");
      }
    };

    connection();
  }, [isConnected, navigate]);

  return { isConnected, address, loading, open, disconnect };
};
