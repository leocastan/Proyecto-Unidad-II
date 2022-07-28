
const express = require('express');
const morgan = require('morgan');
const app = express();
const cort = require('cors');
const {mongoose} = require('./database');

const bodyParser = require('body-parser'); 
 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cort('http://localhost:4200/'))
app.use('/user', require('./routes/user.routes'));
app.use('/kid', require('./routes/kid.routes'));
app.use('/game', require('./routes/game.routes'));

app.listen(app.get('port'), () => {
  console.log('Servidor inicializado en el puerto:  ' + app.get('port'));
});
