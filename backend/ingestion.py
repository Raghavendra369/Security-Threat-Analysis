import pandas as pd
from database import threats_collection

def ingest_csv(filepath):
    df = pd.read_csv(filepath)
    records = df.to_dict(orient='records')
    threats_collection.insert_many(records)
    print(f"Inserted {len(records)} records.")

if __name__ == "__main__":
    ingest_csv("cyber_threats.csv")

