// import { getTrendingMoviesPreview, getCategoriesMoviesPreview } from './main.js'
searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.trim()}`
})
arrowBtn.addEventListener('click', () => history.back())
trendingBtn.addEventListener('click', () => location.hash = '#trends')
scrollBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}))


window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator() {

    if(location.hash.startsWith('#trends')) {
        trendsPage()
        return 
    }
    if(location.hash.startsWith('#search=')) {
        searchPage()
        return 
    }
    if(location.hash.startsWith('#movie=')) {
        movieDetailsPage()
        return 
    }
    if(location.hash.startsWith('#category=')) {
        categoriesPage()
        return 
    }
    homePage()

    location.hash
}

function homePage() {
    console.log('Home!!!')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    if(!trendingMoviesPreviewList.children.length) { 
        getTrendingMoviesPreview()
    }

    if(!categoriesPreviewList.children.length) { 
        getCategoriesMoviesPreview()
    }
}

function categoriesPage() {
    console.log('Category!!!')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    let [ , categoryData] = location.hash.split('=')
    let [id, genre] = categoryData.split('-')

    getMoviesByCategory(id, genre)
}

function movieDetailsPage() {
    console.log('Movie!!!')

    headerSection.classList.add('header-container--long')
    // headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [ , id] = location.hash.split('=')
    getMovieById(id)
}

function searchPage() { 
    console.log('Search!!!')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [ , query ] = location.hash.split('=')
    getMoviesBySearch(query.replaceAll('%20', ' '))
}

function trendsPage() {
    console.log('Trends!!!')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    headerCategoryTitle.innerHTML = 'Trends'
    getTrendingMovies()
}