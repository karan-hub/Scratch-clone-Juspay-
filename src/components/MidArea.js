import React from "react";
import { connect } from "react-redux";
import { addList } from "../redux/midarea/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { purple } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

// Styling for MaterialUI Components
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: 0,
    },
  })
);

// Customized button for Running Lists
const RunButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    fontSize: "13px",
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

// Mid Area Component
function MidArea({ area_list, add_list, event_values }) {
  const classes = useStyles();
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  // Handle Running the list
  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;

    let repeat = 1;

    let str1 = `comp${arr[i]}-${id}-${i}`;

    // Handle Wait at first index
    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    }

    // Handle Repeat at first index
    else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    /* Each function execution takes 2 seconds */
    var cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }

      // Handle Wait
      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      }
      // Handle Repeat Component at current index
      else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      }
      // If Repeat component is at previous index
      else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };
  return (
    <div className="flex-1 h-full overflow-auto p-3">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg mb-4">
        <div className="font-bold text-xl text-white bg-opacity-80 bg-green-400 py-2 px-4 rounded-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
          Mid Area
        </div>

        <Button
          variant="contained"
          color="secondary"
          className={`${classes.button} hover:bg-pink-600 transition-colors duration-300 ml-4`}
          startIcon={<AddIcon />}
          onClick={() => add_list()}
        >
          Add List
        </Button>
      </div>
      <div className="grid grid-flow-col gap-4">
        {area_list.midAreaLists.map((l) => (
          <div className="w-64" key={l.id}>
            <Paper elevation={3} className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              <Droppable droppableId={l.id} type="COMPONENTS">
                {(provided) => (
                  <ul
                    className={`${l.id} w-full min-h-[200px] bg-white rounded-md p-3`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="text-center mb-4">
                      <RunButton
                        variant="contained"
                        className={`${classes.button} transform hover:scale-105 transition-transform duration-200`}
                        startIcon={<PlayArrowIcon />}
                        onClick={() => handleClick(l.comps, l.id)}
                      >
                        Run
                      </RunButton>
                    </div>

                    {l.comps && l.comps.map((x, i) => {
                      const str = `${x}`;
                      const component_id = `comp${str}-${l.id}-${i}`;

                      return (
                        <Draggable
                          key={`${str}-${l.id}-${i}`}
                          draggableId={`${str}-${l.id}-${i}`}
                          index={i}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 transition-all duration-200 hover:shadow-md"
                            >
                              {getComponent(str, component_id)}
                              {provided.placeholder}
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    area_list: state.list,
    event_values: state.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_list: () => dispatch(addList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
