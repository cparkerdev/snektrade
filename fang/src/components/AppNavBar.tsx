import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Button, Alignment, Intent, Position, Menu, Popover, MenuItem } from "@blueprintjs/core";
import React from "react";
import {useHistory} from "react-router-dom";
import "./AppNavBar.css"

export function AppNavBar() { 

  const { user, isAuthenticated, isLoading } = useAuth0();

  /*
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
      setUserMetadata(user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };

  if(user !== undefined) {
    getUserMetadata();
  }
}, [getAccessTokenSilently, setUserMetadata, user]);
*/


let history = useHistory();

function handlePosClick() {
  history.push("/tracker");
}

function handleHomeClick() {
  history.push("/home");
}

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if(!isAuthenticated) {
  return <Button intent={Intent.PRIMARY} onClick={() => loginWithRedirect()}>Log In / Sign Up</Button>;
  } else {
    return <div></div>
  }
};

const ProfileMenu = () => {
  const { logout } = useAuth0();
  return (<Menu>
     <MenuItem icon="log-out" text="Logout" onClick={() => logout({ returnTo: window.location.origin })} />
  </Menu>
  );
}

const Profile = () => {




  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if(isAuthenticated) {
  return (
    (
      <Popover content={<ProfileMenu/>} position={Position.BOTTOM}>
        <Button minimal={true}>
          <label style={{verticalAlign:"middle"}}>{user.name}</label>
          <img className="img-circle" src={user.picture} alt={user.name} />
        </Button>
      </Popover>
    )
  );
    } else {
      return <div></div>
    }
};


return (
<Navbar className="bp3-dark"  >
<Navbar.Group align={Alignment.LEFT}>
    <Navbar.Heading><Button className="bp3-minimal" icon="home" text="Snek St." onClick={handleHomeClick} /></Navbar.Heading>
    <Navbar.Divider />
    <Button className="bp3-minimal" icon="bank-account" text="Tracker" onClick={handlePosClick}  />
    <Navbar.Divider />
</Navbar.Group>
<Navbar.Group align={Alignment.RIGHT}>
<LoginButton/>
<Profile />
</Navbar.Group>
</Navbar>
);
}