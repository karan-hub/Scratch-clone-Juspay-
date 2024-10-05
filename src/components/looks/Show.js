import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    showButton: {
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

const Show = ({ character, comp_id }) => {
  const classes = useStyles();
  // To handle show component
  const handleDisplay = () => {
    const el = document.getElementById(character.active);
    el.style.display = "inline-block";
  };

  return (
    <Paper elevation={3} className="p-4">
      <div
        id={comp_id}
        className={`${classes.showButton} mx-auto`}
        onClick={() => handleDisplay()}
      >
        Show
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

export default connect(mapStateToProps)(Show);
