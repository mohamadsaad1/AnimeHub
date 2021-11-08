import axios from 'axios'

function animeSearch(req, res) {
  axios.get(`https://api.jikan.moe/v3/search/anime?q=${req.body.query}`)

  .then(response => {
    res.render('search',{
      title: 'Search Results',
      user: req.user,
      anime: response.data
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