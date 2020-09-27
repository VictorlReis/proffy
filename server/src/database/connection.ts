import knex from 'knex';
import path from 'path';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    pool: {min: 0, max: 7},
    useNullAsDefault: true,
});

export default db;