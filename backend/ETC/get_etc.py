import json
import math
# GET ALL ETCs
# /etc/list
def get_all_etcs(cursor,tag=None):
    if tag:
        sql = "SELECT * FROM etc WHERE main_tag like '%" + str(tag) + "%' or sub_tags like '%" + str(tag) + "%';"
    else:
        sql = "SELECT * FROM etc;"
        
    cursor.execute(sql)
    buff = cursor.fetchall()

    res = []
    for data in buff:
        [id,title,summary,file,main_tag,sub_tags,visited,published_date] = data
        sub_tags = sub_tags.split(',')
        node = {
            'id':id,
            'title' : title, 
            'summary': summary,
            'file' : file,
            'main_tag': main_tag,
            'sub_tags': sub_tags,
            'visited': visited,
            'published_date': str(published_date)}
        res.append(node)
    
    body = {
        'page_info' : {'max_page' : math.ceil(len(res)/50.0)},
        'etcs' : res
    }
    return json.dumps(body)

# GET one ETC
# /etc/view/{id}
def get_one_etc(cursor, id):
    sql = "SELECT * FROM etc WHERE `id`=%s" %(id)
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [id,title,summary,file,main_tag,sub_tags,visited,published_date] = data
        sub_tags = sub_tags.split(',')
        node = {
            'id':id,
            'title' : title, 
            'summary': summary,
            'file' : file,
            'main_tag': main_tag,
            'sub_tags': sub_tags,
            'visited': visited,
            'published_date': str(published_date)}
        res.append(node)
    
    return json.dumps(res)