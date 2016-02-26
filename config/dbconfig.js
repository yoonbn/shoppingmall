var config = {
        "host": process.env.JOGON_DB_SERVER,
        "port": process.env.JOGON_DB_PORT,
        "user": process.env.JOGON_DB_USERNAME,
        "password": process.env.JOGON_DB_PASSWORD,
        "database": process.env.JOGON_DB,
        "ssl": "Amazon RDS",
        "debug": true
}

module.exports = config;