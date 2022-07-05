import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import Web3 from "web3";
import BEAN_FLIP_ABI from "../../../abi/CoffeeBeanFlip.json";
import { BEAN_FLIP_ADDRESS } from "../../../config";

import { styled } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import useWeb3Modal from "../../../hooks/useWeb3Modal";

const CardWrapper = styled(Card)({
  background: "rgb(255 252 248)",
  marginBottom: 24,
  border: "5px solid #555",
});

export default function Result({ chainId, referralAddr }) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { account } = useWeb3Modal();
  const BeanFlipContract = useMemo(() => {
    const web3 = new Web3(Web3.givenProvider);
    return new web3.eth.Contract(BEAN_FLIP_ABI, BEAN_FLIP_ADDRESS[chainId]);
  }, [chainId]);

  const [lastFlipRes, setLastFlipRes] = useState(0);
  const [lastFlipRate, setLastFlipRate] = useState(0);

  useEffect(() => {
    if (account && BeanFlipContract) {
      const addr = referralAddr === "" ? account : referralAddr;
      const getResult = async () => {
        const _lastFlipRes = await BeanFlipContract.methods
          .lastFlipRes(addr)
          .call();
        setLastFlipRes(+_lastFlipRes);
        const _lastFlipRate = await BeanFlipContract.methods
          .lastFlipRate(addr)
          .call();
        setLastFlipRate(+_lastFlipRate);
      };
      getResult();
    }
  }, [account, referralAddr, BeanFlipContract]);

  return (
    <CardWrapper sx={{ width: desktop ? "45%" : "95%" }}>
      <CardContent>
        <Box
          position="relative"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            outline: "black",
            border: "2px solid",
          }}
        >
          <Typography>Result:</Typography>
          <Typography>
            {lastFlipRes === 2 ? "win" : lastFlipRes === 1 ? "lose" : "miss"}
          </Typography>
        </Box>
        <Box sx={{ mt: "1rem" }}>
          <Box>
            <Button variant="contained" fullWidth className="custom-button">
              <Box sx={{ flexDirection: "column" }}>
                <Typography sx={{ textTransform: "uppercase" }}>
                  {lastFlipRate === 0
                    ? "NOTHING"
                    : lastFlipRate === 2
                    ? "DOUBLE"
                    : lastFlipRate === 4
                    ? "TRIPLE"
                    : "ULTRA"}
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
  );
}
