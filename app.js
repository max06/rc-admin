var expressVue = require('express-vue');
var express = require('express');
var app = express();

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', __dirname + '/views');
app.set('vue', {
  componentsDir: __dirname + '/views/components',
  defaultLayout: 'layout'
});

var server = app.listen(3000);
var io = require('socket.io')(server);

var redis = require('ioredis')();


var users = [];
users.push({ name: 'tobi', age: 12 });
users.push({ name: 'loki', age: 14  });
users.push({ name: 'jane', age: 16  });


app.get('/', function(req, res) {
  res.render('index', {
    data: {
      title: 'Express Vue',
      message: 'Hello!',
      users: users
    },
    vue: {
      components: ['info', 'users', 'message']
    }
  });
});

app.get('/users/:userName', function(req, res){
    var user = users.filter(function(item) {
        return item.name === req.params.userName;
    })[0];
  res.render('user', {
    data: {
      title: 'Hello My Name is',
      user: user
    }

  });
});

app.get('/info', function(req, res){
  res.render('info', {
    data: {
      title: 'Redis Info',
      info: {}
    }

  });
});


io.on('connection', function (socket) {
  socket.on('info', function (data) {
    console.log("Client requests info")
    redis.info().then(function(result) {
      console.log("Info sent to client");
      socket.emit('info', require('redis-info').parse(result));
    });
  });
});

console.log('Server listening on port 3000...');