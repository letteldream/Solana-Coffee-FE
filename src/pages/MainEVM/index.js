import { styled, Box } from "@mui/system";
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import NutritionFacts from "./components/NutritionFacts";
import ReferralLink from "./components/ReferralLink";
import Footer from "./components/Footer";
import backgroundImg from "./assets/background.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Result from "./components/Result";
import { shortenAddress } from "../../utils";

const Wrapper = styled("div")(({ theme }) => ({
  position: "relative",
  maxWidth: 500,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const WalletButton = styled("div")(() => ({
  display: "flex",
  flexDirection: "row-reverse",
}));

export default function MainEVM() {
  //const { address } = useAuthContext();
  const { account, connectWallet, disconnect, switchNetwork, error, chainId } =
    useWeb3Modal();

  const { chain } = useParams();
  const [referralAddr, setReferralAddr] = useState("");
  const desktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (chain === "binance") {
      switchNetwork("0x61");
    } else if (chain === "ethereum") {
      switchNetwork("0x4");
    }
  }, [chain, switchNetwork]);

  return (
    <Box
      sx={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover" }}
    >
      <Wrapper>
        <WalletButton>
          {!account ? (
            <button
              style={{
                border: "5px solid black",
                borderRadius: "10px",
                fontWeight: 600,
                padding: "5px",
              }}
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <button
              style={{
                border: "5px solid black",
                borderRadius: "10px",
                fontWeight: 600,
                padding: "5px",
              }}
              onClick={disconnect}
            >
              {shortenAddress(account)}
            </button>
          )}
        </WalletButton>

        <Header token={chain === "binance" ? "BNB" : "ETH"} />
        <BakeCard
          token={chain === "binance" ? "BNB" : "ETH"}
          chainId={chain === "binance" ? 97 : 4}
          referralAddr={referralAddr}
        />
        <Box sx={{ display: desktop ? "flex" : "block" }}>
          <NutritionFacts />
          <Result
            chainId={chain === "binance" ? 97 : 4}
            referralAddr={referralAddr}
          />
        </Box>
        <ReferralLink
          token={chain === "binance" ? "BNB" : "ETH"}
          referralAddr={referralAddr}
          setReferralAddr={setReferralAddr}
        />
        <Footer chainId={chain === "binance" ? 97 : 4} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    </Box>
  );
}
