import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPg from "./components/LandingPage/landingPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import DetailPg from "./components/DetailPage/detail";
import CurrCart from "./components/CurrentCart/currentCart";
import UserPlaceList from "./components/PlacesToVisitPage/PlacesToVisitPage";
import ReviewByUserId from "./components/ReviewUserId/ReviewUserId";
import OrderHistoryByUserId from "./components/orderHistory/OrderHistory";
import UserInfoPage from "./components/userPage/UserPage";
import PayPg from "./components/paymentPg/payPg";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import './index.css'
import { getAllUsers } from "./store/users";
import Footer from "./components/Footer/footer";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate())
    dispatch(getAllUsers())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main-app">
      <div className="content-app">
        {isLoaded && location.pathname !='/user/payment' && <Navigation isLoaded={isLoaded} />}
        {isLoaded && (
          <Switch>
            <Route exact path="/login" >
              <LoginFormPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/">
              <LandingPg />
            </Route>
            <Route exact path="/place/:id">
              <DetailPg />
            </Route>
            <Route exact path='/user/cart'>
              <CurrCart />
            </Route>
            <Route exact path='/user/placeList'>
              <UserPlaceList />
            </Route>
            <Route exact path='/user/review'>
              <ReviewByUserId />
            </Route>
            <Route exact path='/user/orderHistory'>
              <OrderHistoryByUserId />
            </Route>
            <Route exact path='/user/userPage'>
              <UserInfoPage />
            </Route>
            <Route exact path='/user/payment'>
              <PayPg />
            </Route>
          </Switch>
        )}
      </div>
      {isLoaded && <Footer/>}
    </div>
  );
}

export default App;
