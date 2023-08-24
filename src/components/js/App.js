import React, { useLayoutEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "../css/App.css";
import AppHeader from "./AppHeader";
import ChatBox from "./chatBox";
import LogIn from "./logIn";
import SideBox from "./sideBox";
import { useStateValue } from "./stateProvider";

function App() {
  const [{ user }] = useStateValue();

  function useWindowWidth() {
    const [width, setWidth] = useState(window.screen.width);
    useLayoutEffect(() => {
      function updateWidth() {
        setWidth(window.screen.width);
      }
      window.addEventListener("resize", updateWidth);
      updateWidth();
      return () => window.removeEventListener("resize", updateWidth);
    }, []);
    return width;
  }
  const width = useWindowWidth();

  return (
    <div className="app">
      <Router>
        {user ? (
          <>
            <AppHeader />
            <div className="app_body">
              <Switch>
                <Route path="/rooms/:roomId">
                  {width > 600 && <SideBox />}
                  <ChatBox />
                </Route>
                <Route path="/">
                  <SideBox />
                  {width > 600 && <ChatBox />}
                </Route>
              </Switch>
            </div>
          </>
        ) : (
          <LogIn />
        )}
      </Router>
    </div>
  );
}

export default App;
