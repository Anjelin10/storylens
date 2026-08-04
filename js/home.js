function Home() {
    // User Avatar and Dropdown
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

    // Fetching and Displaying Trending Movies
    getTrendingMovies().then(data => {
        if (data && data.results) {
            const trendingMoviesContainer = document.getElementById("trending-movies");
            data.results
            .slice(0, 6)
            .forEach(movie => {
            trendingMoviesContainer.innerHTML += `
                <div class="movie-card" onclick="window.location.href='MovieDetails.html?id=${movie.id}'">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-grid-info">
                        <div class="movie-grid-title">${movie.title}</div>
                        <div class="movie-grid-meta" style="font-size: 12px; color: var(--accent-gold);">
                            <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                </div>
            `;
        });
        }
    });

    // Fetching and Displaying Popular Movies
    getPopularMovies().then(data => {
        if (data && data.results) {
            const popularMoviesContainer = document.getElementById("popular-movies");
            data.results
            .slice(10, 16)
            .forEach(movie => {
            popularMoviesContainer.innerHTML += `
                <div class="movie-card" onclick="window.location.href='MovieDetails.html?id=${movie.id}'">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-grid-info">
                        <div class="movie-grid-title">${movie.title}</div>
                        <div class="movie-grid-meta" style="font-size: 12px; color: var(--accent-gold);">
                            <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                </div>
            `;
        });
        }
    });

    // Fetching and Displaying Top Rated Movies
    getTopRatedMovies().then(data => {
        if (data && data.results) {
            const topRatedMoviesContainer = document.getElementById("top-rated-movies");
            data.results
            .slice(0, 6)
            .forEach(movie => {
            topRatedMoviesContainer.innerHTML += `
                <div class="movie-card" onclick="window.location.href='MovieDetails.html?id=${movie.id}'">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-grid-info">
                        <div class="movie-grid-title">${movie.title}</div>
                        <div class="movie-grid-meta" style="font-size: 12px; color: var(--accent-gold);">
                            <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                </div>
            `;
        });
        }
    });

     // Fetching and Displaying Upcoming Movies
    getUpcomingMovies().then(data => {
        if (data && data.results) {
            const upcomingMoviesContainer = document.getElementById("upcoming-movies");
            data.results
            .slice(14, 23)
            .forEach(movie => {
            upcomingMoviesContainer.innerHTML += `
                <div class="movie-card" onclick="window.location.href='MovieDetails.html?id=${movie.id}'">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-grid-info">
                        <div class="movie-grid-title">${movie.title}</div>
                        <div class="movie-grid-meta" style="font-size: 12px; color: var(--accent-gold);">
                            <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                </div>
            `;
        });
        }
    });

    // Fetching and Displaying Now Playing Movies
    getNowPlayingMovies().then(data => {
        if (data && data.results) {
            const nowPlayingMoviesContainer = document.getElementById("now-playing-movies");
            data.results
            .slice(3, 9)
            .forEach(movie => {
            nowPlayingMoviesContainer.innerHTML += `
                <div class="movie-card" onclick="window.location.href='MovieDetails.html?id=${movie.id}'">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-grid-info">
                        <div class="movie-grid-title">${movie.title}</div>
                        <div class="movie-grid-meta" style="font-size: 12px; color: var(--accent-gold);">
                            <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>
                </div>
            `;
        });
        }
    });

    // Fetching and Displaying Hero Banner Movie
    getTrendingMovies().then(data => {
    if(!data || !data.results) return;
    const hero = document.getElementById("hero");
    const heroContent = document.getElementById("hero-content");
    const heroMovies = data.results.slice(1, 6);
    let current = 0;
    function renderHero(){
        const movie = heroMovies[current];
        hero.style.setProperty('--hero-bg-desktop', `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`);
        hero.style.setProperty('--hero-bg-mobile', `url(https://image.tmdb.org/t/p/original${movie.poster_path})`);
        heroContent.innerHTML = `
            <h1>${movie.title}</h1>
            <p class="hero-overview">
                ${movie.overview.substring(0,150)}...
            </p>
            <div class="hero-actions">
                <button class="btn-primary" onclick="window.location.href='MovieDetails.html?id=${movie.id}'">
                    <i data-lucide="play" fill="currentColor"></i> Watch Trailer
                </button> 
            </div>
        `;
        lucide.createIcons();
    }
    renderHero();

    setInterval(()=>{
        current++;
        if(current>=heroMovies.length){
            current=0;
        }
        renderHero();
        },5000);
    });

}
Home();