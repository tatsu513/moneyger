import DefinedGraphQLType from '@/types/DefinedGraphQLType'
import { AnyVariables, DocumentInput, UseQueryArgs } from 'urql'

const getUrqlVariables = <Result, Variables extends AnyVariables>(
  document: DocumentInput<Result, Variables>,
  variables: Variables,
  suspense: boolean,
  pause?: boolean,
  additionalTypenames?: DefinedGraphQLType[],
): UseQueryArgs<Variables, Result> => {
  return {
    query: document,
    variables,
    context: {
      suspense: true,
      additionalTypenames,
    },
    pause,
  }
}

export default getUrqlVariables
