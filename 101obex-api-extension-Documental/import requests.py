import requests
countries = requests.get( 
        url = "http://api.101obex.com:8000/ws/util.py/paises?todos=True&idioma=es&id_canal=1",
        headers = {
            "101ObexToken": "75a3fb63beb3fec417a9a433feb13279259ef0dc8c698ae0378c8cae3b2d704c"
        }
)

print(countries.json())