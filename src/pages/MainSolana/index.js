import { flexbox, styled, Box } from "@mui/system";

import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import NutritionFacts from "./components/NutritionFacts";
import ReferralLink from "./components/ReferralLink";
import { useWallet } from "@solana/wallet-adapter-react";
import Footer from "./components/Footer";

import {
  WalletDialogProvider as MaterialUIWalletDialogProvider,
  WalletMultiButton as MaterialUIWalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import backgroundImg from "./assets/background.png";

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

export default function MainSolana() {
  //const { address } = useAuthContext();
  const wallet = useWallet();

  return (
    <Box
      sx={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "cover" }}
    >
      <Wrapper>
        <WalletButton>
          <MaterialUIWalletMultiButton
            variant="text"
            style={{
              border: "5px solid black",
              fontWeight: 900,
              background: "transparent",
              borderRadius: "10px",
              color: "black",
            }}
          />
        </WalletButton>
        <Header />
        <BakeCard />
        <NutritionFacts />
        <ReferralLink
          address={wallet.publicKey && wallet.publicKey.toBase58()}
        />
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
