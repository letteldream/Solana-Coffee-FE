import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const SolInput = styled("input")({
  fontSize: 24,
  fontWeight: 500,
  textAlign: "right",
  borderRadius: 0,
  border: 0,
  background: "transparent",
  width: "50%",
  outline: "none",
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
    MozAppearance: "textfield",
  },
});

export default function PriceInput({
  value,
  max,
  symbol,
  onChange = () => {},
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: "white",
        height: "50px",
        border: "1px solid black",
      }}
    >
      <SolInput
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Typography fontSize={24} fontWeight={500} color="black">
        {symbol}
      </Typography>
    </Box>
  );
}
