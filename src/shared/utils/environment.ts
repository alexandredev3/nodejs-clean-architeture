import * as dotenv from 'dotenv';

dotenv.config();
// diretorio do arquivo env
const path = `${__dirname}/../../../.env`;

dotenv.config({ path });

// Database Connection Environment.
export const { TYPEORM_TYPE } = process.env;
export const { TYPEORM_HOST } = process.env;
export const { TYPEORM_PORT } = process.env;
export const { TYPEORM_USERNAME } = process.env;
export const { TYPEORM_PASSWORD } = process.env;
export const { TYPEORM_DATABASE } = process.env;

