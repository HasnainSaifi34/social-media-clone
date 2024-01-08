// lib/apollo.ts
import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

let apolloClient: ApolloClient<any>;

function createApolloClient() {
  return new ApolloClient({
    uri: 'http://localhost:3050/graphql',
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
