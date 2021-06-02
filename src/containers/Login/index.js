import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { auth } from '../../firebaseConfig'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function Login() {
  const classes = useStyles();

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('Sign out successful')
    }).catch(() => {
      // An error happened.
    });
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      auth.signInWithEmailAndPassword(
        values.email, values.password
        ).then(user => {
        console.log(user)
        }).catch(err => {
        console.log(err)
        })
    },
  });

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          id="input-with-icon-textfield"
          label="Email"
          type="email"
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          name="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
      <Button color="primary" variant="contained" type="submit">
        Submit
      </Button>
      <Button color="primary" onClick={handleLogout} variant="contained" type="button">
        Log Out
      </Button>
    </form>    
  )
}