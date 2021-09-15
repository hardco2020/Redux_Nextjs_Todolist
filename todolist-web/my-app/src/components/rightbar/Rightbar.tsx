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
  ArrowForward,
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
import moment from "moment";
import React, { useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { seeCategories } from "../../redux/categorySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/reduxStore";
import { AddStepsByTodo , seeSteps } from "../../redux/stepSlice";
import {
  UpdateTodosByTodoID,
  AddTodosToCatgory,
  DeleteTodosToCatgory,
  CompleteTodosByTodoID,
  DeleteTodosByTodoID
} from "../../redux/todoSlice";
import { Todo } from "../../type";
import Step from "../step/Step";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(8),
      height: "100vh",
      color: "#555",
    },
    backIcon:{
      marginLeft:theme.spacing(2)
    },
    taskName: {},
    list: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {},
    checkIcon: {
      cursor:"pointer",
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
  currentTodoId: string | null;
  setCurrentTodoId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Rightbar: React.FC<rightbarProps> = ({ currentTodoId,setCurrentTodoId }) => {
  // global state management

  const category = useAppSelector(seeCategories).find((c)=>c.name==="myday")
  const steps = useAppSelector(seeSteps).filter((step)=>{
    if(step.todoItem){
      return step.todoItem.id === currentTodoId
    }
    return null
  });
  const { t } = useTranslation(); 
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
  const onKeyPressAddStep = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addStep();
    }
  };
  const addStep = () => {
    if (addStepRef.current != null) {
      if (addStepRef.current.value !== "") {
        //check original todos for have steps or not?
        const newStep = {
          completed: false,
          title: addStepRef.current.value,
        };
        dispatch(AddStepsByTodo({todoId:currentTodo.id,new_step:newStep}));
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
        const newTodo: Todo = {
          ...currentTodo,
          note: noteRef.current.value.trim(),
        };
        console.log(newTodo)
        dispatch(UpdateTodosByTodoID(newTodo));
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
      dispatch(UpdateTodosByTodoID(newTodo));
    }
    setAnchorDueDate(null);
  };
  
  // useEffect(() => {
  //   if(currentTodoId ){
  //     dispatch(getStepsByTodo(currentTodoId))
  //   }
  // }, [currentTodoId,dispatch])
  // useEffect(() => {
  //   if (updateTitle.current !== null && currentTodo !== null) {
  //     updateTitle.current.value = currentTodo?.title;
  //   }
  //   if (
  //     noteRef.current !== null &&
  //     currentTodo !== null &&
  //     currentTodo?.note !== undefined
  //   ) {
  //     noteRef.current.value = currentTodo.note;
  //   }
  // }, [currentTodo]);
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
      dispatch(UpdateTodosByTodoID(newTodo));
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
      dispatch(UpdateTodosByTodoID(newTodo));
      updateTitle.current.value = "";
      updateTitle.current.blur();
    }
  };
  const deleteDueTime = () => {
    if (currentTodo !== null) {
      let new_todo = Object.assign({}, currentTodo);
      new_todo.dueTime =null 
      dispatch(UpdateTodosByTodoID(new_todo));
    }
  };
  const deleteNoticeTime = () => {
    if (currentTodo !== null) {
      let new_todo = Object.assign({}, currentTodo);
      new_todo.noticeTime = null  
      // const { noticeTime, ...rest } = currentTodo;
      dispatch(UpdateTodosByTodoID(new_todo));
    }
  };
  const addCategoryMyday = (todo:Todo)=>{
    //找到該user 我的一天的id 加上本身id去做更新
    if(category){
      dispatch(AddTodosToCatgory({categoryId:category.id,todoId:todo.id}));
    }
  }
  const deleteCategoryMyday = (todo: Todo) => {
    if(category){
      dispatch(DeleteTodosToCatgory({categoryId:category.id,todoId:todo.id}));
    }
  };
  const deleteTask = ()=>{
      dispatch(DeleteTodosByTodoID(currentTodo.id))
      setCurrentTodoId(null)
  }
  return (
    <Container className={classes.container}>
      <ArrowForward className={classes.backIcon} onClick={()=>setCurrentTodoId(null)}/>
      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem className={classes.listItem}>
          {currentTodo && currentTodo.completed === false ? (
            <RadioButtonUnchecked
              className={classes.checkIcon}
              onClick={() => dispatch(CompleteTodosByTodoID({todoId:currentTodo.id,completed:currentTodo.completed}))}
            />
          ) : (
            <CheckCircle
              className={classes.checkIcon}
              onClick={() => dispatch(CompleteTodosByTodoID({todoId:currentTodo.id,completed:currentTodo.completed}))}
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
            placeholder={t("addStep")}
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
        {
          steps &&
          steps.map((step) => (
            <Step currentTodo={currentTodo} step={step} />
          ))}
      </List>

      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem button className={classes.listItem}  onClick={()=>currentTodo?.categories && currentTodo.categories.some((c)=>c.name === "myday") ? deleteCategoryMyday(currentTodo): addCategoryMyday(currentTodo)}>
          <WbSunny className={classes.checkIcon} />
          <ListItemText
            disableTypography
            primary={
              <Typography
                component={'span'}
                variant="body2"
                style={
                  currentTodo?.categories && currentTodo.categories.some((c)=>c.name === "myday")
                    ? { color: "tomato" }
                    : undefined
                }
              >
                {currentTodo?.categories && currentTodo.categories.some((c)=>c.name === "myday")
                  ? t("already_add_to_my_day")
                  : t("add_to_my_day")}
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
                ? moment(currentTodo.noticeTime).format("MM-DD-HH:mm") + t("notification")
                : t("notification")
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
              {t("today")} {moment().add(9, "hours").format("dddd, HH:mm")}
            </MenuItem>
            <MenuItem onClick={(e) => closeNoticeMenu(e, "tomorrow")}>
              <ListItemIcon>
                <Forward fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <Typography   component={'span'} 
              variant="inherit" noWrap>
               {t("tomorrow")} {moment().add(1, "days").format("dddd, HH:mm")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => closeNoticeMenu(e, "nextWeek")}>
              <ListItemIcon>
                <FastForward fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <Typography   component={'span'} variant="inherit" noWrap>
              {t("next_week")} {moment().add(1, "weeks").format("dddd, HH:mm")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => closeNoticeMenu(e, "custom")}>
              <ListItemIcon>
                <CalendarToday fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <TextField
                inputRef={noticeCustomRef}
                id="datetime-local"
                label={t('pick_time')}
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
                ?  moment(currentTodo.dueTime).format("MM-DD-HH:mm") +t("dueDate") 
                :t("dueDate")
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
              {t("today")} {moment().add(9, "hours").format("dddd, HH:mm")}
            </MenuItem>
            <MenuItem onClick={(e) => closeDueDateMenu(e, "tomorrow")}>
              <ListItemIcon>
                <Forward fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <Typography component={'span'}  variant="inherit" noWrap>
              {t("tomorrow")}  {moment().add(1, "days").format("dddd, HH:mm")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => closeDueDateMenu(e, "nextWeek")}>
              <ListItemIcon>
                <FastForward fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <Typography   component={'span'} variant="inherit" noWrap>
              {t("next_week")} {moment().add(1, "weeks").format("dddd, HH:mm")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={(e) => closeDueDateMenu(e, "custom")}>
              <ListItemIcon>
                <CalendarToday fontSize="small" style={{ color: "tomato" }} />
              </ListItemIcon>
              <TextField
                inputRef={dueCustomRef}
                id="datetime-local"
                label={t('pick_time')}
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
          label= {t('addNote')}
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
