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
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  AcUnit,
  Add,
  ArrowDownward,
  ArrowForward,
  Clear,
  RadioButtonUnchecked,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {

  AddTodosByCategory,
  showTodo,
} from "../../redux/todoSlice";
import { DeleteCategoryById, seeCategories, updateCategoryAction } from  '../../redux/categorySlice'
// import TodoDrawer from "../drawer/Drawer";
import TodoItem from "../todo/TodoItem";

export interface StyleProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(8),
    },
    titleArea: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(2),
    },
    todoTitle: {
      // display: "none",
      // [theme.breakpoints.up("sm")]: {
      //   display: "flex",
      // },
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(1),
    },
    loginbg: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
      alignItems: "center",
      marginTop: theme.spacing(2),
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
    },
    list: {
      width: 250,
      backgroundColor: "red",
    },
    deletePop: {
      color: "red",
    },
  })
);
interface feedProps {
  setCurrentTodoId: React.Dispatch<React.SetStateAction<string| null>>;
  categoryId?: number;
  search?: string | null;
}

const Feed: React.FC<feedProps> = ({
  setCurrentTodoId,
  categoryId,
  search,
}) => {
  //-----------Redux state management
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const category = useAppSelector(seeCategories)?.find(
    (c) =>{ 
        if(parseInt(id)===1){
          return c.name === "myday"
        }else if (parseInt(id)===2){
          return c.name === "important"
        }else if (parseInt(id)===3){
          return c.name === "plan"
        }else if (parseInt(id)===4){
          return c.name === "work"
        }else{
          return c.id.toString()===id
        }

  });
  //category會是我們要的 所以return todo裡面contain category的就行了
  const todos = useAppSelector(showTodo).filter((todo) => {
    if (category && category.name !== "plan") {
      if(todo.categories!==undefined){
        return todo.categories.some((c)=>c.name===category.name)
      }else{
        return null
      }
    } else {
      //回傳有到期日的旋向
      return todo.dueTime !== null;
    }
  });
  const dispatch = useAppDispatch();
  const finishedTodos = todos.filter((todo) => todo.completed === true);
  //------------CSS
  const classes = useStyles();
  //------------Local state control form change
  //const [currentCategory,setCurrentCategory] = useState<category|null>(null);
  const history = useHistory();
  const [addTodoState, setAddTodoState] = useState<boolean>(false);
  const [displayFinished, setDisplayFinished] = useState<boolean>(false);
  const [modifyCategoryState, setModifyCategoryState] =
    useState<boolean>(false);
  const newTodo = useRef<HTMLInputElement>(null);
  const newCategoryRef = useRef<HTMLInputElement>(null);
  const keypressAddTodo = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      AddTodo();
    }
  };
  const AddTodo = () => {
    if (newTodo.current) {
      if (newTodo.current.value.trim() !== "") {
        console.log(newTodo.current?.value);
        if(category){
          dispatch(
            AddTodosByCategory({
              categoryId:category.id,
              title: newTodo.current.value.trim(),
              completed:false
            })
          );
        }
        newTodo.current.value = "";
      }
      setAddTodoState(false);
    }
  };
  const deletePopCategory = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    event.preventDefault();
    dispatch(DeleteCategoryById(id.toString()));
    history.push("/list/1");
  };
  const modifyCategory = () => {
    if (newCategoryRef.current) {
      if (newCategoryRef.current.value.trim() !== "") {
        dispatch(
          updateCategoryAction({
            categoryId:id,
            name: newCategoryRef.current.value.trim()
          })
        );
      }
    }
    setModifyCategoryState(false);
  };
  const keypressModifyCategory = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      modifyCategory();
    }
  };
  // useEffect(() => {
  //   if(category && category.id){
  //     dispatch(getTodosByCategory(category.id))
  //   }
  // }, [category,dispatch])
  //-----------------------------components
  const SearchOn = () => {
    //此處利用selector 做filter
    const todos = useAppSelector(showTodo).filter((todo) => {
      if (search) {
        if (todo.title.indexOf(search) !== -1) {
          return todo;
        }else{
          return null
        }
      }else{
        return null
      }
    });
    return (
      <Container className={classes.container}>
        <Typography
          component={"span"}
          variant="h5"
          className={classes.todoTitle}
        >
          <SearchOutlined className={classes.icon} />
          {t("onSearch")} "{search}"
        </Typography>
        <List component="nav" aria-label="mailbox folders">
          {todos ? (
            todos.map((todo) => {
              return (
                <TodoItem
                  todo={todo}
                  completed={todo.completed}
                  key={todo.id}
                  setCurrentTodoId={setCurrentTodoId}
                />
              );
            })
          ) : (
            <Typography
              component={"span"}
              variant="h5"
              className={classes.loginbg}
            >
              <SearchOutlined className={classes.icon} />"
            </Typography>
          )}
        </List>
      </Container>
    );
  };
  const TodoOn = () => {
    return (
      <Container className={classes.container}>
        <div className={classes.titleArea}> 
          {modifyCategoryState === false ? (
            (parseInt(id) > 5) === true ? (
              <Tooltip title={t("changeTip")||""}>
                <Typography
                  component={"span"}
                  variant="h5"
                  className={classes.todoTitle}
                  onClick={() => setModifyCategoryState(true)}
                >
                  <AcUnit className={classes.icon} />
                  {category && category.name}
                </Typography>
              </Tooltip>
            ) : (
              <Typography
                component={"span"}
                variant="h5"
                className={classes.todoTitle}
              >
                <AcUnit className={classes.icon} />
                {category && t(category.name)}
              </Typography>
            )
          ) : (
            <>
              <AcUnit className={classes.icon} />
              <TextField
                // className={classes.text}
                id="outlined-basic"
                defaultValue={category && category.name}
                inputRef={newCategoryRef}
                onBlur={modifyCategory}
                // onClick={() => setAddCategoryState(true)}
                onKeyPress={(e) => keypressModifyCategory(e)}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </>
          )}
          {(parseInt(id) > 5) === true && (
            <IconButton onClick={(e) => deletePopCategory(e, parseInt(id))}>
              <Clear />
            </IconButton>
          )}
        </div>
        <List component="nav" aria-label="mailbox folders">
          <TextField
            className={classes.addTodo}
            id="addTask"
            placeholder={t("addWork")}
            aria-label="新增工作"
            inputRef={newTodo}
            onBlur={AddTodo}
            onClick={() => setAddTodoState(true)}
            onKeyPress={(e) => keypressAddTodo(e)}
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
              return <TodoItem todo={todo} completed={false} key={todo.id} setCurrentTodoId={setCurrentTodoId} />;
            } else {
              return null;
            }
          })}
          {finishedTodos && (
            <>
              <List>
                <ListItem
                  button
                  divider
                  onClick={() => setDisplayFinished(!displayFinished)}
                  className={classes.finishCategory}
                >
                  {displayFinished ? (
                    <ArrowForward className={classes.checkIcon} />
                  ) : (
                    <ArrowDownward className={classes.checkIcon} />
                  )}
                  <ListItemText
                    primary={t('finished') + "  "+finishedTodos.length }
                    style={{ color: "tomato" }}
                  />
                </ListItem>
                <div style={displayFinished ? { display: "none" } : undefined}>
                  {finishedTodos.map((todo) => (
                    <TodoItem todo={todo} completed={true} key={todo.id} setCurrentTodoId={setCurrentTodoId} />
                  ))}
                </div>
              </List>
            </>
          )}
        </List>
      </Container>
    );
  };
  return <>{search ? <SearchOn /> : <TodoOn />}</>;
};

export default Feed;
