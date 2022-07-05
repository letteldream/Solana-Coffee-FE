import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SnackbarProvider } from "notistack";
import { SolanaWallets } from "./components/SolanaWallets";

const routes = [
  { path: "/", component: lazy(() => import("./pages/Home")) },
  { path: "/evm/:chain", component: lazy(() => import("./pages/MainEVM")) },
  {
    path: "/solana",
    component: lazy(() => import("./pages/MainSolana")),
  },
];

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <SolanaWallets>
        <Suspense fallback={<div />}>
          <Routes>
            {routes.map(({ component, path }, i) => {
              const PageComponent = component;
              return <Route key={i} path={path} element={<PageComponent />} />;
            })}
            {/* <Route path="/" element={<Home />} />
              <Route path="/evm/:chain" element={<MainEVM />} />
              <Route path="/solana" element={<MainSolana />} /> */}
          </Routes>
        </Suspense>
        </SolanaWallets>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
