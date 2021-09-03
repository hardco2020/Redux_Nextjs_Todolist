
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";

// mobile
//right bar overlap on feed
//left bar extend overlap  
// web
// left / feed / right
function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/reload" component={null} key="reload" /> */}
        <Route exact path="/">
          <Home/>
        </Route>
        <Route  path="/list/:id">
          <Home/>
        </Route>
        {/* 應該要統一用id */}
        {/* <Route exact path="/">
          <Home category={"myday"}/>
        </Route>
        <Route exact path="/">
          <Home category={"myday"}/>
        </Route>  */}
        
      </Switch>
    </Router>
  );
}

export default App;
