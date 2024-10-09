const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
  pool: { min: 0, max: 7 },
  log: {
    warn(message) {
      console.log("Knex Warning:", message);
    },
    error(message) {
      console.log("Knex Error:", message);
    },
    deprecate(message) {
      console.log("Knex Deprecation:", message);
    },
    debug(message) {
      console.log("Knex Debug:", message);
    }
  }
});

(async () => {
  try {
    await db.raw('SELECT 1');
    console.log('Kết nối thành công!');
    // await syncDatabase(); // Replace this with your logic if necessary
  } catch (error) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
  }
})();

module.exports = db;
