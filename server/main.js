import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import basicAuth from 'express-basic-auth';
import createHandler from './handlers/application';
import usersHandler from './handlers/users';

const server = express();

// console.log(path.join(__dirname, '/../assets'));
// TODO : add middleware
server.use(bodyParser.json({ limit: '5000mb', uploadDir: './uploads' }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use('/assets', express.static(path.join(__dirname, '/../assets')));
server.use('/public', express.static(path.join(__dirname, '../public')));
server.use('/user', usersHandler);
server.use('/', createHandler('user'));
server.use(basicAuth({
  users: { admin: 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp',
}));
server.use('/admin', createHandler('admin'));
export default server;
