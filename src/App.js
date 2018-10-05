import React, { Component } from 'react';
import { ApolloProvider, Query, Mutation, Subscription } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';

// Should be in other Components
// import { gql } from 'apollo-boost';
// import { Query, Mutation, Subscription } from 'react-apollo';

import './App.css';

const client = new ApolloClient({ uri: 'http://localhost:3001/graphql' });

export const GET_ITEMS = gql`
  query getItems {
    food {
      id
      name
      category
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={GET_ITEMS}>
          {({ loading, error, data }) => {
            return (
              <div>
                {loading && <h1>Loading..</h1>}
                {error && <h1>There was an Error :(</h1>}
                {data && data.food &&
                  data.food.map(val => (
                    <div key={val.id}>
                      <h1>{val.name}</h1>
                      <Mutation
                        mutation={DELETE_ITEM}
                        refetchQueries={[{ query: GET_ITEMS }]}
                  >                       
                        {(deleteItem, { loading: load, error: err }) => {
                          /* Aliasing destructured variables becuase they're already declared above */
                          return (
                            <div>
                              <button onClick={() => deleteItem({ variables: { id: val.id } })}>
                                Delete Item
                </button>
                              {load && <h1>Loading...</h1>}
                              {err && <h1>{err.message}</h1>}
                            </div>
                          );
                        }}
                      </Mutation>
                    </div>
                  ))}
              </div>
            );
          }}
        </Query>

      </ApolloProvider>
    );
  }
}

export default App;