import express from 'express';
import models from '../../models';
import sendMessage from '../mailSender';
const router = express.Router();

router.get('/', (req, res) => {
  models.User.findAll({
    include: [
      {
        association: models.User.Skill,
      },
      {
        association: models.User.Work,
      },
      {
        association: models.User.Summary,
      },
    ],
  }).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/create', (req, res) => {
  models.User.create({
    username: req.body.username,
    title: req.body.title,
    experience: req.body.experience,
    interviewDate: req.body.interviewDate,
    whereInterviewed: req.body.whereInterviewed,
    cost: req.body.cost,
    inHouse: req.body.inHouse,
    skills: req.body.skills,
    works: req.body.works,
    summary: req.body.summary,
    image: req.body.image,
    fileName: req.body.fileName,
  }, {
    include: [models.User.Skill, models.User.Work, models.User.Summary],
  }).then((result) => {
    // console.log('result', result);
    res.send({
      success: true,
      result,
    });
  })
    .catch((error) => {
      console.log(error);
    });
});
/* router.post('/upload', function(req, res) {
  // console.log('req form1111', req.body, 'req.image.name', req.body.image);
  const tmpPath = req.image.path;
  const targetPath = './public/images/' + req.image.name;
  fs.rename(tmpPath, targetPath, function(err) {
    if (err) throw err;
    // delete the temporary file, so that the explicitly
    // set temporary upload dir does not get filled with unwanted files
    fs.unlink(tmpPath, function() {
      if (err) throw err;
      res.send('File uploaded to: ' + targetPath + ' - ' + req.files.image.size + ' bytes');
    });
  });
});*/

router.put('/:user_id', (req, res) => {
  /* models.User.Skill.find({
    where: { id: req.params.user_id },
    include: [{ model: models.User.Skill, as: 'Skill' }],
  }).then(function( result ) {
    return result;
  });*/

  /* const updateProfile = {
    username: req.body.username,
    title: req.body.title,
    experience: req.body.experience,
    cost: req.body.cost,
    inHouse: req.body.inHouse,
    skills: req.body.skills,
    image: req.body.image,
    fileName: req.body.fileName,
  };*/
  /* const updateUser = models.User.update(updateProfile,
      { where: { id: req.params.user_id },
  });*/
  /* const createUser = models.User.create(updateProfile, {
    include: [models.User.Skill],
  });*/
  const deleteUser = models.User.destroy({ where: { id: req.params.user_id } });
  const createUser = models.User.create({
    username: req.body.username,
    title: req.body.title,
    experience: req.body.experience,
    interviewDate: req.body.interviewDate,
    whereInterviewed: req.body.whereInterviewed,
    cost: req.body.cost,
    inHouse: req.body.inHouse,
    skills: req.body.skills,
    works: req.body.works,
    summary: req.body.summary,
    image: req.body.image,
    fileName: req.body.fileName,
  }, {
    include: [models.User.Skill, models.User.Work, models.User.Summary],
  });
  Promise.all([
    deleteUser,
    createUser,
  ]).then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
  });
  /* models.User.update({
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
      where: { id: req.params.user_id },
    })
    .then(function (result) {
      res.send(result);
    }).catch(function (err) {
      request.server.log(['error'], err.stack);
    });*/
});
router.delete('/:user_id', (req, res) => {
  models.User.destroy({
    where: {
      id: req.params.user_id,
    },
  }).then(() => {
    res.send({ success: true });
  });
});
router.get('/:user_id', (req, res) => {
  models.User.findAll({
    where: {
      id: req.params.user_id,
    },
  }).then((result) => {
    if (result.length === 0) {
      res.status(404).send('error 404');
    }
    res.send(result);
  })
    .catch((error) => {
      console.log(error);
    });
});
/* router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id,
  }).then(function () {
    res.redirect('/');
  });
});*/

/* router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id,
    },
  }).then(function () {
    res.redirect('/');
  });
});*/

router.post('/contact', (req, res) => {
  models.User.findAll({
    where: {
      id: req.body.userId,
    },
  }).then((result) => {
    if (result.length === 0) {
      res.status(404).send('error 404');
    }
    // console.log('111111111111', req.body);
    // var obj = req.body.from ? req.body.from : req.body;
    sendMessage(req.body.from, result[0]).then((info) => {
      res.send(info);
    });
  })
    .catch((error) => {
      console.log(error);
    });
});


export default router;
