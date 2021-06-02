import json
import boto3
import base64
import boto3
import botocore.config

# POST VIDEO
# /video/post
def post_video(cursor, conn, file, explain, singer, hashtag, date):
    s3 = boto3.client('s3', 'ap-northeast-2', config=botocore.config.Config(s3={'addressing_style':'path'}))
    bucket = 'khu-static-s3'
    
    data = base64.b64decode(file)
    # make 원본
    with open('/tmp/o_file.avi','wb') as f:
        f.write(data)
    # make 썸네일
    # 오류남
    '''
    t_file = Image.open('o_file.avi')
    t_file.thumbnail(tuple(x / 2 for x in t_file.size))
    t_file.save('t_file.png')
    '''
    with open('/tmp/t_file.avi','wb') as f:
        f.write(data)

    # upload 원본
    o_file_name = str(singer) + '_' + str(hashtag) + '_' + str(date) + '_o_file.avi'
    s3.upload_file('/tmp/o_file.avi',bucket, o_file_name)
 
    # upload 썸네일
    t_file_name = str(singer) + '_' + str(hashtag) + '_' + str(date) + '_t_file.avi'
    s3.upload_file('/tmp/t_file.avi',bucket, t_file_name)

    # s3 링크 설정
    o_link = 'https://khu-static-s3.s3.ap-northeast-2.amazonaws.com/%s' % o_file_name
    t_link = 'https://khu-static-s3.s3.ap-northeast-2.amazonaws.com/%s' % t_file_name
    
    sql = "INSERT INTO video(`index`, `explain`, `singer`, `hashtag`, `view`, `date`, `o_link`, `t_link`) VALUES (null, %s, %s, %s, '0', %s, %s, %s);"
    cursor.execute(sql, (explain, singer, hashtag, date, o_link, t_link))
    conn.commit()
    
    sql = "SELECT * FROM video WHERE `explain`='%s' and singer='%s' and hashtag='%s' and o_link='%s' and t_link='%s';" %(explain,singer,hashtag,o_link,t_link)
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


def test(cursor, conn, o_link, explain, singer, hashtag, date):
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