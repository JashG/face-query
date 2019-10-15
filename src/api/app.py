import boto3
from flask import Flask
import json
from flask import request
from flask_restful import Resource, Api
from flask import jsonify
import pandas as pd
import io
#from flask.ext.cors import CORS, cross_origin

flaskAppInstance = Flask(__name__)

#app.config['CORS_HEADERS'] = 'Content-Type'
#cors = CORS(app, resources={r"/searchcelebrity": {"origins": "http://localhost:7000"}})


@flaskAppInstance.route('/all')
def index():
    s3 = boto3.client('s3')
    bucket_name = 'hack2019'
    s3_object = s3.get_object(Bucket=bucket_name, Key='video_links.txt')
    body = s3_object['Body'].read()
    df = pd.read_csv(io.BytesIO(body))
    df.set_index("videoname", drop=True, inplace=True)
    data = df.to_dict(orient="index")

    return jsonify(data)

@flaskAppInstance.route('/searchcelebrity')
#@cross_origin(origin='localhost',headers=['Content- Type'])
def serachforcelebrity():
    name = request.args.get('celebrity')
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('hack2019results')
    df = pd.DataFrame()
    # get to get the whole body.
    for obj in bucket.objects.all():
        key = obj.key
        body = obj.get()['Body'].read()
        print(body)
        if df.empty:
            df = pd.read_csv(io.BytesIO(body))
        else:
            df1 = pd.read_csv(io.BytesIO(body))
            df = df.append(df1, ignore_index=True)
    df = df[df['cel_name'].str.contains(name.lower())]
    df = df.groupby(['cel_name', 'videofile'])
    dict_t = {}
    for name, group in df:
        if name[0] not in dict_t.keys():
            dict_t[name[0]] = {}

        dict_t[name[0]][name[1]] = group.frames.tolist()
    response = jsonify(dict_t)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@flaskAppInstance.route('/searchcast')
def serachforcast():
    name = request.args.get('cast')
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('hack2019results')
    df = pd.DataFrame()
    # get to get the whole body.
    for obj in bucket.objects.all():
        key = obj.key
        body = obj.get()['Body'].read()
        if df.empty:
            df = pd.read_csv(io.BytesIO(body))
        else:
            df1 = pd.read_csv(io.BytesIO(body))
            df =df.append(df1,ignore_index=True)
    df = df[df['videofile'].str.contains(name.lower())]
    df = df.groupby(['videofile','cel_name'])
    dict_t ={}
    for name, group in df:
        if name[0] not in dict_t.keys():
            dict_t[name[0]] = {}

        dict_t[name[0]][name[1]] = group.frames.tolist()
    return jsonify(dict_t)

@flaskAppInstance.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == '__main__':
    flaskAppInstance.run(host="0.0.0.0", port=7000, debug=True, use_reloader=True)
