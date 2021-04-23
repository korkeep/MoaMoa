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

# Image upload handler
def lambda_handler(event, context):

    # TODO
    # Upload data to S3 & get origin data link
    # Make thumbnail data to S3 & get thumbnail data link
    # Add new row to RDS (Type: photo, video, music, etc)
    
    # Test Code
    table = event['table']
    explain = event['explain']
    singer = event['singer']
    hashtag = event['hashtag']
    date = datetime.datetime.now().strftime('%Y-%m-%d')
    o_link = event['o_link']
    t_link = event['t_link']

    cursor = conn.cursor()
    sql = "INSERT INTO " + table + " (`index`, `explain`, `singer`, `hashtag`, `view`, `date`, `o_link`, `t_link`) VALUES (null, %s, %s, %s, '0', %s, %s, %s);"
    cursor.execute(sql, (explain, singer, hashtag, date, o_link, t_link))

    conn.commit()
    conn.close()

    return {
        'statusCode': 200,
        'body': json.dumps('moamoa upload test')
    }