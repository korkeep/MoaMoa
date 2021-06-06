import json
import math
# GET ALL MUSICS
# /music/list
def get_all_musics(cursor,tag=None):
    if tag:
        sql = "SELECT * FROM music WHERE main_tag like '%" + str(tag) + "%' or sub_tags like '%" + str(tag) + "%';"
    else:
        sql = "SELECT * FROM music;"
    cursor.execute(sql)
    buff = cursor.fetchall()

    res = []
    for data in buff:
        [id,title,_,music,main_tag,sub_tags,visited,published_date] = data
        sub_tags = sub_tags.split(',')
        node = {
            'id':id,
            'title':title,
            'main_tag':main_tag,
            'music':music,
            'sub_tags':sub_tags,
            'visited':visited,
            'published_date':str(published_date)}
        res.append(node)
    
    body = {
        'page_info' : {'max_page' : math.ceil(len(res)/50.0)},
        'musics' : res
    }
    return json.dumps(body)

# GET one MUSIC
# /music/view/{id}
def get_one_music(cursor, id):
    sql = "SELECT * FROM music WHERE `id`=%s" %(id)
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [id,title,summary,music,main_tag,sub_tags,visited,published_date] = data
        sub_tags = sub_tags.split(',')
        node = {
            'id':id,
            'title':title,
            'summary':summary,
            'music':music,
            'main_tag':main_tag,
            'sub_tags':sub_tags,
            'visited':visited,
            'published_date':str(published_date)}
        res.append(node)
    
    return json.dumps(res)