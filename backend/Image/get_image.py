import json

# GET ALL IMAGES
# /image/list
def get_all_images(cursor):
    sql = "SELECT * FROM photo;"
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [index,explain,singer,hashtag,view,date,o_link,t_link] = data
        node = {
            'id':index,
            'image':t_link,
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
    
# GET one IMAGE
# /image/view/{id}
def get_one_image(cursor, id):
    sql = "SELECT * FROM photo WHERE `index`=%s" %(id)
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [index,explain,singer,hashtag,view,date,o_link,t_link] = data
        node = {
            'id':index,
            'image':o_link,
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