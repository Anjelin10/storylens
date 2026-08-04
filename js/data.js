const BASE_URL = "https://api.themoviedb.org/3";

//List of Popular Movies
async function getPopularMovies(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

//List of Top Rated Movies
async function getTopRatedMovies(page = 1) {
    try{
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getTopRatedMovies()

//List of Upcoming Movies
async function getUpcomingMovies(page = 1) {
    try{
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getUpcomingMovies()

//List of Now Playing Movies
async function getNowPlayingMovies(page = 1) {
    try{
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getNowPlayingMovies()

//List of Trending Movies
async function getTrendingMovies(page = 1) {
    try{
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getTrendingMovies()

//Search Movies
async function searchMovies(query){
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return await response.json();
}