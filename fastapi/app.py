from fastapi import FastAPI
import pandas as pd
import json
from model import main_model_function # import function หาสินค้าที่เกี่ยวข้อง
from fastapi.middleware.cors import CORSMiddleware

# โหลดข้อมูลสินค้า
df = pd.read_csv('./csv/Recommendation_item_data.csv')
app = FastAPI()

# Allow CORS (เพื่อให้ระบบ nextjs สามารถขึ้น fetch api เพื่อหาสินค้าที่เกี่ยวข้องได้)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get('/recommendation/')
async def return_rec(item_id: str):
    try:
        if item_id in df['product_id'].values:
            # หาสินค้าที่เกี่ยวข้อง
            return main_model_function(item_id, df)
        else:
            return {'message': "Failed to obtained a result"}
    except Exception as e:
        raise Exception(e)