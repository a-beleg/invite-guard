import { db } from './db';
import { DataTypes } from 'sequelize';

export const User = db.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        is_ordered_paid_key: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_ordered_key: { type: DataTypes.BOOLEAN, defaultValue: false },
        email: { type: DataTypes.STRING, defaultValue: null },
        first_name: { type: DataTypes.STRING, defaultValue: null },
        last_name: { type: DataTypes.STRING, defaultValue: null },
        phone_number: { type: DataTypes.STRING, defaultValue: null },
        is_staff: { type: DataTypes.INTEGER, defaultValue: 0 },
        is_active: { type: DataTypes.INTEGER, defaultValue: 0 },
        chatID: { type: DataTypes.STRING, defaultValue: null },
        inviteLink: { type: DataTypes.STRING, defaultValue: null },
    },
    { timestamps: false },
);
