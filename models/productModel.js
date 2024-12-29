module.exports = (sequelize, Datatypes) => {
    const Product = sequelize.define("product",  {
        title: {
            type: Datatypes.STRING,
            allowNull: false
        },
        price: {
            type: Datatypes.INTEGER
        },
        description: {
            type: Datatypes.TEXT
        },
        published: {
            type: Datatypes.BOOLEAN
        }
    })

    return Product
}