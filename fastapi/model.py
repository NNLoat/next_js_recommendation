import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
import ast
import numpy as np
from scipy.spatial.distance import cosine
from sklearn.cluster import KMeans



def id_to_item_name(id: str, df:pd.DataFrame):
    item_map = {}
    for i in range(len(df)):
        item_map[df['product_id'].values[i]] = df['product description_eng'].values[i]
    
    return item_map.get(id)

def item_name_to_id(name:str, df:pd.DataFrame):
    id_map = {}
    for i in range(len(df)):
        id_map[df['product description_eng'].values[i]] = df['product_id'].values[i]
    
    return id_map.get(name)


def processed_dataset(dataset_path):
    tmp_df = pd.read_csv(dataset_path)
    tmp_df['new'] = tmp_df['new'].apply(ast.literal_eval)
    return tmp_df


def apriori_rules(df, to_find_name):
    rule2 = pd.read_csv('./csv/apriori_rules.csv')

    res = []
    item_to_find = df[df['product description_eng'] == to_find_name]['product description_eng'].values[0]
    for i in range(len(rule2['antecedents'].apply(list).values.tolist())):
        if item_to_find in rule2['antecedents'].apply(list).values.tolist()[i]:
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

def cosine_sim_different_cluster(emb_index, df, embeddings):
    num_clusters = len(set(df['product_type'].values))
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    clusters = kmeans.fit_predict(embeddings)

    tmp_emb = []
    for i in range(len(clusters)):
        if clusters[i] != clusters[emb_index]:
            tmp_emb.append(embeddings[i])
    
    # similar, distance = calculate_least_cosine_distances(embeddings[emb_index], tmp_emb)
    similar, distance = calculate_least_cosine_distances(embeddings[emb_index], embeddings)
    similar = [similar[i] for i in range(len(similar)) if clusters[i] != clusters[emb_index]]
    distance = [distance[i] for i in range(len(distance)) if clusters[i] != clusters[emb_index]]
    similar, distance = similar[1:15], distance[1:15]
    # print(similar)
    tmp_df = df.iloc[similar]
    return tmp_df['product_id'].values.tolist()


def main_model_function(product_id, df):
    with open('./desc_eng_embedding.npy', 'rb') as f:
        embeddings =np.load(f)
    # min_support = 0.07
    to_find_name = df[df['product_id'] == product_id]['product description_eng'].values[0]
    emb_index = df.index[df['product_id'] == product_id].tolist()[0]
    print(emb_index)
    
    # dataset = import_dataset()
    
    res = {
        'apriori': apriori_rules(df,to_find_name),
        'cosine': cosine_sim_same_cluster(emb_index, df, embeddings),
        'cluster': cosine_sim_different_cluster(emb_index, df, embeddings)
    }

    res2 = res['apriori'] + res['cosine'] + res['cluster']
    res2 = list(dict.fromkeys(res2))[:5]
    # print(res)
    return {'item': res2}


    
