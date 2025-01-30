interface InitialState {
  drawer: boolean
}

interface Action {
  type: string
}

const initialState = {
  drawer: true,
};

const toggleDrawer = (state: InitialState) => ({
  ...state,
  drawer: !state.drawer,
});

const reducers: { [key: string]: any } = {
  TOGGLE_DRAWER: toggleDrawer,
};

const modalReducer = (state = initialState, { type }: Action = { type: '' }) => {
  const action = reducers[type];

  if (action) {
    return action(state);
  }
  return state;
};

export default modalReducer;
