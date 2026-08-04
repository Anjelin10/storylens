const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const ORIGINAL_IMG_URL = "https://image.tmdb.org/t/p/original";
let trailerKey = null;
let isFavorite = false;
let currentMovieData = null;
function formatCurrency(amount) {
    if (!amount) return 'N/A';
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
}

function getFormattedDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getRuntime(minutes) {
    if (!minutes) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}

async function renderMovieDetails() {
    const hideLoader = () => {
        const loader = document.getElementById('md-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 300);
        }
    };

    try {
        if (!movieId) {
            document.getElementById('md-title').textContent = 'Movie Not Found';
            return;
        }
        
        const data = await getMovieData(movieId);
        if (!data || !data.details) return;
        
        currentMovieData = data.details;
        const { details, credits, images, reviews, providers, videos } = data;
        
        // Check Favorites
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        isFavorite = favorites.some(fav => fav.id === parseInt(movieId));
        updateFavoriteButton();
        
        // Extract Trailer
        if (videos && videos.results) {
            const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
            if (trailer) trailerKey = trailer.key;
        }
        
        // Poster and Background
        document.getElementById('md-poster').src = details.poster_path ? `${IMG_URL}${details.poster_path}` : 'https://via.placeholder.com/350x525?text=No+Poster';
        
        if (details.backdrop_path) {
            document.body.style.backgroundImage = `linear-gradient(to right, #0B0B0F 10%, rgba(11,11,15,0.85) 100%), url(${IMG_URL}${details.backdrop_path})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center top';
            document.body.style.backgroundAttachment = 'fixed';
        }

        // Title and Tags
        document.getElementById('md-title').textContent = details.title;
        const tagsContainer = document.getElementById('md-tags');
        tagsContainer.innerHTML = details.genres.map(g => `<span class="md-tag">${g.name}</span>`).join('');
        
        // Meta Row
        document.getElementById('md-score').textContent = details.vote_average ? details.vote_average.toFixed(1) : 'NR';
        
        let ratingsCount = details.vote_count || 0;
        let formattedRatings = ratingsCount >= 1000 ? `${(ratingsCount / 1000).toFixed(1)}K` : ratingsCount;
        document.getElementById('md-ratings-count').textContent = `${formattedRatings} ratings`;
        
        document.getElementById('md-runtime').textContent = getRuntime(details.runtime);
        document.getElementById('md-year').textContent = getFormattedDate(details.release_date);
        document.getElementById('md-language').textContent = details.spoken_languages && details.spoken_languages.length > 0 ? details.spoken_languages[0].english_name : 'Unknown';
        document.getElementById('md-certification').textContent = details.adult ? 'R' : 'PG-13';
        
        // Overview and Stats
        document.getElementById('md-overview').textContent = details.overview || 'No overview available.';
        document.getElementById('md-budget').textContent = formatCurrency(details.budget);
        document.getElementById('md-revenue').textContent = formatCurrency(details.revenue);
        
        // Cast Section
        if (credits && credits.cast) {
            const castList = credits.cast.slice(0, 8);
            document.getElementById('md-cast-list').innerHTML = castList.map(actor => `
                <div class="md-cast-item">
                    <img src="${actor.profile_path ? IMG_URL + actor.profile_path : 'https://via.placeholder.com/120x150?text=No+Image'}" alt="${actor.name}" class="md-cast-img">
                    <div class="md-cast-name">${actor.name}</div>
                    <div class="md-cast-char">${actor.character}</div>
                </div>
            `).join('');
        }
        
        // Crew Section
        if (credits && credits.crew) {
            const directors = credits.crew.filter(c => c.job === 'Director').map(c => c.name);
            const writers = credits.crew.filter(c => c.job === 'Screenplay' || c.job === 'Writer' || c.job === 'Story').map(c => c.name);
            
            document.getElementById('md-director').innerHTML = directors.length ? directors.join('<br>') : 'Unknown';
            document.getElementById('md-writers').innerHTML = writers.length ? writers.slice(0, 3).join('<br>') : 'Unknown';
        }
        
        if (details.production_companies) {
            const prod = details.production_companies.map(p => p.name).slice(0, 3);
            document.getElementById('md-production').innerHTML = prod.length ? prod.join('<br>') : 'Unknown';
        }
        
        // Gallery Section
        if (images && images.backdrops) {
            const galleryList = images.backdrops.slice(0, 6);
            if(galleryList.length > 0) {
                document.getElementById('md-gallery-list').innerHTML = galleryList.map(img => `
                    <img src="${IMG_URL}${img.file_path}" class="md-gallery-img" alt="Gallery Image" style="cursor:pointer;" onclick="openImageModal('${ORIGINAL_IMG_URL}${img.file_path}')">
                `).join('');
            } else {
                document.getElementById('md-gallery-list').innerHTML = '<p style="color:var(--text-secondary);">No images available.</p>';
            }
        }
        
        // Providers Section
        if (providers && providers.results) {
            // Fallback to IN or first available region if US is not present
            const region = providers.results.US || providers.results.IN || Object.values(providers.results)[0];
            
            let providerHtml = '';
            if (region) {
                if (region.flatrate) {
                    providerHtml += region.flatrate.map(p => `
                        <div class="md-provider">
                            <img src="${IMG_URL}${p.logo_path}" class="md-provider-img" alt="${p.provider_name}">
                            <div class="md-provider-info">
                                <span class="md-provider-name">${p.provider_name}</span>
                                <span class="md-provider-type">Subscription</span>
                            </div>
                        </div>
                    `).join('');
                }
                if (region.rent || region.buy) {
                    const combined = [...(region.rent || []), ...(region.buy || [])];
                    const unique = Array.from(new Map(combined.map(item => [item.provider_id, item])).values());
                    
                    providerHtml += unique.map(p => `
                        <div class="md-provider">
                            <img src="${IMG_URL}${p.logo_path}" class="md-provider-img" alt="${p.provider_name}">
                            <div class="md-provider-info">
                                <span class="md-provider-name">${p.provider_name}</span>
                                <span class="md-provider-type">Rent / Buy</span>
                            </div>
                        </div>
                    `).join('');
                }
            }
            document.getElementById('md-providers-list').innerHTML = providerHtml || '<p style="color:var(--text-secondary);">No streaming providers found.</p>';
        } else {
            document.getElementById('md-providers-list').innerHTML = '<p style="color:var(--text-secondary);">No streaming providers found.</p>';
        }
        
        // Reviews Section
        if (reviews && reviews.results) {
            const results = reviews.results;
            
            document.getElementById('md-reviews-summary').innerHTML = `
                <div class="md-reviews-score">${details.vote_average ? details.vote_average.toFixed(1) : 'NR'}</div>
                <div class="md-reviews-stars">
                    <i data-lucide="star" fill="currentColor"></i>
                    <i data-lucide="star" fill="currentColor"></i>
                    <i data-lucide="star" fill="currentColor"></i>
                    <i data-lucide="star" fill="currentColor"></i>
                    <i data-lucide="star" fill="currentColor"></i>
                </div>
                <div class="md-reviews-count">${results.length} community reviews</div>
                <div class="md-reviews-bars">
                    <div class="md-review-bar">
                        <span>5</span> <i data-lucide="star" style="width:12px; color:var(--accent-gold);" fill="currentColor"></i>
                        <div class="md-bar-track"><div class="md-bar-fill" style="width: 67%"></div></div>
                        <span>67%</span>
                    </div>
                    <div class="md-review-bar">
                        <span>4</span> <i data-lucide="star" style="width:12px; color:var(--accent-gold);" fill="currentColor"></i>
                        <div class="md-bar-track"><div class="md-bar-fill" style="width: 25%"></div></div>
                        <span>25%</span>
                    </div>
                    <div class="md-review-bar">
                        <span>3</span> <i data-lucide="star" style="width:12px; color:var(--accent-gold);" fill="currentColor"></i>
                        <div class="md-bar-track"><div class="md-bar-fill" style="width: 5%"></div></div>
                        <span>5%</span>
                    </div>
                    <div class="md-review-bar">
                        <span>2</span> <i data-lucide="star" style="width:12px; color:var(--accent-gold);" fill="currentColor"></i>
                        <div class="md-bar-track"><div class="md-bar-fill" style="width: 2%"></div></div>
                        <span>2%</span>
                    </div>
                    <div class="md-review-bar">
                        <span>1</span> <i data-lucide="star" style="width:12px; color:var(--accent-gold);" fill="currentColor"></i>
                        <div class="md-bar-track"><div class="md-bar-fill" style="width: 1%"></div></div>
                        <span>1%</span>
                    </div>
                </div>
            `;
            
            if (results.length > 0) {
                document.getElementById('md-reviews-list').innerHTML = results.slice(0, 3).map(rev => {
                    const rating = rev.author_details.rating ? rev.author_details.rating : 'N/A';
                    const initial = rev.author.charAt(0).toUpperCase();
                    let content = rev.content;
                    let isLong = false;
                    if (content.length > 250) {
                        content = content.substring(0, 250) + '...';
                        isLong = true;
                    }
                    return `
                    <div class="md-review-card">
                        <div class="md-review-header">
                            <div class="md-reviewer">
                                <div class="md-reviewer-avatar">${initial}</div>
                                <div class="md-reviewer-info">
                                    <span class="md-reviewer-name">${rev.author}</span>
                                    <span class="md-review-date">${getFormattedDate(rev.created_at)}</span>
                                </div>
                            </div>
                            <div class="md-review-rating">
                                <i data-lucide="star" fill="currentColor" style="width:12px;height:12px;"></i> ${rating}/10
                            </div>
                        </div>
                        <div class="md-review-content">${content}</div>
                        ${isLong ? '<span class="md-review-readmore">Read more</span>' : ''}
                        <div class="md-review-footer">
                            <i data-lucide="check" style="width:14px;height:14px;"></i> Helpful
                        </div>
                    </div>
                `}).join('');
            } else {
                 document.getElementById('md-reviews-list').innerHTML = '<p style="color:var(--text-secondary);">No reviews yet.</p>';
            }
        }
        
        if(typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } finally {
        hideLoader();
    }
}

function updateFavoriteButton() {
    const btnIcon = document.getElementById('md-btn-list-icon');
    const btnText = document.getElementById('md-btn-list-text');
    if (!btnIcon || !btnText) return;
    
    if (isFavorite) {
        btnIcon.setAttribute('data-lucide', 'heart');
        btnIcon.setAttribute('fill', 'currentColor');
        btnText.textContent = 'Added to List';
    } else {
        btnIcon.setAttribute('data-lucide', 'plus');
        btnIcon.removeAttribute('fill');
        btnText.textContent = 'Add to List';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

window.toggleFavorite = function() {
    if (!currentMovieData) return;
    isFavorite = !isFavorite;
    
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
        if (!favs.some(f => f.id === currentMovieData.id)) {
            favs.push({
                id: currentMovieData.id,
                title: currentMovieData.title,
                poster_path: currentMovieData.poster_path,
                vote_average: currentMovieData.vote_average
            });
            if (window.showToast) window.showToast(`Added ${currentMovieData.title} to your list!`, "success");
        }
    } else {
        favs = favs.filter(fav => fav.id !== currentMovieData.id);
        if (window.showToast) window.showToast(`Removed ${currentMovieData.title} from your list.`, "info");
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    updateFavoriteButton();
}

window.openImageModal = function(imgSrc) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
    modal.style.zIndex = '10000';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.cursor = 'pointer';
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 0 40px rgba(0,0,0,0.8)';
    
    modal.appendChild(img);
    modal.onclick = () => document.body.removeChild(modal);
    document.body.appendChild(modal);
}

window.playTrailer = function() {
    if (!trailerKey) {
        alert('Trailer not available for this movie.');
        return;
    }
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.95)';
    modal.style.zIndex = '10000';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    modal.innerHTML = `
        <div style="position:relative; width:90%; max-width:1000px; aspect-ratio:16/9; background:black; border-radius:12px; overflow:hidden; box-shadow:0 0 50px rgba(0,0,0,0.8);">
            <button onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.1); border:none; color:white; font-size:24px; cursor:pointer; width:40px; height:40px; border-radius:50%; z-index:100; display:flex; justify-content:center; align-items:center;">&times;</button>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${trailerKey}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded', () => {
    renderMovieDetails();
});
