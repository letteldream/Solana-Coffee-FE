import Grid from "@mui/material/Grid";

import solIcon from "../assets/SOLIcon.png";
import tgIcon from "../assets/TGIcon.png";
import twIcon from "../assets/TWIcon.png";
import dcIcon from "../assets/DCIcon.png";

export default function Footer({ chain }) {
  const scanUrl =
    chain === "binance"
      ? "https://testnet.bscscan.com/address/0xE30418312b8CA62750d1f6a19EdE067C3B72EED9"
      : "https://rinkeby.etherscan.io/address/0x51336d82011353d57C7033463c45aD1C5890C01E";
  return (
    <Grid container justifyContent="center" spacing={2} marginTop={4}>
      <Grid item>
        <a href={scanUrl} target="__blank">
          <img src={solIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://twitter.com/CoffeeBeanFlip" target="__blank">
          <img src={twIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://t.me/coffeebeanflip" target="__blank">
          <img src={tgIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://discord.gg/pcQ9hdsBje" target="__blank">
          <img src={dcIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
    </Grid>
  );
}
