## Backend
<img title="Backend" alt="" src="https://user-images.githubusercontent.com/20378368/121104099-4370f000-c83c-11eb-997a-4f23d8e200a6.png" width="800"/>  

**MoaMoa** 프로젝트의 Backend입니다.  
**AWS**를 이용하여 Backend 환경을 구축했습니다.  


### Directory
<img title="Directory" alt="" src="https://user-images.githubusercontent.com/20378368/121104366-df9af700-c83c-11eb-85be-22792588e8c7.png" width="800"/>  

**Serverless** 환경을 구축하기 위해 **API Gateway**, **Lambda**를 사용했습니다.  

- `Image`: 이미지 데이터를 처리하는 함수입니다. Post시, 이미지 썸네일이 생성됩니다.
- `Video`: 동영상 데이터를 처리하는 함수입니다. Post시, 동영상 썸네일이 생성됩니다.
- `Music`: 음원 데이터를 처리하는 함수입니다.
- `ETC`: 이외의 데이터를 처리하는 함수입니다.


### Storage
<img title="Storage" alt="" src="https://user-images.githubusercontent.com/20378368/121104754-a57e2500-c83d-11eb-9a69-6320726fdd52.png" width="800"/>  

메타데이터를 저장하기 위해 **RDS**를, 원본 데이터를 저장하기 위해 **S3**를 사용했습니다.  
데이터가 **RDS**에 저장되는 형식은 다음과 같습니다.

| 항목 | 설명 |
| --- | --- |
| id | 데이터의 ID, Auto Increment 속성 부여 |
| type | image, video, music, etc 4개의 Table로 분류 |
| summary | 데이터에 대한 전체적인 설명 추가 가능 |
| main_tag | 검색 과정에서 사용되는 메인 해시태그 |
| sub_tags | 검색 과정에서 사용되는 부가적인 해시태그 |
| visited | 조회수 순으로 정렬하기 위한 값 |
| published_date | 날짜 순으로 정렬하기 위한 값 |
| o_link | S3에 저장된 원본 데이터 링크 |
| t_link | S3에 저장된 썸네일 링크 (image, video) |