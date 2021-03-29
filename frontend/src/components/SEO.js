import { Helmet } from "react-helmet"


export default function SEO(props) {
    /*
    props {
        title: string;  // 타이틀
        description: string;  // 설명
        summary?: string; // 요약
        img?: string;  // 썸네일 이미지
        keyword?: string;  // 키워드
    }
    */
	return <Helmet
		  link={[
			{
			  href: `https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`,
			  rel: `stylesheet`
		    },
			{
			  href: `https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap`,
			  rel: `stylesheet`
		    }
		  ]}
		  title={props.title}
		  meta={[
			{
			  name: `description`,
			  content: props.description || 'DropBox',
			},
			{
			  property: `og:title`,
			  content: props.title,
			},
			{
			  property: `og:description`,
			  content: props.description,
			},
			{
			  property: `og:type`,
			  content: `website`,
			},
			{
			  name: `og:site_name`,
			  content: `DropBox`,
			},
			{
			  name: `og:image`,
			  content: props.img || '/static/DropBox.PNG',
			},
			{
			  name: `twitter:card`,
			  content: props.summary || 'DropBox',
			},
			{
			  name: `twitter:creator`,
			  content: 'DropBox',
			},
			{
			  name: `twitter:title`,
			  content: props.title,
			},
			{
			  name: `twitter:description`,
			  content: props.description || 'DropBox',
			},
			{
			  name: `keywords`,
			  content: props.keyword || 'DropBox',
			},
		  ].concat([])}
		/>
}