import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import createHandler from './handlers/application';
import usersHandler from './handlers/users';

const server = express();

console.log(path.join(__dirname, '/../assets'));
// TODO : add middleware
server.use(bodyParser.json({ limit: '5000mb' }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use('/assets', express.static(path.join(__dirname, '/../assets')));
server.use('/admin', createHandler('admin'));
server.use('/user', usersHandler);
server.use(createHandler('user'));

export default server;
