export default function getEnvironment() {
  if (typeof window !== 'undefined') {
    return window.ENV;
  }
  // console.log('`${conf.url}/${path}`', process.env.NODE_ENV);
  return process.env.NODE_ENV;
}
