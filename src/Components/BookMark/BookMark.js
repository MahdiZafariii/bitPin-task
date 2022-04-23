import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import "./bookMark.scss";

const BookMark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("bookMark");
    setBookmarks(JSON.parse(localStorageData));
  }, []);

  const bookMarkHandler = (id) => {
    let filtered = bookmarks.filter((market) => {
      return market.id !== id;
    });
    setBookmarks(filtered);
    localStorage.setItem("bookMark", JSON.stringify(filtered));
  };

  if (bookmarks.length == 0)
    return (
      <Layout>
        <section className="bookmark">
          <p>bookmarks not exist</p>
        </section>
      </Layout>
    );

  return (
    <Layout>
      <section className="bookmark">
        <div className="bookmarkHead">
          <span> </span>
          <span> تغییرات </span>
          <span>قیمت</span>
          <span>رمزارز</span>
          <span></span>
        </div>
        <div className="marketList">
          {bookmarks.map((market) => {
            return (
              <div className="market" key={market.id}>
                <button className="buyBtn">خرید</button>
                <Link to={`/market/${market.code}`}>
                  <p>{market.price_info.change}</p>
                  <p>
                    {market.price} {market.currency2.title}
                  </p>
                  {/* <div> */}
                  <div className="marketDesc">
                    <div>
                      <span>{market.currency1.title}</span>
                      <span>{market.currency1.title_fa}</span>
                    </div>
                    <img src={market.currency1.image} />
                  </div>
                </Link>
                <button
                  className="activeBookMark"
                  onClick={() => {
                    bookMarkHandler(market.id);
                  }}
                >
                  <BsFillBookmarkPlusFill className="bookmarkIcon" />
                </button>
              </div>
              // </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default BookMark;
