import json

# POST MUSIC
# /music/post
def post_music(cursor, conn, o_link, explain, singer, hashtag, date):
    sql = "INSERT INTO music(`index`, `explain`, `singer`, `hashtag`, `view`, `date`, `o_link`) VALUES (null, %s, %s, %s, '0', %s, %s);"
    cursor.execute(sql, (explain, singer, hashtag, date, o_link))
    conn.commit()
    
    sql = "SELECT * FROM music WHERE `explain`='%s' and singer='%s' and hashtag='%s';" %(explain,singer,hashtag)
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