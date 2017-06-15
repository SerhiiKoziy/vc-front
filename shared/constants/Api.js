import getEnvironment from '../../utils/environment';
export const SEND_MAIL = 'http://localhost:9090/user';

const config = {
  local: {
    url: 'http://localhost:9090',
  },
  production: {
    url: 'http://localhost:9000',
  },
};

export function resolveUrl(path) {
  const conf = config[getEnvironment()];
  return `${conf.url}/${path}`;
}
