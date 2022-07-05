import Typography from "@mui/material/Typography";
import { styled, Box } from "@mui/system";
import logo from "../../../assets/FullLogo.png";
import { Grid } from "@mui/material";
const UnderlinedGrid = styled(Grid)(() => ({
  borderBottom: "1px solid black",
}));
const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));

export default function Header({ token }) {
  return (
    <Wrapper>
      <img src={logo} alt="" width={"20%"} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <UnderlinedGrid
          container
          justifyContent="center"
          width="40%"
          border="2px"
          mt={3}
        >
          <Typography variant="h5" fontSize="30px" color="#FFC104">
            COFFEE BEAN
          </Typography>
          <Typography variant="h5" fontSize="30px" color="black">
            &nbsp;&nbsp;FLIP
          </Typography>
        </UnderlinedGrid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <UnderlinedGrid
          container
          justifyContent="center"
          width="50%"
          textdecorationcolor="#FFC104"
          mt={3}
        >
          <Typography variant="h5" fontSize="15px" color="#FFC104">
            ***NOW WITH DOUBLE, TRIPLE AND QUAD SHOTS***
          </Typography>
        </UnderlinedGrid>
      </Box>
      <Typography variant="h7" fontSize="15px" sx={{ mt: "3rem" }}>
        <b style={{ marginTop: "10px" }}>
          The {token} reward pool with the richest daily return and lowest dev
          fee
        </b>
      </Typography>
    </Wrapper>
  );
}
