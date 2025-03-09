from fastapi import FastAPI
import pandas as pd
import json
from model import main_model_function
from fastapi.middleware.cors import CORSMiddleware

# excel_file_name = './item_dataset.xlsx'
# df = pd.read_excel('./item_dataset.xlsx', sheet_name='Sheet1')
df = pd.read_csv('./csv/Recommendation_item_data.csv')
app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# dataset_stat = {
#     '2-pair': 0.3,
#     '3-pair': 0.3,
#     'correlate-pair': 0.3,
#     'single': 0.1
# }



@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get('/recommendation/')
async def return_rec(item_id: str):
    try:
        if item_id in df['product_id'].values:
            return main_model_function(item_id, df)
            # return df[df['item_id'] == item_id].to_dict(orient='index')
        else:
            return {'message': "Failed to obtained a result"}
    except Exception as e:
        raise Exception(e)