import { RECEIVE_RECORDS,  SAVE_GAME, RESUME_GAME } from '../actions/consults';

interface IState {
    RecordsArray:  any;
    OneSavedGame:  any;
    TotalNumber:   any;
};

const initialState: object = {
    RecordsArray:  [],
    OneSavedGame:  {},
    TotalNumber:   0,
};

const api_rdcr = (state: IState | object = initialState, action: any): IState | object => {
  switch (action.type) {
    case RECEIVE_RECORDS:
      return Object.assign({}, state, {
           RecordsArray: action.payload
      });

    case SAVE_GAME:
      return Object.assign({}, state, {
          OneSavedGame: action.payload
      });

    case RESUME_GAME:
      return Object.assign({}, state, {
        TotalNumber: action.payload
      });

    default:
      return state;
  }
};

export default api_rdcr;
