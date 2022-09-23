import { useQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'

type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

type Maybe<T> = T | null

type User = {
  __typename?: 'User'
  created_at: Scalars['DateTime']
  email: Scalars['String']
  email_verified_at?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  name: Scalars['String']
  updated_at: Scalars['DateTime']
}

type UserPaginator = {
  __typename?: 'UserPaginator'
  data: Array<User>
  paginatorInfo: {
    __typename?: 'PaginatorInfo'
    count: Scalars['Int']
    currentPage: Scalars['Int']
    firstItem?: Maybe<Scalars['Int']>
    hasMorePages: Scalars['Boolean']
    lastItem?: Maybe<Scalars['Int']>
    lastPage: Scalars['Int']
    perPage: Scalars['Int']
    total: Scalars['Int']
  }
}

export const useUser = () => {
  const endpoint = 'http://127.0.0.1:8000/graphql'
  return useQuery<UserPaginator>(['users'], async () => {
    const { users } = await request(
      endpoint,
      gql`
        query testUsers {
          users {
            data {
              name
              id
              email
            }
            paginatorInfo {
              currentPage
              count
              lastPage
              total
            }
            __typename
          }
        }
      `,
    )
    return users
  })
}
