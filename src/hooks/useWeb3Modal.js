import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { toHex } from "../utils";
import { ethers } from "ethers";

export const providerOptions = {
  "custom-metamask": {
    display: {
      name: "MetaMask",
      description: "Connect to your MetaMask Wallet",
      logo: "https://duckduckgo.com/i/b08b6e4c.png",
    },
    package: true,
    connector: async () => {
      if (window.ethereum === undefined) {
        window.open(
          "https://metamask.app.link/dapp/www.ethbox.org/app/",
          "_blank"
        );
        return;
      } else if (window.ethereum.providers !== undefined) {
        const providers = window.ethereum.providers;
        const provider = providers.find((p) => p.isMetaMask); // <-- LOOK HERE
        if (provider) {
          try {
            await provider.request({ method: "eth_requestAccounts" });
            return provider;
          } catch (error) {
            throw new Error("User Rejected");
          }
        } else {
          window.open(
            "https://metamask.app.link/dapp/www.ethbox.org/app/",
            "_blank"
          );
          return;
        }
      } else if (
        window.ethereum.providers === undefined &&
        window.ethereum.isMetaMask === true
      ) {
        const provider = window.ethereum;
        try {
          await provider.request({ method: "eth_requestAccounts" });
          return provider;
        } catch (error) {
          throw new Error("User Rejected");
        }
      } else {
        window.open(
          "https://metamask.app.link/dapp/www.ethbox.org/app/",
          "_blank"
        );
        return;
      }
    },
  },
  // walletlink: {
  //   package: CoinbaseWalletSDK, // Required
  //   options: {
  //     appName: "Web 3 Modal Demo", // Required
  //     infuraId: "https://mainnet.infura.io/v3/0f159be7aada4d6894c662d7694672c6", // Required unless you provide a JSON RPC url; see `rpc` below
  //   },
  // },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "https://mainnet.infura.io/v3/0f159be7aada4d6894c662d7694672c6", // required
    },
  },
};

const web3Modal = new Web3Modal({
  disableInjectedProvider: true,
  network: "mainnet",

  cacheProvider: true, // optional
  providerOptions, // required
});

export default function useWeb3Modal() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
      console.log("err", error);
    }
  };

  const switchNetwork = async (chainId) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(chainId) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          if (chainId === "0x4") {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: {
                chainId: chainId,
                chainName: "Rinkeby Test Network",
                rpcUrls: [
                  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                ],
                blockExplorerUrls: ["https://rinkeby.etherscan.io"],
              },
            });
          } else if (chainId === "0x96") {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: {
                chainId: chainId,
                chainName: "BSC Test Network",
                rpcUrls: [
                  "https://speedy-nodes-nyc.moralis.io/89b4f5c6d2fc13792dcaf416/bsc/testnet",
                ],
                blockExplorerUrls: ["https://testnet.bscscan.com"],
              },
            });
          }
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return {
    account,
    disconnect,
    connectWallet,
    switchNetwork,
    provider,
    library,
    chainId,
    error,
  };
}
