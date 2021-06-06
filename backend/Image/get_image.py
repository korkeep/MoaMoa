import json
import math
# GET ALL IMAGES
# /image/list
def get_all_images(cursor, tag=None):
    if tag:
        sql = "SELECT * FROM photo WHERE main_tag like '%" + str(tag) + "%' or sub_tags like '%" + str(tag) + "%';"
    else:
        sql = "SELECT * FROM photo;"
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [id, _, image_t, summary, main_tag, sub_tags, visited, published_date] = data
        sub_tags = sub_tags.split(',')
        node = {
            'id':id,
            'image':image_t,
            'summary':summary,
            'main_tag':main_tag,
            'sub_tags':sub_tags,
            'visited':visited,
            'published_date':str(published_date)}
        res.append(node)
    
    body = {
        'page_info' : {'max_page' : math.ceil(len(res)/50.0)},
        'images' : res
    }
    return json.dumps(body)
    
# GET one IMAGE
# /image/view/{id}
def get_one_image(cursor, id):
    sql = "SELECT * FROM photo WHERE `id`=%s" %(id)
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [id, image_o, _, summary, main_tag, sub_tags, visited, published_date] = data
        sub_tags = sub_tags.split(',')
        node = {
            'id':id,
            'image':image_o,
            'summary':summary,
            'main_tag':main_tag,
            'sub_tags':sub_tags,
            'visited':visited,
            'published_date':str(published_date)}
        res.append(node)
    
    return json.dumps(res)