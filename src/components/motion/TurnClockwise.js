import React, { useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import RedoIcon from "@material-ui/icons/Redo";
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

const TurnClockWise = ({ character, characterAngle, comp_id }) => {
  const classes = useStyles();
  const [angle, setAngle] = useState(0);

  // handle turn clockwise component
  const handleClick = () => {
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + angle}deg)`;
      characterAngle(character_angle.angle + angle);
    }
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h5" component="h2" gutterBottom>
        Turn Clockwise
      </Typography>
      <div className={classes.inputContainer}>
        <Typography variant="body1" component="p">
          Rotate By:
        </Typography>
        <TextField
          className={classes.input}
          type="number"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
          label="Degrees"
        />
      </div>
      <Button
        id={comp_id}
        className={classes.button}
        onClick={() => handleClick()}
      >
        Turn <RedoIcon className="mx-2" /> {angle} degrees
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

// mapping function to component
const mapDispatchToProps = (dispatch) => {
  return {
    characterAngle: (angle) => dispatch(setCharacterAngle(angle)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnClockWise);
