const env = process.env;

export const NODE_ENV: string = env.NODE_ENV || 'development';
export const AUTHOR: string = env.AUTHOR || 'Anh.Ho';

//application
export const PRIMARY_COLOR: string = env.PRIMARY_COLOR || 'blue';
export const PORT: number = +env.PORT || 3000;

//database
export const DATA_DB: string = env.MONGO_DB || 'anh-ho-db';
export const DATA_PORT: number = +env.MONGO_PORT || 2717;
export const DATA_URL: string = `mongodb://localhost:${DATA_PORT}/${DATA_DB}`;
export const DATA_TYPE: string = env.DATA_TYPE || 'mongodb';

//jwt 
export const JWT_SECRET: string =process.env.JWT_SECRET || 'anh dep trai'
