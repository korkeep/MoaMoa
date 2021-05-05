import json

# POST VIDEO
# /video/post
def post_video(cursor, conn, o_link, explain, singer, hashtag, date):
    sql = "INSERT INTO video(`index`, `explain`, `singer`, `hashtag`, `view`, `date`, `o_link`, `t_link`) VALUES (null, %s, %s, %s, '0', %s, %s, null);"
    cursor.execute(sql, (explain, singer, hashtag, date, o_link))
    conn.commit()
    
    sql = "SELECT * FROM video WHERE `explain`='%s' and singer='%s' and hashtag='%s';" %(explain,singer,hashtag)
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