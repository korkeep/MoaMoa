import datetime
import sys
import logging
import rds_config
import pymysql
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

# Image download handler
def lambda_handler(event, context):

    # TODO
    # Search data to RDS using index & get S3 data link
    # Download data to local using S3 link
    
    # Test Code
    table = event['table']
    index = event['index']

    cursor = conn.cursor()
    sql = "SELECT o_link FROM " + table + " WHERE `index` = %s;"
    cursor.execute(sql, index)
    o_link = cursor.fetchall()

    # S3 data download using o_link

    res = []
    for item in o_link:
        d = dict()
        d['o_link'] = str(item[0])
        res.append(d)

    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }
