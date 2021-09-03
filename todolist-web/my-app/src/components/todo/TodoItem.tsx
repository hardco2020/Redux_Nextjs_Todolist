import { ListItem, ListItemText, Typography, ListItemSecondaryAction, Drawer, createStyles, makeStyles, Theme } from '@material-ui/core'
import { RadioButtonUnchecked, Notifications, EventNote, ErrorOutline, MoreVert, Star, StarBorder, CheckCircle } from '@material-ui/icons'
import moment from 'moment'
import React, { useState } from 'react'
import { useAppDispatch } from '../../redux/hook'
import { completeTodo, updateTodo } from '../../redux/todoSlice'
import { Todo } from '../../type'
import Rightbar from '../rightbar/Rightbar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(8),
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
    finishCategory: {
      "&:hover": {
        backgroundColor: "white",
      },
      "&:selected": {
        backgroundColor: "red",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white",
        },
      },
    },
    todoItem: {},
    subTodoItem: {
      paddingTop: 3,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    },
    subTodoIcon: {},
    subTodoText: {
      marginRight: theme.spacing(1),
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "none" ,
      },
    },
    listItem:{
      alignItems:"center"
    },
  })
);

interface TodoItemProp{
    todo:Todo;
    completed:boolean;
}
const TodoItem:React.FC<TodoItemProp> = ({todo,completed})=> {
    const dispatch = useAppDispatch();
    const addImportantCategory = (todo: Todo) => {
        //原本有跟原本沒有的狀況
        let new_cat: number[];
        if (todo.categories !== undefined) {
          new_cat = [...todo.categories, 2];
        } else {
          new_cat = [2];
        }
        const newTodo: Todo = { ...todo, categories: new_cat };
        dispatch(updateTodo(newTodo));
      };
      const deleteImportantCategory = (todo: Todo) => {
        if (todo.categories !== undefined) {
          const new_cat = todo.categories.filter((c) => c !== 2);
          const newTodo: Todo = { ...todo, categories: new_cat };
          dispatch(updateTodo(newTodo));
        } else {
          console.log("不用親增");
        }
    };
    const classes = useStyles();
    console.log("re-render?")
    const [drawerState,setDrawerState] = useState<boolean>(false);
    return (
        <>
        <ListItem
          button
          divider
          onClick ={()=>setDrawerState(true)}
          // onClick={() => setCurrentTodoId(todo.id)}
          className ={classes.listItem}
        >
        {completed === true ?  <CheckCircle
                       className={classes.checkIcon}
                       onClick={() => dispatch(completeTodo(todo.id))}
                     />:<RadioButtonUnchecked
            className={classes.checkIcon}
            onClick={() => dispatch(completeTodo(todo.id))}
          />
        
        }
          <ListItemText
            style = {completed===true ? { textDecoration: "line-through", color: "gray" } : undefined}
            primary={todo.title}
            secondary={
              (todo.noticeTime || todo.dueTime || todo.note || todo.steps) &&
              <React.Fragment>
                <ListItem className={classes.subTodoItem}>
                  {todo.noticeTime && (
                    <>
                      <Notifications className={classes.subTodoIcon} />
                      <Typography
                       component={'span'}
                        variant="body2"
                        className={classes.subTodoText}
                      >
                        {" "}
                        {moment(todo.noticeTime).format("MM-DD-HH:mm")}{" "}
                      </Typography>
                    </>
                  )}
                  {todo.dueTime && (
                    <>
                      <EventNote className={classes.subTodoIcon} />
                      <Typography
                       component={'span'}
                        variant="body2"
                        className={classes.subTodoText}
                        style={
                          moment().isAfter(moment(todo.dueTime))===true
                            ? { color: "red" }
                            : undefined
                        }
                      >
                        {""}
                        {moment().isAfter(moment(todo.dueTime))===true
                          ? "過期, "
                          : ""}
                        {moment(todo.dueTime).format("MM-DD-HH:mm")}{" "}
                      </Typography>
                    </>
                  )}
                  {todo.note && (
                    <>
                      <ErrorOutline className={classes.subTodoIcon} />
                      <Typography
                       component={'span'}
                        variant="body2"
                        className={classes.subTodoText}
                      >
                        {" "}
                        附註
                      </Typography>
                    </>
                  )}
                  {todo.steps && todo.steps.length > 0 && (
                    <>
                      <MoreVert className={classes.subTodoIcon} />
                      <Typography
                       component={'span'}
                        variant="body2"
                        className={classes.subTodoText}
                      >
                        {
                          todo.steps.filter(
                            (step) => step.completed === true
                          ).length
                        }{" "}
                        / {todo.steps.length}
                      </Typography>
                    </>
                  )}
                </ListItem>
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction>
            {todo.categories && todo.categories?.includes(2) ? (
              <Star onClick={() => deleteImportantCategory(todo)} />
            ) : (
              <StarBorder onClick={() => addImportantCategory(todo)} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <Drawer anchor="right" open={drawerState} onClose={()=>setDrawerState(false)}> 
          <Rightbar currentTodoId={todo.id}/>
        </Drawer>
        </>
    )
}

export default TodoItem