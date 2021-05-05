import json

# POST IMAGE
# /image/post
def post_image(cursor, conn, o_link, explain, singer, hashtag, date):
    sql = "INSERT INTO photo(`index`, `explain`, `singer`, `hashtag`, `view`, `date`, `o_link`, `t_link`) VALUES (null, %s, %s, %s, '0', %s, %s, null);"
    cursor.execute(sql, (explain, singer, hashtag, date, o_link))
    conn.commit()
    
    sql = "SELECT * FROM photo WHERE `explain`='%s' and singer='%s' and hashtag='%s';" %(explain,singer,hashtag)
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