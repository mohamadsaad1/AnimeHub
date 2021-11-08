import axios from 'axios'

function animeSearch(req, res) {
  axios.get(`https://api.jikan.moe/v3/search/anime?q=${req.body.query}`)

  .then(response => {
    res.render('search',{
      title: 'title',
      animes: response.data.results,

    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles/anime')
  })
}

function aniShow(req, res) {
  axios.get(`https://api.jikan.moe/v3/anime/${req.params.id}`)

  .then(response => {
    console.log(response.data)
    res.render('show',{
      title: 'title',
      anime: response.data,

    })
  })
}



export {
  animeSearch,
  aniShow,
}