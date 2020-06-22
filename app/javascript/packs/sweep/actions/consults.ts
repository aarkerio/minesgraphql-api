import gql from 'graphql-tag';
import { DocumentNode } from "graphql";
import { useQuery, useMutation } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

export const FETCH_FAILURE   = 'FETCH_FAILURE';
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';
export const SAVE_GAME       = 'SAVE_GAME';
export const RESUME_GAME     = 'RESUME_GAME';
export const DELETE_GAME     = 'DELETE_GAME';

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
            type: FETCH_FAILURE,
            payload: { msg: err.toString() }
        });
    }
};

export const saveRecord: any = (name: string, time: number) => async (dispatch: any) => {
    try {
        const mutation: DocumentNode = gql`mutation GET_RECORD($name: String!, $time: Int!)
                                           {createRecord(name: $name, time: $time) { id name time createdAt }}`;

        const response = await client.mutate({mutation, variables: {name, time}});

        dispatch({
            type: SAVE_GAME,
            payload: response.data.createRecord
        });
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
        dispatch({
            type: FETCH_FAILURE,
            payload: { msg: err.toString() }
        });
    }
};

export const deleteRecord: any = (id: number) => async (dispatch: any) => {
    try {
        const mutation: DocumentNode = gql`mutation DELETE_RECORD($id: Int!)
                                           {deleteRecord(id: $id) { id }}`;

        const response = await client.mutate({mutation, variables: {id}});
        console.log("  ############  ** RESPONSE SAVE RECORD ** :  >>>> ", JSON.stringify(response));

        dispatch({
            type: DELETE_GAME,
            payload: response.data.deleteRecord
        });
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
        dispatch({
            type: FETCH_FAILURE,
            payload: { msg: err.toString() }
        });
    }
};

