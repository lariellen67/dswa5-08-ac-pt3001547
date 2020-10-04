const http = require('http');
const app = require('./config/express')();

const url =
  'mongodb+srv://dswa5:dswa5password@cluster0.xuhop.mongodb.net/ifsp?retryWrites=true&w=majority';
require('./config/database')(url);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express Server escutando na porta ' + app.get('port'));
});
