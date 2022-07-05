import fromExponential from "from-exponential";
import { getAddress } from "@ethersproject/address";

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export const trim = (number, precision = 2) => {
  const array = fromExponential(number).split(".");
  if (array.length === 1) return fromExponential(number);
  //@ts-ignore
  array.push(array.pop().substring(0, precision));
  const trimmedNumber = array.join(".");
  return trimmedNumber;
};

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export const shortenAddress = (address, chars = 4) => {
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
};
