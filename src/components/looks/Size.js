import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";

const Size = ({ character, comp_id }) => {
  const [state, setState] = useState({
    scale: 1,
  });
  // To change Size of Sprint
  const changeSize = () => {
    const el = document.getElementById(character.active);
    el.style.transform = `scale(${state.scale})`;
  };

  return (
    <Paper elevation={3} className="p-4 rounded-lg">
      <div className="text-center">
        <div className="mb-4">
          <TextField
            label="Size"
            variant="outlined"
            type="number"
            value={state.scale}
            onChange={(e) =>
              setState({ ...state, scale: parseInt(e.target.value) })
            }
            className="w-full"
          />
        </div>
        <Button
          id={comp_id}
          variant="contained"
          color="primary"
          onClick={() => changeSize()}
          className="w-full py-2"
        >
          Apply Size {state.scale}
        </Button>
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

export default connect(mapStateToProps)(Size);
