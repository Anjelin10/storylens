//AVATAR AND DROPDOWN
 const userAvatar = document.getElementById("user-avatar");
    const userDropdown = document.getElementById("user-dropdown");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        userAvatar.textContent = storedUser.name.charAt(0).toUpperCase();
        userAvatar.addEventListener("click", () => {
            userDropdown.classList.toggle("show");
        });
    } else {
        userAvatar.innerHTML ='<i data-lucide="user"></i>';
        lucide.createIcons();
        userAvatar.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-menu")) {
            userDropdown.classList.remove("show");
        }
    });

//MOVIE GRID
const movieContainer = document.getElementById("movie-container");
const params = new URLSearchParams(window.location.search);
const type = params.get("type") || "popular";
const apiFetch = {
    popular: getPopularMovies,
    top_rated: getTopRatedMovies,
    upcoming: getUpcomingMovies,
    now_playing: getNowPlayingMovies,
    trending: getTrendingMovies
};
let currentPage = 1;
let totalPages = 1;
let loading = false;
// Load Movies
async function loadMovies(page = 1) {
    if (loading) return;
    if (page > totalPages) return;
    loading = true;
    const fetchMovies = apiFetch[type] || getTrendingMovies;
    const data = await fetchMovies(page);
    if (!data) {
        loading = false;
        return;
    }
    totalPages = data.total_pages;
    data.results.forEach(movie => {
        movieContainer.innerHTML += `
            <div class="movie-grid-card">
                <img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    alt="${movie.title}"
                >
                <div class="movie-grid-info">
                    <div class="movie-grid-title">${movie.title}</div>
                    <div class="movie-grid-meta">⭐ ${movie.vote_average.toFixed(1)}/10</div>
                </div>
            </div>
        `;
    });
    loading = false;

    //SEARCH MOVIES
    let movies = [];
    movies = data.results;
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input",(e)=>{
    const text = e.target.value.toLowerCase();
    const filtered = movies.filter(movie=>{
        return movie.title
        .toLowerCase()
        .includes(text);
    });
    renderMovies(filtered);
    });
}

// First Load
loadMovies(currentPage);

// Infinite Scroll
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;
    if (
        scrollTop + windowHeight >= fullHeight - 300 &&
        !loading &&
        currentPage < totalPages
    ) {
        currentPage++;
        loadMovies(currentPage);
    }
});
