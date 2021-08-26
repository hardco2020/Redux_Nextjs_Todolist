import {
  makeStyles,
  Theme,
  Container,
  createStyles,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  List,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Add, ArrowDownward, ArrowForward, CheckCircle, RadioButtonUnchecked, WbSunny } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { showTodo } from "../../redux/todoSlice";
import { addTodo,completeTodo } from "../../redux/todoSlice";
import { Todo } from "../../type";

export interface StyleProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(10),
    },
    loginbg: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
      alignItems: "center",
    },

    loginsm: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    addTodo: {
      "&::placeholder": {
        color: "red",
      },
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      color: "red",
    },
    checkIcon: {
      color: "tomato",
      marginRight: theme.spacing(2),
    },
    addTodoIcon: {
      marginRight: theme.spacing(1),
    },
    finishCategory:{
        "&:hover": {
            backgroundColor: "white",
          },
          "&:selected": {
            backgroundColor: "red",
            color: "white",
            "& .MuiListItemIcon-root": {
              color: "white"
            }
          },
    }
  })
);
interface feedProps{
    setCurrentTodo:  React.Dispatch<React.SetStateAction<Todo|null>>
}
const Feed:React.FC<feedProps> =  ({setCurrentTodo})=> {
//-----------Redux state management
  const todos = useAppSelector(showTodo);
  const dispatch = useAppDispatch();
  const finishedTodos = todos.filter(todo=> todo.completed===true)
//------------CSS
  const classes = useStyles();
//------------Local state control form change 
  const [addTodoState, setAddTodoState] = useState<boolean>(false);
  const [displayFinished,setDisplayFinished] = useState<boolean>(false);

  const newTodo = useRef<HTMLInputElement>(null);
  const keypressAddTodo = (event:React.KeyboardEvent)=>{
      if(event.key==="Enter"){
          AddTodo()
      }
  }
  const AddTodo = () => {
    if (newTodo.current) {
        if(newTodo.current.value!==""){
            console.log(newTodo.current?.value);
            dispatch(addTodo(newTodo.current.value));
            newTodo.current.value = ""
        }
        setAddTodoState(false);
    }
  };
  return (
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.loginbg}>
        <WbSunny className={classes.icon} />
        我的一天
      </Typography>
      <List component="nav" aria-label="mailbox folders">
        <TextField
          className={classes.addTodo}
          id="addTask"
          placeholder="新增工作"
          aria-label="新增工作"
          inputRef={newTodo}
          onBlur={AddTodo}
          onClick={() => setAddTodoState(true)}
          onKeyPress={(e)=> keypressAddTodo(e)}
          fullWidth={true}
          InputProps={{
            style: { color: addTodoState === false ? "tomato" : "gray" },
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                {addTodoState === false ? (
                  <Add
                    className={classes.addTodoIcon}
                    style={{ color: "tomato" }}
                  />
                ) : (
                  <RadioButtonUnchecked
                    className={classes.addTodoIcon}
                    style={{ color: "tomato" }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <Divider />
        {todos.map((todo) => {
          if (todo.completed === false) {
            return (
              <ListItem button divider  onClick={()=>setCurrentTodo(todo)} key={todo.id}>
                <RadioButtonUnchecked className={classes.checkIcon} onClick={()=>dispatch(completeTodo(todo.id))}/>
                <ListItemText primary={todo.title} />
              </ListItem>
            );
          } else {
            return null
          }
        })}
        {finishedTodos && 
                <>
                <List>
                <ListItem  button divider onClick={()=>setDisplayFinished(!displayFinished)} className={classes.finishCategory} >
                {displayFinished ? <ArrowForward className={classes.checkIcon}/>: <ArrowDownward className={classes.checkIcon}/>}
                <ListItemText primary={`完成      ${finishedTodos.length}`}  style={{color:"tomato"}}/>
                </ListItem>
                <div style={displayFinished ? {display:"none"} : undefined }>
                {finishedTodos.map((todo) =>(     
                        <ListItem button divider key={todo.id}>
                        <CheckCircle className={classes.checkIcon} onClick ={()=>dispatch(completeTodo(todo.id))} />
                        <ListItemText primary={todo.title} style={{textDecoration:"line-through",color:"gray"}} />
                        </ListItem>
                ))}
                </div>
                </List>
                </>
        }
      </List>
    </Container>
  );
}

export default Feed;
