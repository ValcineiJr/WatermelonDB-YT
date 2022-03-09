import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '../model/schema';
import migrations from '../model/migrations';

import Categories from '../model/categories';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'Teste',
});

export const database = new Database({
  adapter,
  modelClasses: [Categories],
});
