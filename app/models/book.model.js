module.exports = (sequelize, Sequelize) => {
    const Books = sequelize.define("books", {
      name: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      total_pages:{
        type:Sequelize.INTEGER
      }
    },      
      {
        timestamps: false
      });
    
  
    return Books;
};