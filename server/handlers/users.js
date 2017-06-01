import express from 'express';
import models from '../../models';
import sendMessage from '../mailSender';

const router = express.Router();

router.get('/', function (req, res) {
  models.User.findAll({
    include: [{
      association: models.User.Skill,
    }],
  }).then(function (result) {
    res.send(result);
  });
});

router.post('/create', function (req, res) {
  models.User.create({
    username: req.body.username,
    title: req.body.title,
    experience: req.body.experience,
    cost: req.body.cost,
    inHouse: req.body.inHouse,
    skills: req.body.skills,
    image: req.body.image,
    fileName: req.body.fileName,
  }, {
    include: [models.User.Skill],
  }).then(function (result) {
    res.send({
      success: true,
      result: result,
    });
  });
});
router.put('/:user_id', function (req, res) {
  models.User.update({
    username: req.body.username,
    title: req.body.title,
    experience: req.body.experience,
    cost: req.body.cost,
    inHouse: req.body.inHouse,
    skills: req.body.skills,
    image: req.body.image,
    fileName: req.body.fileName,
  },
    {
      where: {
        id: req.params.user_id,
      },
    })
    .then(function (result) {
      res.send(result);
    }).catch(function (err) {
      request.server.log(['error'], err.stack);
    });
});
router.delete('/:user_id', function (req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id,
    },
  }).then(function (result) {
    res.send({ success: true });
  });
});
router.get('/:user_id', function (req, res) {
  models.User.findAll({
    where: {
      id: req.params.user_id,
    },
  }).then(function (result) {
    if (result.length === 0) {
      res.status(404).send('error 404');
    }
    res.send(result);
  });
});

//         });
//     }).catch(function (err) {
//         request.server.log(['error'], err.stack);
//     })
// })
router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id,
  }).then(function () {
    res.redirect('/');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id,
    },
  }).then(function () {
    res.redirect('/');
  });
});

router.post('/:id/contact', (req, res) => {
  models.User.findAll({
    where: {
      id: req.params.id,
    },
  }).then(function (result) {
    if (result.length === 0) {
      res.status(404).send('error 404');
    }
    console.log(JSON.stringify(result));
    sendMessage(req.body.from, result[0]).then((info) => {
      res.send(info);
    });
  });
});

export default router;
