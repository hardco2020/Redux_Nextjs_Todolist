import { makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import Feed  from "./components/feed/Feed";
//import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Rightbar from "./components/rightbar/Rightbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Todo } from "./type";

export interface StyleProps{
    sidebarTextState:boolean
}
// mobile
//right bar overlap on feed
//left bar extend overlap  
// web
// left / feed / right
const useStyles = makeStyles<Theme,StyleProps>((theme:Theme)=>({
  wrapper:{
    display:"flex",
  },
  sidebar:{
    flex:(props)=>(props.sidebarTextState ? 0.5: 2), 
    [theme.breakpoints.down("sm")]:{
      position:"fixed",
      zIndex:20,
      width:(props)=>(props.sidebarTextState? "50%" : "20%") 
  }
  },
  feed:{
    flex:6,
    [theme.breakpoints.down("sm")]:{
      
      backgroundColor: (props)=>(props.sidebarTextState ? 'rgba(0,0,0,0.3)' : "white"),
    }
  },
  rightbar:{
    flex:3,
    height:"100vh",
    backgroundColor:"#f4f4f4",
    [theme.breakpoints.down("sm")]:{
      backgroundColor: (props)=>(props.sidebarTextState ? 'rgba(0,0,0,0.3)' : "#f4f4f4"),
      //opacity:(props)=>(props.sidebarTextState ? 0.4:1)
    }
  },
  right:{
    [theme.breakpoints.down("sm")]:{
      dispaly:"none"
    }
  },
  
}));
function App() {
  const [ sidebarTextState,setSidebarTextState] = useState<boolean>(false);
  const [ currentTodo, setCurrentTodo] = useState<Todo|null>(null);
  const classes = useStyles({sidebarTextState});
  //when true mean sidebar is wild 
  return (
    <>
     <Header />
          <div className={classes.wrapper}>
          <div className={classes.sidebar}>
          <Sidebar sidebarTextState={sidebarTextState} setSidebarTextState = {setSidebarTextState}/>
          </div>
          
          <div className={classes.feed}>
          <Feed setCurrentTodo = {setCurrentTodo}/>
          </div>
          <div className={classes.rightbar} style={{display: currentTodo ? "" : "none"}}>
          <Rightbar currentTodo={currentTodo}/>
          </div>
          </div>
      {/* <Header />
      <Grid container>
        <Grid item sm={sidebarTextState ? 1: 3} xs={sidebarTextState ? 6 : 3}>
          <Sidebar sidebarTextState={sidebarTextState} setSidebarTextState = {setSidebarTextState}/>
        </Grid>
        <Grid item sm={sidebarTextState ? 11 : 7} xs={sidebarTextState ? 3 : 6}>
          <Hidden smUp>
          <Feed/>
          </Hidden>
        </Grid>
        <Grid item sm={3} className={classes.right}>
          <Rightbar/>
        </Grid>
      </Grid> */}
    </>
  );
}

export default App;
