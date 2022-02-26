if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const pgp = require('pg-promise')();
const puppeteer = require('puppeteer');

const connectionSetting = {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_POST,
    database: process.env.POSTGRESQL_DATABASE,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
};
const db = pgp(connectionSetting); // database instance;

async function scrap() {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false,
        ignoreDefaultArgs: true
    });
    const page = await browser.newPage();

    await page.goto(
        'https://www.cwb.gov.tw/V8/C/P/Rainfall/Rainfall_10Min_County.html'
    );
    const result = await page.evaluate(() => {
        const rows = document.querySelectorAll('#sortTable tr');
        return Array.from(rows, row => {
            const columns = row.querySelectorAll('th, td');
            result = Array.from(columns, column => column.innerText);
            return result;
        });
    });

    result.splice(0, 1);
    result.forEach(stationData => {
        let split = stationData[0].split("\n");
        stationData[1] = split[0];
        stationData[0] = split[1].slice(1, -1);
        //check if 10min and 1h are numerical
        stationData[2] = checkNumber(stationData[2]);
        stationData[3] = checkNumber(stationData[3]);
    })

    result.forEach(async (stationData) => {
        try {
            let insertQuery = `INSERT INTO t_station_data 
            (station_id, station_name,ten_min,one_hour) 
            VALUES ($1, $2, $3, $4);`;
            await db.query(insertQuery, stationData.slice(0, 4));
        } catch (err) {
            let updateQuery = `UPDATE t_station_data
            SET ten_min = $1, one_hour = $2
            WHERE station_id = $3;`;
            await db.query(updateQuery, [stationData[2], stationData[3], stationData[0]]);
        }
    });
    await page.waitForSelector("#sortTable")
    await browser.close();

}
function checkNumber(string) {
    if (string == "-") {
        return 0;
    } else {
        return parseFloat(string);
    }
}
scrap();