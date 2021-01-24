import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import { About } from './components/About';
import { Home } from './components/Home';
import { AppNavBar } from "./components/AppNavBar";
import { Tracker } from "./components/Tracker";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from './services/UserContext';
import { UserModel } from "./services/models/UserModel";
import { TradeService } from "./services/TradeService";

function App() {

  const { user, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(new UserModel());
  
  const updateSettings = async () => {
    const settings = await new TradeService(userData.accessToken).GetAccountSettings();
    const newUser: UserModel = {name: userData.name, email: userData.email, accessToken: userData.accessToken, settings}
    setUserData(newUser)
  }
  
  useEffect(() => {
  const getUserMetadata = async () => {

    try {

      const accessTokenSnekTrade = await getAccessTokenSilently({
        audience: `https://snekst.com/trade`,
        scope: "openid profile email",
      });

      const settings = await new TradeService(accessTokenSnekTrade).GetAccountSettings();
      console.log(settings);

      const userModel: UserModel = {name: user.name, accessToken: accessTokenSnekTrade, email: user.email, settings: settings}
      setUserData(userModel);
    } catch (e) {
      console.log(e.message);
    }
  };

  if(user !== undefined) {
    getUserMetadata();
  }
}, [getAccessTokenSilently, setUserData, user]);

  return (
    <UserContext.Provider value={{userData, updateSettings}}>
      <Router>
        <AppNavBar/>
        <Switch>
          <Route path="/about">
            <About message="We super dope" />
          </Route>
          <Route path="/tracker">
           <Tracker />
          </Route>
          <Route path="/">
            <Home message="Dope Home" />
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
