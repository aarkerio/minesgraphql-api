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

function headers() {
  let headers = {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      }
  return headers;
}

export const fetchRecords: any = (user_id: number, active:boolean = true) => async (dispatch: any) => {

    try {
        // Query the data
        const response = await client.query({
            query: gql`{
             rates(currency: "USD") {
             currency
            }
          }
        `});
        const result = dispatch(JSON.stringify(response));
        return result;
    } catch (err) {
        console.error('Error loading data: >> ', err.toString());
    }
};

