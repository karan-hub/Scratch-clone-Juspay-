import React, { useState } from "react";
import { connect } from "react-redux";
import { setWait } from "../../redux/events/eventActions";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    paperStyle: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: theme.spacing(1),
      boxShadow: theme.shadows[3],
    },
    inputStyle: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
      fontSize: 16,
      width: 'calc(100% - 16px)',
      '&:focus': {
        boxShadow: `${theme.shadows[1]}, 0 0 25px ${theme.palette.primary.main}`,
      },
    },
    buttonStyle: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderRadius: theme.spacing(1),
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
  })
);

const Wait = ({ events, comp_id, set_wait }) => {
  const classes = useStyles();
  const [wait, setStateWait] = useState(0);

  // Set Wait value for current component
  function handleChange(e) {
    let val = parseInt(e.target.value);
    setStateWait(val);
    let curr = events.wait;
    curr[comp_id] = val;
    set_wait(curr);
  }
  return (
    // Wait Component
    <Paper className={classes.paperStyle}>
      <div className="text-center">
        <div className="mb-2">
          <div className="text-white">Wait</div>
          <input
            className={classes.inputStyle}
            type="number"
            value={wait}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div
          id={comp_id}
          className={classes.buttonStyle}
        >
          Wait {wait} seconds
        </div>
      </div>
    </Paper>
  );
};

// map state to component
const mapStateToProps = (state) => {
  return {
    events: state.event,
  };
};

// map function to component
const mapDispatchToProps = (dispatch) => {
  return {
    set_wait: (value) => dispatch(setWait(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wait);
