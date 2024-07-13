import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar.jsx"; 
import GetAllData from "./Screens/getAllData.jsx";
import SalesReport from "./Screens/saleReport.jsx";
import PopularItem from "./Screens/popularItem.jsx";
import RevenuePerMonth from "./Screens/revenuePerMonth.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<GetAllData />} />
        <Route path="/sales" element={<SalesReport />} />
        <Route path="/popularItem" element={<PopularItem />} />
        <Route path="/revenuePerMonth" element={<RevenuePerMonth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
