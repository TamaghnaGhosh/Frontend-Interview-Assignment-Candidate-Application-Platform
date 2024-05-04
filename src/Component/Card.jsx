/* eslint-disable react/prop-types */
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // minWidth: 200,
    minHeight: 600,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
  },
  //   pos: {
  //     marginBottom: 12,
  //   },
});

const SimpleCard = ({ item }) => {
  const {
    companyName,
    jobRole,
    location,
    jdLink,
    // maxExp,
    minExp,
    jobDetailsFromCompany,
  } = item;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          // gutterBottom
        >
          {bull} Job title - <span>{jobRole}</span>
        </Typography>
        <br />
        <Typography className={classes.title} color="textSecondary">
          {bull} Company name - <span>{companyName}</span>
        </Typography>
        <br />
        <Typography className={classes.title} color="textSecondary">
          {bull} Location - <span>{location}</span>
        </Typography>
        <br />
        <Typography className={classes.title} color="textSecondary">
          {bull} Job description - <span>{jobDetailsFromCompany}</span>
          <br />
        </Typography>
        <br />
        <Typography className={classes.title} color="textSecondary">
          {bull} Experience required - <span>{minExp || "Not Required"}</span>
        </Typography>
        <br />
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          className=""
          style={{ backgroundColor: "dimgray" }}
        >
          <a href={jdLink} style={{ textDecoration: "none", color: "white" }}>
            {jdLink}
          </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export default SimpleCard;
