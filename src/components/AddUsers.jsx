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
}));

export default function AddUser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {console.log(props)}
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
                    <Container maxWidth="md">
            <Grid
              spacing={3}
              style={{
                backgroundColor: "white",
                paddingRight: "50px",
                paddingLeft: "50px",
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
                  // onChange={handleText}
                />
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  margin="dense"
                  className={classes.text}
                  // onChange={handleSub}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  margin="dense"
                  className={classes.text}
                  // onChange={handleSub}
                />
                <br />
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={'table'}
                    // onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="LifeStyle">Writer</MenuItem>
                    <MenuItem value="Sports">Editor</MenuItem>
                    <MenuItem value="Gospel">Artist</MenuItem>
                  </Select>
                </FormControl>
                </div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: "20px", fontSize: "12px" }}
                // onClick={handleNewArticle}
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
