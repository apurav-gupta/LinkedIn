import React from "react";
import messageListTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 200,
    padding: theme.spacing.unit * 2
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

function messageCard(props) {
  const { classes } = props;
  return (
    <div onClick={props.onClick}>
      {props.value}
      <Paper className={classes.root} style={{ backgroundColor: "#555" }}>
        {props.value}
        <Grid container spacing={16}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="heading"
                  style={{ color: "white" }}
                >
                  {`${props.membername}`}
                  {/* <br />
                  {`${props.from_email}`} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
messageCard.propTypes = {
  classes: messageListTypes.object.isRequired
};

export default withStyles(styles)(messageCard);
