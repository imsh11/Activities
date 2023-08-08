import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPg from "./components/LandingPage/landingPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import DetailPg from "./components/DetailPage/detail";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
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
        </Switch>
      )}
    </>
  );
}

export default App;
