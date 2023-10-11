import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

export const db = new Sequelize(PGDATABASE!, PGUSER!, PGPASSWORD!, {
    host: PGHOST,
    port: Number(PGPORT),
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

export const dbAuth = async () => {
    try {
        await db.authenticate();
        await db.sync();
    } catch (error) {
        console.log(error);
    }
};
