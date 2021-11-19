module.exports = (sequelize,dataTypes) => {
    let alias = "Actor";
    
    let cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        first_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        last_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            defaultValue : null            
        },
        favorite_movie_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        }
    }

    let config = {
        underscored : true
    }

    const Actor = sequelize.define(alias, cols, config);


     /* relaciones */

     Actor.associate = models => {
        /* defino las relaciones */
        Actor.belongsToMany(models.Movie,{
            as : 'movies',
            through : 'actor_movie',
            foreignKey : 'actor_id',
            otherKey : 'movie_id'
        })
    }

    return Actor
}