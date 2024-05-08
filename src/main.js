// import { API_KEY, API_KEY2 } from './secrets.js'
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY2}`
      },
    params: {
        // 'language': 'es-ES'
    }
})

// Utils
function createMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('DIV')
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`

        })

        const movieImg = document.createElement('IMG')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('src', `http://image.tmdb.org/t/p/w300${movie.poster_path}`)
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('title', movie.title)


        movieContainer.appendChild(movieImg)
        container.appendChild(movieContainer)
      })
}

function createCategories(categories, container) {
    container.innerHTML = ''

    categories.forEach(category => {
        const categoryContainer = document.createElement('DIV')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('H3')
        categoryTitle.classList.add(`category-title`)
        categoryTitle.setAttribute('id', `id${category.id}`)
        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })
        
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        container.appendChild(categoryContainer)
      })
}


// Requests to API
async function getTrendingMoviesPreview() {
      try {
          const {data} = await api('/trending/movie/week')

          const movies = data.results
 
          createMovies(movies, trendingMoviesPreviewList)
          return
      } catch (error) {
        console.log(error)
      }
}

async function getTrendingMovies() {
      try {
          const {data} = await api('/trending/movie/week')

          const movies = data.results
 
          createMovies(movies, genericSection)
          return
      } catch (error) {
        console.log(error)
      }
}

async function getCategoriesMoviesPreview() {
      try {
          const { data } = await api('/genre/movie/list')

          const categories = data.genres
          createCategories(categories, categoriesPreviewList)

      } catch (error) {
        console.log(error)
      }
}

async function getMoviesByCategory(id, genre) {
    
    try {
        genericSection.textContent = ''
        const {data} = await api('/discover/movie', {
            params: {
                "with_genres": id
            }
        })
        const movies = data.results

        headerCategoryTitle.textContent = genre

        createMovies(movies, genericSection)

        window.scrollTo({top: 0, behavior: 'smooth'})
        return
    } catch (error) {
      console.log(error)
    }
}

async function getMoviesBySearch(query) {
    
    try {
        const {data} = await api('/search/movie', {
            params: {
                "query": query
            }
        })
        const movies = data.results

        headerCategoryTitle.textContent = `Results for: ${query}`

        createMovies(movies, genericSection)

        window.scrollTo({top: 0, behavior: 'smooth'})
        return
    } catch (error) {
      console.log(error)
    }
}

async function getMovieById(id) {
    console.log(id)

    movieDetailTitle.textContent = ''
    movieDetailDescription.textContent = ''
    movieDetailScore.textContent = ''
    movieDetailCategoriesList.textContent = ''
    relatedMoviesContainer.scrollTo(0,0)

    try {
        const { data: movie } = await api(`/movie/${id}`)

        const movieImgUrl = `http://image.tmdb.org/t/p/w500${movie.poster_path}`
        // headerSection.style.backgroundImage = `url(${movieImgUrl})`
        headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`
        
        movieDetailTitle.textContent = movie.title
        movieDetailDescription.textContent = movie.overview
        movieDetailScore.textContent = movie.vote_average.toString().slice(0, 3)
    
        createCategories(movie.genres, movieDetailCategoriesList)

        const { data: relatedMovies } = await api(`/movie/${id}/similar`)

        createMovies(relatedMovies.results, relatedMoviesContainer)

    } catch (error) {
        console.log(error)
    }
}