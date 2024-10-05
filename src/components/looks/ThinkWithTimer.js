import React, { useState } from "react";
import { connect } from "react-redux";
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

const ThinkWithTimer = ({ character, comp_id }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    show_msg: false,
    timer_message: "",
    timer_for_msg: 0,
  });
  /* Display Think Message with Timer */
  const displayMessage = () => {
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);
    if (state.show_msg && state.character_id === character.active) {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      el2.style.display = "none";
      return;
    }
    setState({ ...state, show_msg: true });
    el.style.display = "block";
    el.style.position = "relative";

    el2.style.display = "block";
    el2.style.position = "relative";

    el.innerHTML = state.timer_message;
    window.setTimeout(() => {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      el2.style.display = "none";
    }, state.timer_for_msg * 1000);
  };

  return (
    <Paper className={classes.paperStyle}>
      <div className="text-center">
        <div className="mb-2">
          <div className="text-white">Message</div>
          <input
            className={classes.inputStyle}
            type="text"
            value={state.timer_message}
            onChange={(e) => {
              e.target.value.length > 0 &&
                setState({ ...state, timer_message: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <div className="text-white">Timer:</div>
          <input
            className={classes.inputStyle}
            type="number"
            value={state.timer_for_msg}
            onChange={(e) => {
              parseInt(e.target.value) > 0 &&
                setState({ ...state, timer_for_msg: parseInt(e.target.value) });
            }}
          />
        </div>
        <div
          id={comp_id}
          className={classes.buttonStyle}
          onClick={() => displayMessage()}
        >
          {`Think ${state.timer_message}`}
        </div>
      </div>
    </Paper>
  );
};

// mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(ThinkWithTimer);
