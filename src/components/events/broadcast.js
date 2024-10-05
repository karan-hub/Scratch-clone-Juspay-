import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useSnackbar } from "notistack";
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

const BroadcastMessage = ({ comp_id }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    message: "",
  });

  /* Display Snackbar */
  const handleClick = () => {
    enqueueSnackbar(state.message, { variant: "info" });
  };

  return (
    <Paper className={classes.paperStyle}>
      <div className="text-center">
        <div className="mb-2">
          <div className="text-white">Message</div>
          <input
            className={classes.inputStyle}
            type="text"
            value={state.message}
            onChange={(e) => {
              e.target.value.length > 0 &&
                setState({ message: e.target.value });
            }}
          />
        </div>
        <div
          id={comp_id}
          className={classes.buttonStyle}
          onClick={() => handleClick()}
        >
          {`Broadcast ${state.message}`}
        </div>
      </div>
    </Paper>
  );
};

export default BroadcastMessage;
