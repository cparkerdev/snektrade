import React from "react";
import { UserModel } from "./models/UserModel";


export const UserContext = React.createContext(new UserModel()); // Create a context object

/*
  const { user, getAccessTokenSilently } = useAuth0();

useEffect(() => {
    const getUserMetadata = async () => {
      
      const domain = "snekst.us.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const {user_metadata} = await metadataResponse.json();
        // setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    if(user !== undefined) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, user]);

  */