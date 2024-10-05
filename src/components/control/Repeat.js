import React, { useState } from "react";
import { connect } from "react-redux";
import { setRepeat } from "../../redux/events/eventActions";
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
    displayStyle: {
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

const Repeat = ({ comp_id, events, set_repeat }) => {
  const classes = useStyles();
  const [repeat, setStateRepeat] = useState(0);

  // Set Repeat value for current component
  function handleChange(e) {
    let val = parseInt(e.target.value);
    setStateRepeat(val);
    let curr = events.repeat;
    curr[comp_id] = val;
    set_repeat(curr);
  }
  return (
    // Repeat Component
    <Paper className={classes.paperStyle}>
      <div className="text-center">
        <div className="mb-2">
          <div className="text-white">Repeat</div>
          <input
            className={classes.inputStyle}
            type="number"
            value={repeat}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div
          id={comp_id}
          className={classes.displayStyle}
        >
          Repeat By {repeat}
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
    set_repeat: (value) => dispatch(setRepeat(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repeat);
