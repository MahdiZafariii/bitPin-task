import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getOneMarkets } from "../../services/getOneMarket";
import "./marketDetail.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceChange } from "../../services/getPriceChange";

const MarketDetail = () => {
  const params = useParams();
  const [market, setMarket] = useState(null);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [lastTransAction, setLastTransAction] = useState([
    {
      title: "خرید 10",
    },
    {
      title: "خرید 0.25",
    },
    {
      title: "خرید 0.142",
    },
    {
      title: "خرید 0.24566",
    },
    {
      title: "خرید 0.165",
    },
    {
      title: "خرید 0.22246",
    },
    {
      title: "خرید 6",
    },
    {
      title: "خرید 0.32148",
    },
  ]);

  let code1 = params.code.split("_")[0];
  let code2 = params.code.split("_")[1];

  useEffect(() => {
    getOneMarkets(code1, code2)
      .then((res) => {
        setMarket(res.data.results[0]);
      })
      .catch((err) => {
        setError(err);
      });
    getPriceChange(code1, code2)
      .then((res) => {
        setChartData(res.data.results[0].chart);
      })
      .catch((err) => {
        setError(...error, err);
      });
  }, []);

  const convertedData = chartData.map((data) => {
    const timestamp = data.created_at * 1000;
    const humanReadableDateTime = new Date(timestamp).toLocaleString();
    let hour = humanReadableDateTime.split(",")[1];
    return {
      price: data.price,
      date: hour,
    };
  });

  let uniqueData = convertedData.reduceRight((acc, current) => {
    const x = acc.find((item) => item.date === current.date);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  const reverseUniqueData = uniqueData.reverse();

  if (!market || !chartData.length || !uniqueData.length) {
    return (
      <section className="home">
        <p>Loading ...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="home">
        <p>{error[0].message}</p>
      </section>
    );
  }
  return (
    <Layout>
      <section className="marketInfo">
        <div className="contentMarket">
          <div className="priceInfo">
            <span>قیمت : {market.price}</span>
            <span>بیشترین در روز : {market.price_info.max}</span>
            <span>کمترین در روز : {market.price_info.min}</span>
          </div>
          <div className="titleInfo">
            <div>
              <span>{market.currency1.title}</span>
              <span>{market.currency1.title_fa}</span>
            </div>
            <img src={market.currency1.image} />
          </div>
        </div>
        <section className="chart">
          <ResponsiveContainer width="90%" height="70%">
            <LineChart
              width={1100}
              height={300}
              data={reverseUniqueData}
              margin={{
                top: 25,
                right: 30,
                left: 50,
                bottom: 5,
              }}
            >
              <Tooltip />
              <XAxis dataKey="date" />
              <YAxis dataKey="price" type="category" />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </section>
        <div className="lastTransAction">
          {lastTransAction.map((transAction) => (
            <p>
              {transAction.title} {market.currency1.title_fa}
            </p>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default MarketDetail;
