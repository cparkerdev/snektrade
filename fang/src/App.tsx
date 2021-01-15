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
import {UserContext} from './services/UserContext';
import { UserModel } from "./services/models/UserModel";

function App() {

  const { user, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(new UserModel());

  
  useEffect(() => {
  const getUserMetadata = async () => {
    
    const domain = "snekst.us.auth0.com";

    try {
      /*
      const accessTokenMgmtApi = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });
      */
      console.log(domain);

      const accessTokenSnekTrade = await getAccessTokenSilently({
        audience: `https://snekst.com/trade`,
        scope: "openid profile email",
      });

      console.log(accessTokenSnekTrade);

      /*
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessTokenMgmtApi}`,
        },
      });

      const userData = await metadataResponse.json();
      console.log(userData);
      */

      const userModel: UserModel = {name: user.name, accessToken: accessTokenSnekTrade, email: user.email}
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
    <UserContext.Provider value={userData}>
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
