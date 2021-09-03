import { TextField } from "@material-ui/core";
import { Formik } from "formik";

const Login: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "bob" }}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
