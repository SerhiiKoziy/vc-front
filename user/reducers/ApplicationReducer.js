export default function ApplicationReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_AREA':
      return {
        ...state,
        area: payload
      };

    default:
      return state;
  }
}
