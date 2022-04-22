import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Home from "../Home/Home";

const OverView = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default OverView;
