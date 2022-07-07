import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { ethers } from 'ethers';
import BEAN_FLIP_ABI from '../../../abi/CoffeeBeanFlip.json';
import { BEAN_FLIP_ADDRESS } from '../../../config';

import { styled } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import useWeb3Modal from '../../../hooks/useWeb3Modal';

const CardWrapper = styled(Card)({
  background: 'rgb(255 252 248)',
  marginBottom: 24,
  border: '5px solid #555',
});

export default function Result({ chainId, referralAddr }) {
  const desktop = useMediaQuery('(min-width: 1024px)');
  const { account, library } = useWeb3Modal();
  const [loading, setLoading] = useState(false);

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
  const [lastFlipRes, setLastFlipRes] = useState(0);
  const [lastFlipRate, setLastFlipRate] = useState(0);

  const getResult = async () => {
    try {
      const _lastFlipRes = await BeanFlipContract.lastFlipRes(account);
      setLastFlipRes(+_lastFlipRes);
    } catch (_) {}

    try {
      const _lastFlipRate = await BeanFlipContract.lastFlipRate(account);
      setLastFlipRate(+_lastFlipRate);
    } catch (_) {}
  };

  useEffect(() => {
    if (account && BeanFlipContract) {
      getResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, BeanFlipContract]);

  const flipBeans = async () => {
    if (BeanFlipContract) {
      setLoading(true);

      try {
        const shot = lastFlipRate > 1 ? lastFlipRate : 2;
        await BeanFlipContract.flipBeans(shot);
      } catch (err) {
        console.log('err', err);
      }

      setLoading(false);
    }
  };

  return (
    <CardWrapper sx={{ width: desktop ? '45%' : '95%' }}>
      {loading && <LinearProgress color="secondary" />}
      <CardContent>
        <Box
          position="relative"
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            outline: 'black',
            border: '2px solid',
          }}
        >
          <Typography>Result:</Typography>
          <Typography>
            {lastFlipRes === 3
              ? 'win'
              : lastFlipRes === 2
              ? 'lose'
              : lastFlipRes === 1
              ? 'miss'
              : 'nothing'}
          </Typography>
        </Box>
        <Box sx={{ mt: '1rem' }}>
          <Box>
            <Button variant="contained" fullWidth className="custom-button">
              <Box sx={{ flexDirection: 'column' }}>
                <Typography sx={{ textTransform: 'uppercase' }}>
                  {lastFlipRate === 2
                    ? 'DOUBLE'
                    : lastFlipRate === 3
                    ? 'TRIPLE'
                    : lastFlipRate === 4
                    ? 'QUAD'
                    : 'NOTHING'}
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontSize: '16px', textAlign: 'center', mt: '1rem' }}
        >
          Select HEADS or TAILS to Flip
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            mt: '1rem',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              textTransform: 'uppercase',
              fontColor: 'Black',
            }}
            disabled={!account || loading}
            onClick={() => flipBeans()}
          >
            Heads
          </Button>
          <Typography variant="subtitle2">OR</Typography>
          <Button
            variant="outlined"
            sx={{ textTransform: 'uppercase', fontColor: 'Black' }}
            disabled={!account || loading}
            onClick={() => flipBeans()}
          >
            Tails
          </Button>
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
