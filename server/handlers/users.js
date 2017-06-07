import express from 'express';
import models from '../../models';
import sendMessage from '../mailSender';
import fs from 'fs';
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

router.put('/:user_id', function (req, res) {
  /* models.User.Skill.find({
    where: { id: req.params.user_id },
    include: [{ model: models.User.Skill, as: 'Skill' }],
  }).then(function( result ) {
    return result;
  });*/

  // other

  var updateProfile = {
    username: req.body.username,
    title: req.body.title,
    experience: req.body.experience,
    cost: req.body.cost,
    inHouse: req.body.inHouse,
    skills: req.body.skills,
    image: req.body.image,
    fileName: req.body.fileName,
  };
  console.log('product', req);
  models.User.update(updateProfile,
    { where: { id: req.params.user_id }, include: [models.User.Skill] });


  var filter = {
    where: {
      id: req.params.user_id,
    },
    include: [models.User.Skill],
  };

  /* models.User.findOne(filter).then(function (product) {
    console.log('product', product);
    if (product) {
      return models.User.updateAttributes(updateProfile).then(function (result) {
        res.send(result);
      });
    } else {
      throw new Error('no such product type id exist to update');
    }
  });*/
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

router.post('/:id/contact', (req, res) => {
  models.User.findAll({
    where: {
      id: req.params.id,
    },
  }).then(function (result) {
    if (result.length === 0) {
      res.status(404).send('error 404');
    }
    sendMessage(req.body.from, result[0]).then((info) => {
      res.send(info);
    });
  });
});

export default router;
