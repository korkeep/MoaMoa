import json
import boto3
import base64
import boto3
import botocore.config

# POST MUSIC
# /music/post
def post_music(cursor, conn, file, explain, singer, hashtag, date):
    s3 = boto3.client('s3', 'ap-northeast-2', config=botocore.config.Config(s3={'addressing_style':'path'}))
    bucket = 'khu-static-s3'
    
    data = base64.b64decode(file)
    # make 원본
    with open('/tmp/o_file.mp3', 'wb') as f:
        f.write(data)
    
    # upload 원본
    o_file_name = str(singer) + '_' + str(hashtag) + '_' + str(date) + '_o_file.mp3'
    s3.upload_file('/tmp/o_file.mp3',bucket, o_file_name)
    
    # s3 링크 설정
    o_link = 'https://khu-static-s3.s3.ap-northeast-2.amazonaws.com/%s' % o_file_name
    
    # INSERT Query
    sql = "INSERT INTO music(`index`, `explain`, `singer`, `hashtag`, `view`, `date`, `o_link`) VALUES (null, %s, %s, %s, '0', %s, %s);"
    cursor.execute(sql, (explain, singer, hashtag, date, o_link))
    conn.commit()
    
    
    # SELECT Query
    sql = "SELECT * FROM music WHERE `explain`='%s' and singer='%s' and hashtag='%s' and o_link='%s';" %(explain,singer,hashtag,o_link)
    cursor.execute(sql)
        
    buff = cursor.fetchall()
    index = buff[0][0]
    
    return {
        'statusCode': 200,
        'body': json.dumps(str(index))
    }