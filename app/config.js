const env = process.env;

const dbhost = env['DB_HOST'] || 'localhost';
const dbport = env['DB_PORT'] || '5432';
const dbuser = env['DB_USER'] || 'maptop';
const dbpass = env['DB_PASS'] || 'maptop';
const dbdb = env['DB_DATABASE'] || 'maptop';

export default {
    knex: {
        client: 'pg',
        connection: {
            host: dbhost,
            port: dbport,
            user: dbuser,
            password: dbpass,
            database: dbdb,
            charset: 'utf8',
            timezone: 'UTC'
        },
        pool: {
            min: 0,
            max: 10
        }
    }
}
