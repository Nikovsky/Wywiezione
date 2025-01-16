import { DataSource } from 'typeorm';
import { User } from './users';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'trash_bundle',
    entities: [User],  // Add all entities here
    synchronize: true, // WARNING: Do not use this option in production
    logging: false,
});
//EOF