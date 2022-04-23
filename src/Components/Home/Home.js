import { useEffect, useState } from "react";
import { getAllMarkets } from "../../services/getAllMarkets";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import "./Home.scss";
import { Link, useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [markets, setMarkets] = useState([]);
  const [error, setError] = useState(null);
  const [isToman, setToman] = useState(true);
  const params = useParams();
  const [bookMark, setBookMark] = useState([]);
  const [pageData, setPageData] = useState([]);
  const navigate = useNavigate();

  const changePage = () => {
    if (!params.pageNumber) {
      setPageData(markets.slice(0, 5));
    } else {
      setPageData(
        markets.slice(5 * [params.pageNumber - 1], 5 * params.pageNumber)
      );
    }
  };

  const fetchData = () => {
    let filter;
    let localStorageBookmark;
    getAllMarkets()
      .then(async (res) => {
        const localStorageData = localStorage.getItem("bookMark");
        if (JSON.parse(localStorageData)) {
          localStorageBookmark = JSON.parse(localStorageData);
          setBookMark(localStorageBookmark);
        }
        filter = res.data.results.filter((market) => {
          if (isToman === true) {
            return market.currency2.code === "IRT";
          } else {
            return market.currency2.code === "USDT";
          }
        });
        if (
          localStorageBookmark &&
          localStorageBookmark.length >= 1 &&
          !params.pageNumber
        ) {
          const filteredData = filter.filter(
            (elem) => !bookMark.find(({ id }) => elem.id === id)
          );
          let localBookmark;
          if (isToman === true) {
            localBookmark = localStorageBookmark.filter(
              (item) => item.currency2.code === "IRT"
            );
          } else {
            localBookmark = localStorageBookmark.filter(
              (item) => item.currency2.code === "USDT"
            );
          }

          filteredData.unshift(...localBookmark);
          setMarkets(filteredData);
        } else {
          setMarkets(filter);
        }
        // setMarkets(filter);
      })
      .catch((err) => {
        setError([err]);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [isToman, bookMark.length]);
  useEffect(() => {
    changePage();
  }, [params.pageNumber, pageData]);

  const bookMarkHandler = (id) => {
    let isExist = bookMark.find((market) => {
      return market.id === id;
    });

    if (!isExist) {
      let filtered = pageData.filter((market) => {
        return market.id === id;
      });
      let bookMarks = [...bookMark, filtered[0]];
      setBookMark(bookMarks);
      localStorage.setItem("bookMark", JSON.stringify(bookMarks));
    } else {
      let filtered = bookMark.filter((market) => {
        return market.id !== id;
      });
      setBookMark(filtered);
      localStorage.setItem("bookMark", JSON.stringify(filtered));
    }
  };

  if (!markets.length && !pageData.length && !error) {
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
              setToman(false);
              navigate("/");
            }}
          >
            تتر
          </button>
          <button
            onClick={() => {
              setToman(true);
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
        {pageData.map((market, index) => {
          return (
            <div className="product" key={index}>
              <button className="buyBtn">خرید</button>
              <Link to={`/market/${market.code}`}>
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
                  bookMark.find((m) => m.id === market.id)
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
