import Grid from '@mui/material/Grid';

import esIcon from '../assets/ESIcon.png';
import tgIcon from '../assets/TGIcon.png';
import twIcon from '../assets/TWIcon.png';
import dcIcon from '../assets/DCIcon.png';

import { BEAN_FLIP_ADDRESS, SCAN_EXPLORER_URL } from '../../../config';

export default function Footer({ chainId }) {
  const scanUrl = SCAN_EXPLORER_URL[chainId] + BEAN_FLIP_ADDRESS[chainId];

  return (
    <Grid container justifyContent="center" spacing={2} marginTop={4}>
      <Grid item>
        <a href={scanUrl} target="__blank">
          <img src={esIcon} alt="" width={48} height={48} />
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
