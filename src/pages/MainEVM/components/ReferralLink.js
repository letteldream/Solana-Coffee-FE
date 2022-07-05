import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";
import { Box, useMediaQuery } from "@mui/material";
import { isAddress } from "../../../utils";

const CardWrapper = styled(Card)({
  background: "transparent",
  border: "5px solid #555",
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 10,
  fontWeight: 300,
  padding: "10px 12px",
  borderRadius: 0,
  border: "1px solid #555",
  background: "white",
  width: "100%",
  outline: "none",
  color: theme.palette.primary.main,
}));

export default function ReferralLink({ referralAddr, setReferralAddr }) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  console.log("referralAddr", referralAddr);
  return (
    <Box sx={{ display: desktop ? "flex" : "block", justifyContent: "center" }}>
      <CardWrapper sx={{ width: desktop ? "55%" : "95%" }}>
        <CardContent style={{ paddingLeft: 8, paddingRight: 8 }}>
          <Typography gutterBottom variant="h5" textAlign="center">
            Referral Link
          </Typography>
          <Input
            value={referralAddr}
            onChange={(e) => setReferralAddr(e.target.value)}
          />
          <Typography
            textAlign="center"
            variant="body2"
            marginTop={2}
            paddingX={3}
            sx={{ color: "red" }}
          >
            {isAddress(referralAddr) === false ? "Not Valid Address" : ""}
          </Typography>

          <Typography
            textAlign="center"
            variant="body2"
            marginTop={2}
            paddingX={3}
          >
            Earn 12% of the SOL used to roast beans from anyone who uses your
            referral link
          </Typography>
        </CardContent>
      </CardWrapper>
    </Box>
  );
}
