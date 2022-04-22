import axios from "axios";

export function getPriceChange(code, code2) {
  return axios.get(
    `https://api.bitpin.ir/v1/mkt/markets/charts/?code=${code}&code2=${code2}`
  );
}
