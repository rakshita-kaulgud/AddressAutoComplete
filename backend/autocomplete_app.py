from flask import Flask
from flask import render_template
import requests
import os
import json
from urllib.parse import urlencode  # pylint: disable=import-error,no-name-in-module
from urllib.request import Request, urlopen

app = Flask(__name__, template_folder='../ui')
app._static_folder = os.path.abspath("../ui/static/")


autocomplete_url2 = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
api_key = ""
search_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
lat, lng = 38.0293, 78.4767


@app.route("/")
def home():
    return render_template('index.html')


@app.route("/autocomplete/<searchquery>", methods=["GET"])
def autocomplete(searchquery):
    print("hi autocomplete")
    url_params = urlencode(
        {"key": api_key, "input": searchquery, "types": "geocode", "location": f"{lat},{lng}", "radius": 1500})
    url = f"{autocomplete_url2}?{url_params}"
    print("calling: " + url)
    response = requests.get(url)
    print(response.text)
    return response.text


@app.route("/search/<searchquery>", methods=["GET"])
def searchplace(searchquery):
    print("hi searchquery")
    url_params = urlencode({"key": api_key, "query": searchquery, "location": f"{lat},{lng}", "radius": 1500})
    url = f"{search_url}?{url_params}"
    print("calling: " + url)
    response = requests.get(url)
    print(response.text)
    return response.text


if __name__ == "__main__":
    app.run(debug="true")

