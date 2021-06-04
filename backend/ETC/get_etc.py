import json

# GET ALL ETCs
# /etc/list
def get_all_etcs(cursor,tag=None):
    if tag:
        sql = "SELECT * FROM etc WHERE 0<>LOCATE('%s',hashtag);" %(tag)
    else:
        sql = "SELECT * FROM etc;"
        
    cursor.execute(sql)

    buff = cursor.fetchall()
    res = []
    for data in buff:
        [index,explain,singer,hashtag,view,date,o_link] = data
        node = {
            'id':index,
            'etc':o_link,
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

# GET one ETC
# /etc/view/{id}
def get_one_etc(cursor, id):
    sql = "SELECT * FROM etc WHERE `index`=%s" %(id)
        
    cursor.execute(sql)
    buff = cursor.fetchall()
    
    res = []
    for data in buff:
        [index,explain,singer,hashtag,view,date,o_link] = data
        node = {
            'id':index,
            'etc':o_link,
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