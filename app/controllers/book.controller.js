//const { books } = require("../models");
const db = require("../models");
const Books = db.books;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const book = {
      name: req.body.name,
      language: req.body.language,
      price: req.body.price,
      total_pages:req.body.total_pages
    };
  
    // Save Tutorial in the database
    Books.create(book)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Book."
        });
      });
    };

    exports.findAll = (req, res) => {
        const book = Books.findAll(req.body)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Book."
            });
        });
    };

    exports.findOne = (req, res) => {
        const id = req.params.id;
      
        Books.findByPk(id)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Book with id=" + id
            });
        });
    };

    exports.update = (req, res) => {
        const id = req.params.id;
      
        Books.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Book was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Book with id=" + id
            });
        });
    };

    exports.delete = (req, res) => {
        const id = req.params.id;
      
        Books.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Book was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Book with id=" + id
            });
        });
    };

    exports.deleteAll = (req, res) => {
        Books.destroy({
          where: {},
          truncate: false
        })
          .then(nums => {
            res.send({ message: `${nums} Book were deleted successfully!` });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all Book."
            });
        });
    };

    exports.findAllPublished = (req, res) => {
        Books.findAll({ where: { published: true } })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Book."
            });
        });
    };
