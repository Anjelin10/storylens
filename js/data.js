const BASE_URL = "https://api.themoviedb.org/3";
async function getPopularMovies() {
    try{
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }
}
getPopularMovies()