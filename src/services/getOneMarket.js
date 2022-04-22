import axios from "axios";

export function getOneMarkets(code, code2) {
  return axios.get(
    `https://api.bitpin.ir/v1/mkt/markets/?code=${code}&code2=${code2}`
  );
}
