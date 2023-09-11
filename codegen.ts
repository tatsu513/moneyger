/* eslint-disable */
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/schema.graphql',
  documents: ['src/app/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}','graphql/queries/**/*.graphql'],
  config: {
    skipTypename: true,
    skipTypeNameForRoot: true,
    arrayInputCoercion: false,
    defaultScalarType: 'unknown',
    enumsAsConst: true,
    scalars: {
      ID: 'unknown',
    },
    contextType: 'src/types/context#Context',
  },
  generates: {
    'src/dao/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
    'src/dao/generated/preset/': {
      preset: 'client',
      config: {
        enumsAsTypes: true,
        useTypeImports: true,
      },
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  ignoreNoDocuments: true,
};

export default config;
