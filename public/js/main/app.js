var app = angular.module("app.todos", ["xeditable"]);

app.controller("todoController", ['$scope', 'svTodos',($scope, svTodos)=> {
    $scope.appName = 'Todo Dashboard';
    $scope.formData = {}; //tao form dien thong tin
    $scope.loading = true;

    $scope.todos = [];
    // load data from api
    svTodos.get().then(dat=> {
        $scope.todos = dat.data;
        console.log(dat);
        $scope.loading = false;
    });

    // async svTodos.get()=> {
    //     try{
    //         $scope.todos = dat.data;
    //     console.log(dat);
    //     $scope.loading = false;}
    //     catch(e){e}
    // };


    // $scope.createTodo = ()=> {
    //     var todo = {
    //         text: $scope.formData.text,
    //         isDone: false
    //     };
    //     svTodos.create(todo).then(dat=> {
    //         $scope.todos = dat.data;
    //         $scope.formData.text = "";
    //         console.log("data inside===>",dat);
    //         $scope.loading = false;

    //     });
    // }

    $scope.createTodo = async ()=> {
        
            var todo = {
                text: $scope.formData.text,
                isDone: false
            }
            
            let postTodo = await svTodos.create(todo)
            console.log(postTodo,todo);
                $scope.todos = postTodo.data;
                $scope.formData.text = "";
                $scope.loading = false;
        }

    $scope.updateTodo = todo=> {
        console.log("Update todo: ", todo);
        $scope.loading = true;
        svTodos.update(todo).then(function (dat) {
            $scope.todo = dat.data;
            $scope.loading = false;
        });

    }
    $scope.deleteTodo = todo=> {
        console.log("Delete: ", todo);
        $scope.loading = true;
        svTodos.delete(todo._id).then(dat=> {
            $scope.todos = dat.data;
            $scope.loading = false;
        });
    }

}]);
