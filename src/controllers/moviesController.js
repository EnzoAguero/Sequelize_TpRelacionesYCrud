const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', { movie });
            });
    },
    'newest': (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        db.Genre.findAll()
        .then(genres =>   res.render("moviesAdd", {
            genres
        })).catch(error => console.log(error))
    },
    create: function (req, res) {
        db.Movie.create({                                                /* directamente pido todo lo que esta en req.body en vez de hacer la const con destructuring */
            ...req.body
        }).then((movie) => res.redirect('/movies'           /* preguntar por esto porque movie sin parentesis no lo toma */
           ))


    },
    edit: function (req, res) {
        let Movie = db.Movie.findByPk(req.params.id)
        let genres = db.Genre.findAll()
        Promise.all([genres,Movie])
        .then(([genres,Movie]) => res.render('moviesEdit',{
            genres,
            Movie
        })).catch(error => console.log(error))
        
    },
    update: function (req, res) {
        db.Movie.update(
            {
                ...req.body,
               
            },
            {
                where : {
                    id : req.params.id
                }
            }
        ).then( response => {
            console.log(response)
            return res.redirect('/movies')
        }).catch(error => console.log(error))
    },
    deleted: function (req, res) {
     db.Movie.destroy({
            where : {
                id : req.params.id
            }
        }).then(movie => res.redirect('moviesDelete',{
            movie
        }))
        
        
    }

}

module.exports = moviesController;