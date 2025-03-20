import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
import ast
import numpy as np
from scipy.spatial.distance import cosine
from sklearn.cluster import KMeans

# เปลี่ยน รหัสสินค้าเป็นชื่อสินค้า เช่น 100610 -> ท่อ PB
def id_to_item_name(id: str, df:pd.DataFrame):
    item_map = {}
    for i in range(len(df)):
        item_map[df['product_id'].values[i]] = df['product description_eng'].values[i]
    
    return item_map.get(id)



# เปลี่ยน ชื่อสินค้าเป็นรหัสสินค้า เช่น ท่อ PB -> 100610
def item_name_to_id(name:str, df:pd.DataFrame):
    id_map = {}
    for i in range(len(df)):
        id_map[df['product description_eng'].values[i]] = df['product_id'].values[i]
    
    return id_map.get(name)


def apriori_rules(df, to_find_name):
    # โหลด apriori ที่เราคิดไว้แล้ว
    rule2 = pd.read_csv('./csv/apriori_rules.csv')

    # ตั้งลิสต์ที่จะเก็บสินค้า
    res = []
    item_to_find = df[df['product description_eng'] == to_find_name]['product description_eng'].values[0]
    for i in range(len(rule2['antecedents'].apply(list).values.tolist())):
        # ถ้าสินค้าเกี่ยวข้อง
        if item_to_find in rule2['antecedents'].apply(list).values.tolist()[i]:
            # ใส่เข้าไปในผลลัพธ์ที่เกี่ยวข้อง
            res.append(rule2['consequents'].apply(list).values.tolist()[i])

    for i  in range(len(res)):
        res[i] = [item_name_to_id(x,df) for x in res[i]]
    # flatten list
    res = [z for x in res for z in x]
    return res


def calculate_least_cosine_distances(input_emb, embeddings):
    distance = []
    for emb in embeddings:
        distance.append(cosine(input_emb, emb))
    return np.argsort(distance), [distance[x] for x in np.argsort(distance)]

def cosine_sim_same_cluster(emb_index, df, embeddings):
     similar, distance = calculate_least_cosine_distances(embeddings[emb_index], embeddings)
     similar, distance = similar[1:6], distance[1:6]
     tmp_df = df.iloc[similar]
     return tmp_df['product_id'].values.tolist()



# ฟังก์ชั่น main
def main_model_function(product_id, df):
    # โหลดตัว embedding ของคำอธิบายสินค้า
    with open('./desc_eng_embedding.npy', 'rb') as f:
        embeddings =np.load(f)
    to_find_name = df[df['product_id'] == product_id]['product description_eng'].values[0]
    emb_index = df.index[df['product_id'] == product_id].tolist()[0]
    print(emb_index)
    
    
    res = {
        'apriori': apriori_rules(df,to_find_name),
        'cosine': cosine_sim_same_cluster(emb_index, df, embeddings),
    }

    res2 = res['apriori'] + res['cosine']
    res2 = list(dict.fromkeys(res2))[:5]
    return {'item': res2}


    
