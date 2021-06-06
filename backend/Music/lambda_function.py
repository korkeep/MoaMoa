import datetime
import sys
import logging
import rds_config
import pymysql
import get_music
import post_music
import json

#rds settings
rds_host  = "khu-db.csv5dh63nzdc.ap-northeast-2.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()
logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")

def lambda_handler(event, context):
    cursor = conn.cursor()
    res = {'headers':{
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Headers' : 'Content-Type',
        'Access-Control-Allow-Origin' : "*",
        'Access-Control-Allow-Methods': "OPTIONS,POST,GET"
    }}
    # post music
    if event['httpMethod'] == 'POST':
        body = json.loads(event['body'])
        res['statusCode'] = 200
        res['body'] = post_music.post_music(cursor, conn, body['music'],body['title'],body['summary'],body['main_tag'],body['sub_tags'],datetime.datetime.now().strftime('%Y-%m-%d'))
    # get one music
    elif event['httpMethod'] == 'GET' and event['resource'] == '/music/view/{id+}':
        res['statusCode'] = 200
        res['body'] = get_music.get_one_music(cursor,event['pathParameters']['id'])
    # get all musics
    elif event['httpMethod'] == 'GET' and event['resource'] == '/music/list':
        res['statusCode'] = 200
        if event['queryStringParameters']:
            res['body'] = get_music.get_all_musics(cursor,event['queryStringParameters']['query'])
        else:
            res['body'] = get_music.get_all_musics(cursor)
    else:
        res['statusCode'] = 400
        res['body'] = json.dumps(event)

    return res