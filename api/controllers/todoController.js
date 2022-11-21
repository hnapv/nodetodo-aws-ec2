var Todos = require('../models/todoModel');

var getTodos = async (res) => {
    try {
        res.json(await Todos.find())
    }
    catch (err) { res.status(500).json(err); }
}

// function getTodos(res) {
//     Todos.find((err, todos) => {
//         if (err) {
//             res.status(500).json(err);
//         }
//         else {
//             res.json(todos);
//         }
//     });

module.exports = app => {
    //get all todos
    app.get("/api/todos", (req, res) => {
        getTodos(res);
    });
    // /api/todo/123456

    // app.get("/api/todo/:id", (req, res) => {
    //     Todos.findById({ _id: req.params.id }, (err, todo) => {
    //         if (err) {
    //             throw err;
    //         }
    //         else {
    //             res.json(todo);
    //         }
    //     });
    // });

    // app.get("/api/todo/:id", (req, res) => {
    //     Todos.findById({ _id: req.params.id })
    //         .then(result => res.json(result))
    //         .catch(err => console.log(err + ''));
    //     console.log(res);
    // });

    app.get("/api/todo/:id", async (req, res) => {
        try {
            let getId = await Todos.findById({ _id: req.params.id })
            res.json(getId)
        }
        catch (err) { console.log(err + '') }
    });

    //create to do

    // app.post("/api/todo", (req, res) => {
    //     var todo = {
    //         text: req.body.text,
    //         isDone: req.body.isDone
    //     };

    //     Todos.create(todo, (err, todo) => {
    //         if (err) {
    //             throw err;
    //         }
    //         else {
    //             getTodos(res);
    //         }
    //     });
    // });

    app.post("/api/todo", async (req, res) => {
        try {
            var todo = {
                text: req.body.text,
                isDone: req.body.isDone
            }
            await Todos.create(todo)
            getTodos(res)
        }
        catch (e) { console.log(e + '') };
    });

    //update to do

    app.put("/api/todo", async (req, res) => {
        if (!req.body._id) {
            return res.status(500).send("ID is required");
        } else try {
            let updateTd = await Todos.updateOne({
                _id: req.body._id
            }, {
                text: req.body.text,
                isDone: req.body.isDone
            })
            getTodos(res)
        }
        catch (err) { res.status(500).json(err) }
    });

    // app.put("/api/todo", (req, res) => {
    //     if (!req.body._id) {
    //         return res.status(500).send("ID is required");
    //     } else {
    //         Todos.updateOne({
    //             _id: req.body._id
    //         }, {
    //             text: req.body.text,
    //             isDone: req.body.isDone
    //         }, (err, todo) => {
    //             if (err) {
    //                 return res.status(500).json(err);
    //             } else {
    //                 getTodos(res);
    //             }
    //         })
    //     }
    // }
    // );

    app.delete("/api/todo/:id", async (req, res) => {
        try {
            let delTodo = await Todos.deleteOne({ _id: req.params.id })
            getTodos(res)
        }
        catch (err) { res.status(500).json(err) }
    });

    // app.delete("/api/todo/:id", (req, res) => {
    //     Todos.deleteOne({
    //         _id: req.params.id, isDone: false
    //     }, (err, todo) => {
    //         if (err) {
    //             return res.status(500).json(err);
    //         } else {
    //             getTodos(res);
    //         }
    //     })
    // });
};

