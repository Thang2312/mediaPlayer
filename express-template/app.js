const path = require('path');

const express = require('express');

const app = express();
const PORT = 8080;
const fs = require('fs');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  fileName().then((nameFiles) => {
      res.render('index',{name : nameFiles});
    });
});

app.listen(8080, () => {
  console.log(`Server running at ${PORT}`);
});

function fileName() {
  const testFolder = __dirname + '/public/music/';
  return new Promise(function (resolve, reject) {
    fs.readdir(testFolder, function (err, nameFiles) {
      if (err) {
        reject(err);
      } else {
        resolve(nameFiles);
      }
    });
  });
}