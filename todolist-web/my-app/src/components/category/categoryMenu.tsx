import { TextField } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import { Dns } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { deleteCategory,updateCategory } from "../../redux/todoSlice";
import { category, Todo } from "../../type";

export interface StyleProps {
  sidebarTextState: boolean;
}
interface categoryProps {
  c: category;
  todos: Todo[];
  sidebarTextState: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
}
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
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
      display: (props) => (props.sidebarTextState === true ? "none" : "flex"),
      [theme.breakpoints.down("sm")]: {
        display: (props) => (props.sidebarTextState === true ? "flex" : "none"),
      },
    },
    deletePop: {
      color: "red",
    },
    linkItem: {
      color: "inherit",
      textDecoration: "inherit",
    },
  })
);
const Category: React.FC<categoryProps> = ({ c, todos, sidebarTextState,setSearchQuery }) => {
  //-----------------css
  const classes = useStyles({ sidebarTextState });
  //-----------------Redux
  const dispatch = useAppDispatch();
  //-----------------local state
  const newCategoryRef = useRef<HTMLInputElement>(null);
  const [changeCategoryState, setChangeCategoryState] =
    useState<boolean>(false);
  const popInitialPos = {
    mouseX: null,
    mouseY: null,
  };
  const [popState, setPopState] = useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(popInitialPos);

  const openPopCategory = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPopState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };
  const closePopCategory = () => {
    setPopState(popInitialPos);
  };
  const deletePopCategory = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    event.preventDefault();
    dispatch(deleteCategory(id));
    setPopState(popInitialPos);
  };
  const changePopCategory = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    setChangeCategoryState(true);
    setPopState(popInitialPos);
  };
  const onKeypressCategoryName = (event:React.KeyboardEvent)=>{
    if(event.key==="Enter"){
      changeCategoryName()
    }
  }
  const changeCategoryName = ()=>{
    if(newCategoryRef.current){
      if(newCategoryRef.current.value.trim()!==""){
        dispatch(updateCategory({newName:newCategoryRef.current.value.trim(),id:c.id}))
      }
    }
    setChangeCategoryState(false)
    //dispatch
  }
  const resetSearch = ()=>{
    setSearchQuery(null);
  }
  return (
    <Link
      to={{ pathname: "/list/" + c.id }}
      className={classes.linkItem}
      key={c.id}
      onClick={resetSearch}
    >
      <div className={classes.item} onContextMenu={(e) => openPopCategory(e)}>
        <Dns className={classes.icon} />
        {changeCategoryState === true ? (
          <TextField
           onKeyPress={(e)=>onKeypressCategoryName(e)}
           onBlur={()=>changeCategoryName()}
           inputRef= {newCategoryRef}
          />
        ) : (
          <Typography className={classes.text}>{c.name}</Typography>
        )}
        <Typography className={classes.text} style={{ marginLeft: "auto" }}>
          {todos.filter(
            (todo) =>
              todo.categories?.includes(c.id) && todo.completed === false
          ).length === 0
            ? null
            : todos.filter(
                (todo) =>
                  todo.categories?.includes(c.id) && todo.completed === false
              ).length}
        </Typography>
        <Menu
          keepMounted
          open={popState.mouseY !== null}
          onClose={closePopCategory}
          anchorReference="anchorPosition"
          anchorPosition={
            popState.mouseY !== null && popState.mouseX !== null
              ? { top: popState.mouseY, left: popState.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={(e) => changePopCategory(e)}>
            修改此清單名稱
          </MenuItem>
          <MenuItem
            onClick={(e) => deletePopCategory(e, c.id)}
            className={classes.deletePop}
          >
            刪除此清單
          </MenuItem>
        </Menu>
      </div>
    </Link>
  );
};

export default Category;
