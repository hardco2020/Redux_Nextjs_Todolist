import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Formik,Form, useField, FieldAttributes } from "formik";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LanguageOption from "../components/language/language";
import { useAppDispatch } from "../redux/hook";
// import { RootState } from "../redux/reduxStore";
import { loginAction } from '../redux/userSlice'
import  Cookies from 'js-cookie'
const useStyles = makeStyles((theme: Theme) => ({
  paperStyle: {
    padding: 20,
    height: "70vh",
    width: 280,
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      width: "100vh",
    },
  },
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  accountField: {
    marginTop: theme.spacing(2),
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const AccountField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type,
  ...props
}) => {
  const classes = useStyles();
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    // {!!errorText} string empty return false
    <TextField
      placeholder={placeholder}
      fullWidth={true}
      required
      type={type}
      {...field}
      helperText={errorText}
      error={!!errorText}
      className={classes.accountField}
    />
  );
};


const Login: React.FC = () => {
  // ---------------------------CSS
  const classes = useStyles();
  const { t } = useTranslation();
  //--------------Redux
  const history = useHistory();
  // const { entities,error} = useSelector((state:RootState)=> state.user)
  const dispatch = useAppDispatch();
  return (
    <Grid className={classes.container}>
      <div className={classes.logo}>
        <Typography variant="h2" style={{ color: "tomato" }}>
          {" "}
          HardCo.ToDo
        </Typography>
        <Typography variant="h5"> {t('slogan')}</Typography>
      </div>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid className={classes.title}>
          <Avatar style={{ backgroundColor: "tomato" }}>
            <LockOutlined />
          </Avatar>
          <h2 >{t("login")}</h2>
        </Grid>
        <Grid className={classes.title}>
          <LanguageOption/>
        </Grid>
        <Formik
          initialValues={{ account: "", password: "" }}
          onSubmit={async(data, { setSubmitting, resetForm,setErrors }) => {
            setSubmitting(true);
            //make async call
            const response = await dispatch(loginAction({account:data.account,password:data.password}))
            if(loginAction.fulfilled.match(response)){
                const user = response.payload
                console.log(user.account)
                Cookies.set('user',user.account)
                history.push('/list/1')
                // window.location.reload();
            }else{
              if(response.payload?.msg.includes("Password")){
                setErrors({password:response.payload?.msg}) 
              }else{
                setErrors({account:response.payload?.msg})
              }
            }
            setSubmitting(false);
            //如果登入成功？
            //登入失敗要處理錯誤訊息
            // resetForm(); //重置
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (values.account.length <= 3) {
              errors.account = t("account_error_alert_length");
            }
            if (values.password.length <= 5) {
              errors.password = t("password_error_alert_length");
            }
            return errors;
          }}
        >
          {({ values, errors, isSubmitting, handleSubmit }) => (
            <Form>
              <AccountField
                placeholder={t("account_field_placeholder")}
                name="account"
                type="input"
                as={TextField}
              />
              {/* <Field placeholder="請輸入你的註冊帳戶" name="account" type="input" as={TextField}/> */}
              <AccountField
                placeholder={t("password_field_placeholder")}
                name="password"
                type="password"
                as={TextField}
              />
              <FormControlLabel
                control={<Checkbox name="checked" color="primary" />}
                label={t("remember_me")}
                className={classes.accountField}
              />

              <Button
                disabled={isSubmitting}
                type="submit"
                // fullWidth={true}
                style={{ color: "white", backgroundColor: "tomato", cursor:'pointer' }}
                variant="contained"
                className={classes.accountField}
              >
               {isSubmitting===true ? <CircularProgress size="20px" />: t("submit_button")}
              </Button>
              
              <Typography className={classes.accountField}> {t('signupTip')}
                      <Link to="/signup">
                          {t('signup')}
                      </Link>
                </Typography> 
              {/* <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Login;
