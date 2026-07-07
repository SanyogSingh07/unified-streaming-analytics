#!/usr/bin/env python3
"""
Database seeding script.
Downloads datasets (if not present) and populates the SQLite database.
Run from project root: python scripts/seed_db.py
"""

import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

sys.path.insert(0, os.path.join(ROOT, "backend", "app"))
sys.path.insert(0, os.path.join(ROOT, "backend", "models"))

print("=" * 55)
print("  Netflix AI Analytics - Database Seeder")
print("=" * 55)
print()

DATASETS_DIR = os.path.join(ROOT, "datasets")
required_files = [
    "mymoviedb.csv",
    "disney_plus_titles.csv",
    "amazon_prime_titles.csv",
]

missing = [
    f for f in required_files if not os.path.exists(os.path.join(DATASETS_DIR, f))
]

CI_FIXTURE_MOVIES = [
    {
        "id": 1,
        "title": "Inception",
        "overview": "A thief who steals corporate secrets through dream-sharing technology.",
        "popularity": 85.0,
        "vote_count": 20000,
        "vote_average": 8.8,
        "original_language": "en",
        "genres": "Action, Sci-Fi, Thriller",
        "poster_url": "",
        "release_date": "2010-07-16",
        "release_decade": 2010,
        "release_year": 2010,
        "release_month": 7,
        "weekend_release": False,
        "primary_genre": "Action",
        "genre_count": 3,
        "popularity_bin": "High",
    },
    {
        "id": 2,
        "title": "The Matrix",
        "overview": "A computer hacker learns about the true nature of his reality.",
        "popularity": 72.5,
        "vote_count": 18000,
        "vote_average": 8.7,
        "original_language": "en",
        "genres": "Action, Sci-Fi",
        "poster_url": "",
        "release_date": "1999-03-31",
        "release_decade": 1990,
        "release_year": 1999,
        "release_month": 3,
        "weekend_release": False,
        "primary_genre": "Action",
        "genre_count": 2,
        "popularity_bin": "High",
    },
    {
        "id": 3,
        "title": "Interstellar",
        "overview": "A team of explorers travel through a wormhole in space.",
        "popularity": 68.0,
        "vote_count": 15000,
        "vote_average": 8.6,
        "original_language": "en",
        "genres": "Adventure, Drama, Sci-Fi",
        "poster_url": "",
        "release_date": "2014-11-07",
        "release_decade": 2010,
        "release_year": 2014,
        "release_month": 11,
        "weekend_release": False,
        "primary_genre": "Adventure",
        "genre_count": 3,
        "popularity_bin": "High",
    },
]


def seed_ci_fixtures(db, Movie):
    """Seed minimal movie rows when full datasets are unavailable (CI)."""
    if db.query(Movie).count() > 0:
        print(f"[OK] Database already seeded with {db.query(Movie).count():,} records")
        return

    for row in CI_FIXTURE_MOVIES:
        db.add(Movie(**row))
    db.commit()
    print(f"[OK] Seeded {len(CI_FIXTURE_MOVIES)} CI fixture records")


try:
    from database import Base, engine
    from models import Movie
    from sqlalchemy.orm import Session

    Base.metadata.create_all(bind=engine)
    print("[OK] Database tables created")

    with Session(engine) as db:
        count = db.query(Movie).count()
        if count > 0:
            print(f"[OK] Database already seeded with {count:,} records")
            print("  To reseed, delete the database file first")
        elif missing:
            if os.getenv("CI"):
                print(f"[WARN] Missing dataset files: {missing}")
                print("-> Seeding CI fixture data instead of full pipeline...")
                seed_ci_fixtures(db, Movie)
            else:
                print(f"[WARN] Missing dataset files: {missing}")
                print("   Run: python download_dataset.py")
                print("   Or place CSVs manually in: model/datasets/")
                sys.exit(1)
        else:
            print("[OK] All dataset files found")
            print("-> Database is empty, running ingestion pipeline...")
            ingestion_script = os.path.join(ROOT, "model", "run_pipeline.py")
            if not os.path.exists(ingestion_script):
                print(f"[ERROR] Pipeline script not found: {ingestion_script}")
                sys.exit(1)

            result = subprocess.run(
                [sys.executable, ingestion_script],
                cwd=ROOT,
                capture_output=False,
            )
            if result.returncode != 0:
                if os.getenv("CI"):
                    print("[WARN] Pipeline failed in CI; seeding fixture data instead.")
                    seed_ci_fixtures(db, Movie)
                else:
                    print("[ERROR] Pipeline failed. Check logs above.")
                    sys.exit(1)

            final_count = db.query(Movie).count()
            print(f"[OK] Seeded {final_count:,} records successfully")

except ImportError as e:
    print(f"[ERROR] Import error: {e}")
    print("  Ensure requirements/api.txt is installed")
    sys.exit(1)

print()
print("=" * 55)
print("  Database seeding complete!")
print("=" * 55)
