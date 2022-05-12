const express = require('express')
const app = express()
const port = 3000

const movieList = require('./movies.json')
const exphbs = require('express-handlebars')




app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})


app.get('/movies/:movie_id', (req, res) => {
  console.log('req.params.movie_id', req.params.movie_id)
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})

app.use(express.static('public'))
//告訴 Express 靜態檔案是放在名為 public 的資料夾中，它不必針對這個資料夾內的檔案做什麼，只要產生對應的路由讓我們可以使用就好。

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})
