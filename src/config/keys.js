import dev from './dev.js';
import prod from './prod.js';

const config = process.env.REACT_APP_ENV === 'development' ? dev : prod;

export default config;
