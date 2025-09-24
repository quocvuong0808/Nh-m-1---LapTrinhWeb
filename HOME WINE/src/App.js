import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import Contacts from "./pages/Contacts/Contacts";
import Compare from "./pages/Compare/Compare";
import CartContainer from "./components/CartContainer/CartContainer";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import MyAccount from "./pages/MyAccount/MyAccount";
import NavBar from "./components/NavBar/NavBar";
import Navigation from "./components/Navigation/Navigation";
import OTPInput from "./pages/OTPInput/OTPInput";
import PreLoader from "./components/PreLoader/PreLoader";
import Register from "./components/Register/Register";
import RecoveryEmail from "./pages/RecoveryEmail/RecoveryEmail";
import SubMenu from "./pages/SubMenu/SubMenu";
import Shop from "./pages/Shop/Shop";
import WineDetail from "./pages/WineDetail/WineDetail";
import WishList from "./pages/WishList/WishList";

import "react-toastify/dist/ReactToastify.css";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fakeData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };
    fakeData();
  }, []);
  return (
    <div className="App">
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/about" element={<About />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/contact" element={<Contacts />}></Route>
            <Route path="/compare" element={<Compare />}></Route>
            <Route path="/change" element={<ChangePassword />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/account" element={<MyAccount />}></Route>
            <Route path="/otp" element={<OTPInput />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/recovery-email" element={<RecoveryEmail />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/:id" element={<WineDetail />}></Route>
            <Route path="/wish-list" element={<WishList />}></Route>
          </Routes>
          <SubMenu />
          <CartContainer />
          <Footer />
          <Navigation />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
