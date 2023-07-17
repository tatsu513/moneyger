import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/schema.graphql',
  documents: 'graphql/queries/**/*.graphql',
  generates: {
    'src/dao/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
