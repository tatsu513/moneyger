This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Prisma

ローカル環境のコマンド

- Prismaクライアントの作成
  - yarn dotenv -e .env.development.local yarn prisma generate
- migration fileをローカルアプリ内に反映
  - 修正中や検証中はこちらを使用
  - yarn dotenv -e .env.development.local yarn prisma db push
- schemaを元にmigrationファイルを作成
  - これで生成されたmigration fileが本番へ反映される
  - yarn dotenv -e .env.development.local yarn prisma migrate dev --create-only
- ローカルのDBを確認するplaygroundを起動
  - yarn dotenv -e .env.development.local yarn prisma studio
- schemaの検証
  - yarn dotenv -e .env.development.local prisma validate
- schemaのフォーマット
  - yarn dotenv -e .env.development.local prisma format

### schema更新

TB
https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/add-prisma-migrate-to-a-project#baseline-your-production-environment

- yarn dotenv -e .env.development.local yarn prisma db pull
- schemaを更新
