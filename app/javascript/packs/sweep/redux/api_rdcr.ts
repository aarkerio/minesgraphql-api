import { DELETE_GAME, FETCH_FAILURE, RECEIVE_RECORDS, SAVE_GAME, RESUME_GAME } from '../actions/consults';

interface IState {
    RecordsArray: any;
    OneSavedGame: any;
    TotalNumber:  any;
    isLoading:    boolean;
    isError:      boolean;
};

const initialState: object = {
    RecordsArray:  [],
    OneSavedGame:  {},
    TotalNumber:   0,
    isLoading: false,
    isError: false
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
          state["RecordsArray"].push(action.payload)
          return Object.assign({}, state, {
              isLoading: true,
              isError: false,
              RecordsArray: state["RecordsArray"]
          });

      case RESUME_GAME:
          return Object.assign({}, state, {
              isLoading: true,
              isError: false,
              OneSavedGame: action.payload
          });

      case DELETE_GAME:
          state["RecordsArray"].push(action.payload)
          return Object.assign({}, state, {
              isLoading: true,
              isError: false,
              RecordsArray: state["RecordsArray"]
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

