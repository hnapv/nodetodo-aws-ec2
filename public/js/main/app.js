var app = angular.module("app.todos",["xeditable"]);

app.controller("todoController",['$scope','svTodos',function($scope,svTodos){
    $scope.appName= 'Todo Dashboard';
    $scope.formData={}; //tao form dien thong tin
    $scope.loading=true;

    $scope.todos= [];
    //load data from api
    svTodos.get().then(function (dat) {
        $scope.todos = dat.data;
        console.log(dat);
        $scope.loading=false;
    });


    $scope.createTodo= function(){
        var todo={
            text: $scope.formData.text,
            isDone: false
        };
        svTodos.create(todo).then(function(dat){
            $scope.todos=dat.data;
            $scope.formData.text="";
            console.log(dat);
            $scope.loading=false;

        });
    }

    $scope.updateTodo= function(todo){
        console.log("Update todo: ",todo);
        $scope.loading=true;
        svTodos.update(todo).then(function(dat){
            $scope.todo=dat.data;
            $scope.loading=false;
        });

    }
    $scope.deleteTodo= function(todo){
        console.log("Delete: ",todo);
        $scope.loading=true;
        svTodos.delete(todo._id ).then(function(dat){
            $scope.todos=dat.data;
            $scope.loading=false;
        });
    }

}]);
