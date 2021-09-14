import { ListItem, ListItemText, Typography, ListItemSecondaryAction,createStyles, makeStyles, Theme } from '@material-ui/core'
import { RadioButtonUnchecked, Notifications, EventNote, ErrorOutline, MoreVert, Star, StarBorder, CheckCircle } from '@material-ui/icons'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { seeCategories } from '../../redux/categorySlice'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { AddTodosToCatgory, CompleteTodosByTodoID, DeleteTodosToCatgory } from '../../redux/todoSlice'
import { Todo } from '../../type'

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
    setCurrentTodoId: React.Dispatch<React.SetStateAction<string | null>>;
}
const TodoItem:React.FC<TodoItemProp> = ({todo,completed,setCurrentTodoId})=> {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const importantCategory = useAppSelector(seeCategories).find((c)=>c.name==="important")
    const addImportantCategory = (todo: Todo) => {
        if(importantCategory){
          dispatch(AddTodosToCatgory({todoId:todo.id,categoryId:importantCategory.id}))
        }
        //原本有跟原本沒有的狀況
        // let new_cat: number[];
        // if (todo.categories !== undefined) {
        //   new_cat = [...todo.categories, 2];
        // } else {
        //   new_cat = [2];
        // }
        // const newTodo: Todo = { ...todo, categories: new_cat };
        // dispatch(updateTodo(newTodo));
      };
      const deleteImportantCategory = (todo: Todo) => {
        if(importantCategory){
          dispatch(DeleteTodosToCatgory({todoId:todo.id,categoryId:importantCategory.id}))
        }
        // if (todo.categories !== undefined) {
        //   const new_cat = todo.categories.filter((c) => c !== 2);
        //   const newTodo: Todo = { ...todo, categories: new_cat };
        //   dispatch(updateTodo(newTodo));
        // } else {
        //   console.log("不用親增");
        // }
    };
    const completeTodo = (event:React.MouseEvent<SVGSVGElement, MouseEvent>)=>{
      event.stopPropagation();
      dispatch(CompleteTodosByTodoID({todoId:todo.id,completed:completed}))
    }
    const classes = useStyles();
    console.log("re-render?")
    return (
        <>
        <ListItem
          button
          divider
          // onClick ={ondrawerClick}
          onClick={() => setCurrentTodoId(todo.id)}
          className ={classes.listItem}
        >
        {completed === true ?  <CheckCircle
                       className={classes.checkIcon}
                       onClick={(e) => completeTodo(e)}
                     />:<RadioButtonUnchecked
            className={classes.checkIcon}
            onClick={(e)=> completeTodo(e)}
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
                        style={
                          moment().isAfter(moment(todo.noticeTime))===true
                            ? { color: "red" }
                            : undefined
                        }
                      >
                        {moment().isAfter(moment(todo.noticeTime))===true
                          ? t("expired")+", "
                          : ""}
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
                          ? t("expired")+", "
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
                        {t('note')}
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
            {todo.categories && todo.categories?.some((category)=>category.name==="important") ? (
              <Star onClick={() => deleteImportantCategory(todo)} />
            ) : (
              <StarBorder onClick={() => addImportantCategory(todo)} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
       
        </>
    )
}

export default TodoItem