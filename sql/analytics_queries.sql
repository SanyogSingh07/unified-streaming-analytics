-- SQL Analytical Queries for Netflix Catalog Analytics Platform
-- These queries are compatible with PostgreSQL and SQLite.

-- 1. Top 10 Genres by Film Count
SELECT 
    primary_genre,
    COUNT(*) as film_count,
    ROUND(AVG(vote_average), 2) as average_rating,
    ROUND(AVG(popularity), 2) as average_popularity
FROM movies
GROUP BY primary_genre
ORDER BY film_count DESC
LIMIT 10;

-- 2. Growth Trends: Movies Added/Released per Year and Decade
SELECT 
    release_decade,
    release_year,
    COUNT(*) as titles_released
FROM movies
WHERE release_year >= 1990
GROUP BY release_decade, release_year
ORDER BY release_year DESC;

-- 3. Highly Popular but Under-Rated Titles (Hidden Gems)
-- Popularity in top 10% but rating below 6.5
SELECT 
    title,
    release_date,
    popularity,
    vote_average,
    vote_count
FROM movies
WHERE popularity > 50.0 
  AND vote_average BETWEEN 5.0 AND 6.5
ORDER BY popularity DESC
LIMIT 10;

-- 4. Critical Acclaimed Blockbusters
-- Top rated movies with significant vote volume (at least 500 votes)
SELECT 
    title,
    primary_genre,
    vote_average,
    vote_count,
    popularity
FROM movies
WHERE vote_count >= 500
ORDER BY vote_average DESC, vote_count DESC
LIMIT 15;

-- 5. Primary Genre Distribution and Average Rating
SELECT 
    primary_genre,
    COUNT(*) as total_titles,
    MIN(vote_average) as min_rating,
    MAX(vote_average) as max_rating,
    ROUND(AVG(vote_average), 2) as avg_rating,
    ROUND(SUM(vote_count), 0) as total_votes
FROM movies
GROUP BY primary_genre
HAVING COUNT(*) >= 20
ORDER BY avg_rating DESC;

-- 6. Content Release Timing: Weekend vs Weekday Releases
SELECT 
    CASE WHEN weekend_release = 1 THEN 'Weekend (Sat/Sun)' ELSE 'Weekday (Mon-Fri)' END as release_period,
    COUNT(*) as total_releases,
    ROUND(AVG(popularity), 2) as avg_popularity,
    ROUND(AVG(vote_average), 2) as avg_rating
FROM movies
GROUP BY weekend_release;

-- 7. High-Hype Titles (Popularity Outliers)
-- Movies where popularity is far above the average
SELECT 
    title,
    primary_genre,
    popularity,
    vote_average,
    release_date
FROM movies
WHERE popularity > (SELECT AVG(popularity) + 3 * STDDEV(popularity) FROM movies) -- Standard deviation fallback for SQLite (substitute with hardcoded or Postgres STDDEV)
ORDER BY popularity DESC;
