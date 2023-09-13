import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import BreweryList from "./components/BreweryList";
import BreweryDetails from "./components/BreweryDetails";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="container">
      <Header></Header>
      <Routes>
        <Route path="/" element={<BreweryList />} />
        <Route path="/:id" element={<BreweryDetails />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
