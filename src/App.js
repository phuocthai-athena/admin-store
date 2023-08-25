import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Addproduct from "./pages/Addproduct";
import Productlist from "./pages/Productlist";
import Addbrand from "./pages/Addbrand";
import Brandlist from "./pages/Brandlist";
import Addcat from "./pages/Addcat";
import Categorylist from "./pages/Categorylist";
import Addcolor from "./pages/Addcolor";
import Colorlist from "./pages/Colorlist";
import Orders from "./pages/Orders";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";
import Addblog from "./pages/Addblog";
import Bloglist from "./pages/Bloglist";
import Addblogcat from "./pages/Addblogcat";
import Blogcatlist from "./pages/Blogcatlist";
import Enquiries from "./pages/Enquiries";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="list-coupon" element={<CouponList />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="enquiries" element={<Enquiries />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
