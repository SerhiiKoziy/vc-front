import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import basicAuth from 'express-basic-auth';
import createHandler from './handlers/application';
import usersHandler from './handlers/users';
const multer = require('multer');

const fileUpload = require('express-fileupload');
const server = express();
const upload = multer({ dest: './uploads' });
// console.log(path.join(__dirname, '/../assets'));
// TODO : add middleware
// server.use(upload.single('image'));
server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json({ limit: '5000mb' }));
server.use(upload.fields([
  { name: 'image' },
  { name: 'imageSummary' },
]));


// server.use(bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, '/files') }))
server.use(cookieParser());
server.use('/assets', express.static(path.join(__dirname, '/../assets')));
server.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
server.use('/public', express.static(path.join(__dirname, '../public')));
server.use('/user', usersHandler);
server.use(fileUpload());
server.use('/', createHandler('user'));
server.use((err, req, res, next) => {
  res.status(500).send();
  next();
});
server.use(basicAuth({
  users: { admin: 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp',
}));
server.use('/admin', createHandler('admin'));
export default server;
