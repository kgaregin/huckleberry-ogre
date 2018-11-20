import {IS_DEVELOPMENT} from "./client/core/utils/Utils";

/** Parts of url on server requests. */
export const REST_PATH = 'rest';
export const SERVER_PORT = IS_DEVELOPMENT ? 3001 : 80;
export const SERVER_HOSTNAME = IS_DEVELOPMENT ? 'localhost' : 'hqua0071371.online-vm.com';
export const SERVER_ADDRESS = `http://${SERVER_HOSTNAME}:${SERVER_PORT}`;
export const SERVER_REST_ADDRESS = `${SERVER_ADDRESS}/${REST_PATH}`;