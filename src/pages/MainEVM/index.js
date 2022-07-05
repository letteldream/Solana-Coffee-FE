import { flexbox, styled, Box } from "@mui/system";
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
import Web3 from "web3";
import COFFEE_BEAN_FLIP_ABI from "../../abi/CoffeeBeanFlip.json";

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

  console.log("chain", chain);

  const tokenAddress = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3"; // SAFEMOON
  const web3 = new Web3(Web3.givenProvider);
  const tokenContract = new web3.eth.Contract(
    COFFEE_BEAN_FLIP_ABI,
    tokenAddress
  );
  const toAddress = "0x5A97e36aEF195CB7519fc8dfE77bB646AfA805b6";

  return (
    <Box
      sx={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover" }}
    >
      <Wrapper>
        <WalletButton>
          {!account ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <button onClick={disconnect}>Disconnect</button>
          )}
        </WalletButton>

        <Header />
        <BakeCard />
        <NutritionFacts />
        <ReferralLink address={account && account.toBase58()} />
        <Footer />
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
