/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date custom scalar type */
  Date: { input: any; output: any };
};

export type Film = {
  __typename?: 'Film';
  banner: Scalars['String']['output'];
  description: Scalars['String']['output'];
  director: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  releaseDate: Scalars['Date']['output'];
  rtScore: Scalars['Int']['output'];
  runningTime: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type HelloWorld = {
  __typename?: 'HelloWorld';
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  placeholder?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  film?: Maybe<Film>;
  helloWorld: HelloWorld;
  placeholder?: Maybe<Scalars['String']['output']>;
};

export type QueryFilmArgs = {
  filmId: Scalars['String']['input'];
};

export type GetHelloWorldQueryVariables = Exact<{ [key: string]: never }>;

export type GetHelloWorldQuery = {
  __typename?: 'Query';
  helloWorld: { __typename?: 'HelloWorld'; message?: string | null };
};

export type GetFilmQueryVariables = Exact<{
  filmId: Scalars['String']['input'];
}>;

export type GetFilmQuery = {
  __typename?: 'Query';
  film?: {
    __typename?: 'Film';
    id: string;
    title: string;
    image: string;
    banner: string;
    description: string;
    director: string;
    releaseDate: any;
    runningTime: number;
    rtScore: number;
  } | null;
};

export const GetHelloWorldDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetHelloWorld' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'helloWorld' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetHelloWorldQuery, GetHelloWorldQueryVariables>;
export const GetFilmDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFilm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filmId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'film' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filmId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filmId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'director' } },
                { kind: 'Field', name: { kind: 'Name', value: 'releaseDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'runningTime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rtScore' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFilmQuery, GetFilmQueryVariables>;
