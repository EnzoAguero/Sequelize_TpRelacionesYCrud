module.exports = (sequelize,dataTypes) => {
    let alias = "actor_movie";
    
    let cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        actor_id : {
            type : dataTypes.INTEGER.UNSIGNED,
        },
        movie_id : {
            type : dataTypes.INTEGER.UNSIGNED,
        }
    }

    let config = {
        underscored : true,
        tableName : 'actor_movie'
    }

    const actor_movie = sequelize.define(alias, cols, config);

    return actor_movie
}