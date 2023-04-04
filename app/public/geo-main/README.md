# geo
Chart.jsの地図用json類

## 47都道府県の地図用jsonを作成する手順

### シェープファイルからgeojsonへの変換
- 国土地理院の[ページ](https://www.gsi.go.jp/kankyochiri/gm_jpn.html)から行政界のzipをダウンロードする。（もしくはリポジトリ内のpolbnda_jpn.shpを使用）国土交通省の国土数値情報からも行政区域のzipがダウンロード可能だが、地物が多すぎるため、こちらは使用しない
- polbnda_jpn.shpをQGISで開く。
QGISのインストール・使用方法についてはQGIS_manual.pdfを参照
- 属性テーブルを開き、編集モードにした状態でいらないカラムを削除
- ベクタ＞ジオメトリの簡素化で、許容範囲を0.01にして実行
- ベクタ＞空間演算ツール＞融合で、基準となる属性でnamを選択する。市町村単位の地物が都道府県単位に変更される
- 書き出したいレイヤを右クリックし、エクスポート＞地物の保存でgeojson形式にして保存する

### geojsonからtopojsonへの変換
- Node.jsを使える環境で、[topojson](https://github.com/topojson/topojson)をインストールする
```
npm install -g topojson
```

- geojsonをtopojsonに変換
```
geo2topo -q 1e6 topojsonで使用したいobject名=hoge.geojson > fuga.topo.json
```
※-q オプションは量子化のために必要
