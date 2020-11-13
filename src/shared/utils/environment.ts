import * as dotenv from 'dotenv';

// diretorio do arquivo env
const path = `${__dirname}/../../../.env`;

dotenv.config({ path });

// Json Web Token Enviroment;
export const {
  SECRET,
  EXPIRES_IN
} = process.env;

// Database Connection Environment;
export const { 
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE
} = process.env;