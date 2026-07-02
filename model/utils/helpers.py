from datetime import datetime
import ast

def parse_date(date_str):
    try:
        return datetime.strptime(str(date_str).strip(), "%Y-%m-%d")
    except Exception:
        return None

def parse_votes(vote_str):
    if vote_str is None or str(vote_str).lower() == 'nan':
        return 0
    vote_str = str(vote_str).strip().upper()
    try:
        if vote_str.endswith('K'):
            return int(float(vote_str[:-1]) * 1000)
        elif vote_str.endswith('M'):
            return int(float(vote_str[:-1]) * 1000000)
        return int(float(vote_str.replace(',', '')))
    except Exception:
        return 0

def parse_list_str(list_str):
    if list_str is None or str(list_str).lower() == 'nan':
        return ""
    try:
        items = ast.literal_eval(list_str)
        if isinstance(items, list):
            return ", ".join([str(item) for item in items])
        return str(list_str)
    except Exception:
        return str(list_str)
