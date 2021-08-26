import {
  Container,
  Typography,
  Theme,
  makeStyles,
  createStyles,
  Divider,
} from "@material-ui/core";
import {
  Home,
  WbSunny,
  StarBorder,
  EventNote,
  Person,
  Add,
  ArrowBackIos,
  Email,
  History,
  Info,
  Settings,
  ArrowForward,
} from "@material-ui/icons";


const useStyles = makeStyles<Theme,StyleProps>((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      color: "#555",
      paddingTop: theme.spacing(8),
      backgroundColor: "#f4f4f4",
      [theme.breakpoints.up("sm")]: {
        backgroundColor: "#f4f4f4",
        color: "#555",
        border: "1px solid #ece7e7",
      },
    },
    sidebarHeader: {
      flex: 1,
    },
    sidebarContent: {

      flex:(props)=>(props.sidebarTextState ? 5 : 12),
      [theme.breakpoints.down("sm")]: {
      flex:(props)=>(props.sidebarTextState ? 12 : 5),
    },
    },
    sidebarFooter: {

      flex:(props)=>(props.sidebarTextState ? 5 : 1),
      [theme.breakpoints.down("sm")]: {
      flex:(props)=>(props.sidebarTextState ? 1 : 4),
     },
    },
    sidebarFooterIcon:{
        
      display:"flex",
      justifyContent:"space-around",
      flexDirection:(props)=>(props.sidebarTextState ? "column": "row"),
      [theme.breakpoints.down("sm")]: {
            flexDirection:(props)=>(props.sidebarTextState ? "row": "column"),
        },

    },
    sidebarFooterDivider:{
        marginBottom:theme.spacing(1),
    },
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
      display: (props) => (props.sidebarTextState===true ? "none" : "flex" ),
      [theme.breakpoints.down("sm")]: {
      display: (props) => (props.sidebarTextState===true ? "flex" : "none" ),
      },
    },
    footerIcon:{
      
       marginBottom:(props)=>(props.sidebarTextState ? theme.spacing(3) : theme.spacing(0)),
      [theme.breakpoints.down("sm")]: {
       marginBottom:(props)=>(props.sidebarTextState ? theme.spacing(0) : theme.spacing(3)),
        cursor: "pointer",
      },
    }
  })
);

export interface StyleProps {
    sidebarTextState : boolean
}
interface sidebarProps{
    sidebarTextState : boolean
    setSidebarTextState:  React.Dispatch<React.SetStateAction<boolean>>
}
const Sidebar: React.FC<sidebarProps> = ({sidebarTextState,setSidebarTextState}) => { 
  //const [sidebarTextState,setSidebarTextState] = useState<boolean>(false)
  const classes = useStyles({sidebarTextState});
  return (
    <Container className={classes.container}>
      <div className={classes.sidebarHeader}>
        {sidebarTextState ? <ArrowForward onClick={()=>setSidebarTextState(false)}/> : <ArrowBackIos onClick={()=>setSidebarTextState(true)}/> }
      </div>
      <div className={classes.sidebarContent}>
        <div className={classes.item}>
          <WbSunny className={classes.icon} />
          <Typography className={classes.text}>我的一天</Typography>
          <Typography className={classes.text} style={{marginLeft:"auto"}}>1</Typography>
        </div>
        <div className={classes.item}>
          <StarBorder className={classes.icon} />
          <Typography className={classes.text}>重要</Typography>
          <Typography className={classes.text} style={{marginLeft:"auto"}}>3</Typography>
        </div>
        <div className={classes.item}>
          <EventNote className={classes.icon} />
          <Typography className={classes.text}>已計劃</Typography>
          <Typography className={classes.text} style={{marginLeft:"auto"}}>5</Typography>
        </div>
        <div className={classes.item}>
          <Person className={classes.icon} />
          <Typography className={classes.text}>指派給您</Typography>
          <Typography className={classes.text} style={{marginLeft:"auto"}}>2</Typography>
        </div>
        <div className={classes.item}>
          <Home className={classes.icon} />
          <Typography className={classes.text}>工作</Typography>
          <Typography className={classes.text} style={{marginLeft:"auto"}}>1</Typography>
        </div>
        <div className={classes.item}>
          <Add className={classes.icon} />
          <Typography className={classes.text} style={{ color: "blue" }}>
            新增清單
          </Typography>
        </div>
      </div>

      <div className={classes.sidebarFooter}>
        <Divider className={classes.sidebarFooterDivider}/>
        <div className={classes.sidebarFooterIcon}>
        <Person className={classes.footerIcon} />
        <Email className={classes.footerIcon} />
        <History className={classes.footerIcon} />
        <Info className={classes.footerIcon} />
        <Settings className={classes.footerIcon} />
        </div>
    </div>
    </Container>
  );
}
export default  Sidebar; 