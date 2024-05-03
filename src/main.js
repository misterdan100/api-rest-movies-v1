// import { API_KEY, API_KEY2 } from './secrets.js'
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY2}`
      },
    params: {
        'language': 'es-ES'
    }
})

const getOptions = {
    method: 'GET',
    
  };

async function getTrendingMoviesPreview() {
    
      try {
          const {data} = await api('/trending/movie/week')

          const movies = data.results
 
          movies.forEach(movie => {

            const movieContainer = document.createElement('DIV')
            movieContainer.classList.add('movie-container')

            const movieImg = document.createElement('IMG')
            movieImg.classList.add('movie-img')
            movieImg.setAttribute('src', `http://image.tmdb.org/t/p/w300${movie.poster_path}`)
            movieImg.setAttribute('alt', movie.title)
            movieImg.setAttribute('title', movie.title)

            movieContainer.appendChild(movieImg)
            trendingMoviesPreviewList.appendChild(movieContainer)

          })
          return
      } catch (error) {
        console.log(error)
      }
}

async function getCategoriesMoviesPreview() {
      try {
          const { data } = await api('/genre/movie/list')

          const categories = data.genres
          categoriesPreviewList.textContent = ''

          categories.forEach(category => {
            const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list')

            const categoryContainer = document.createElement('DIV')
            categoryContainer.classList.add('category-container')

            const categoryTitle = document.createElement('H3')
            categoryTitle.classList.add(`category-title`)
            categoryTitle.setAttribute('id', `id${category.id}`)
            const categoryTitleText = document.createTextNode(category.name)

            
            categoryTitle.appendChild(categoryTitleText)
            categoryContainer.appendChild(categoryTitle)
            categoriesPreviewList.appendChild(categoryContainer)

          })

      } catch (error) {
        console.log(error)
      }
}