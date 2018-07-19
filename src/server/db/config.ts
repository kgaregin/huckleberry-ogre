const path = require('path');
const storage = path.resolve('./src/server/db/sqlite/hbogre.db');

export const DB_CONNECTION_OPTIONS = {dialect: 'sqlite', storage};
