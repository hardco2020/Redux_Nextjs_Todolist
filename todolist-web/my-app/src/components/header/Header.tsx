import React, { useState } from "react";
import {
  AppBar,
  InputBase,
  makeStyles,
  createStyles,
  Toolbar,
  Typography,
  Avatar,
  Theme,
  alpha,
  Button,
} from "@material-ui/core";
import { Search,Cancel } from "@material-ui/icons";
import { useRef } from "react";
import LanguageOption from "../language/language";
import { useTranslation } from "react-i18next";
import { useHistory} from 'react-router-dom'
import Cookies from "js-cookie";
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
interface HeaderProps{
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
}
const Header: React.FC<HeaderProps> = ({setSearchQuery})=>{
  const history = useHistory();
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false); //控制搜尋欄
  const searchRef = useRef<HTMLInputElement>(null);
  const classes = useStyles({open});
  const handleSearch = ()=>{
    if(searchRef.current!==null){
        setSearchQuery(searchRef.current.value.trim())
    }
  }
  const logout = ()=>{
    Cookies.remove('user')
    history.push('/')
  }
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
            <InputBase placeholder={t("search")} className={classes.input} inputRef={searchRef} onChange={handleSearch} ></InputBase>
            <Cancel className={classes.cancel}onClick ={()=> setOpen(false)}/>
          </div>
          <div className={classes.icons}>
            <Search
              className={classes.searchButton}
              onClick={() => setOpen(!open)}
            />

            <LanguageOption/>
            {/* <Badge badgeContent={4} color="primary" className={classes.badge}>
              <Mail />
            </Badge>

            <Badge badgeContent={4} color="primary" className={classes.badge}>
              <Notifications />
            </Badge> */}
            <Avatar alt={Cookies.get('user')} src="/broken-image.jpg" />
            <Button onClick={()=>logout()}>Sign out </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header