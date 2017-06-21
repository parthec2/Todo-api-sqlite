var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{
    'dialect':'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite' 
});

var ToDo = sequelize.define('todo',{
    description:{
        type:Sequelize.STRING, 
        allowNull:false,
        validate:{
            len:[1,300]
        }       
    },
    completed:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
});

sequelize.sync({force:true}).then(function(){
    console.log('Everything is synced');
    ToDo.create(           
        {
            description:'Drink milk with protinules',
            completed:true
        }
       ).then(function(todo){
          return ToDo.create(           
            {
                description:'Do Yoga',            
          });
        // console.log('finished');
        // console.log(todo);
       }).then(function(){
           //return ToDo.findById(2); 
           //find by column values
           return ToDo.findAll({
               where: {
                   description:{
                       $like: '%MILK%'
                   }
               }
           });
       }).then(function(todos){
           todos.forEach(function(todo){
                console.log(todo);
           });
           
       }).catch(function(e){
         console.log(e);  
       });

});//end of sync then stmt