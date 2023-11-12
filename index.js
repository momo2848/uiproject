var express = require('express');
var app = express();
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'));
//E:\Web\project\views\gym\my_model\model.json

app.use('/gym', express.static(__dirname + '/views/gym')); //하체
app.use('/pushup', express.static(__dirname + '/views/pushup')); //상체
app.use('/burpeetest', express.static(__dirname + '/views/burpeetest')); //전신운동
app.use('/runup', express.static(__dirname + '/views/runup'));
app.use('/kick', express.static(__dirname + '/views/kick'));
app.use('/wallkick', express.static(__dirname + '/views/wallkick'));

app.use('/underhand', express.static(__dirname + '/views/underhand'));
app.use('/overhand', express.static(__dirname + '/views/overhand'));
app.use('/serve', express.static(__dirname + '/views/serve'));
//let comments = [];
const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'project.sqlite'
});

const Comments = sequelize.define('Comments', {
  // Model attributes are defined here
  Student_ID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Student_PASS: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Sports_EVENT: {
    type: DataTypes.STRING,
    
  },
  Sports_REPS: {
    type: DataTypes.INTEGER,
    
  }



}, {
  // Other model options go here
});

(async () => {
  await sequelize.sync({ force: false }); //force: true는 기존에 DB가 있더라도 재생성하겠다는 의미이다.
  console.log("All models were synchronized successfully.");
})();


app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

// set the view engine to ejs
app.set('view engine', 'ejs'); //나가는 경로



// index page
app.get('/', async function(req, res) {
  
  const comments = await Comments.findAll();
  
  res.render('index',{comments:comments});
});

// list page
app.get('/list', async function(req, res) {
  
  const comments = await Comments.findAll();
  //console.log("list")
  //console.log(comments)
  
  res.render('list',{comments:comments});
});



app.get('/create', function(req, res) {
  res.send('hi')
  //console.log(req.query)
});

app.post('/create', async function(req, res) {
  //res.send('Post-hi')
  //console.log(req.body)
  const{content} = req.body

  //comments.push(content)  //파이썬으로 보면 append 같은 역할
  //console.log(comments) 
  const jane = await Comments.create({ content: content });
  //console.log("Jane's auto-generated ID:", jane.id);

  res.redirect('/')  // 리다렉트로 다시 index로 가라. 

});

app.post('/update/:id', async function(req, res) {
  
  //console.log(req.params)
  //console.log(req.body)
  
  const{content} = req.body
  const {id} = req.params

  await Comments.update({ content: content }, {
    where: {
      id: id
    }
  });

  //await Comments.create({ content: content });
  res.redirect('/')  // 리다렉트로 다시 index로 가라. 
});

app.post('/delete/:id', async function(req, res) {
  
  //console.log(req.params)
  //console.log(req.body)
  
  //const{content} = req.bodyindex_id
  const {id} = req.params

  await Comments.destroy( {
    where: {
      id: id
    }
  });
  //await Comments.create({ content: content });
  res.redirect('/')  // 리다렉트로 다시 index로 가라. 
});

app.post('/login', async function(req, res) {
  //res.send('Post-hi')
  //console.log(req.body.student_id)
  const student_id = req.body.student_id
  const student_pass = req.body.student_pass
  //console.log(student_id)
  //console.log(student_pass)

  
  const sports = await Comments.create({ Student_ID: student_id , Student_PASS :student_pass, Sports_REPS:0 });
  //console.log("sports auto-generated ID:", sports.id);

  //res.render('start',{});
  res.render('start', { student_id: student_id , id:sports.id});

});



app.get('/health', (req,res) => {
  const id = req.query.id 
  const student_id = req.query.student_id
  //console.log("health")
  //console.log(id)
  //console.log(student_id)

  //health?student_id=<%= student_id %>&id=<%= id %>

  res.render('health',{ student_id: student_id , id:id});
});

app.get('/gymnastic', (req,res) => {
  const id = req.query.id 
  const student_id = req.query.student_id
  //console.log("health")
  //console.log(id)
  //console.log(student_id)

  //health?student_id=<%= student_id %>&id=<%= id %>

  res.render('gymnastic',{ student_id: student_id , id:id});
});

app.get('/volleyball', (req,res) => {
  const id = req.query.id 
  const student_id = req.query.student_id
  //console.log("health")
  //console.log(id)
  //console.log(student_id)

  //health?student_id=<%= student_id %>&id=<%= id %>

  res.render('volleyball',{ student_id: student_id , id:id});
});

app.get('/gymPage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('gym/gymPage',{student_id: student_id , id:id});
});

app.get('/pushupPage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('pushup/pushupPage',{student_id: student_id , id:id});
});

app.get('/burpeetestPage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('burpeetest/burpeetestPage',{student_id: student_id , id:id});
});

app.get('/runupPage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('runup/runupPage',{student_id: student_id , id:id});
});

app.get('/kickPage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('kick/kickPage',{student_id: student_id , id:id});
});

app.get('/wallkickPage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('wallkick/wallkickPage',{student_id: student_id , id:id});
});

app.get('/underhandPage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('underhand/underhandPage',{student_id: student_id , id:id});
});

app.get('/overhandPage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('overhand/overhandPage',{student_id: student_id , id:id});
});

app.get('/servePage', (req,res) => {
  const id = req.query.id ;
  //const index_id = req.body.index_id ;
  const student_id = req.query.student_id
  
  
  res.render('serve/servePage',{student_id: student_id , id:id});
});


//모든저장은 여기로  저장
app.post('/sqartsave', async function(req, res) {
  //res.send('Post-hi')
  //console.log(req.body)
  const sports_event = req.body.sports_event
  const sports_reps = req.body.sports_reps
  const student_id = req.body.student_id
  const id = req.body.id
  //console.log(sports_event)
  //console.log(sports_reps)
  //console.log("sqartsave")
  //console.log(student_id)
  //console.log(id)

  
  await Comments.update(
    { Sports_EVENT: sports_event, Sports_REPS: sports_reps },
    {
      where: {
        student_id: student_id,
        id: id
      }
    }
  );

  //await Comments.create({ content: content });
  res.redirect('/')

});



app.listen(8080);
console.log('Server is listening on port 8080');