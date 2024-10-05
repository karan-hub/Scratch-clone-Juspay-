import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    hideMessageButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      borderRadius: theme.spacing(1),
      cursor: "pointer",
      textAlign: "center",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
);

const HideMessage = ({ character, comp_id }) => {
  const classes = useStyles();
  /* Hide Message */
  const displayMessage = () => {
    window.clearTimeout();
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);
    el.style.display = "none";
    el2.style.display = "none";
  };

  return (
    <Paper elevation={3} className="p-4">
      <div
        id={comp_id}
        onClick={() => displayMessage()}
        className={`${classes.hideMessageButton} mx-auto`}
      >
        Hide Message
      </div>
    </Paper>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(HideMessage);
