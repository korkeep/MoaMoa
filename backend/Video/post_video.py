import json
import boto3
import base64
import boto3
import botocore.config
import thumbnail

# POST VIDEO
# /video/post
def post_video(cursor, conn, file, summary, main_tag, sub_tags, published_date):
    s3 = boto3.client('s3', 'ap-northeast-2', config=botocore.config.Config(s3={'addressing_style':'path'}))
    bucket = 'khu-static-s3'
    
    summary = str(summary)
    main_tag = str(main_tag)

    if len(sub_tags) > 0:
        sub_tags = ','.join(sub_tags)
    else:
        sub_tags = 'null'

    data = base64.b64decode(file)
    # make 원본
    with open('/tmp/o_file.avi','wb') as f:
        f.write(data)
    
    # make 썸네일
    filename = "/tmp/o_file.avi"
    t_file = thumbnail.create_thumbnail(filename)
    t_file.save('/tmp/t_file.png')

    # upload 원본
    o_file_name = str(main_tag) + '_' + str(sub_tags) + '_' + str(published_date) + '_o_file.mp4'
    s3.upload_file('/tmp/o_file.avi',bucket, o_file_name)
 
    # upload 썸네일
    t_file_name = str(main_tag) + '_' + str(sub_tags) + '_' + str(published_date) + '_t_file.png'
    s3.upload_file('/tmp/t_file.png',bucket, t_file_name)

    # s3 링크 설정
    o_link = 'https://khu-static-s3.s3.ap-northeast-2.amazonaws.com/%s' % o_file_name
    t_link = 'https://khu-static-s3.s3.ap-northeast-2.amazonaws.com/%s' % t_file_name
    
    sql = "INSERT INTO video(`id`, `video`, `image`, `summary`, `main_tag`, `sub_tags`, `visited`, `published_date`) VALUES (null, %s, %s, %s, %s, %s, '0', %s);"
    cursor.execute(sql, (o_link, t_link, summary, main_tag, sub_tags, published_date))
    conn.commit()
    
    sql = "SELECT * FROM video WHERE `summary`='%s' and main_tag='%s' and sub_tags='%s' and video='%s' and image='%s';" %(summary, main_tag, sub_tags, o_link, t_link)
    cursor.execute(sql)
        
    buff = cursor.fetchall()
    index = buff[0][0]
    
    return json.dumps(str(index))