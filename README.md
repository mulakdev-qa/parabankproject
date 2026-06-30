# ParaBank Automation

## Scripts

| Test | Command |
|------|---------|
| Registration | `npm run test:sign-in-page` |
| Login | `npm run test:login` |
| Account Balance | `npm run test:balance` |
| All | `npm test` |

## Test Documentation

Excel test cases: `test-data/ParaBank_Test_Cases.xlsx`

Regenerate with:
```bash
npm run generate:excel
```

## Setup

```bash
npm install
npx playwright install
cp .env.example .env
```
