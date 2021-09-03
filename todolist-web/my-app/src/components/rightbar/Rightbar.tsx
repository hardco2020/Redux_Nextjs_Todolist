import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  TextField,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  Add,
  CalendarToday,
  CheckCircle,
  Clear,
  EventNote,
  FastForward,
  Forward,
  Notifications,
  RadioButtonUnchecked,
  Repeat,
  WbSunny,
} from "@material-ui/icons";
import { current } from "@reduxjs/toolkit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hook";
import { RootState } from "../../redux/reduxStore";
import {
  completeTodo,
  updateTodo,
  updateStep,
  addStepReducer,
  deleteStepReducer,
  deleteTodo,
} from "../../redux/todoSlice";
import { Todo, step, payloadStep } from "../../type";

export interface StyleProps {}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(10),
      height: "100vh",
      color: "#555",
    },
    taskName: {},
    list: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {},
    checkIcon: {
      color: "tomato",
      marginRight: theme.spacing(1),
    },
    remember: {
      backgroundColor: "white",
      width: "100%",
      "& label.Mui-focused": {
        color: "tomato",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "tomato",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "tomato",
        },
        "&:hover fieldset": {
          borderColor: "tomato",
        },
        "&.Mui-focused fieldset": {
          borderColor: "tomato",
        },
      },
    },
    stepIcon: {
      marginRight: theme.spacing(1),
    },
    deleteButton: {
      cursor: "pointer",
    },
  })
);
interface rightbarProps {
  currentTodoId: number | null;
}

const Rightbar: React.FC<rightbarProps> = ({ currentTodoId }) => {
  // global state management
  const todos = useSelector((state: RootState) =>
    state.todo.todos.filter((todo) => todo.id === currentTodoId)
  );
  const currentTodo = todos[0];
  const dispatch = useAppDispatch();
  //local state

  const [addStepState, setAddStepState] = useState<boolean>(false);
  const updateTitle = useRef<HTMLInputElement>(null);
  const [anchorNotice, setAnchorNotice] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorDueDate, setAnchorDueDate] = React.useState<null | HTMLElement>(
    null
  );
  const addStepRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);
  const noticeCustomRef = useRef<HTMLInputElement>(null);
  const dueCustomRef = useRef<HTMLInputElement>(null);
  //css
  const classes = useStyles();
  // useEffect(() => {
  //   console.table(currentTodo);
  // }, [currentTodo]);
  //--------------------------------local function
  const completeStep = (oldStep: step) => {
    if (currentTodo.steps !== undefined) {
      const payload: payloadStep = {
        todoId: currentTodo.id,
        stepId: oldStep.id,
        step: { ...oldStep, completed: !oldStep.completed },
      };
      console.log(payload);
      dispatch(updateStep(payload));
    }
  };
  const onKeyPressAddStep = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addStep();
    }
  };
  const deleteStep = (id: number) => {
    //根據id 做 filter
    const payload: payloadStep = { todoId: currentTodo.id, stepId: id };
    dispatch(deleteStepReducer(payload));
  };
  const addStep = () => {
    if (addStepRef.current != null) {
      if (addStepRef.current.value !== "") {
        //check original todos for have steps or not?
        const newStep = {
          id: Date.now(),
          completed: false,
          title: addStepRef.current.value,
        };
        const payload: payloadStep = { todoId: currentTodo.id, step: newStep };
        dispatch(addStepReducer(payload));
        addStepRef.current.value = "";
      }
      setAddStepState(false);
    }
  };
  const keypressUpdateTodoNote = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      updateTodoNote();
    }
  };
  const updateTodoNote = () => {
    if (noteRef.current != null) {
      if (noteRef.current.value !== "") {
        console.log(noteRef.current.value);
        const newTodo: Todo = {
          ...currentTodo,
          note: noteRef.current.value.trim(),
        };
        dispatch(updateTodo(newTodo));
      }
    }
  };
  const openDueDateMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorDueDate(event.currentTarget);
  };
  const closeDueDateMenu = (
    event: React.MouseEvent<HTMLLIElement>,
    date: string
  ) => {
    event.stopPropagation();
    let DueDate: string | null = moment().toString();
    if (date === "today") {
      DueDate = moment().add(6, "hours").format().toString();
    } else if (date === "tomorrow") {
      DueDate = moment().add(1, "days").format().toString();
    } else if (date === "nextWeek") {
      DueDate = moment().add(1, "weeks").format().toString();
    } else {
      if (dueCustomRef.current !== null) {
        DueDate = moment(dueCustomRef?.current.value)
          .format()
          .toString();
        console.log(DueDate);
        console.log(typeof(DueDate))
      }
    }
    if (currentTodo !== null && DueDate !== null && DueDate!=="Invalid date") {
      console.log(DueDate)
      console.table(currentTodo);
      const newTodo: Todo = { ...currentTodo, dueTime: DueDate };
      console.table(newTodo);
      dispatch(updateTodo(newTodo));
    }
    setAnchorDueDate(null);
  };
  useEffect(() => {
    if (updateTitle.current !== null && currentTodo !== null) {
      updateTitle.current.value = currentTodo?.title;
    }
    if (
      noteRef.current !== null &&
      currentTodo !== null &&
      currentTodo?.note !== undefined
    ) {
      noteRef.current.value = currentTodo.note;
    }
  }, [currentTodo]);
  const openNoticeMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorNotice(event.currentTarget);
  };

  const closeNoticeMenu = (
    event: React.MouseEvent<HTMLLIElement>,
    date: string
  ) => {
    event.stopPropagation();
    let noticeDate: string | null = moment().toString();
    if (date === "today") {
      noticeDate = moment().add(6, "hours").format().toString();
    } else if (date === "tomorrow") {
      noticeDate = moment().add(1, "days").format().toString();
    } else if (date === "nextWeek") {
      noticeDate = moment().add(1, "weeks").format().toString();
    } else {
      if (noticeCustomRef.current !== null) {
        noticeDate = moment(noticeCustomRef?.current.value)
          .format()
          .toString();
        console.log(noticeDate);
      }
      //useRef to see how it's go ?
    }
    if (currentTodo !== null && noticeDate !== null && noticeDate!=="Invalid date") {
      const newTodo: Todo = { ...currentTodo, noticeTime: noticeDate };
      dispatch(updateTodo(newTodo));
    }
    setAnchorNotice(null);
  };

  const keypressUpdateTodo = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      UpdateTodo();
    }
  };
  const UpdateTodo = () => {
    if (
      currentTodo !== null &&
      updateTitle.current !== null &&
      updateTitle.current.value.trim() !== ""
    ) {
      const newTodo: Todo = {
        ...currentTodo,
        title: updateTitle.current.value.trim(),
      };
      dispatch(updateTodo(newTodo));
      updateTitle.current.value = "";
      updateTitle.current.blur();
    }
  };
  const deleteDueTime = () => {
    if (currentTodo !== null) {
      const { dueTime, ...rest } = currentTodo;
      dispatch(updateTodo(rest));
    }
  };
  const deleteNoticeTime = () => {
    if (currentTodo !== null) {
      const { noticeTime, ...rest } = currentTodo;
      dispatch(updateTodo(rest));
    }
  };
  const addCategoryMyday = (todo:Todo)=>{
    let new_cat: number[];
    if (todo.categories !== undefined) {
      new_cat = [...todo.categories, 1];
    } else {
      new_cat = [1];
    }
    const newTodo: Todo = { ...todo, categories: new_cat };
    dispatch(updateTodo(newTodo));
  }
  const deleteCategoryMyday = (todo: Todo) => {
    if (todo.categories !== undefined) {
      const new_cat = todo.categories.filter((c) => c !== 1);
      const newTodo: Todo = { ...todo, categories: new_cat };
      dispatch(updateTodo(newTodo));
    } else {
      console.log("不用親增");
    }
  };
  const deleteTask = ()=>{
    dispatch(deleteTodo(currentTodo.id))
  }
  return (
    <Container className={classes.container}>
      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem className={classes.listItem}>
          {currentTodo && currentTodo.completed === false ? (
            <RadioButtonUnchecked
              className={classes.checkIcon}
              onClick={() => dispatch(completeTodo(currentTodo.id))}
            />
          ) : (
            <CheckCircle
              className={classes.checkIcon}
              onClick={() => dispatch(completeTodo(currentTodo.id))}
            />
          )}
          <TextField
            className={classes.taskName}
            onBlur={() => UpdateTodo()}
            onKeyPress={(e) => keypressUpdateTodo(e)}
            variant="outlined"
            inputRef={updateTitle}
            defaultValue={currentTodo?.title}
            multiline={true}
            style={
              currentTodo?.completed === true
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
            //rows={5}
          />
            <ListItemSecondaryAction
            onClick={() => deleteTask()}
            className={classes.deleteButton}
          >
            <Clear />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <TextField
            id="addStep"
            placeholder="新增步驟"
            aria-label="新增步驟"
            inputRef={addStepRef}
            onKeyPress={(e) => onKeyPressAddStep(e)}
            onBlur={() => addStep()}
            onClick={() => setAddStepState(true)}
            fullWidth={true}
            InputProps={{
              style: { color: addStepState === false ? "tomato" : "gray" },
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  {addStepState === false ? (
                    <Add style={{ color: "tomato" }} />
                  ) : (
                    <RadioButtonUnchecked style={{ color: "tomato" }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
        {currentTodo !== undefined &&
          currentTodo.steps !== undefined &&
          currentTodo?.steps.map((step) => (
            <ListItem button divider key={step.id}>
              {step.completed === false ? (
                <RadioButtonUnchecked
                  onClick={() => completeStep(step)}
                  className={classes.stepIcon}
                  style={{ color: "tomato" }}
                />
              ) : (
                <CheckCircle
                  onClick={() => completeStep(step)}
                  className={classes.stepIcon}
                  style={{ color: "tomato" }}
                />
              )}
              <TextField
                defaultValue={step.title}
                value={step.title}
                fullWidth={true}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <ListItemSecondaryAction
                onClick={() => deleteStep(step.id)}
                className={classes.deleteButton}
              >
                <Clear />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>

      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem button className={classes.listItem}  onClick={()=>currentTodo?.categories && currentTodo.categories.includes(1) ? deleteCategoryMyday(currentTodo): addCategoryMyday(currentTodo)}>
          <WbSunny className={classes.checkIcon} />
          <ListItemText
            disableTypography
            primary={
              <Typography
                component={'span'}
                variant="body2"
                style={
                  currentTodo?.categories && currentTodo.categories.includes(1)
                    ? { color: "tomato" }
                    : undefined
                }
              >
                {currentTodo?.categories && currentTodo.categories.includes(1)
                  ? "已新增到 [我的一天] "
                  : "新增到我的一天"}
              </Typography>
            }
          />
        </ListItem>
      </List>

      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem button onClick={(e) => openNoticeMenu(e)}>
          <Notifications className={classes.checkIcon} />
          <ListItemText
            style={currentTodo?.noticeTime ? { color: "tomato" } : undefined}
            primary={
              currentTodo?.noticeTime
                ? "於 " + moment(currentTodo.noticeTime).format("MM-DD-HH:mm") + " 提醒我"
                : "提醒我"
            }
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorNotice}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            open={Boolean(anchorNotice)}
            onClose={closeNoticeMenu}
          >
            <MenuItem onClick={(e) => closeNoticeMenu(e, "today")}>
              <ListItemIcon>
                <Repeat fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              今天 {moment().add(9, "hours").format("dddd, HH:mm")}
            </MenuItem>
            <MenuItem onClick={(e) => closeNoticeMenu(e, "tomorrow")}>
              <ListItemIcon>
                <Forward fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <Typography   component={'span'} 
              variant="inherit" noWrap>
                明天 {moment().add(1, "days").format("dddd, HH:mm")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => closeNoticeMenu(e, "nextWeek")}>
              <ListItemIcon>
                <FastForward fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <Typography   component={'span'} variant="inherit" noWrap>
                下週 {moment().add(1, "weeks").format("dddd, HH:mm")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => closeNoticeMenu(e, "custom")}>
              <ListItemIcon>
                <CalendarToday fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <TextField
                inputRef={noticeCustomRef}
                id="datetime-local"
                label="挑選時間"
                type="datetime-local"
                defaultValue="自選時間"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </MenuItem>
          </Menu>
          <ListItemSecondaryAction
            onClick={() => deleteNoticeTime()}
            className={classes.deleteButton}
          >
            <Clear />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem button onClick={(e) => openDueDateMenu(e)}>
          <EventNote className={classes.checkIcon} />
          <ListItemText
            style={currentTodo?.dueTime ? { color: "tomato" } : undefined}
            primary={
              currentTodo?.dueTime
                ? "於 " + moment(currentTodo.dueTime).format("MM-DD-HH:mm") + " 到期"
                : "到期日"
            }
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorDueDate}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            open={Boolean(anchorDueDate)}
            onClose={closeDueDateMenu}
          >
            <MenuItem onClick={(e) => closeDueDateMenu(e, "today")}>
              <ListItemIcon>
                <Repeat fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              今天 {moment().add(9, "hours").format("dddd, HH:mm")}
            </MenuItem>
            <MenuItem onClick={(e) => closeDueDateMenu(e, "tomorrow")}>
              <ListItemIcon>
                <Forward fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <Typography component={'span'}  variant="inherit" noWrap>
                明天 {moment().add(1, "days").format("dddd, HH:mm")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => closeDueDateMenu(e, "nextWeek")}>
              <ListItemIcon>
                <FastForward fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <Typography   component={'span'} variant="inherit" noWrap>
                下週 {moment().add(1, "weeks").format("dddd, HH:mm")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => closeDueDateMenu(e, "custom")}>
              <ListItemIcon>
                <CalendarToday fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <TextField
                inputRef={dueCustomRef}
                id="datetime-local"
                label="挑選時間"
                type="datetime-local"
                defaultValue="自選時間"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </MenuItem>
          </Menu>
          <ListItemSecondaryAction
            onClick={() => deleteDueTime()}
            className={classes.deleteButton}
          >
            <Clear />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </List>
      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
        style={{ padding: "10px" }}
      >
        <TextField
          id="noteTodo"
          label="新增記事"
          onBlur={() => updateTodoNote()}
          onKeyPress={(e) => keypressUpdateTodoNote(e)}
          multiline={true}
          defaultValue={currentTodo?.note || ""}
          inputRef={noteRef}
          size="medium"
          className={classes.remember}
          variant="outlined"
          rows={5}
        />
      </List>
    </Container>
  );
};

export default Rightbar;
