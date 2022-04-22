import { useEffect, useState } from "react";
import { getAllMarkets } from "../../services/getAllMarkets";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import "./Home.scss";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [markets, setMarkets] = useState(null);
  const [error, setError] = useState(null);
  const [isToman, setToman] = useState(true);
  const params = useParams();
  const [bookMark, setBookMark] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    getAllMarkets()
      .then((res) => {
        const filter = res.data.results.filter((market) => {
          if (isToman === true) {
            return market.currency2.code === "IRT";
          } else {
            return market.currency2.title === "Tether";
          }
        });
        if (!params.pageNumber) {
          setMarkets(filter.slice(0, 5));
        } else {
          setMarkets(
            filter.slice(5 * [params.pageNumber - 1], 5 * params.pageNumber)
          );
        }
      })
      .catch((err) => {
        setError([err]);
      });
  };
  useEffect(() => {
    fetchData();
    const localStorageData = localStorage.getItem("bookMark");
    if (JSON.parse(localStorageData)) {
      setBookMark(JSON.parse(localStorageData));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [isToman, params.pageNumber]);

  const bookMarkHandler = (id) => {
    let isExist = bookMark.find((market) => {
      return market[0].id === id;
    });

    if (!isExist) {
      let filtered = markets.filter((market) => {
        return market.id === id;
      });
      let bookMarks = [...bookMark, filtered];
      setBookMark(bookMarks);
      localStorage.setItem("bookMark", JSON.stringify(bookMarks));
    } else {
      let filtered = bookMark.filter((market) => {
        return market[0].id !== id;
      });
      setBookMark(filtered);
      localStorage.setItem("bookMark", JSON.stringify(filtered));
    }
  };

  if (!markets && !error) {
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
    <section className="home">
      <div className="head">
        <div className="btnContainer">
          <button
            className={isToman ? "" : "activebtn"}
            onClick={() => {
              setToman(!isToman);
              navigate("/");
            }}
          >
            تتر
          </button>
          <button
            onClick={() => {
              setToman(!isToman);
              navigate("/");
            }}
            className={isToman ? "activebtn" : ""}
          >
            تومان
          </button>
        </div>
        <span> تغییرات </span>
        <span>قیمت</span>
        <span>رمزارز</span>
        <span> </span>
      </div>
      <div className="productList">
        {markets.map((market) => {
          console.log(market.code);
          return (
            <div className="product">
              <button className="buyBtn">خرید</button>
              <Link to={`/market/${market.code}`} key={market.id}>
                <div>
                  <p>{market.price_info.change}</p>
                  <p>{market.price}</p>
                  <div className="marketDesc">
                    <div>
                      <span>{market.currency1.title}</span>
                      <span>{market.currency1.title_fa}</span>
                    </div>
                    <img src={market.currency1.image} />
                  </div>
                </div>
              </Link>
              <button
                className={
                  bookMark.find((m) => m[0].id === market.id)
                    ? "activeBookMark"
                    : "bookmarkBtn"
                }
                onClick={() => {
                  bookMarkHandler(market.id);
                }}
              >
                <BsFillBookmarkPlusFill className="bookmarkIcon" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <Link to="/">1</Link>
        <Link to="/page/2">2</Link>
        <Link to="/page/3">3</Link>
        <Link to="/page/4">4</Link>
        <Link to="/page/5">5</Link>
        <Link to="/page/6">6</Link>
        <Link to="/page/7">7</Link>
        <Link to="/page/8">8</Link>
        <Link to="/page/9">9</Link>
        <Link to="/page/10">10</Link>
      </div>
    </section>
  );
};

export default Home;
