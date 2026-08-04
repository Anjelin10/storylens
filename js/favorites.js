function renderFavorites() {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    const countElement = document.getElementById('fav-count');
    const gridElement = document.getElementById('favorites-grid');
    const IMG_URL = "https://image.tmdb.org/t/p/w500";
    
    if (countElement) {
        countElement.textContent = `${favs.length} saved film${favs.length !== 1 ? 's' : ''}`;
    }
    if (!gridElement) return;

    if (favs.length === 0) {
        gridElement.innerHTML = '<p style="color:var(--text-secondary); padding: 20px;">You have no saved films in your collection.</p>';
        return;
    }
    
    gridElement.innerHTML = favs.map(movie => `
        <div class="movie-card" style="cursor: pointer;" onclick="window.location.href='MovieDetails.html?id=${movie.id}'">
            <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/350x525?text=No+Poster'}" alt="${movie.title}" style="width: 100%; border-radius: 12px; margin-bottom: 8px;">
            <div class="movie-grid-info">
                <div class="movie-grid-title" style="font-size: 14px; font-weight: 600; color: white;">${movie.title}</div>
                <div class="movie-grid-meta" style="font-size: 12px; color: var(--accent-gold);">
                    <span>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}/10</span>
                    <span onclick="event.stopPropagation(); removeFavorite(${movie.id})">
                        <i data-lucide="heart" style="width: 14px; height:14px; color: #ff4b4b; display: inline-block; vertical-align: middle; fill: #ff4b4b;"></i>
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    if(typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

window.removeFavorite = function(id) {
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];
    favs = favs.filter(movie => movie.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favs));
    renderFavorites();
}

document.addEventListener('DOMContentLoaded', () => {
    renderFavorites();
});
