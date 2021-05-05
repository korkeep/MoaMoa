import json

# POST ETC
# /etc/post
def post_etc(cursor, conn, o_link, explain, singer, hashtag, date):
    sql = "INSERT INTO etc(`index`, `explain`, `singer`, `hashtag`, `view`, `date`, `o_link`) VALUES (null, %s, %s, %s, '0', %s, %s);"
    cursor.execute(sql, (explain, singer, hashtag, date, o_link))
    conn.commit()
    
    sql = "SELECT * FROM etc WHERE `explain`='%s' and singer='%s' and hashtag='%s';" %(explain,singer,hashtag)
    cursor.execute(sql)
        
    buff = cursor.fetchall(); res = []
    index = buff[0][0]
    
    return {
        'statusCode': 200,
        'headers':{
            'Content-Type' : "application/json"
        },
        'body': json.dumps(str(index))
    }