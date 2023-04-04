# chartjs-node-docker


## Browsers support

日経新聞電子版利用環境に準ずる

[パソコン向けサービスの利用環境](https://www.nikkei.com/info/computer.html)

[日経電子版モバイルの利用環境](https://www.nikkei.com/info/mw.html)

| Microsoft Edge | Chrome | Safari | iOS Safari | Android Chrome |
| --------- | --------- | --------- | --------- |--------- |
| 最新版 | 最新版 | 最新版 | 最新版 | 最新版 | 


## Usga

- 起動 docker-compose.ymlのある場所で
`$ docker compose up`

- バックグラウンドで起動 docker-compose.ymlのある場所で
`$ docker compose up -d`

- 起動中のコンテナ一覧
`$ docker compose ps`

- 「web」という名前のコンテナへ入る場合
`$ docker-compose exec web bash`

- 停止 
`Ctr + c` もしくは `$ docker-compose stop`

- コンテナ起動中にブラウザで開く  
http://localhost:3000/
