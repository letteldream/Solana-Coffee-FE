import { useMemo } from "react";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSolana from "./MainSolana";
import MainEVM from "./MainEVM";
import Home from "./Home";
import { SolanaWallets } from "./components/SolanaWallets";

import { SnackbarProvider } from "notistack";

function App() {
  // I will try to start with new project
  // this project is so stressful
  return (
    <BrowserRouter>
      <Box>
        <SnackbarProvider>
          <SolanaWallets>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/evm/:chain" element={<MainEVM />} />
              <Route path="/solana" element={<MainSolana />} />
            </Routes>
          </SolanaWallets>
        </SnackbarProvider>
      </Box>
    </BrowserRouter>
  );
}

export default App;
