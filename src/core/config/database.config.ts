import { registerAs } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: getMetadataArgsStorage().tables.map((t) => t.target),
  synchronize: process.env.APP_MODE === 'development',
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
}));
