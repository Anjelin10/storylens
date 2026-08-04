# StoryLens

StoryLens is a premium, responsive Movie Discovery Web Application. It allows users to explore trending movies, search for their favorite actors or films, view detailed movie metadata (trailers, cast, reviews, where to watch), and manage a personal "My List" of favorite titles. 

The project heavily focuses on a modern, immersive aesthetic—utilizing glassmorphism, dynamic animations, and a rich dark mode color palette tailored for cinema enthusiasts.

## Type of Project
Frontend Web Application (Single Page Application architecture using multiple HTML entry points).

## Tech Stack
This project is built using purely native web technologies. No heavy frameworks or build tools are required.

* **Structure:** Vanilla HTML5
* **Styling:** Native CSS3
  * CSS Variables for theming (Colors, Fonts)
  * Flexbox & CSS Grid for responsive layouts
  * Media Queries for mobile-first responsiveness
  * Custom animations and transitions
* **Logic & Functionality:** Vanilla JavaScript (ES6+)
  * `async/await` for asynchronous API calls
  * `localStorage` and `sessionStorage` for state persistence (Authentication & Favorites)
  * Custom DOM manipulation
* **Data Source:** TMDB (The Movie Database) API
  * Fetching trending movies, popular lists, and multi-search queries
  * Fetching detailed metadata, cast, crew, reviews, and streaming providers
* **Icons:** Lucide Icons(via CDN)
* **Typography:** Google Fonts (Inter & Outfit)

## Key Features
* **Global Search:** Search across the entire TMDB database for movies or actors.
* **Responsive Design:** A custom-built mobile navigation drawer and dynamic layouts that adapt to any screen size (from desktop ultra-wides to mobile phones).
* **Trailer Integration:** Embedded YouTube trailer playback directly on movie detail pages.
* **Authentication Mockup:** A local-storage based authentication system with login and registration UI.
* **Custom UI Components:** Replaces default browser alerts with a fully custom, animated Toast Notification and Confirmation Dialog system.
