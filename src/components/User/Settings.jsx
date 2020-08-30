import React, { useEffect, useRef, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import verifyToken from "../../helpers/verifyToken";
import JoditEditor from "jodit-react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
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
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50px",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    marginLeft: "10px",
  },
  editor: {
    overflowY: "scroll",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  icons: {
    marginTop: '25px', 
    marginRight: '10px', 
    marginLeft:'2px',
    color: '#3f51b5', 
    fontSize: '17px',
    cursor: 'pointer'
  }
}));

const Settings = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);
  const editor = useRef(null);
  const [content, setContent] = React.useState("");

  const config = {
    // all options from https://xdsoft.net/jodit/doc/
    askBeforePasteHTML: false,
    askBeforePasteFromWord: true, //couse styling issues when pasting from word
    events: {
      afterOpenPasteDialog: (dialog, msg, title, callback) => {
        dialog.close();
        callback();
      },
    },
  };
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [valueFn, setValueFn] = React.useState(false);
  const [valueLn, setValueLn] = React.useState(false);
  const [valuePn, setValuePn] = React.useState(false);
  const [user, setUser] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    image: ''
  });
  const [toast, setToast] = React.useState({
    message: "",
    open: false,
    type: "",
  });
  const [loading, setLoading] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const {payload} = verifyToken(token);
  //   setUser(payload);
  // }, []);

  const handleChange = (event) => {
    setArticle({ ...article, category: event.target.value });
  };

  const handleNewArticle = async () => {
    try {
      const token = localStorage.getItem("token");
      const {firstName, lastName, phone, oldPassword, newPassword, image} = user;
      const results = await Axios.patch(
        "http://localhost:3000/api/user/settings",
        {
          firstName,
          lastName,
          phone, 
          oldPassword,
          newPassword,
          image
        }, 
        {headers: { auth: `${token}` }}
        );
        setToast({
          message: "Data saved successfully",
          open: true,
          type: "success",
        });
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {
      setToast({ message: error.response.data.message, open: true, type: "error" });
    }
  };

  const handleImageUpload = async () => {
    // setLoading(true);
    const { files } = document.querySelector('input[type="file"]');
    console.log("uploaded!!!", files);
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "focus_faith");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    const results = await fetch(
      "https://api.Cloudinary.com/v1_1/focus-faith-family/image/upload",
      options
    );
    const response = await results.json();
    setLoading(false);
    setUser({ ...user, image: response.secure_url });
  };

  const handlePhone = (event) => {
    console.log("eeent", event);
    setUser({ ...user, phone: event.target.value });
  };
  const handleText = (event) => {
    setUser({ ...user, firstName: event.target.value });
  };
  const handleSub = (event) => {
    setUser({ ...user, lastName: event.target.value });
  };
  const handleOldPass = (event) => {
    console.log('fff', event.target.value);
    setUser({ ...user, oldPassword: event.target.value });
  };
  const handleNewPass = (event) => {
    console.log('fff', event.target.value);
    setUser({ ...user, newPassword: event.target.value });
  };
  const handleEditField = () => {
    
  }

  return (
    <div>
      {console.log("birimo biraza?", user)}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast.open}
        autoHideDuration={3000}
        onClose={() =>
          setTimeout(() => setToast({ ...toast, open: false }), 3000)
        }
      >
        <Alert variant="filled" severity={toast.type}>
          {toast.message}
        </Alert>
      </Snackbar>
      <Container
        maxWidth="md"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Grid
          container
          spacing={3}
          style={{
            backgroundColor: "white",
            paddingRight: "50px",
            paddingLeft: "50px",
            paddingTop: "20px",
            paddingBottom: "20px",
            marginTop: "90px",
          }}
          // justify="space-around"
          direction="row"
        >
          <Grid style={{ marginRight: "20%" }}>
            <Grid
              container
              style={{
                // backgroundColor: "lightgray",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.05) ",
              }}
              justify="center"
              alignItems="center"
            >
              {/* <img
                src={
                  props.user.profileimage === "" ? (
                    props.user.profileimage
                  ) : (
                    <PersonIcon />
                  )
                }
              /> */}
              {props.user.profileimage ? (
                <img
                  src={user.image ? user.image : props.user.profileimage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <PersonIcon fontSize="large" />
              )}
            </Grid>
            <Grid>
              <input
                type="file"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={handleImageUpload}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: "20px", fontSize: "12px" }}
                onClick={() => hiddenFileInput.current.click()}
              >
                Upload image
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <h2>User settings</h2>
            <Grid>
              <TextField
                id="standard-basic"
                label="FirstName"
                margin="dense"
                value={!valueFn ? props.user.firstname : user.firstName}
                className={classes.text}
                onChange={handleText}
                disabled={!valueFn ? true : false}
              />
              <EditOutlinedIcon
                className={classes.icons}
                onClick={() => setValueFn(true)}
              />
              <TextField
                id="standard-basic"
                label="Last Name"
                margin="dense"
                value={!valueLn ? props.user.lastname : user.lastName}
                className={classes.text}
                onChange={handleSub}
                disabled={!valueLn ? true : false}
              />
              <EditOutlinedIcon
                className={classes.icons}
                onClick={() => setValueLn(true)}
              />
            </Grid>
            <TextField
              id="standard-basic"
              label="Phone number"
              margin="dense"
              value={!valuePn ? props.user.phone : user.phone}
              className={classes.text}
              onChange={handlePhone}
              disabled={!valuePn ? true : false}
            />
            <EditOutlinedIcon
              className={classes.icons}
              onClick={() => setValuePn(true)}
            />
            <TextField
              id="standard-basic"
              label="Old password"
              margin="dense"
              value={user.oldPassword}
              className={classes.text}
              onChange={handleOldPass}
              required
            />
            <br />
            <TextField
              id="standard-basic"
              label="New password"
              margin="dense"
              value={user.newPassword}
              className={classes.text}
              onChange={handleNewPass}
              required
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{
                marginTop: "20px",
                marginLeft: "38px",
                fontSize: "12px",
              }}
              onClick={handleNewArticle}
            >
              Save
            </Button>
          </Grid>
          {/* <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={toast.open}
              autoHideDuration={3000}
              onClose={() =>
                setTimeout(() => setToast({ ...toast, open: false }), 3000)
              }
            >
              <Alert variant="filled" severity={toast.type}>
                {toast.message}
              </Alert>
            </Snackbar>
            <h3>Post a new article</h3>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                id="standard-basic"
                label="Title"
                margin="dense"
                className={classes.text}
                onChange={handleText}
                required
              />
              <TextField
                id="standard-basic"
                label="Subtitle"
                margin="dense"
                className={classes.text}
                onChange={handleSub}
                required
              />
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={article.category ? article.category : ""}
                  onChange={handleChange}
                  label="Category"
                >
                  {props.categories &&
                    props.categories.map((category) => {
                      return (
                        <MenuItem value={`${category.category_name}`}>
                          {category.category_name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <input
                type="file"
                style={{
                  width: "190px",
                  marginTop: "30px",
                  marginLeft: "80px",
                  marginRight: "-1px",
                }}
                required
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: "2px", fontSize: "8px" }}
                onClick={handleImageUpload}
              >
                <CircularProgress
                  size={15}
                  color="secondary"
                  style={{ display: loading ? "" : "none" }}
                />
                {loading ? "" : !article.image ? "Upload" : "Image uploaded"}
              </Button>
            </div>
            <JoditEditor
              ref={editor}
              value={article.bodyHtml}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => {
                setContent(newContent.target.textContent);
                setArticle({
                  ...article,
                  bodyHtml: newContent.target.innerHTML,
                });
              }} // preferred to use only this option to update the content for performance reasons
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginTop: "20px", fontSize: "12px" }}
              onClick={handleNewArticle}
            >
              Submit
            </Button> */}
        </Grid>
      </Container>
    </div>
  );
};

export default Settings;
