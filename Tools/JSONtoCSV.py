import pandas as pd
import json 
import os

s_rel = "Vocab/construction_vocabulary_german_english.json"
d_rel = "Vocab/construction_vocabulary_german_english.csv"

script_dir = os.path.dirname(__file__) 
s_abs = os.path.join(script_dir, s_rel)
d_abs = os.path.join(script_dir, d_rel)

with open(s_abs) as f:
    json_data = json.load(f)
    df = pd.DataFrame(json_data)
    df.to_csv(d_abs, index=False)