import { ADD_CHARACTER, SET_ACTIVE_CHARACTER, SET_ANGLE } from "./actionTypes";

export const setCharacterAngle = (characterAngle) => ({
  type: SET_ANGLE,
  angle: characterAngle,
});

export const setActive = (character_id) => ({
  type: SET_ACTIVE_CHARACTER,
  id: character_id,
});

export const addCharacter = () => ({
  type: ADD_CHARACTER,
});
