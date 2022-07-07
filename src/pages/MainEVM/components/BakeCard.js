import ReactPlayer from "react-player";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import useWeb3Modal from "../../../hooks/useWeb3Modal";
import PriceInput from "../../../components/PriceInput";
import { useEffect, useMemo, useState } from "react";
import BEAN_FLIP_ABI from "../../../abi/CoffeeBeanFlip.json";
import { BEAN_FLIP_ADDRESS } from "../../../config";
import { ethers } from "ethers";
import { trim, isAddress } from "../../../utils";
import bgVideo from "../../../assets/bg.mp4";
import { useContractContext } from "../../../providers/ContractProvider";

const CardWrapper = styled(Card)({
  background: "transparent",
  marginBottom: 24,
  border: "5px solid #555",
});

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

const UnderlinedGrid = styled(Grid)(() => ({
  borderBottom: "1px solid black",
}));

export default function BakeCard({ token, chainId, referralAddr }) {
  const { account, library } = useWeb3Modal();
  const [loading, setLoading] = useState(false);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { setIsLoading } = useContractContext();

  // Get contract
  const BeanFlipContract = useMemo(() => {
    const address = BEAN_FLIP_ADDRESS[chainId];
    const contract = new ethers.Contract(address, BEAN_FLIP_ABI, library);
    if (account) {
      const signer = library.getSigner();
      return contract.connect(signer);
    } else {
      return contract;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  // State Variable
  const [contractTokenBalance, setContractTokenBalance] = useState(0);
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [userBeanBalance, setUserBeanBalance] = useState(0);
  const [inputBeanValue, setInputBeanValue] = useState("0");
  const [userBeanReward, setUserBeanReward] = useState(0);
  const [shot, setShot] = useState(0);

  const getInfo = async () => {
    // Get contract balance
    try {
      const _contractTokenBalance = await BeanFlipContract.getBalance();
      setContractTokenBalance(
        +(+ethers.utils.formatEther(_contractTokenBalance)).toFixed(5)
      );
    } catch (_) {}

    // Get user balance
    try {
      const _balance = await library.getBalance(account);
      setUserTokenBalance(+(+ethers.utils.formatEther(_balance)).toFixed(5));
    } catch (_) {}

    // Get user bean balance
    try {
      const _beanBalance = await BeanFlipContract.getMyBeans(account);
      setUserBeanBalance(+_beanBalance);
    } catch (_) {}

    // Get user reward
    try {
      const _beanReward = await BeanFlipContract.beanRewards(account);
      setUserBeanReward(+(+ethers.utils.formatEther(_beanReward)).toFixed(5));
    } catch (_) {}
  };

  useEffect(() => {
    if (account && library && BeanFlipContract) {
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library, BeanFlipContract]);

  const buyBeans = async () => {
    const beanValue = ethers.utils.parseEther(inputBeanValue.toString());
    if (BeanFlipContract && beanValue.gt(0)) {
      setLoading(true);

      try {
        const addr = isAddress(referralAddr) ? referralAddr : account;
        await BeanFlipContract.buyBeans(addr, {
          value: beanValue,
          from: account,
        });

        await getInfo();

        setInputBeanValue("0");
      } catch (err) {
        console.log("err", err);
      }

      setLoading(false);
    }
  };

  const roastBeans = async () => {
    if (BeanFlipContract) {
      setLoading(true);

      try {
        const addr = isAddress(referralAddr) ? referralAddr : account;

        await BeanFlipContract.roastBeans(addr);

        await getInfo();
      } catch (err) {
        console.log("err", err);
      }

      setLoading(false);
    }
  };

  const sellBeans = async () => {
    if (BeanFlipContract) {
      setLoading(true);

      try {
        await BeanFlipContract.sellBeans();

        await getInfo();
      } catch (err) {
        console.log("err", err);
      }

      setLoading(false);
    }
  };

  const flipBeans = async () => {
    if (BeanFlipContract && shot > 1) {
      // setLoading(true);
      setIsLoading(true);
      try {
        await BeanFlipContract.flipBeans(shot);

        await getInfo();
      } catch (err) {
        console.log("err", err);
      }
      setIsLoading(false);
      // setLoading(false);
    }

    setShot(0);
  };

  return (
    <Box fullWidth sx={{ display: desktop ? "flex" : "block" }}>
      {/* <ReactPlayer url={bgVideo} playing muted width="100%" height="100%" /> */}
      <CardWrapper sx={{ width: desktop ? "55%" : "95%" }}>
        {loading && <LinearProgress color="secondary" />}
        <CardContent>
          <UnderlinedGrid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1">Contract</Typography>
            <Typography variant="h5">
              {contractTokenBalance} &nbsp;
              {token}
            </Typography>
          </UnderlinedGrid>
          <UnderlinedGrid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1">Account</Typography>
            <Typography variant="h5">
              {trim(userTokenBalance)} &nbsp;
              {token}
            </Typography>
          </UnderlinedGrid>
          <UnderlinedGrid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1">Your Beans</Typography>
            <Typography variant="h5">{userBeanBalance} &nbsp; BEANS</Typography>
          </UnderlinedGrid>
          <Box paddingTop={4} paddingBottom={3}>
            <Box>
              <PriceInput
                max={+userBeanBalance}
                value={inputBeanValue}
                symbol={token}
                onChange={(value) => {
                  if (value === "") {
                    setInputBeanValue("0");
                  } else if (value.indexOf(".") === -1) {
                    setInputBeanValue(parseFloat(value).toString());
                  } else {
                    setInputBeanValue(value);
                  }
                }}
              />
            </Box>

            {/* <Box marginTop={3} marginBottom={3}>
              <Button
                variant="contained"
                fullWidth
                // onClick={initializeProgram}
                hidden
                className="custom-button"
              >
                Init
              </Button>
            </Box> */}

            <Box marginTop={3} marginBottom={3}>
              <Button
                fullWidth
                disabled={!account || +userTokenBalance === 0 || loading}
                onClick={() => buyBeans()}
                className="custom-button"
              >
                BUY BEANS
              </Button>
            </Box>
            <Divider />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={3}
            >
              <Typography variant="body1" fontWeight="bolder">
                Your Rewards
              </Typography>
              <Typography variant="h5" fontWeight="bolder">
                {userBeanReward} &nbsp; {token}
              </Typography>
            </Grid>
            <ButtonContainer container sx={{ display: "flex" }}>
              <Grid item flexGrow={1} marginRight={1} marginTop={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  disabled={!account || loading}
                  onClick={() => roastBeans()}
                  className="custom-button"
                >
                  ROAST BEANS
                </Button>
              </Grid>
              <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  disabled={!account || loading}
                  onClick={() => sellBeans()}
                  className="custom-button"
                >
                  SELL BEANS
                </Button>
              </Grid>
            </ButtonContainer>
          </Box>
        </CardContent>
      </CardWrapper>
      <CardWrapper
        sx={{
          width: desktop ? "45%" : "95%",
          background: "rgb(255 252 248) !important",
        }}
      >
        {loading && <LinearProgress color="secondary" />}
        <CardContent>
          <UnderlinedGrid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1">Your Rewards</Typography>
            <Typography variant="h5">
              {userBeanReward} &nbsp; {token}
            </Typography>
          </UnderlinedGrid>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", textAlign: "center", mt: "1rem" }}
          >
            2x your rewards with:
          </Typography>
          <Box>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ flexDirection: "column" }}
                className={`custom-button ${
                  shot === 2 && "custom-button--active"
                }`}
                disabled={!account || +userBeanBalance === 0 || loading}
                onClick={() => setShot(2)}
              >
                Double Shot
                <Typography sx={{ fontSize: "14px" }}>
                  50% CHANCE OF WINNING
                </Typography>
              </Button>
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", textAlign: "center", mt: "1rem" }}
          >
            3x your rewards with:
          </Typography>
          <Box>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ flexDirection: "column" }}
                className={`custom-button ${
                  shot === 3 && "custom-button--active"
                }`}
                disabled={!account || +userBeanBalance === 0 || loading}
                onClick={() => setShot(3)}
              >
                Triple Shot
                <Typography sx={{ fontSize: "14px" }}>
                  33% CHANCE OF WINNING
                </Typography>
              </Button>
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", textAlign: "center", mt: "1rem" }}
          >
            4x your rewards with:
          </Typography>
          <Box>
            <Box marginBottom={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ flexDirection: "column" }}
                className={`custom-button ${
                  shot === 4 && "custom-button--active"
                }`}
                disabled={!account || +userBeanBalance === 0 || loading}
                onClick={() => setShot(4)}
              >
                Quad Shot
                <Typography sx={{ fontSize: "14px" }}>
                  25% CHANCE OF WINNING
                </Typography>
              </Button>
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{ fontSize: "18px", textAlign: "center" }}
          >
            Select HEADS or TAILS to Flip
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              mt: "1rem",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                textTransform: "uppercase",
                fontColor: "Black",
              }}
              disabled={!account || loading}
              onClick={() => flipBeans()}
            >
              Heads
            </Button>
            <Typography variant="body2">OR</Typography>
            <Button
              variant="outlined"
              sx={{ textTransform: "uppercase", fontColor: "Black" }}
              disabled={!account || loading}
              onClick={() => flipBeans()}
            >
              Tails
            </Button>
          </Box>
        </CardContent>
      </CardWrapper>
    </Box>
  );
}
