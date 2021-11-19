const express = require('express');
const router = express.Router();
const {list,newest,recomended,detail,add,create,edit,update,deleted} = require('../controllers/moviesController');

router.get('/movies', list);
router.get('/movies/new', newest);
router.get('/movies/recommended', recomended);
router.get('/movies/detail/:id',detail);


//Rutas exigidas para la creación del CRUD
router.get('/movies/add', add);
router.post('/movies/create', create);

router.get('/movies/edit/:id', edit);
router.post('/movies/update/:id', update);

router.get('/movies/delete', deleted);


module.exports = router;