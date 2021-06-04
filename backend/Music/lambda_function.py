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
    res = {
        'statusCode': 400,
        'body': 'error'
    }
    # post music
    if event['httpMethod'] == 'POST':
        body = json.loads(event['body'])
        res = post_music.post_music(cursor, conn, body['music'],body['summary'],body['main_tag'],body['sub_tags'],datetime.datetime.now().strftime('%Y-%m-%d'))
    # get one music
    elif event['pathParameters']:
        res = get_music.get_one_music(cursor,event['pathParameters']['id'])
    # get all musics
    else:
        res = get_music.get_all_musics(cursor)

    res['headers'] = {
        'Content-Type' : 'applicaion/json',
        'Access-Control-Allow-Headers' : 'Content-Type',
        'Access-Control-Allow-Origin' : "*",
        'Access-Control-Allow-Methods': "POST,GET"
    }  
    return res