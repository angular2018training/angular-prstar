// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
export const DEBUG_INFO_ENABLED: boolean = !!process.env.DEBUG_INFO_ENABLED;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;
export const TOKEN = 'token';
export const RECAPCHA_KEY = '6Lcc1VIUAAAAANJ1xifrr19yG12kGj8MVKamlHcJ';
export const GOOGLE_PLACE_API_KEY = 'AIzaSyAWmZu85RE81YJ9B3UGzdM197YRNLH62oQ';
export const GOOGLE_MAP_API_KEY = 'AIzaSyAWmZu85RE81YJ9B3UGzdM197YRNLH62oQ';
export const GOOGLE_MAP_API_URL = 'https://maps.google.com/maps/api/js?key=' + GOOGLE_MAP_API_KEY;
export const FILE_SIZE = '3073210';
export const FILE_IMAGE_SIZE = '1024576';
