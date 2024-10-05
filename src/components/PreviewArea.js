import React, { useState } from "react";
import CatSprite from "./CatSprite";
import { connect } from "react-redux";
import { addCharacter, setActive } from "../redux/character/actions";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Styling for MaterialUI Components
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      color: theme.palette.primary.contrastText,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      color: theme.palette.primary.contrastText,
    },
    button: {
      margin: 0,
      backgroundColor: theme.palette.secondary.main,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(1, 2),
      transition: 'all 0.3s ease',
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
        transform: 'scale(1.05)',
      },
    },
  })
);

function PreviewArea({ character, add_character, set_active }) {
  const classes = useStyles();
  const [active, setActive] = useState(character.active);
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let elmnt = null;

  function dragMouseDown(e, id) {
    elmnt = document.getElementById(id);
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const handleChange = (e) => {
    setActive(e.target.value);
    set_active(e.target.value);
  };

  return (
    <div
      className="w-full flex-none h-full overflow-y-auto p-6 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500"
      id="preview_area"
    >
      <div className="flex justify-between items-center mb-10 bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-lg">
        <div className="font-bold text-xl text-center border-2 rounded-lg text-white bg-gradient-to-r from-green-400 to-blue-500 p-3 w-auto transform hover:scale-105 transition-transform duration-300 shadow-lg">
          Preview Area
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="active-character-label" className="text-white">
            Active Character
          </InputLabel>
          <Select
            labelId="active-character-label"
            id="active-character-select"
            value={active}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            {character.characters.map((x, i) => {
              const name = x.id.charAt(0).toUpperCase() + x.id.slice(1);
              return (
                <MenuItem key={i} value={x.id}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          className={`${classes.button} bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500`}
          startIcon={<AddCircleIcon />}
          onClick={() => add_character()}
        >
          Create Character
        </Button>
      </div>
      <div className="flex justify-around h-full relative">
        {character.characters.map((x, i) => (
          <div
            id={`${x.id}-${i}`}
            key={i}
            className="absolute cursor-move transition-all duration-300 ease-in-out transform hover:scale-105 hover:rotate-3"
            onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
          >
            <div id={`${x.id}-div`} className="character">
              <div
                className="hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap bg-white rounded-lg shadow-md text-gray-800"
                id={`${x.id}-message-box`}
              ></div>
              <div
                className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap bg-white shadow-sm"
                id={`${x.id}-message-box1`}
              ></div>
              <CatSprite charac_id={x.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  character: state.character,
});

const mapDispatchToProps = (dispatch) => ({
  add_character: () => dispatch(addCharacter()),
  set_active: (ch_id) => dispatch(setActive(ch_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewArea);
