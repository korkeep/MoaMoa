import json

# GET ALL MUSICS
# /music/list
def get_all_musics(cursor,tag=None):
    if tag:
        sql = "SELECT * FROM music WHERE 0<>LOCATE('%s',hashtag);"
    else:
        sql = "SELECT * FROM music;"
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    res = []
    for data in buff:
        [index,explain,singer,hashtag,view,date,o_link] = data
        node = {
            'id':index,
            'music':o_link,
            'summary':explain,
            'main_tag':singer,
            'sub_tag':hashtag,
            'visited':view,
            'published_date':str(date)}
        res.append(node)
    
    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }


# GET one MUSIC
# /music/view/{id}
def get_one_music(cursor, id):
    sql = "SELECT * FROM music WHERE `index`=%s" %(id)
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [index,explain,singer,hashtag,view,date,o_link] = data
        node = {
            'id':index,
            'music':o_link,
            'summary':explain,
            'main_tag':singer,
            'sub_tag':hashtag,
            'visited':view,
            'published_date':str(date)}
        res.append(node)
    
    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }