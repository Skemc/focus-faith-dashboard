import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Grid,
  TextField,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    margin: "10px",
  },

  formControl: {
    width: "40%",
    margin: "10px",
  },
}));

export default function AddUser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  const handleChangeRole = (event) => {
    setUser({...user, role: event.target.value})
  }
  const handleChangeFirst = (event) => {
    setUser({...user, firstName: event.target.value})
  }
  const handleChangeLast = (event) => {
    setUser({...user, lastName: event.target.value})
  }
  const handleChangeEmail = (event) => {
    setUser({...user, email: event.target.value})
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = await Axios.post("http://localhost:3000/api/new-user", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
    console.log("Submittted==================*******", results);
    // history.push('/');
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
           <Container maxWidth="sm">
            <Grid
              spacing={3}
              style={{
                backgroundColor: "white",
                paddingRight: "30px",
                paddingLeft: "30px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <h3>Create a new user</h3>
              <div style={{ marginBottom: "20px" }}>
                <TextField
                  id="standard-basic"
                  label="First Name"
                  margin="dense"
                  className={classes.text}
                  onChange={handleChangeFirst}
                />
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  margin="dense"
                  className={classes.text}
                  onChange={handleChangeLast}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.role}
                    onChange={handleChangeRole}
                    label="Role"
                  >
                    <MenuItem value="Writer">Writer</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Artist">Artist</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="standard-basic"
                  label="Email"
                  margin="dense"
                  className={classes.text}
                  onChange={handleChangeEmail}
                />
                <br />
                </div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: "20px", fontSize: "12px" }}
                onClick={handleSubmit}
              >
                Create User
              </Button>
            </Grid>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
