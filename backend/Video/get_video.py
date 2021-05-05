import json

# GET ALL VIDEOS
# /video/list
def get_all_videos(cursor):
    sql = "SELECT * FROM video;"
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [index,explain,singer,hashtag,view,date,o_link,t_link] = data
        node = {
            'id':index,
            'video':t_link,
            'summary':explain,
            'main_tag':singer,
            'sub_tag':hashtag,
            'visited':view,
            'published_date':str(date)}
        res.append(node)
    
    return {
        'statusCode': 200,
        'headers':{
            'Content-Type' : "application/json"
        },
        'body': json.dumps(res)
    }
    
# GET one VIDEO
# /video/view/{id}
def get_one_video(cursor, id):
    sql = "SELECT * FROM video WHERE `index`=%s" %(id)
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [index,explain,singer,hashtag,view,date,o_link,t_link] = data
        node = {
            'id':index,
            'video':o_link,
            'summary':explain,
            'main_tag':singer,
            'sub_tag':hashtag,
            'visited':view,
            'published_date':str(date)}
        res.append(node)
    
    return {
        'statusCode': 200,
        'headers':{
            'Content-Type' : "application/json"
        },
        'body': json.dumps(res)
    }