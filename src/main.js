import { API_KEY, API_KEY2 } from './secrets.js'

const getOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY2}`
    }
  };

async function getTrendingMoviesPreview() {
    const urlAPI = 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES'

      try {
          const res = await fetch(urlAPI, getOptions)
          const data = await res.json()

          const movies = data.results
          movies.forEach(movie => {
            const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

            const movieContainer = document.createElement('DIV')
            movieContainer.classList.add('movie-container')

            const movieImg = document.createElement('IMG')
            movieImg.classList.add('movie-img')
            movieImg.setAttribute('src', `http://image.tmdb.org/t/p/w300${movie.poster_path}`)
            movieImg.setAttribute('alt', movie.title)
            movieImg.setAttribute('title', movie.title)

            movieContainer.appendChild(movieImg)
            trendingPreviewMoviesContainer.appendChild(movieContainer)

          })

      } catch (error) {
        console.log(error)
      }
}

async function getCategoriesMoviesPreview() {
    const urlAPI = 'https://api.themoviedb.org/3/genre/movie/list?language=es-ES'

      try {
          const res = await fetch(urlAPI, getOptions)
          const data = await res.json()

          const categories = data.genres
          console.log(data)
          categories.forEach(category => {
            const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

            const categoryContainer = document.createElement('DIV')
            categoryContainer.classList.add('category-container')

            const categoryTitle = document.createElement('H3')
            categoryTitle.classList.add(`category-title`)
            categoryTitle.setAttribute('id', `id${category.id}`)
            const categoryTitleText = document.createTextNode(category.name)

            
            categoryTitle.appendChild(categoryTitleText)
            categoryContainer.appendChild(categoryTitle)
            previewCategoriesContainer.appendChild(categoryContainer)

          })

      } catch (error) {
        console.log(error)
      }
}

getTrendingMoviesPreview()
getCategoriesMoviesPreview()