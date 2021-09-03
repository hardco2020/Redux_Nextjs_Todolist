import { makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import Feed  from "../components/feed/Feed";
//import Footer from "./components/footer/Footer";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

export interface homeProps{
    categoryId?:number
}
export interface StyleProps {
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
      // position:"fixed",
      flex:(props)=>(props.sidebarTextState ? "100%": 2), 
      // zIndex:20,
      // width:(props)=>(props.sidebarTextState? "50%" : "10%") 
  }
  },
  feed:{
    flex:6,
    overflow:"auto",
    height:"100vh",
    [theme.breakpoints.down("sm")]:{
      flex:8,
      backgroundColor: (props)=>(props.sidebarTextState ? 'rgba(0,0,0,0.3)' : "white"),
    }
  },
  rightbar:{
    flex:3,
    height:"100vh",
    overflow:"auto",
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
const Home: React.FC<homeProps> =({categoryId})=> {
  const [ sidebarTextState,setSidebarTextState] = useState<boolean>(false);
  const [ currentTodoId, setCurrentTodoId] = useState<number|null>(null);
  const [ searchQuery , setSearchQuery] = useState<string|null>(null);
  const classes = useStyles({sidebarTextState});
  //加入search控制在此處
  //when true mean sidebar is wild 
  return (
    <>
     <Header setSearchQuery={setSearchQuery}/>
          <div className={classes.wrapper}>
          <div className={classes.sidebar}>
          <Sidebar sidebarTextState={sidebarTextState} setSidebarTextState = {setSidebarTextState} setSearchQuery={setSearchQuery}/>
          </div>
          {/* 加入category來處理feed的顯示頁面 */}
          <div className={classes.feed}>
          <Feed setCurrentTodoId = {setCurrentTodoId} categoryId={categoryId} search={searchQuery}/>
          </div>
          {/* <div className={classes.rightbar} style={{display: currentTodoId ? "" : "none"}}>
          <Rightbar currentTodoId={currentTodoId}/>
          </div> */}
          </div>
     </>
  );
}

export default Home;
