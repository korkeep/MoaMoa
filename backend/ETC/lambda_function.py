import datetime
import sys
import logging
import rds_config
import pymysql
import get_etc
import post_etc
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
    # post etc
    if event['httpMethod'] == 'POST':
        body = json.loads(event['body'])
        res = post_etc.post_etc(cursor, conn, body['etc'],body['summary'],body['main_tag'],body['sub_tags'],datetime.datetime.now().strftime('%Y-%m-%d'))
    # get one etc
    elif event['httpMethod'] == 'GET' and event['resource'] == '/etc/view/{id+}':
        res = get_etc.get_one_etc(cursor,event['pathParameters']['id'])
    # get all etcs
    elif event['httpMethod'] == 'GET' and event['resource'] == '/etc/list':
        if event['queryStringParameters']:
            res = get_etc.get_all_etcs(cursor,event['queryStringParameters']['query'])
        else:
            res = get_etc.get_all_etcs(cursor)
    
    res['headers'] = {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Headers' : 'Content-Type',
        'Access-Control-Allow-Origin' : "*",
        'Access-Control-Allow-Methods': "POST,GET"
    }
    return res