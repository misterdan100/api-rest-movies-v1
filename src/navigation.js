let maxPage
let page = 0;
let infiniteScroll = undefined;
let chargeMore = false;

searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.trim()}`
})
arrowBtn.addEventListener('click', () => history.back())
trendingBtn.addEventListener('click', () => location.hash = '#trends')
scrollBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}))

window.addEventListener('DOMContentLoaded', navigator1, false)
window.addEventListener('hashchange', navigator1, false)

window.addEventListener('scroll', () => location.hash !== '' && infiniteScroll(), false)


function navigator1() {

    if(infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {passive: false})
        infiniteScroll = undefined
    }

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

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {passive: false})
    }
}

function homePage() {

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    likedMoviesSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')


    getTrendingMoviesPreview()
    getCategoriesMoviesPreview()
    getLikedMovies()
}

function categoriesPage() {

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    let [ , categoryData] = location.hash.split('=')
    let [id, genre] = categoryData.split('-')

    getMoviesByCategory(id, genre)

    infiniteScroll = getPaginatedMoviesByCategory(id)
}

function movieDetailsPage() {

    headerSection.classList.add('header-container--long')
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [ , id] = location.hash.split('=')
    getMovieById(id)
}

function searchPage() { 

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [ , query ] = location.hash.split('=')
    getMoviesBySearch(query.replaceAll('%20', ' '))
    infiniteScroll = getPaginatedMoviesBySearch(query)
}

function trendsPage() {

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    headerCategoryTitle.innerHTML = 'Trends'
    getTrendingMovies()

    infiniteScroll = getPaginatedTrendingMovies
}