## 가져올 이미지를 정의bfg
#FROM node:20.18.0
## 경로 설정하기
#WORKDIR /app
## package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
#COPY package* .
## 명령어 실행 (의존성 설치)
#RUN npm install
## 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
#COPY . .
#
## 각각의 명령어들은 한줄 한줄씩 캐싱되어 실행된다.
## package.json의 내용은 자주 바뀌진 않을 거지만
## 소스 코드는 자주 바뀌는데
## npm install과 COPY . . 를 동시에 수행하면
## 소스 코드가 조금 달라질때도 항상 npm install을 수행해서 리소스가 낭비된다.
#
## 3000번 포트 노출
#EXPOSE 3000
#
## npm start 스크립트 실행
#CMD ["npm", "run", "serve"]
# Vue.js 빌드를 위한 Node.js 환경
FROM node:20.18.0 AS build
WORKDIR /app

# Vue.js 빌드
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx 이미지 기반
FROM nginx:1.25.2-alpine

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 Vue.js 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 포트 노출
EXPOSE 3000

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
