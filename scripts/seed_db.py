#!/usr/bin/env python3
"""
Database seeding script.
Downloads datasets (if not present) and populates the SQLite database.
Run from project root: python scripts/seed_db.py
"""

import os
import sys
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Add backend to path
BACKEND_DIR = os.path.join(ROOT, "deployment", "backend")
sys.path.insert(0, BACKEND_DIR)

print("=" * 55)
print("  Netflix AI Analytics - Database Seeder")
print("=" * 55)
print()

# Check datasets exist
DATASETS_DIR = os.path.join(ROOT, "model", "datasets")
required_files = [
    "mymoviedb.csv",
    "disney_plus_titles.csv",
    "amazon_prime_titles.csv",
]

missing = []
for f in required_files:
    path = os.path.join(DATASETS_DIR, f)
    if not os.path.exists(path):
        missing.append(f)

if missing:
    print(f"⚠️  Missing dataset files: {missing}")
    print("   Run: python download_dataset.py")
    print("   Or place CSVs manually in: model/datasets/")
    sys.exit(1)

print("✓ All dataset files found")
print()

# Run the ingestion pipeline
try:
    from database import Base, engine
    from models import Movie
    from sqlalchemy.orm import Session

    # Create tables
    Base.metadata.create_all(bind=engine)
    print("✓ Database tables created")

    with Session(engine) as db:
        count = db.query(Movie).count()
        if count > 0:
            print(f"✓ Database already seeded with {count:,} records")
            print("  To reseed, delete the .db file first")
        else:
            print("→ Database is empty, running ingestion pipeline...")
            ingestion_script = os.path.join(ROOT, "model", "run_pipeline.py")
            if os.path.exists(ingestion_script):
                result = subprocess.run(
                    [sys.executable, ingestion_script],
                    cwd=ROOT,
                    capture_output=False,
                )
                if result.returncode == 0:
                    final_count = db.query(Movie).count()
                    print(f"✓ Seeded {final_count:,} records successfully")
                else:
                    print("✗ Pipeline failed. Check logs above.")
                    sys.exit(1)
            else:
                print(f"✗ Pipeline script not found: {ingestion_script}")
                sys.exit(1)

except ImportError as e:
    print(f"✗ Import error: {e}")
    print("  Ensure requirements/api.txt is installed")
    sys.exit(1)

print()
print("=" * 55)
print("  ✅ Database seeding complete!")
print("=" * 55)
