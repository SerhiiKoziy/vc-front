import express from 'express';
import models from '../../models';

const router = express.Router();

router.get('/', function (req, res) {
  models.User.findAll().then(function (result) {
    res.send(result);
  });
});

router.post('/create', function (req, res) {
  console.log(req.body);
  models.User.create({
    username: req.body.username,
    title: req.body.title,
    experience: req.body.experience,
    cost: req.body.cost,
    inHouse: req.body.inHouse,
  }).then(function (result) {
    res.send({
      success: true,
      result: result,
    });
  });
});

router.get('/:user_id/destroy', function (req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function () {
    res.redirect('/');
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function () {
    res.redirect('/');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function () {
    res.redirect('/');
  });
});


export default router;
