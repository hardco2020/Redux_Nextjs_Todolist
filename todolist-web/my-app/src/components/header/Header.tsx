import React, { useState } from "react";
import {
  AppBar,
  InputBase,
  makeStyles,
  createStyles,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Theme,
  alpha,
} from "@material-ui/core";
import { Search, Mail, Notifications, Cancel } from "@material-ui/icons";
export interface StyleProps{
    open : boolean;
}

const useStyles = makeStyles<Theme,StyleProps>((theme:Theme) =>createStyles({
  toolbar: {
    display: "flex",
    alignItems:"center",
    justifyContent: "space-between",
    backgroundColor: "tomato",
  },
  loginbg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  loginsm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: (props)=> (props.open ? "flex" : "none"),
      width:"70%"
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(2),
  },
  cancel:{
    [theme.breakpoints.up("sm")]: {
        display: "none",
        width:"70%"
      }, 
  },
  icons: {
    display: (props)=>(props.open ? "none" : "flex"),
    alignItems: "center",
  },
  badge: {
    marginRight: theme.spacing(2),
  },
  searchButton: {
    marginRight: theme.spacing(2),

    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
  },
}));

export default function Header() {
  const [open, setOpen] = useState<boolean>(false); //控制搜尋欄
  const classes = useStyles({open});
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.loginbg}>
            HardoCo-To.Do
          </Typography>
          <Typography variant="h6" className={classes.loginsm}>
            To.Do
          </Typography>
          <div className={classes.search}>
            <Search />
            <InputBase placeholder="搜尋" className={classes.input}></InputBase>
            <Cancel className={classes.cancel}onClick ={()=> setOpen(false)}/>
          </div>
          <div className={classes.icons}>
            <Search
              className={classes.searchButton}
              onClick={() => setOpen(!open)}
            />
            <Badge badgeContent={4} color="primary" className={classes.badge}>
              <Mail />
            </Badge>

            <Badge badgeContent={4} color="primary" className={classes.badge}>
              <Notifications />
            </Badge>
            <Avatar alt="Remy Sharp" src="/broken-image.jpg" />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
