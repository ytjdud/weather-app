<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). -->

create-next-app 으로 부트스트랩된 next.js 프로젝트입니다.

## Introduction
OPEN WEATHER 의 [5 day weather forecast API](https://openweathermap.org/forecast5) 를 사용하여 날씨 정보를 표시해주는 웹입니다.     
기능 : 메인페이지에서 선택한 도시(서울, 도쿄, 파리, 런던)의 현재 날씨 정보와 5일 예보 정보가 표시됩니다.


## Getting Started

<!-- First, run the development server: -->
1. 먼저, 다음 명령어를 입력해 개발 서버를 시작합니다. 

```zsh
npm run dev
```
   
<!-- Then, Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. -->
2. [http://localhost:3000](http://localhost:3000) 에 접속하세요. 메인 페이지입니다.


<!-- [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). This endpoint can be edited in `pages/api/graphql.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages. -->

## How to Use

- 메인 화면
  - [http://localhost:3000](http://localhost:3000)

- 도시 별 상세 화면
  - [http://localhost:3000/Seoul](http://localhost:3000/Seoul) 
  - [http://localhost:3000/Tokyo](http://localhost:3000/Tokyo) 
  - [http://localhost:3000/Paris](http://localhost:3000/Paris) 
  - [http://localhost:3000/London](http://localhost:3000/London) 

도시 별 상세 화면은 현재 날짜를 포함한 5일의 예보가 제공됩니다.   
날짜를 클릭하면 시간대 별 정보를 볼 수 있습니다.


### 기타 정보
기술 스택
- Next.js (v.12.3.4)
- GraphQL
- Apollo
