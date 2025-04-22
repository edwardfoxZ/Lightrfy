import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  bscTestnet,
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Lightr Demo",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [
    bscTestnet,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(import.meta.env.VITE_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: false,
});
