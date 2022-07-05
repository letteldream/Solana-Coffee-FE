import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "rgb(255 252 248)",
  marginBottom: 24,
  border: "5px solid #555",
});

const nutritionFacts = [
  {
    label: "Daily Return",
    value: 8,
  },
  {
    label: "APR",
    value: "2,920",
  },
  {
    label: "Dev Fee",
    value: 3,
  },
];

export default function NutritionFacts() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  return (
    <CardWrapper sx={{ width: desktop ? "55%" : "95%" }}>
      <CardContent className="fact">
        <Typography variant="h5" borderBottom="6px solid" paddingBottom={1}>
          Caffeine Facts
        </Typography>

        <Box paddingTop={2}>
          {nutritionFacts.map((f) => (
            <Grid container key={f.label} justifyContent="space-between">
              <Typography variant="body1" gutterBottom>
                {f.label}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    borderTop: "1px dotted black",
                  }}
                ></div>
              </div>
              <Typography gutterBottom>{f.value}%</Typography>
            </Grid>
          ))}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
