import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";
import { abi } from "../hardhat/artifacts/contracts/PoliMilhas.sol/PoliMilhas.json";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../hardhat",
    }),
    react(),
  ],
});
