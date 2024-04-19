import {  DataSource, DataSourceOptions } from 'typeorm';
import * as path from "path";
require('dotenv').config()

export const databaseConfig: DataSourceOptions = {
    type:'mysql',
    extra:{
        decimalNumbers: true,
    },
    host:process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || ''),
    username:process.env.DATABASE_USER,
    database:process.env.DATABASE_NAME,
    password:process.env.DATABASE_PASSWORD,
    synchronize: false,
    logging: process.env.ORM_LOGGING === 'true',
    timezone:'+00:00',
    entities:[
        path.resolve(__dirname, `../**/*.entity{.js,.ts}`)
    ],
    migrations: [ path.resolve(__dirname, `./migrations/*{.js,.ts}`)],
    migrationsTableName: "custom_migration_table",
}

const MysqlDataSource = new DataSource(databaseConfig);
export default MysqlDataSource;