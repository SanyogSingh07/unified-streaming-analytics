import polars as pl
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.helpers import parse_date

def build_features(df: pl.DataFrame) -> pl.DataFrame:
    df = df.with_columns(
        (pl.col('Vote_Count') / 100.0).alias('Popularity')
    )
    
    df = df.with_columns(
        pl.col('Release_Date').map_elements(parse_date, return_dtype=pl.Datetime).alias('parsed_date')
    )
    df = df.drop_nulls(subset=['parsed_date'])
    
    df = df.with_columns([
        pl.col('parsed_date').dt.year().alias('release_year'),
        pl.col('parsed_date').dt.month().alias('release_month'),
        ((pl.col('parsed_date').dt.year() // 10) * 10).alias('release_decade'),
        pl.col('parsed_date').dt.weekday().is_in([6, 7]).alias('weekend_release')
    ])
    
    def get_primary_genre(g_str):
        if not g_str: return "Drama"
        genres = [g.strip() for g in g_str.split(",") if g.strip()]
        return genres[0] if genres else "Drama"
        
    def get_genre_count(g_str):
        if not g_str: return 1
        return len([g.strip() for g in g_str.split(",") if g.strip()])
    
    df = df.with_columns([
        pl.col('Genre').alias('clean_genres'),
        pl.col('Genre').map_elements(get_primary_genre, return_dtype=pl.String).alias('primary_genre'),
        pl.col('Genre').map_elements(get_genre_count, return_dtype=pl.Int32).alias('genre_count')
    ])
    
    def bin_popularity(pop):
        if pop is None: return "Low"
        if pop >= 100: return "Trending"
        if pop >= 30: return "High"
        if pop >= 10: return "Medium"
        return "Low"
        
    df = df.with_columns(
        pl.col('Popularity').map_elements(bin_popularity, return_dtype=pl.String).alias('popularity_bin')
    )
    
    print(f"Features built. Dataset now has {df.height} rows.")
    return df
