import os
import sys
import pandas as pd
import sweetviz as sv

def main():
    print("=========================================================================")
    # 1. Paths
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(root_dir, "datasets", "cleaned_dataset.csv")
    report_path = os.path.join(root_dir, "datasets", "sweetviz_report.html")
    
    if not os.path.exists(data_path):
        print(f"Error: Unified dataset not found at {data_path}. Run ingest.py first.")
        sys.exit(1)
        
    print(f"Loading unified dataset from {data_path}...")
    df = pd.read_csv(data_path)
    print(f"Loaded {len(df)} titles. Commencing AutoEDA Data Profiling using SweetViz...")
    
    # 2. Run SweetViz profiling
    # We will analyze variables, correlations, distributions and generate the dashboard report html
    report = sv.analyze(
        df,
        target_feat='popularity',
        feat_cfg=sv.FeatureConfig(skip=['poster_url', 'overview'])
    )
    
    print(f"Generating SweetViz HTML report and writing output to {report_path}...")
    report.show_html(filepath=report_path, open_browser=False)
    print(f"AutoEDA report generated successfully! File location: {report_path}")
    print("=========================================================================")

if __name__ == "__main__":
    main()
