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
    renderMoviesHTML(data.results);
    loading = false;
}

function renderMoviesHTML(movies) {
    let html = '';
    movies.forEach(movie => {
        html += `
            <div class="movie-grid-card" onclick="window.location.href='MovieDetails.html?id=${movie.id}'">
                    <img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        alt="${movie.title}"
                        onerror="this.src='https://via.placeholder.com/250x375?text=No+Poster'"
                    >
                    <div class="movie-grid-info">
                        <div class="movie-grid-title">${movie.title}</div>
                        <div class="movie-grid-meta" style="font-size: 12px; color: var(--accent-gold);">⭐ ${(movie.vote_average || 0).toFixed(1)}/10</div>
                    </div>
            </div>
        `;
    });
    movieContainer.innerHTML += html;
}

//SEARCH MOVIES
const searchInput = document.querySelector(".search-input");
let searchTimeout = null;
let isSearching = false;

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const text = e.target.value.trim().toLowerCase();
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            if (text.length > 0) {
                isSearching = true;
                movieContainer.innerHTML = '';
                try {
                    const data = await searchMovies(text);
                    if (data && data.results) {
                        let extractedMovies = [];
                        data.results.forEach(item => {
                            if (item.media_type === 'movie') {
                                extractedMovies.push(item);
                            } else if (item.media_type === 'person' && item.known_for) {
                                item.known_for.forEach(kf => {
                                    if (kf.media_type === 'movie') extractedMovies.push(kf);
                                });
                            }
                        });
                        
                        const uniqueMovies = Array.from(new Map(extractedMovies.map(m => [m.id, m])).values());
                        
                        if (uniqueMovies.length > 0) {
                            renderMoviesHTML(uniqueMovies);
                        } else {
                            movieContainer.innerHTML = `<div style="grid-column: 1 / -1; width: 100%; text-align: center; padding: 40px; color: var(--text-secondary); font-size: 18px;">No movies found for "${text}"</div>`;
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                isSearching = false;
                movieContainer.innerHTML = '';
                currentPage = 1;
                loadMovies(1);
            }
        }, 500);
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
        !isSearching &&
        scrollTop + windowHeight >= fullHeight - 300 &&
        !loading &&
        currentPage < totalPages
    ) {
        currentPage++;
        loadMovies(currentPage);
    }
});
