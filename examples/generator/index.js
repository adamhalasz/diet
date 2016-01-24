// ========================================================
//  Server
// ========================================================
    
    var server = require('../../')
    var app = server()  
    app.listen(3000)
    
// ========================================================
//  Routes
// ========================================================

    app.get('/', function *($){
        // Linear Exection
        $.data.title = yield app.controller.getTitle('Hello')
        $.data.description = yield app.controller.getDescription();
        
        // Parallel Execution
        $.data.counter = yield [
            app.controller.setOne(1),
            app.controller.setTwo(2)
        ]
       
        app.controller.getTitle('Hola', function(error, result){
            $.data.title2 = result;
            $.return()
        })
        
    }, function($){
        $.json()
    })
    
    app.get('/2', function *($){
        // Linear Exection
        $.data.title = yield app.controller.getTitle('Hello')
        $.data.description = yield app.controller.getDescription();
        
        // Parallel Execution
        $.data.counter = yield [
            app.controller.setOne(1),
            app.controller.setTwo(2)
        ]
       
        app.controller.getTitle('Hola', function(error, result){
            $.data.title2 = result;
            console.log('$.return');
            $.json()
        })
        
    })
    
// ========================================================
//  Controllers
// ========================================================
    
    function getTitle(){
        return function(done){
            setTimeout(function(){
                done(null, 'Enigma')
            }, 50)        
        }
    }

    app.controller.getTitle = function(prefix, done){
        setTimeout(function(){
            done(null, prefix +' World')
        }, 50)
    }
    
    app.controller.getDescription = function(done){
        setTimeout(function(){
            done(null, 'How are you?')
        }, 50)
    }
    
    app.controller.setOne = function(newValue, done){
        setTimeout(function(){
            done(null, newValue);
        }, 50)
    }
    
    app.controller.setTwo = function(newValue, done){
        setTimeout(function(){
            done(null, newValue);
        }, 50)
    }


