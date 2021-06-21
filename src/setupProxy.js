const roll = () => {
  return Math.floor(Math.random() * 6 + 1)
}

let value = roll()

module.exports = function(app) {
    app.get('/get-value', (req, res) => {
        res.json({value})
    })

    app.post('/do-a-roll', (req, res) => {
        if (Math.random() > 0.5) {
            value = roll()
            res.json({value});
        } else {
            res.status(500);
            res.end();
        }
    })
}
