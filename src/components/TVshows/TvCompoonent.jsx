import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import EditIcon from "@material-ui/icons/Edit";
import VideoComponent from "./VideoComponent.jsx";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    marginTop: '90px'
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
    <VideoComponent open={openModal}/>
    <Card className={classes.root}>
      <CardActionArea onClick={() => setOpenModal(true)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-p4lHX0Wp6Ky0YP-vh0z4UE1xpqkvJPHzGA&usqp=CAU"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: 'flex', justifyContent: 'center'}}>
          <EditIcon/>
          <PlayCircleFilledIcon color="primary" fontSize="large"/>
      </CardActions>
    </Card>
    </>
  );
}
