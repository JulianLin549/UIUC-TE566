const pgp = require('pg-promise')();
const conn = {
    host: "localhost",
    user: "user",
    password: "password",
    port: 5432,
};
module.exports = pgp(conn);