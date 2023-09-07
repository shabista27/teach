# -*- coding: utf-8 -*-
"""
Created on Thu Sep  7 13:08:26 2023

@author: Shabista
"""
"""
Created on Wed Sep  6 13:28:16 2023

@author: Shabista
"""

import flask
from flask import Response,request
from flask_cors import CORS
from flask_api import status


app = flask.Flask(__name__)
CORS(app)

try:
    print("in trying")
    @app.route('/registration', methods=['POST'])
    
    def registration():
        #print("hit")
        #print(request.json)
        #print(type(request.json))
        name = request.json['Name']
        phone = request.json['PhoneNumber']
        email = request.json['Email']
        location = request.json['Location']
        language = request.json['Lang']
        days=request.json['Days']
        
        #print(name,phone,email,location,language,days)
        msg = "sure"
        try:
            #print("hi")
            
            resp = flask.Response(msg,status=status.HTTP_200_OK)
            resp.headers.add('Access-Control-Allow-Origin', '*')
            
            return resp
        except:
            print("Nope")
except:
    print("CANNOT REGISTER")

#app.debug=True
app.run()