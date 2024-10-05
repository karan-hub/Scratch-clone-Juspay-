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
    backgroundColor: theme.palette.primary.main, // Changed background color
    color: theme.palette.primary.contrastText, // Changed text color
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
    backgroundColor: theme.palette.secondary.main, // Changed button background color
    color: theme.palette.secondary.contrastText, // Changed button text color
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark, // Changed button hover background color
    },
  },
}));

// Move Component for Sidebar
const Move = ({ character, comp_id }) => {
  const classes = useStyles();
  const [steps, setSteps] = useState(0);

  // Function used for moiving Sprint
  const handleClick = () => {
    const el = document.getElementById(`${character.active}-div`);

    var left = el.offsetLeft;
    el.style.position = "relative";
    el.style.left = left + steps + "px";
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h5" component="h2" gutterBottom>
        Move X
      </Typography>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.input}
          type="number"
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value))}
          label="Steps"
        />
      </div>
      <Button
        id={comp_id}
        className={classes.button}
        onClick={() => handleClick()}
      >
        Move {steps} steps
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

export default connect(mapStateToProps)(Move);
