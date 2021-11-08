import axios from 'axios'

function animeSearch(req, res) {
  // axios.get(`https://api.jikan.moe/v3/anime/${req.body.query}`)
  axios.get(`https://api.jikan.moe/v3/search/anime?q=${req.body.query}`)

  .then(response => {
    console.log(response.data.results)
    res.render('search',{
      title: 'title',
      anime: response.data.results,

    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  animeSearch
}