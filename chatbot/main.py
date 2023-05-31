import random
import urllib.parse
import requests
from fastapi import FastAPI, HTTPException, Path, Query
from pydantic import BaseModel
import json
import numpy as np
import tensorflow as tf
import nltk
nltk.download('punkt')
nltk.download('wordnet')

app = FastAPI()

model = tf.keras.models.load_model('./chatbot_model_4.h5')

json_path = 'intents.json'
with open(json_path) as intention:
    intents = json.load(intention)

words = []
classes = []
docs = []
ignore = ['!', '?', '.....', ',', '.']
sentence_words = []

for intent in intents['intents']:
    for pattern in intent['patterns']:
        token = nltk.word_tokenize(pattern)
        words.extend(token)
        docs.append((token, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

lemmatizer = nltk.WordNetLemmatizer()
words = [lemmatizer.lemmatize(token.lower())
         for token in words if token not in ignore]
words = sorted(list(set(words)))

wordss = np.array(words)


def get_content(query):
    key = 'AIzaSyBW-sTYuFO2r0N0LmMAcxqXKSYY9K0KYYQ'
    cx = '97f5dcf95601b403d'
    encoded_query = urllib.parse.quote(query)
    url = f"https://www.googleapis.com/customsearch/v1?key={key}&cx={cx}&q={encoded_query}"
    # headers = {
    #         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
    #     }
    response = (requests.get(url).text)
    load = json.loads(response)
    # scrap = BeautifulSoup(response.text,'html.parser')

    new = list(load['items'])[:3]

    return new


def parse_only_link(query):
    linkList = []
    listContent = get_content(query)
    for content in intents['intents']:
        # print(list(content))
        if 'links' in list(content):
            linkList = content['links']
        for link in listContent:
            linkList.append(f"[{link['title']}]({link['link']})")
            # linkList.append(link['link'])

    return linkList


def clean_list(links):
    for i in links:
        links.remove(i)


def clean_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(
        word.lower()) for word in sentence_words if word not in ignore]
    sentence_words = sorted(list(set(sentence_words)))
    return sentence_words


def bag_of_words(sentence, words, show_details=False):
    sentence_words = clean_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1

    arrBag = np.array(bag)
    return np.stack(arrBag)


def generate_response(sentence):
    input_data = bag_of_words(sentence, words)
    input_data = input_data.reshape(1, input_data.shape[0])
    results = model.predict(input_data)[0]
    results_index = np.argmax(results)
    tag = classes[results_index]

    if results[results_index] > 0.5:
        for intent in intents['intents']:
            if intent['tag'] == tag:
                response = random.choice(intent['responses'])
                return response
            if 'links' in list(intent):
                response = random.choice(intent['responses'])
                links = parse_only_link(sentence)[-3:]
                return response, links
    else:
        return "I'm sorry, I didn't understand that."


class Item(BaseModel):
    input: str


@app.get('/')
def index():
    return 'Hello world'


@app.post("/")
def add_item(item: Item):
    user_input = item.input
    response = generate_response(user_input)
    respList = list(response)
    # if len(respList) == 2:
    #     # return respList[0]
    #     print("Chatbot:", respList[0])
    #     for link in respList[1]:
    #         print(link)
    #         return link
    # else:
    #     return {response}

    # response = parse_only_link(user_input)
    return respList