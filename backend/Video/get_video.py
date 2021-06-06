import json
import math
# GET ALL VIDEOS
# /video/list
def get_all_videos(cursor,tag=None):
    if tag:
        sql = "SELECT * FROM video WHERE main_tag like '%" + str(tag) + "%' or sub_tags like '%" + str(tag) + "%';"
    else:
        sql = "SELECT * FROM video;"
        
    cursor.execute(sql)
    buff = cursor.fetchall()

    res = []
    for data in buff:
        [id,_,image,summary,main_tag,sub_tags,visited,published_date] = data
        sub_tags = sub_tags.split(',')
        node = {
            'id':id,
            'image':image,
            'summary':summary,
            'main_tag':main_tag,
            'sub_tags':sub_tags,
            'visited':visited,
            'published_date':str(published_date)}
        res.append(node)
    
    body = {
        'page_info' : {'max_page' : math.ceil(len(res)/50.0)},
        'videos' : res
    }  
    return json.dumps(body)
    
# GET one VIDEO
# /video/view/{id}
def get_one_video(cursor, id):
    sql = "SELECT * FROM video WHERE `id`=%s" %(id)
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [id,video, _, summary,main_tag,sub_tags,visited,published_date] = data
        sub_tags = sub_tags.split(',')
        node = {
            'id':id,
            'video':video,
            'summary':summary,
            'main_tag':main_tag,
            'sub_tags':sub_tags,
            'visited':visited,
            'published_date':str(published_date)}
        res.append(node)
    
    return json.dumps(res)