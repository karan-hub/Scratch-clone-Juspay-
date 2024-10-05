import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    hideButton: {
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

const Hide = ({ character, comp_id }) => {
  const classes = useStyles();
  // To handle hide component
  const handleDisplay = () => {
    const el = document.getElementById(character.active);
    el.style.display = "none";
  };
  return (
    <Paper elevation={3} className="p-4">
      <div
        id={comp_id}
        className={`${classes.hideButton} mx-auto`}
        onClick={() => handleDisplay()}
      >
        Hide
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

export default connect(mapStateToProps)(Hide);
