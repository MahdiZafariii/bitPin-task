import axios from "axios";

export function getAllMarkets() {
  return axios.get("https://api.bitpin.ir/v1/mkt/markets");
}
