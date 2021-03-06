import getEnvironment from '../../utils/environment';
export const SEND_MAIL = 'http://localhost:7070/user';

const config = {
  local: {
    url: 'http://localhost:7070',
  },
  production: {
    url: 'http://***.net:9100',
  },
};

export function resolveUrl(path) {
  const conf = config[getEnvironment()];
  // console.log('path url', `${conf.url}/${path}`);
  return `${conf.url}/${path}`;
}
