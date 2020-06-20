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
                 getRecords(limit: 6) { id name time createdAt }
            }`});
        console.log("  ############  ** RESPONSE ** :  >>>> ", JSON.stringify(response.data.getRecords));
        dispatch({
            type: RECEIVE_RECORDS,
            payload: response.data.getRecords
        });
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
        dispatch({
            type: RECEIVE_RECORDS,
            payload: { msg: err.toString() }
        });
    }
};

export const saveRecord: any = (name: string, time: number) => async (dispatch: any) => {
    try {
        const response = await client.query({
            query: gql`{ mutation {
                   createRecord(name: ${name},
                                time: ${time}) { id name time createdAt }
            }}`});
        console.log("  ############  ** MUTATION ** :  >>>> ", JSON.stringify(response.data));
        dispatch({
            type: RECEIVE_RECORDS,
            payload: response.data.getRecords
        });
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
        dispatch({
            type: RECEIVE_RECORDS,
            payload: { msg: err.toString() }
        });
    }
};

