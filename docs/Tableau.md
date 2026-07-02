# Tableau Analytics

Business intelligence dashboards built in **Tableau Desktop** for the Netflix AI Analytics Platform.

---

## Overview

The Tableau workbook (`.twbx`) provides executive-level BI dashboards that complement the web dashboard. These visualizations are designed for presentation to non-technical stakeholders.

---

## Workbook File

```
Netflix Analytics.twbx
```

Open with **Tableau Desktop** (version 2022.3 or later) or **Tableau Public**.

---

## Dashboards Included

### 1. Content Overview Dashboard
- Total titles by platform (pie chart)
- Content type split: Movies vs TV Shows
- Top 10 genres by volume

### 2. Release Trends Dashboard
- Annual content release volume by year (1950–2024)
- Platform-wise growth overlay
- Genre trend lines

### 3. Ratings & Popularity Dashboard
- Vote average distribution histogram
- Popularity vs vote count scatter plot
- Top 20 most popular titles

### 4. Geographic Dashboard
- Content origin by country (map)
- Language distribution

### 5. ML Results Dashboard
- Model accuracy comparison bar chart
- Feature importance bar chart
- Confusion matrix visualization

---

## Data Source

The Tableau workbook connects to the same cleaned CSV datasets:
- `model/datasets/mymoviedb.csv`
- `model/datasets/disney_plus_titles.csv`
- `model/datasets/amazon_prime_titles.csv`

Or optionally to the exported `cleaned_dataset.csv` for a unified view.

---

## Refreshing Data

1. Open `Netflix Analytics.twbx` in Tableau Desktop
2. Go to **Data → Refresh All Extracts**
3. Or re-point the connection to the updated CSV files

---

## Publishing to Tableau Public

1. Sign in to [Tableau Public](https://public.tableau.com)
2. Open workbook in Tableau Desktop
3. File → Save to Tableau Public As...
4. Share the public link in your portfolio
