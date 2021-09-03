import {
  Container,
  Typography,
  Theme,
  makeStyles,
  createStyles,
  Divider,
  TextField
} from "@material-ui/core";
import {
  Home,
  WbSunny,
  StarBorder,
  EventNote,
  Person,
  Add,
  Email,
  History,
  Info,
  Settings,
  ArrowForward,
  RadioButtonUnchecked,
  ArrowBack,
} from "@material-ui/icons";
import React, { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addCategory, showCategories, showTodo } from "../../redux/todoSlice";
import Category from "../category/categoryMenu";

const useStyles = makeStyles<Theme,StyleProps>((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      color: "#555",
      paddingTop: theme.spacing(8),
      backgroundColor: "#f4f4f4",
      [theme.breakpoints.up("sm")]: {
        backgroundColor: "#f4f4f4",
        color: "#555",
        border: "1px solid #ece7e7",
      },
    },
    sidebarHeader: {
      flex: 1,
      marginTop:theme.spacing(2),
    },
    sidebarContent: {
      overflow:"auto",
      flex:(props)=>(props.sidebarTextState ? 5 : 12),
      [theme.breakpoints.down("sm")]: {
      flex:(props)=>(props.sidebarTextState ? 12 : 5),
    },
    },
    sidebarFooter: {

      flex:(props)=>(props.sidebarTextState ? 5 : 1),
      [theme.breakpoints.down("sm")]: {
      flex:(props)=>(props.sidebarTextState ? 1 : 4),
     },
    },
    sidebarFooterIcon:{
        
      display:"flex",
      justifyContent:"space-around",
      flexDirection:(props)=>(props.sidebarTextState ? "column": "row"),
      [theme.breakpoints.down("sm")]: {
            flexDirection:(props)=>(props.sidebarTextState ? "row": "column"),
        },

    },
    sidebarFooterDivider:{
        marginBottom:theme.spacing(1),
    },
    item: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        marginBottom: theme.spacing(3),
        cursor: "pointer",
      },
    },
    icon: {
      marginRight: theme.spacing(1),
    //   [theme.breakpoints.up("sm")]: {
    //     fontSize: "18px",
    //   },
    },
    text: {
      fontWeight: 500,
      display: (props) => (props.sidebarTextState===true ? "none" : "flex" ),
      [theme.breakpoints.down("sm")]: {
      display: (props) => (props.sidebarTextState===true ? "flex" : "none" ),
      },
    },
    footerIcon:{
      
       marginBottom:(props)=>(props.sidebarTextState ? theme.spacing(3) : theme.spacing(0)),
      [theme.breakpoints.down("sm")]: {
       marginBottom:(props)=>(props.sidebarTextState ? theme.spacing(0) : theme.spacing(3)),
        cursor: "pointer",
      },
    },
    linkItem:{
      color:"inherit",
      textDecoration:"inherit"
    },
    addTodoIcon:{
      marginRight: theme.spacing(1),
    }
  })
);

export interface StyleProps {
    sidebarTextState : boolean
}
interface sidebarProps{
    sidebarTextState : boolean
    setSidebarTextState:  React.Dispatch<React.SetStateAction<boolean>>
    setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>
}
const Sidebar: React.FC<sidebarProps> = ({sidebarTextState,setSidebarTextState,setSearchQuery}) => { 
  //const [sidebarTextState,setSidebarTextState] = useState<boolean>(false)
  //Redux State:
  
  const todos = useAppSelector(showTodo);
  const categories = useAppSelector(showCategories)
  const dispatch = useAppDispatch();
  // css
  const classes = useStyles({sidebarTextState});
  //local State:
  
  const [addCategoryState,setAddCategoryState] = useState<boolean>(false);
  const newCategory = useRef<HTMLInputElement>(null);
  const keypressAddCategory = (event:React.KeyboardEvent)=>{
    if(event.key === 'Enter'){
      AddCategory()
    }
  }
  const AddCategory = ()=>{
    if(newCategory.current!==null){
      if(newCategory.current.value.trim()!==""){
        dispatch(addCategory(newCategory.current.value.trim()))
        newCategory.current.value = ""
      }
    }
    setAddCategoryState(false)
  }
  const resetSearch = ()=>{
    setSearchQuery(null)
  }
  return (
    <Container className={classes.container}>
      <div className={classes.sidebarHeader}>
        {sidebarTextState ? <ArrowBack onClick={()=>setSidebarTextState(false)}/> : <ArrowForward onClick={()=>setSidebarTextState(true)}/> }
      </div>
      <div className={classes.sidebarContent}>
        <Link to={{pathname:"/list/1"}} className={classes.linkItem} onClick={resetSearch}>
        <div className={classes.item}>
          <WbSunny className={classes.icon} />
          <Typography  component={'span'} className={classes.text}>我的一天</Typography>
          <Typography   component={'span'} className={classes.text} style={{marginLeft:"auto"}}>
            {todos.filter((todo)=>todo.categories?.includes(1)&&todo.completed===false).length ===0 ? null : todos.filter((todo)=>todo.categories?.includes(1)&&todo.completed===false).length } 
          </Typography>
        </div>
        </Link>
        <Link to={{pathname:"/list/2"} } className={classes.linkItem} onClick={resetSearch}>
        <div className={classes.item}>
          <StarBorder className={classes.icon} />
          <Typography  component={'span'} className={classes.text}>重要</Typography>
          <Typography  component={'span'} className={classes.text} style={{marginLeft:"auto"}}>
          {todos.filter((todo)=>todo.categories?.includes(2)&&todo.completed===false).length ===0 ? null : todos.filter((todo)=>todo.categories?.includes(2)&&todo.completed===false).length } 
          </Typography>
        </div>
        </Link>
        <Link to={{pathname:"/list/3"}} className={classes.linkItem} onClick={resetSearch}>
        <div className={classes.item}>
          <EventNote className={classes.icon} />
          <Typography  component={'span'}className={classes.text}>已計劃</Typography>
          <Typography  component={'span'}className={classes.text} style={{marginLeft:"auto"}}>
          {todos.filter((todo)=>todo.dueTime!==undefined &&todo.completed===false).length ===0 ? null : todos.filter((todo)=>todo.dueTime!==undefined &&todo.completed===false).length } 
          </Typography>
        </div>
        </Link>
         <Link to={{pathname:"/list/4"}} className={classes.linkItem} onClick={resetSearch}>
        <div className={classes.item}>
          <Home className={classes.icon} />
          <Typography  component={'span'} className={classes.text}>工作</Typography>
          <Typography  component={'span'}className={classes.text} style={{marginLeft:"auto"}}>
          {todos.filter((todo)=>todo.categories?.includes(4)&&todo.completed===false).length ===0 ? null : todos.filter((todo)=>todo.categories?.includes(4)&&todo.completed===false).length } 
          </Typography>
        </div></Link>
        {categories?.map( (c)=>{
          if( c.id>=5){
            return(
              <Category c={c} sidebarTextState={sidebarTextState} todos={todos} key={c.id} setSearchQuery={setSearchQuery}/>
            )
          }else{
            return null
          }
        }
        )} 
        <div className={classes.item}>
        {addCategoryState === false ? (
                  <Add
                    className={classes.addTodoIcon}
                    style={{ color: "tomato" }}
                    onClick={()=>setSidebarTextState(true)}
                  />
                ) : (
                  <RadioButtonUnchecked
                    className={classes.addTodoIcon}
                    style={{ color: "tomato" }}
                  />
                )}
        <TextField
          className={classes.text}
          id="addCategory"
          placeholder="新增清單"
          aria-label="新增清單"
          inputRef={newCategory}
          onBlur={AddCategory}
          onClick={() => setAddCategoryState(true)}
          onKeyPress={(e) => keypressAddCategory(e)}
          fullWidth={true}
          InputProps={{
            disableUnderline: true,
          }}
        />
        </div>
      </div>

      <div className={classes.sidebarFooter}>
        <Divider className={classes.sidebarFooterDivider}/>
        <div className={classes.sidebarFooterIcon}>
        <Person className={classes.footerIcon} />
        <Email className={classes.footerIcon} />
        <History className={classes.footerIcon} />
        <Info className={classes.footerIcon} />
        <Settings className={classes.footerIcon} />
        </div>
    </div>
    </Container>
  );
}
export default  Sidebar; 