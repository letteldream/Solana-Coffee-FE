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
import Web3 from "web3";
import BEAN_FLIP_ABI from "../../../abi/CoffeeBeanFlip.json";
import { BEAN_FLIP_ADDRESS } from "../../../config";
import { ethers } from "ethers";
import { trim } from "../../../utils";

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

  // Get contract
  const BeanFlipContract = useMemo(() => {
    const web3 = new Web3(Web3.givenProvider);
    return new web3.eth.Contract(BEAN_FLIP_ABI, BEAN_FLIP_ADDRESS[chainId]);
  }, [chainId]);
  // State Variable
  const [contractTokenBalance, setContractTokenBalance] = useState(0);
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [userBeanBalance, setUserBeanBalance] = useState(0);
  const [inputBeanValue, setInputBeanValue] = useState(0);
  const [userBeanReward, setUserBeanReward] = useState(0);

  useEffect(() => {
    if (account && library && BeanFlipContract) {
      const getInfo = async () => {
        // Get contract balance
        const _contractTokenBalance = await BeanFlipContract.methods
          .getBalance()
          .call();
        console.log("_contractTokenBalance", _contractTokenBalance);
        setContractTokenBalance(
          +ethers.utils.formatEther(_contractTokenBalance)
        );
        // Get user balance
        const _balance = await library.getBalance(account.toLowerCase());
        console.log("_balance", _balance);
        setUserTokenBalance(+ethers.utils.formatEther(_balance));
        // Get user balance
        const _beanBalance = await BeanFlipContract.methods
          .getMyBeans(account)
          .call();
        setUserBeanBalance(+_beanBalance);
        // Get user reward
        const _beanReward = await BeanFlipContract.methods
          .beanRewards(account)
          .call();
        setUserBeanReward(+_beanReward);
      };
      getInfo();
    }
  }, [account, library, BeanFlipContract]);

  const buyBeans = async () => {
    if (BeanFlipContract && inputBeanValue > 0) {
      const addr = referralAddr === "" ? account : referralAddr;
      try {
        setLoading(true);

        await BeanFlipContract.methods.buyBeans(addr).send({
          value: ethers.utils.parseEther(inputBeanValue),
          from: account,
        });
        setLoading(false);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  const roastBeans = async () => {
    if (BeanFlipContract) {
      const addr = referralAddr === "" ? account : referralAddr;
      try {
        setLoading(true);
        await BeanFlipContract.methods.roastBeans(addr).send({ from: account });

        setLoading(false);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  const sellBeans = async () => {
    if (BeanFlipContract) {
      try {
        setLoading(false);

        await BeanFlipContract.methods.sellBeans().send({ from: account });
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  const flipBeans = async (shot) => {
    if (BeanFlipContract) {
      try {
        setLoading(true);
        await BeanFlipContract.methods.flipBeans(shot).send({ from: account });

        setLoading(false);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  return (
    <Box fullWidth sx={{ display: desktop ? "flex" : "block" }}>
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
              {contractTokenBalance}
              {token}
            </Typography>
          </UnderlinedGrid>
          <UnderlinedGrid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1">account</Typography>
            <Typography variant="h5">
              {trim(userTokenBalance)}
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
            <Typography variant="h5">{userBeanBalance} BEANS</Typography>
          </UnderlinedGrid>
          <Box paddingTop={4} paddingBottom={3}>
            <Box>
              <PriceInput
                max={+userBeanBalance}
                value={inputBeanValue}
                onChange={(value) => setInputBeanValue(value)}
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
                variant="contained"
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
                {userBeanReward}
                Beans
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
      <CardWrapper sx={{ width: desktop ? "45%" : "95%" }}>
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
              {userBeanReward}
              Beans
            </Typography>
          </UnderlinedGrid>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", textAlign: "center", mt: "1rem" }}
          >
            2x your rewards with:
          </Typography>
          <Box>
            <Box>
              <Button
                variant="contained"
                fullWidth
                className="custom-button"
                disabled={!account || +userBeanBalance === 0 || loading}
                onClick={() => flipBeans(2)}
              >
                <Box sx={{ flexDirection: "column" }}>
                  <Typography>Double Shot</Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    50% change of winning
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", textAlign: "center", mt: "1rem" }}
          >
            3x your rewards with:
          </Typography>
          <Box>
            <Box>
              <Button
                variant="contained"
                fullWidth
                disabled={!account || +userBeanBalance === 0 || loading}
                onClick={() => flipBeans(3)}
                className="custom-button"
              >
                <Box sx={{ flexDirection: "column" }}>
                  <Typography>Triple Shot</Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    33% change of winning
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", textAlign: "center", mt: "1rem" }}
          >
            4x your rewards with:
          </Typography>
          <Box>
            <Box marginBottom={3}>
              <Button
                variant="contained"
                fullWidth
                className="custom-button"
                disabled={!account || +userBeanBalance === 0 || loading}
                onClick={() => flipBeans(3)}
              >
                <Box sx={{ flexDirection: "column" }}>
                  <Typography sx={{ textTransform: "uppercase" }}>
                    Quad Shot
                  </Typography>
                  <Typography
                    sx={{ fontSize: "10px", textTransform: "uppercase" }}
                  >
                    25% change of winning
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", textAlign: "center", mt: "1rem" }}
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
            >
              Heads
            </Button>
            <Typography variant="subtitle2">OR</Typography>
            <Button
              variant="outlined"
              sx={{ textTransform: "uppercase", fontColor: "Black" }}
            >
              Tails
            </Button>
          </Box>
        </CardContent>
      </CardWrapper>
    </Box>
  );
}
