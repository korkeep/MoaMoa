import base64
import boto3
import json

s3 = boto3.client('s3')

def lambda_handler(event, context):
    response = s3.get_object(
        Bucket='khu-static-s3',
        Key='IU.PNG',
    )
    
    image = response['Body'].read()
    
    #Header Type: image/png, image/jpeg, image/jpg, video/avi, video/mp4, music/mp3, etc/*
    return {
        'headers': { "Content-Type": "image/png" },
        'statusCode': 200,
        'body': base64.b64encode(image).decode('utf-8'),
        'isBase64Encoded': True
    }