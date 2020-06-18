import { RECEIVE_RECORDS,  SAVE_GAME, RESUME_GAME } from '../actions/consults';

const initialState: object = {
    TestsArrayProp:       [],
    OneTestArrayProp:     {},
    OneQuestionArrayProp: {},
};

const api_rdcr = (state: object = initialState, action: any) => {
  switch (action.type) {
    case RECEIVE_RECORDS:
      return Object.assign({}, state, {
           TestsArrayProp: action.payload
      });

    case SAVE_GAME:
      return Object.assign({}, state, {
          OneQuestionArrayProp: action.payload,
          AnswersArrayProp: action.OneQuestionArrayProp.answers
      });

    case RESUME_GAME:
      return Object.assign({}, state, {
        SearchArrayProp: action.payload.results,
        TotalNumberProp: action.payload.total
      });

    default:
      return state;
  }
};

export default api_rdcr;
