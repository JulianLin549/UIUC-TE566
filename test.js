// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
// const pgp = require('pg-promise')();

// const connectionSetting = {
//     host: process.env.POSTGRESQL_HOST,
//     port: process.env.POSTGRESQL_POST,
//     database: process.env.POSTGRESQL_DATABASE,
//     user: process.env.POSTGRESQL_USER,
//     password: process.env.POSTGRESQL_PASSWORD,
//     ssl: {
//         rejectUnauthorized: false
//     }
// };
// const db = pgp(connectionSetting); // database instance;

// let insertQuery = `INSERT INTO t_station_data 
//             (station_id, station_name,ten_min,one_hour) 
//             VALUES ($1, $2, $3, $4);`;
// db.query(insertQuery, ["123", "123", NaN, NaN]);
function checkNumber(string) {
    if (string == "-") {
        return 0;
    } else {
        return parseFloat(string);
    }
}
console.log(checkNumber("0.5"))
// let test = "-";
// var g = parseFloat(test);
// console.log(g);