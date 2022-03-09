import {
  schemaMigrations,
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: 'categories',
          columns: [{ name: 'sobrenome', type: 'string' }],
        }),
      ],
    },
  ],
});
