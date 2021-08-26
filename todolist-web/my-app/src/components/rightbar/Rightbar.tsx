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
} from "@material-ui/core";
import {
  Add,
  AttachFile,
  EventNote,
  Notifications,
  RadioButtonUnchecked,
  Replay,
  WbSunny,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useRef } from "react";
import { useAppDispatch} from "../../redux/hook";
import { updateTodo } from "../../redux/todoSlice";
import { Todo } from "../../type";

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
    remember:{
      backgroundColor:"white",
      width:"100%",
      '& label.Mui-focused': {
        color: 'tomato',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'tomato',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'tomato',
        },
        '&:hover fieldset': {
          borderColor: 'tomato',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'tomato',
        },
      },
    }
  })
);
interface rightbarProps{
  currentTodo:Todo|null
}

const Rightbar:React.FC<rightbarProps> = ({currentTodo})=> {
  // global state management
  const dispatch = useAppDispatch()
  //local state
  const [addStepState, setAddStepState] = useState<boolean>(false);
  const [changeTaskState, setChangeTaskState] = useState<boolean>(false);
  const updateTitle = useRef<HTMLInputElement>(null);
  //css
  const classes = useStyles();


  //keyboard function
  const UpdateTodo = ()=>{
    if(currentTodo!==null && updateTitle.current!==null){
      const newTodo:Todo ={
        id:currentTodo.id,
        title:updateTitle.current.value,
        completed:currentTodo.completed
      }
      dispatch(updateTodo(newTodo))
    }
  }
  return (
    <Container className={classes.container}>
      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem className={classes.listItem}>
          <RadioButtonUnchecked className={classes.checkIcon} />
          <TextField
            className={classes.taskName}
            onClick={() => setChangeTaskState(true)}
            onBlur={() => UpdateTodo()}
            variant="outlined"
            inputRef = {updateTitle}
            defaultValue={currentTodo?.title}
            multiline={true}
            //rows={5}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <TextField
            className={classes.addTodo}
            id="addStep"
            placeholder="新增步驟"
            aria-label="新增步驟"
            onBlur={() => setAddStepState(false)}
            onClick={() => setAddStepState(true)}
            fullWidth={true}
            InputProps={{
              style: { color: addStepState === false ? "tomato" : "gray" },
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  {addStepState === false ? (
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
        </ListItem>
      </List>

      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem button className={classes.listItem}>
          <WbSunny className={classes.checkIcon} />
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" style={{ color: "tomato" }}>
                新增到我的一天
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
        <ListItem button>
          <Notifications className={classes.checkIcon} />
          <ListItemText primary="提醒我" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <EventNote className={classes.checkIcon} />
          <ListItemText primary="到期日" />
        </ListItem>
        <ListItem button>
          <Replay className={classes.checkIcon} />
          <ListItemText primary="重複" />
        </ListItem>
      </List>
      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
      >
        <ListItem button>
          <AttachFile className={classes.checkIcon} />
          <ListItemText primary="新增檔案" />
        </ListItem>
      </List>
      <List
        component="nav"
        className={classes.list}
        aria-label="mailbox folders"
        style={{padding:"10px"}}
      >
        <TextField
          id="standard-basic"
          label="新增記事"
          multiline={true}
          size="medium"
          className={classes.remember}
          variant="outlined"
          rows={5}
        />
        </List>
    </Container>
  );
}

export default Rightbar;