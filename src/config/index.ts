import commConfig from './config.comm';
import localConfig from './config.local';
import prodConfig from './config.prod';

const configs = {
  local: localConfig,
  prod: prodConfig,
  comm: commConfig,
};

const env = process.env.NODE_ENV || 'prod';

export default [() => configs[env], () => configs.comm];
