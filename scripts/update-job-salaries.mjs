// Run with: SANITY_WRITE_TOKEN=<token> node scripts/update-job-salaries.mjs
import { createClient } from '@sanity/client';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('❌ SANITY_WRITE_TOKEN fehlt.');
  process.exit(1);
}

const client = createClient({
  projectId: 'etmanjr2',
  dataset: 'production',
  apiVersion: '2026-04-20',
  token,
  useCdn: false,
});

const updates = [
  {
    id: '30a2f141-5d3f-4e8a-8cd7-b24fce6e4afe',
    label: 'MFA',
    salaryMin: 2400,
    salaryMax: 3200,
    salaryUnit: 'MONTH',
  },
  {
    id: '832bba10-71d4-4620-bef5-14de8fa581a1',
    label: 'Bürokauffrau',
    salaryMin: 2300,
    salaryMax: 3000,
    salaryUnit: 'MONTH',
  },
];

for (const u of updates) {
  console.log(`🔄 ${u.label}: ${u.salaryMin}–${u.salaryMax} EUR/${u.salaryUnit}`);
  await client.patch(u.id).set({
    salaryMin: u.salaryMin,
    salaryMax: u.salaryMax,
    salaryUnit: u.salaryUnit,
  }).commit();
}

console.log('✅ Fertig — beide Stellen haben jetzt Gehaltsangaben für Google for Jobs.');
