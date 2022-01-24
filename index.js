const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const csv = require('csv');
const iconv = require('iconv-lite');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => {
    code = req.query.code;

    if (code == null) {
        code = 7900014;
    }

    fs.createReadStream(__dirname + '/38EHIME.csv').pipe(iconv.decodeStream('SJIS'))
    .pipe(iconv.encodeStream('UTF-8')).pipe(csv.parse(function(err, data) {
        list = data;
    }))

    list.forEach(function( value ) {
        if (code == Number(value[2])) {
            res.jsonp(value[6] + value[7] + value[8]);
        }
    });
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));