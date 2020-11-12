import { NODE_ENV, DATA_URL, DATA_TYPE,DATA_DB } from './environments'

const orm = {
	development: {
        url: DATA_URL!,
        type: DATA_TYPE!,
	},
	testing: {
		url: DATA_URL!,
        type: DATA_TYPE!,
	},
	// staging: {
	// 	host: 'localhost',
	// 	port: MONGO_PORT!,
	// 	username: '',
	// 	password: '',
	// 	database: MONGO_DB!
	// },
	production: {
		url: DATA_URL!,
        type: DATA_TYPE!,
	}
}

export default orm[NODE_ENV!]
