
const express = require('express')
const cors = require('cors')
const { pool, sql } = require('./db')

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/prices/:name/:time', async (req, res) => {
    let name = req.params.name
    let time = req.params.time
    if (time == '1M') {
        let result = await pool.query(sql.getTokenPrices1M({ name }))
        res.json(result.rows)
    } else {
        res.status(400).json({'error': 'time should be 1M'})
    }
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
// error handler
app.use(function(err, req, res, next) {
    if (req.app.get('env') != 'production') {
        console.log(err.stack)
    }
    res.status(err.status || 500).json({errors: [err.message]})
});
  
app.listen(3000, () => {
    console.log(`Index viewer listening at http://localhost:3000`)
})