import { useEffect, useState } from "react";
import {
  // createHashHistory,
  createBrowserHistory,
  ReactLocation,
  Router,
  Route,
  Navigate,
} from "@tanstack/react-location";
import { css } from "@emotion/css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";

import Nav from "./Nav/Nav";
import Auth from "../pages/Auth/Auth";
import Template from "../pages/Template";
import BookmarkList from "../pages/BookmarkList/BookmarkList";
import Settings from "../pages/Settings/Settings";

import { useUserAuthenticated } from "../data/data.hooks";

import { getFlexed } from "../sharedStyles";

// const hashHistory = createHashHistory();
const hashHistory = createBrowserHistory();
const location = new ReactLocation({ history: hashHistory });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#18ffff",
    },
    secondary: {
      main: "#ffff00",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const authStyle = css({
  ...getFlexed(),
  justifyContent: "center",
  minHeight: "50vh",
});

const appStyle = css(getFlexed());

const routes: Route[] = [
  {
    path: "/",
    element: (
      <Template title="Bookmarks">
        <BookmarkList />
      </Template>
    ),
  },
  { element: <Navigate to="/" /> },
];

export default () => {
  const { authenticated, user } = useUserAuthenticated();
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const [showSettings, setShowSettings] = useState(false);
  useEffect(() => {
    if (!authenticated) setShowSettings(false);
  }, [authenticated]);

  // only show the routes when user is authenticated
  return (
    // <ThemeProvider theme={darkTheme}>
    // <ThemeProvider theme={lightTheme}>
    <ThemeProvider theme={prefersDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={authenticated ? appStyle : authStyle}>
        {authenticated ? (
          <Nav handleOpenSettings={() => setShowSettings(true)}>
            <>
              <Router location={location} routes={routes} />
              {showSettings && (
                <Settings visible={showSettings} setVisible={setShowSettings} />
              )}
            </>
          </Nav>
        ) : (
          <Auth />
        )}
      </div>
    </ThemeProvider>
  );
};
