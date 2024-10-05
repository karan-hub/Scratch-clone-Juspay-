import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main, // Changed background color
    color: theme.palette.secondary.contrastText, // Changed text color
    boxShadow: theme.shadows[3],
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    "&:focus": {
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[1],
    },
  },
  button: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.main, // Changed button background color
    color: theme.palette.primary.contrastText, // Changed button text color
    "&:hover": {
      backgroundColor: theme.palette.primary.dark, // Changed button hover background color
    },
  },
}));

const GotoXY = ({ character, comp_id }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    goto_x: 0,
    goto_y: 0,
  });

  // go to position X and Y
  const gotoXY = () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    el.style.left = state.goto_x + "px";
    el.style.top = state.goto_y + "px";
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h5" component="h2" gutterBottom>
        Go to Position
      </Typography>
      <div className={classes.inputContainer}>
        <Typography variant="body1" component="p">
          X
        </Typography>
        <TextField
          className={classes.input}
          type="number"
          value={state.goto_x}
          onChange={(e) => {
            parseInt(e.target.value) !== 0 &&
              setState({ ...state, goto_x: parseInt(e.target.value) });
          }}
        />
      </div>
      <div className={classes.inputContainer}>
        <Typography variant="body1" component="p">
          Y
        </Typography>
        <TextField
          className={classes.input}
          type="number"
          value={state.goto_y}
          onChange={(e) => {
            parseInt(e.target.value) !== 0 &&
              setState({ ...state, goto_y: parseInt(e.target.value) });
          }}
        />
      </div>
      <Button
        id={comp_id}
        className={classes.button}
        onClick={() => gotoXY()}
      >
        Go to X : {state.goto_x} Y : {state.goto_y}
      </Button>
    </Paper>
  );
};

// mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(GotoXY);
