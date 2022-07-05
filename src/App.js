import { useMemo } from "react";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSolana from "./MainSolana";
import MainEVM from "./MainEVM";
import Home from "./Home";
import { Wallets } from "./components/wallet";

import { SnackbarProvider } from "notistack";

function App() {
  // I will try to start with new project
  // this project is so stressful
  return (
    <BrowserRouter>
      <Box>
        <SnackbarProvider>
          <Wallets>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/evm/:chain" element={<MainEVM />} />
              <Route path="/solana" element={<MainSolana />} />
            </Routes>
          </Wallets>
        </SnackbarProvider>
      </Box>
    </BrowserRouter>
  );
}

export default App;
