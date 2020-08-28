import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
 import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
 import { makeStyles } from "@material-ui/core/styles";
 import Modal from "@material-ui/core/Modal";
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
import Tooltip from "@material-ui/core/Tooltip";


 const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
   },
     modal: {
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
     },
   paper: {
     padding: theme.spacing(2),
     textAlign: "center",
     color: theme.palette.text.secondary,
   },
 }));

 const CategoriesComponent = (props) => {
     let history = useHistory();

   const classes = useStyles()
   const [open, setOpen] = React.useState(false);
   const [category, setCategory] = React.useState('');
  const [toast, setToast] = React.useState({
    message: "",
    open: false,
    type: "",
  });
   const handleSubmit = async () => {
     try {
       const token = localStorage.getItem("token");
       const results = await Axios.post(
         "http://localhost:3000/api/new-category",
         {
           categoryName: category,
         },
         {
           headers: { auth: `${token}` },
         }
       );
       console.log("heree we go", results);
       window.location.reload();
       setToast({
         message: "Category created successfully!",
         open: true,
         type: "success",
       });
     } catch (error) {
        setToast({ message: error.message, open: true, type: "error" });
     }
   }
    return (
      <>
        {console.log("prrr", props)}

        <Modal
          open={open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disableAutoFocus
        >
          <Container maxWidth="sm" style={{ outline: 0 }}>
            <Grid container justify="center" alignItems="center">
              <Grid
                spacing={3}
                style={{
                  width: "70%",
                  backgroundColor: "white",
                  paddingRight: "30px",
                  paddingLeft: "30px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
                container
                direction="column"
              >
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
                <h3>Create a new category</h3>
                <TextField
                  id="standard-basic"
                  label="Category name"
                  margin="dense"
                  className={classes.text}
                  onChange={() => setCategory(event.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginTop: "20px", fontSize: "12px" }}
                  onClick={handleSubmit}
                >
                  Create Category
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Modal>
        <Grid
          container
          style={{ marginTop: "90px" }}
          // direction='row'
          justify={props.categories.length < 0 ? "center" : "flex-start"}
          spacing={3}
        >
          {props.categories &&
            props.categories.map((category, index) => {
              // {const {count} = props.categoriesGroup[index]}
              const count = props.categoriesGroup[index];
              return (
                <Grid item>
                  <Grid container direction="row" style={{ width: "230px" }}>
                    <Grid
                      container
                      style={{
                        // width: "230px",
                        backgroundColor: "white",
                        padding: "15px",
                        boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.05) ",
                        borderRadius: "7px",
                        cursor: "pointer",
                      }}
                      alignItems="center"
                      justify="flext-start"
                      direction="column"
                    >
                      <span
                        style={{
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "medium",
                        }}
                      >
                        {category.category_name}
                      </span>
                      <span
                        style={{
                          textAlign: "center",
                          fontSize: "30px",
                          fontWeight: "bolder",
                          color: "#3f51b5",
                        }}
                      >
                        {/* 4 {console.log("what", props.categoriesGroup[index])} */}
                        {props.categoriesGroup[index] ? props.categoriesGroup[index].count : 0}
                      </span>
                      <span style={{ textAlign: "center" }}>articles</span>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            <Grid item>
              <Grid
                container
                style={{
                  width: "30px",
                  // backgroundColor: "white",
                  paddingTop: "50px",
                  // boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.05) ",
                  // borderRadius: "7px",
                  cursor: "pointer",
                }}
                justify="center"
                alignItem="center"
                spacing={2}
              >
                <Tooltip title="Add new category" arrow>
                  <AddCircleOutlineRoundedIcon
                    fontSize="large"
                    color="primary"
                    onClick={() => setOpen(true)}
                  />
                </Tooltip>
              </Grid>
            </Grid>
        </Grid>
      </>
    );
 }

 export default CategoriesComponent;