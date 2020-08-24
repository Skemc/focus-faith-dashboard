import React,{useState} from 'react';
 import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
 import Grid from "@material-ui/core/Grid";
 import { makeStyles } from "@material-ui/core/styles";

 const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

 const CategoriesComponent = (props) => {
    return (
      <Grid container style={{ marginTop: "90px" }} justify={!props.categories ? 'center' : 'flex-end'}>
        <Grid
          container
          style={{
            width: "200px",
            backgroundColor: "white",
            padding: "40px",
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.05) ",
            borderRadius: '7px',
            cursor: 'pointer'
          }}
          justify="center"
        >
          <AddCircleOutlineRoundedIcon fontSize="large" color="primary"/>
        </Grid>
      </Grid>
    );
 }

 export default CategoriesComponent;