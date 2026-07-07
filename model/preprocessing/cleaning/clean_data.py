import os
import sys

import polars as pl

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.helpers import parse_list_str, parse_votes


def clean_dataframe(df: pl.DataFrame) -> pl.DataFrame:
    rename_mapping = {
        "title": "Title",
        "release_date": "Release_Date",
        "description": "Overview",
        "rating": "Vote_Average",
    }
    rename_dict = {k: v for k, v in rename_mapping.items() if k in df.columns}
    df = df.rename(rename_dict)

    print("Parsing lists and cleaning data...")
    df = df.with_columns(
        [
            pl.col("genres")
            .map_elements(parse_list_str, return_dtype=pl.String)
            .alias("Genre"),
            pl.col("languages")
            .map_elements(
                lambda x: (
                    parse_list_str(x).split(",")[0].strip() if parse_list_str(x) else ""
                ),
                return_dtype=pl.String,
            )
            .alias("Original_Language"),
            pl.col("directors")
            .map_elements(parse_list_str, return_dtype=pl.String)
            .alias("director"),
            pl.col("stars")
            .map_elements(parse_list_str, return_dtype=pl.String)
            .alias("cast"),
            pl.col("countries_origin")
            .map_elements(parse_list_str, return_dtype=pl.String)
            .alias("country"),
            pl.col("votes")
            .map_elements(parse_votes, return_dtype=pl.Int32)
            .alias("Vote_Count"),
        ]
    )

    df = df.drop_nulls(subset=["Title", "Release_Date"])
    df = df.with_columns(
        pl.col("Overview").fill_null(""),
        pl.lit("").alias("Poster_Url"),
        pl.col("Vote_Average").cast(pl.Float64, strict=False).fill_null(0.0),
    )

    return df
