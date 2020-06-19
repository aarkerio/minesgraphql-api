import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

export const RECEIVE_RECORDS  = 'RECEIVE_RECORDS';
export const SAVE_GAME        = 'SAVE_GAME';
export const RESUME_GAME      = 'RESUME_GAME';

const API_URL = '/graphql';
// Create the apollo client
const client = new ApolloClient({
  uri: API_URL
});

export const loadRecords: any = () => async (dispatch: any) => {
    try {
        const response = await client.query({
            query: gql`{
                 getRecords(limit: 6) { id name time}
            }`});
        console.log("  ############  ** RESPONSE ** :  >>>> ", JSON.stringify(response));
        dispatch({
            type: RECEIVE_RECORDS,
            payload: response.data
        });
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
        dispatch({
            type: RECEIVE_RECORDS,
            payload: { msg: err.response.statusText,status: err.response.status }
        });
    }
};

