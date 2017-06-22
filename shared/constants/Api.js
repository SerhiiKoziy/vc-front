import getEnvironment from '../../utils/environment';
export const SEND_MAIL = 'http://localhost:7070/user';

const config = {
  local: {
    url: 'http://localhost:7070',
  },
  production: {
    url: 'http://m-cv.mobilunity.net',
  },
};

export function resolveUrl(path) {
  const conf = config[getEnvironment()];
  return `${conf.url}/${path}`;
}
