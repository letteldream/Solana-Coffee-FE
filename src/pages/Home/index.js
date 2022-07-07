import { styled, Box } from "@mui/system";
import logo from "./assets/Logo.png";
import bnb from "./assets/BNB.png";
import eth from "./assets/Eth.png";
import sol from "./assets/SOL.png";
import ellipse from "./assets/Ellipse.png";
import discord from "./assets/Discord.png";
import twitter from "./assets/Twitter.png";
import telegram from "./assets/Telegram.png";
import instagram from "./assets/Instagram.png";
import backgroundImg from "./assets/background.png";
import { Grid, Typography, Link, useMediaQuery } from "@mui/material";
import "./index.css";
import React from "react";
const UnderlinedGrid = styled(Grid)(() => ({
  borderBottom: "3px solid white",
}));

export default function Home() {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <section style={{ width: "100%", height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: desktop ? "100vh" : "100%",
              backgroundImage: `url(${backgroundImg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              padding: "0px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <a
                href="https://discord.gg/pcQ9hdsBje"
                className="header-img"
                target="__blank"
              >
                <img src={discord} alt="" />
              </a>
              <a
                href="https://twitter.com/CoffeeBeanFlip"
                className="header-img"
                target="__blank"
              >
                <img src={twitter} alt="" />
              </a>
              <a
                href="https://t.me/coffeebeanflip"
                className="header-img"
                target="__blank"
              >
                <img src={telegram} alt="" />
              </a>
              <a
                href="https://t.me/coffeebeanflip"
                className="header-img"
                target="__blank"
              >
                <img src={instagram} alt="" />
              </a>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={logo} alt="" className="logo" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <UnderlinedGrid
                container
                justifyContent="center"
                width="100%"
                border="2px"
                mt={3}
              >
                <Typography variant="h5" fontSize="40px" color="#FFC104">
                  COFFEE BEAN
                </Typography>
                <Typography variant="h5" fontSize="40px" color="black">
                  &nbsp;&nbsp;FLIP
                </Typography>
              </UnderlinedGrid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                className="sub-title"
                textAlign="center"
                color="white"
                marginTop="10px"
              >
                SELECT YOUR COIN
                <br /> TO ENTER THE DAPP
              </Typography>
            </Box>
            {desktop ? (
              <Box className="card-box">
                <Box className="coin">
                  <Link href="/evm/binance">
                    <img src={bnb} alt="" width={"60%"} />
                  </Link>
                  <Typography width="60%" textAlign="center" color="white">
                    BNB
                  </Typography>
                </Box>

                <Box className="coin">
                  <Link href="/evm/ethereum">
                    <img src={eth} alt="" width={"60%"} />
                  </Link>
                  <Typography width="60%" textAlign="center" color="white">
                    ETHERUM
                  </Typography>
                </Box>
                <Box className="coin">
                  <Link href="/solana">
                    <img src={sol} alt="" width={"60%"} />
                  </Link>
                  <Typography width="60%" textAlign="center" color="white">
                    SOLANA
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box className="card-box">
                  <Box className="coin coin-card">
                    <Link href="/evm/binance">
                      <img
                        src={bnb}
                        alt=""
                        width={"60%"}
                        className="img-location"
                      />
                    </Link>
                    <Typography width="100%" textAlign="center" color="white">
                      BNB
                    </Typography>
                  </Box>

                  <Box className="coin coin-card">
                    <Link href="/evm/ethereum">
                      <img
                        src={eth}
                        alt=""
                        width={"60%"}
                        className="img-location"
                      />
                    </Link>
                    <Typography width="100%" textAlign="center" color="white">
                      ETHERUM
                    </Typography>
                  </Box>
                </Box>
                <Box className="card-box">
                  <Box className="coin coin-card">
                    <Link href="/solana">
                      <img
                        src={sol}
                        alt=""
                        width={"60%"}
                        className="img-location"
                      />
                    </Link>
                    <Typography width="100%" textAlign="center" color="white">
                      SOLANA
                    </Typography>
                  </Box>
                  <Box className="coin coin-card">
                    <Link href="#">
                      <img
                        src={ellipse}
                        alt=""
                        width={"60%"}
                        className="img-location"
                      />
                    </Link>
                    <Typography width="100%" textAlign="center" color="white">
                      COMING SOON
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </div>
      </section>
    </>
  );
}
