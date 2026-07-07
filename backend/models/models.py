import os
import sys

from sqlalchemy import Boolean, Column, Float, Integer, String

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(backend_dir, "app"))
from database import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    release_date = Column(String, index=True)
    title = Column(String, index=True)
    overview = Column(String)
    popularity = Column(Float)
    vote_count = Column(Integer)
    vote_average = Column(Float)
    original_language = Column(String)
    genres = Column(String)  # Comma-separated list: "Action, Adventure"
    poster_url = Column(String)

    # Note: IMDB Dataset doesn't have cross-platform columns

    # Feature Engineered Fields
    release_decade = Column(Integer, index=True)
    release_year = Column(Integer, index=True)
    release_month = Column(Integer)
    weekend_release = Column(Boolean)
    primary_genre = Column(String, index=True)
    genre_count = Column(Integer)
    popularity_bin = Column(String)  # e.g. "Low", "Medium", "High", "Trending"
