import json
import boto3
import base64
import boto3
import botocore.config

# POST ETC
# /etc/post
def post_etc(cursor, conn, file, title, summary, main_tag, sub_tags, published_date):
    s3 = boto3.client('s3', 'ap-northeast-2', config=botocore.config.Config(s3={'addressing_style':'path'}))
    bucket = 'khu-static-s3'

    title = str(title)
    summary = str(summary)
    main_tag = str(main_tag)
    

    if len(sub_tags) > 0:
        sub_tags = ','.join(sub_tags)
    else:
        sub_tags = 'null'

    data = base64.b64decode(file)
    # make 원본
    with open('/tmp/o_file', 'wb') as f:
        f.write(data)
    
    # upload 원본
    o_file_name = str(main_tag) + '_' + str(sub_tags) + '_' + str(published_date) + '_o_file'
    s3.upload_file('/tmp/o_file',bucket, o_file_name)
    
    
    # s3 링크 설정
    o_link = 'https://khu-static-s3.s3.ap-northeast-2.amazonaws.com/%s' % o_file_name
    
    sql = "INSERT INTO etc(`id`,`title`,`summary`,`file`, `main_tag`, `sub_tags`, `visited`, `published_date`) VALUES (null, %s, %s, %s, %s, %s, '0', %s);"
    cursor.execute(sql, (title, summary, o_link, main_tag, sub_tags, published_date))
    conn.commit()
    
    
    
    sql = "SELECT * FROM etc WHERE `title`='%s' and `summary`='%s' and main_tag='%s' and sub_tags='%s';" %(title, summary, main_tag, sub_tags)
    cursor.execute(sql)
    
    buff = cursor.fetchall()
    index = buff[0][0]
    
    return json.dumps(str(index))