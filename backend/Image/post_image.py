import json
import boto3
import base64
import boto3
import botocore.config
from PIL import Image

# POST IMAGE
# /image/post
def post_image(cursor, conn, image, summary, main_tag, sub_tags, published_date):
    s3 = boto3.client('s3', 'ap-northeast-2', config=botocore.config.Config(s3={'addressing_style':'path'}))
    bucket = 'khu-static-s3'
    
    summary = str(summary)
    main_tag = str(main_tag)
    
    if len(sub_tags) > 0:
        sub_tags = ','.join(sub_tags)
    else:
        sub_tags = 'null'

    data = base64.b64decode(image)
    # make 원본
    with open('/tmp/o_file.png','wb') as f:
        f.write(data)

    # make 썸네일
    filename = "/tmp/o_file.png"
    t_file = Image.open(filename)
    t_file.thumbnail(tuple(x / 2 for x in t_file.size))
    t_file.save('/tmp/t_file.png')

    # upload 원본
    o_file_name = str(main_tag) + '_' + str(sub_tags) + '_' + str(published_date) + '_o_file.png'
    s3.upload_file('/tmp/o_file.png',bucket, o_file_name)
 
    # upload 썸네일
    t_file_name = str(main_tag) + '_' + str(sub_tags) + '_' + str(published_date) + '_t_file.png'
    s3.upload_file('/tmp/t_file.png',bucket, t_file_name)

    # s3 링크 설정
    o_link = 'https://khu-static-s3.s3.ap-northeast-2.amazonaws.com/%s' % o_file_name
    t_link = 'https://khu-static-s3.s3.ap-northeast-2.amazonaws.com/%s' % t_file_name
    
    sql = "INSERT INTO photo(`id`, `image_o`, `image_t`, `summary`, `main_tag`, `sub_tags`, `visited`, `published_date`) VALUES (null, %s, %s, %s, %s, %s, '0', %s);"
    cursor.execute(sql, (o_link, t_link, summary, main_tag, sub_tags, published_date))
    conn.commit()
    
    sql = "SELECT * FROM photo WHERE `summary`='%s' and `main_tag`='%s' and `sub_tags`='%s' and `image_o`='%s' and `image_t`='%s';" %(summary, main_tag, sub_tags, o_link, t_link)
    cursor.execute(sql)
        
    buff = cursor.fetchall()
    index = buff[0][0]
    
    return json.dumps(str(index))