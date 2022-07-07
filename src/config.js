export const EthereumChainId = {
  MAINNET: 1,
  TESTNET: 4,
  HEX_MAINNET: '0x1',
  HEX_TESTNET: '0x4',
};

export const BinanceChainId = {
  MAINNET: 56,
  TESTNET: 97,
  HEX_MAINNET: '0x38',
  HEX_TESTNET: '0x61',
};

export const BEAN_FLIP_ADDRESS = {
  [EthereumChainId.MAINNET]: '',
  [EthereumChainId.TESTNET]: '0xd4A06eA515fd05433897725b7FEE34cfb5Cd4752',
  [BinanceChainId.MAINNET]: '',
  [BinanceChainId.TESTNET]: '0x05301A4BB47e73bB52571662a6a8e6Fe0eC74bEb',
};

export const SCAN_EXPLORER_URL = {
  [EthereumChainId.MAINNET]: 'https://etherscan.io/address/',
  [EthereumChainId.TESTNET]: 'https://rinkeby.etherscan.io/address/',
  [BinanceChainId.MAINNET]: 'https://bscscan.com/address/',
  [BinanceChainId.TESTNET]: 'https://testnet.bscscan.com/address/',
};
