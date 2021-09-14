
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cookies from 'js-cookie'
// import { useState } from "react";
import Signup from "./pages/Signup";
// mobile
//right bar overlap on feed
//left bar extend overlap  
// web
// left / feed / right
function App() {
  // const [ auth  , setAuth ] = useState<string|undefined>(Cookies.get('user'))
  axios.defaults.baseURL = 'http://localhost:3001';
  return (
    <Router>
      <Switch>
        {/* <Route path="/reload" component={null} key="reload" /> */}
        <Route exact path="/">
           <Login/> 
        </Route>
        <Route path="/signup">
           <Signup/>
          </Route>
        <Route  path="/list/:id">
         {Cookies.get('user')!==undefined ? <Home/> : <Login/>}
        </Route>
            </Switch>
    </Router>
  );
}

export default App;
