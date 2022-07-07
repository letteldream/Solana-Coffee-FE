import Box from "@mui/material/Box";
import ReactPlayer from "react-player";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { SolanaWallets } from "./components/SolanaWallets";
import { useContractContext } from "./providers/ContractProvider";
import bgVideo from "./assets/bg.mp4";
import { makeStyles } from "@mui/styles";

const routes = [
  { path: "/", component: lazy(() => import("./pages/Home")) },
  { path: "/evm/:chain", component: lazy(() => import("./pages/MainEVM")) },
  {
    path: "/solana",
    component: lazy(() => import("./pages/MainSolana")),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },

    objectFit: "cover",
  },
  // overlay: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   // bottom: 0,
  //   // height: "100%",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  // },
  // title: {
  //   paddingBottom: "20px",
  // },
});

function App() {
  const { isLoading, setIsLoading } = useContractContext();
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(false);
    }, 7000);
    return () => clearInterval(interval);
  }, [setIsLoading]);

  return (
    <BrowserRouter>
      {isLoading ? (
        <section className={classes.root}>
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100vh",
            }}
          >
            <ReactPlayer
              url={bgVideo}
              playing
              loop
              muted
              width="100%"
              height="100%"
            />
          </div>
        </section>
      ) : (
        <SnackbarProvider>
          <SolanaWallets>
            <Suspense fallback={<div />}>
              <Routes>
                {routes.map(({ component, path }, i) => {
                  const PageComponent = component;
                  return (
                    <Route key={i} path={path} element={<PageComponent />} />
                  );
                })}
                {/* <Route path="/" element={<Home />} />
            <Route path="/evm/:chain" element={<MainEVM />} />
            <Route path="/solana" element={<MainSolana />} /> */}
              </Routes>
            </Suspense>
          </SolanaWallets>
        </SnackbarProvider>
      )}
    </BrowserRouter>
  );
}

export default App;
