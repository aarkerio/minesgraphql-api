import { FETCH_FAILURE, RECEIVE_RECORDS, SAVE_GAME, RESUME_GAME } from '../actions/consults';

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
              isLoading: true,
              isError: false,
              RecordsArray: action.payload
          });

      case SAVE_GAME:
          const newRecordsArray: any[] = state.RecordsArray.push(action.payload);
          console.log("  ############  ** SAVE_GAME reducer ** :  >>>> ", JSON.stringify(state));
          return Object.assign({}, state, {
              isLoading: true,
              isError: false,
              RecordsArray: newRecordsArray
          });

      case RESUME_GAME:
          return Object.assign({}, state, {
              isLoading: true,
              isError: false,
              OneSavedGame: action.payload
          });

      case FETCH_FAILURE:
          return {
              ...state,
              isLoading: false,
              isError: true,
          };

      default:
          return state;
  }
};

export default api_rdcr;

