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
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.setAttribute('src', entry.target.getAttribute('data-img'))

        }
    })
})


function createMovies(movies, container, clean = true) {
    if(clean) {
        container.innerHTML = '';
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement('DIV')
        movieContainer.classList.add('movie-container')
        

        const movieImg = document.createElement('IMG')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('data-img', `http://image.tmdb.org/t/p/w300${movie.poster_path}`)
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('title', movie.title)
        movieImg.addEventListener('error', e => {
            e.target.setAttribute('src', `https://shop.restaurant.org/sca-dev-2019-2/img/no_image_available.jpeg`)
        })
        movieImg.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`

        })

        const movieBtn = document.createElement('BUTTON')
        movieBtn.classList.add('movie-btn')
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked')
            // TODO: add movie to LS
            console.log('⭐')
        })

        lazyLoader.observe(movieImg)

        movieContainer.appendChild(movieImg)
        movieContainer.appendChild(movieBtn)
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
          const {data} = await api(`/trending/movie/week`)
          const movies = data.results

          maxPage = data.total_pages
 
          createMovies(movies, genericSection)

        //   const btnLoadMore = document.createElement('BUTTON')
        //   btnLoadMore.innerHTML = 'Load more...'
        //   btnLoadMore.addEventListener('click', getPaginatedTrendingMovies)
        //   genericSection.appendChild(btnLoadMore)
          return
      } catch (error) {
        console.log(error)
      }
}

async function getPaginatedTrendingMovies() {

    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)
    const pageIsNotMax = page < maxPage

    if (scrollIsBottom && pageIsNotMax) {
        try {
            page++
            const { data } = await api(`/trending/movie/week`, {
                params: {
                    page: page + 1
                }
            })
            page = data.page
            const movies = data.results
            createMovies(movies, genericSection, false)
            chargeMore = false
            return
        } catch (error) {
            console.log(error)
        }
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
        maxPage = data.total_pages
        headerCategoryTitle.textContent = genre

        createMovies(movies, genericSection)

        window.scrollTo({top: 0, behavior: 'smooth'})
        return
    } catch (error) {
      console.log(error)
    }
}


function getPaginatedMoviesByCategory(id) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement
        
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)
        const pageIsNotMax = page < maxPage
        
        if (scrollIsBottom && pageIsNotMax) {
            try {
                page++
                const { data } = await api('/discover/movie', {
                    params: {
                        page: page +1,
                        "with_genres": id
                    }
                })
                
                const movies = data.results
                createMovies(movies, genericSection, false)
                chargeMore = false
                return
            } catch (error) {
                console.log(error)
            }
        }
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
        maxPage = data.total_pages

        headerCategoryTitle.textContent = `Results for: ${query}`

        createMovies(movies, genericSection)

        window.scrollTo({top: 0, behavior: 'smooth'})
        return
    } catch (error) {
      console.log(error)
    }
}

function getPaginatedMoviesBySearch(query) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement
        
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)
        const pageIsNotMax = page < maxPage
        
        if (scrollIsBottom && pageIsNotMax) {
            try {
                page++
                const { data } = await api('/search/movie', {
                    params: {
                        page: page + 1,
                        "query": query
                    }
                })
                
                const movies = data.results
                console.log('getPaginatedMoviesBySearch')
                createMovies(movies, genericSection, false)
                chargeMore = false
                return
            } catch (error) {
                console.log(error)
            }
        }
    }
}

async function getMovieById(id) {

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