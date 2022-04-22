import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BookMark from "./Components/BookMark/BookMark";
import MarketDetail from "./Components/MarketDetail/MarketDetail";
import OverView from "./Components/OverView/OverView";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/market/:code" element={<MarketDetail />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/" element={<OverView />}>
            <Route path="/page/:pageNumber" element={<OverView />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
