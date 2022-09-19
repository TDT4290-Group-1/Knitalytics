from api.collector import trendingApi
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/getTrendingWords')
def getTrendingWords():
    return trendingApi()