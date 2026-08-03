const BASE_URL = "https://api.themoviedb.org/3";

//List of Popular Movies
async function getPopularMovies() {
    try{
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        const data = await response.json();
        // console.log(data);
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getPopularMovies()

//List of Top Rated Movies
async function getTopRatedMovies() {
    try{
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
        const data = await response.json();
        // console.log(data);
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getTopRatedMovies()

//List of Upcoming Movies
async function getUpcomingMovies() {
    try{
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
        const data = await response.json();
        // console.log(data);
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getUpcomingMovies()

//List of Now Playing Movies
async function getNowPlayingMovies() {
    try{
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
        const data = await response.json();
        // console.log(data);
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getNowPlayingMovies()

async function getTrendingMovies() {
    try{
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.error("Error fetching data:", error);
        return null;
    }
}
getTrendingMovies()