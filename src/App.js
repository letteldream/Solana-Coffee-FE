import { useMemo } from "react";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewHome from "./NewHome";
import Home1 from "./Home1";
import { Wallets } from './components/wallet'

import { SnackbarProvider } from 'notistack';

function App() {

// I will try to start with new project
// this project is so stressful
  return (
    <BrowserRouter>
      <Box>
        <SnackbarProvider>
          <Wallets>
          <Routes>
            <Route path="/" element={<Home1 />} />
            <Route path="/oldHome" element={<Home />} />
            <Route path="/newHome" element={<NewHome />} />
          </Routes>
          </Wallets>
        </SnackbarProvider>
      </Box>
    </BrowserRouter>
  );
}

export default App;
