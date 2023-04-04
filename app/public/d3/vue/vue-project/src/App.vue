<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import D3 from './D3.vue'
// import { ref } from 'vue'
// import * as d3 from 'd3'
</script>

<template>
  <div>
    <v-app id="inspire">
      <v-app-bar :elevation="1"></v-app-bar>
      <v-main class="bg-grey-lighten-3">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="10"
            >
              <v-sheet
                rounded="lg"
              >
                <h1>{{ message }}</h1>
                <div id="d3"></div>
                <div id="legend"></div>
                <div id="card"></div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>


export default {
  data() {
    return {
      message: '日経クロステック'
    }
  },
  mounted() {
    this.tests()
  },
  methods: {
    tests() {
      // グラフの幅
      const width = 800
      // グラフの高さ
      const height = 600
      var radius = Math.min(width, height) / 2;
      // グラフの色
      const colorScale = d3.scaleOrdinal().range([
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
      ]);

      // 1. svgの作成
      const svg = d3.select("div#d3").append("svg").attr("width", width).attr("height", height);
      const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

      var rScale = d3.scaleLinear()
        .domain([0, radius])
        .range([0.4 * radius, radius]);

      // var reftest = this.$refs.reftest[0].color;

      // 2. jsonファイルの読み込み
      d3.csv("/data.json")
        .then((json) => {
          const data = json.data;
          console.log(data);
          var arrData= [];
          /*
            JSON形式ではデータの数は配列の要素数なので、
            data.lengthとすることで、データ総数を把握できます。
          */
          for( var i=0 ; i < data.length ; i++){
      
          /*
            読み込まれたデータはキー名として参照します。
            salesのキー名の最初の配列のデータを読み込み
            データセット(arrData)に代入しています。
          */
            arrData.push( data[i] );
          }
        })
        .catch((error) => {
          console.log(error)
        })

      
    

      d3.csv('')
        .then((data) => {
          // console.log(data)
          //必要
          var data = {
            "name":"",
            "children":[{
              "name":"AI",
              "children": [{
                "name": "基礎知識",
                "children": [{
                  "name": "初級", 
                  "children": {
                    "name":"ビジネスパーソンが最低限知っておくべきAIの基本", 
                    "value": 1
                  }
                },{
                  "name": "中級",
                  "children": [{
                    "name":"AI入門",
                    "value":1
                  },{
                    "name":"教養として知っておきたいAIの到達点",
                    "value":1
                  }]
                }]
              },{
                "name": "数学的知識", 
                "children": [{
                  "name": "中級",
                  "children": {
                    "name":"機械学習のための数学入門",
                    "value":1
                  }
                },{
                  "name": "上級",
                  "children": {
                    "name":"AIブームの立役者「強化学習」を直感的に理解する",
                    "value":1
                  }
                }]
              },{
                "name": "資格対策", 
                "children": {
                  "name": "中級",
                  "children": [{
                    "name":"ディープラーニング「G検定」対策［前編］",
                    "value":1
                  },{
                    "name":"ディープラーニング「G検定」対策［後編］",
                    "value":1
                  }]
                }
              },{
                "name": "実装",
                "children": {
                  "name": "中級",
                  "children": {
                    "name":"Pythonで役立つAIをつくる方法",
                    "value":1
                  }
                }
              }]
            },{
              "name": "セキュリティー",
              "children": [{
                "name": "暗号", 
                "children": {
                  "name": "初級", 
                  "children": {
                    "name":"図解 暗号の用語と仕組み", 
                    "value": 1
                  }
                }
              },{
                "name": "実験", 
                "children": {
                  "name": "中級",
                  "children": {
                    "name":"試してわかるセキュリティー実験室", 
                    "value": 1
                  }
                }
              },{
                "name": "脆弱性", 
                "children": {
                  "name": "中級",
                  "children": {
                    "name":"ソフトに脆弱性が生まれるワケ", 
                    "value": 1
                  }
                }
              },{
                "name": "認証", 
                "children": [{
                  "name": "初級", 
                  "children": [{
                    "name":"絶対に分かる「ユーザー認証」", 
                    "value": 1
                  },{
                    "name":"基礎から理解、ゼロトラストネットワーク", 
                    "value": 1
                  },{
                    "name":"さらばパスワード、FIDOの正体", 
                    "value": 1
                  }]
                },{
                  "name": "中級",
                  "children": {
                    "name":"ゼロトラストを支える技術", 
                    "value": 1
                  }
                }]
              }]
            },{
              "name":"ネットワーク",
              "children": [{
                "name": "インターネットの仕組み", 
                "children": [{
                  "name": "初級", 
                  "children": [{
                    "name":"図解で学ぶIP", 
                    "value": 1
                  },{
                    "name":"図解で学ぶTCP", 
                    "value": 1
                  },{
                    "name":"図解で学ぶHTTP", 
                    "value": 1
                  },{
                    "name":"図解で学ぶIPアドレス", 
                    "value": 1
                  }]
                },{
                  "name": "中級",
                  "children": {
                    "name":"図解で学ぶHTTP/3", 
                    "value": 1
                  }
                }]
              },{ 
                "name": "ネットワークの基本", 
                "children": {
                  "name": "初級", 
                  "children": [{
                    "name":"異例の存在 イーサネット", 
                    "value": 1
                  },{
                    "name":"イラストで学ぶネットワークのき・ほ・ん", 
                    "value": 1
                  },{
                    "name":"まるわかりDHCP", 
                    "value": 1
                  }]
                }
              },{
                "name": "ネットワーク運用", 
                "children": {
                  "name": "初級", 
                  "children": {
                    "name":"やさしく分かるネットワーク監視", 
                    "value": 1
                  }
                }
              },{
                "name": "ネットワーク入門", 
                "children": {
                  "name": "初級", 
                  "children": [{
                    "name":"ネスペ試験に学ぶネットワーク技術", 
                    "value": 1
                  },{
                    "name":"イラストでわかるネットワークの基礎", 
                    "value": 1
                  }]
                }
              },{
                "name": "運用",
                "children": {
                  "name": "中級",
                  "children": {
                    "name":"トラブル解決にはこう使う！コマンド七つ道具", 
                    "value": 1
                  }
                }
              },{
                "name": "無線通信", 
                  "children": [{
                    "name": "初級", 
                    "children": [{
                      "name":"絶対分かる5Gの仕組み", 
                      "value": 1
                    },{
                      "name":"イラストで学ぶ無線LANの基本［設計・構築］", 
                      "value": 1
                    }]
                  },{
                    "name": "中級",
                    "children": [{
                      "name":"安くて遠くまで届くIoT無線「LPWA」", 
                      "value": 1
                    },{
                      "name":"見えてきた次世代モバイル「6G」", 
                      "value": 1
                    },{
                      "name":"6GHz帯の無線LAN、Wi-Fi 6Eのインパクト", 
                      "value": 1
                    },{
                      "name":"LPWAの仕組み", 
                      "value": 1
                    }]
                  }]
              },{
                "name": "歴史",
                "children": [{
                  "name": "初級", 
                  "children": {
                    "name":"インターネット進化論", 
                    "value": 1
                  }
                },{
                  "name": "中級",
                  "children": {
                    "name":"懐かしのプロトコル図鑑", 
                    "value": 1
                  }
                }]
              }]
            },{
              "name":"プログラミング",
              "children": [{
                "name": "JavaScript", 
                "children": {
                  "name": "初級", 
                  "children": {
                    "name":"クジラ飛行机「仕事に役立つJavaScript入門」", 
                    "value": 1
                  }
                }
              },{
                "name": "Python", 
                "children": [{
                  "name": "初級", 
                  "children": [{
                    "name":"Python入門講座", 
                    "value": 1
                  },{
                    "name":"Pythonを使って学ぶ高校数学の基礎", 
                    "value": 1
                  },{
                    "name":"Python開発、はじめの一歩", 
                    "value": 1
                  },{
                    "name":"技術者のためのPython", 
                    "value": 1
                  },{
                    "name":"7日間でマスター、Pythonの基本", 
                    "value": 1
                  },{
                    "name":"イラストで学ぶ！はじめてのPython", 
                    "value": 1
                  },{
                    "name":"独学で一気に学ぶPython", 
                    "value": 1
                  }]
                },{
                  "name": "中級",
                  "children": [{
                    "name":"Pythonなら手軽に学べる！SQLの基本", 
                    "value": 1
                  },{
                    "name":"Pythonで役立つAIをつくる方法", 
                    "value": 1
                  },{
                    "name":"Pythonで作る3Dゲーム", 
                    "value": 1
                  }]
                },{
                  "name": "上級",
                  "children": {
                    "name":"Pythonで作る人工生命", 
                    "value": 1
                  }
                }]
              },{
                "name": "アルゴリズム", 
                "children": [{
                  "name": "初級", 
                  "children": {
                    "name":"身近なアルゴリズム", 
                    "value": 1
                  }
                },{
                  "name": "中級",
                  "children": [{
                    "name":"万年カレンダーで学ぶアルゴリズム", 
                    "value": 1
                  },{
                    "name":"ソフト開発の要、必修アルゴリズム10選", 
                    "value": 1
                  }]
                }]
              },{
                "name": "論理演算", 
                "children": {
                  "name": "初級", 
                  "children": {
                    "name":"論理演算の基本", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/02299/index.html",
                    "description": "　「信頼性のある自由なデータ流通（Data Free Flow with Trust、DFFT）」の一部を構成するガバメントアクセスは、すでに机上の空論ではなく実務対応が必要な要件となりつつある。ガバメントアクセスの経緯や位置づけ、背景を概説し、その理念や目的について検討する。",
                    "img": "https://xtech.nikkei.com/atcl/nxt/column/18/02299/top.jpg"
                  }
                }
              }]
            }]
          }

          const root = d3.hierarchy(data);
          root.sum(function(d) { return d.value; })
            .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

          var partition = d3.partition()
            .size([2 * Math.PI, radius]);

          partition(root);

          // 5. SVG要素の設定
          var arc = d3.arc()
            .startAngle(function(d) { return d.x0; })
            .endAngle(function(d) { return d.x1; })
            .innerRadius(function(d) { return rScale(d.y0); })
            .outerRadius(function(d) { return rScale(d.y1); });

          var tooltip = d3.select("div#d3")
            .append("div")
            .style("position", "absolute")
            .style("text-align", "left")
            .style("background", "#ffffff")
            .style("border", "1px solid #000000")
            .style("padding", "10px")
            .style("opacity", 0);

          var card = d3.select("div#card")
            .append("div")
            .style("position", "absolute")
            .style("text-align", "left")
            .style("background", "#ffffff")
            .style("border", "1px solid #000000")
            .style("padding", "10px")
            .style("opacity", 0);

          g.selectAll("path")
            .data(root.descendants())
            .enter()
            .append("path")
            .attr("d", arc)
            .attr('stroke', '#fff')
            .attr("fill", function(d) {
              while(d.depth > 1) d = d.parent;
              if(d.depth == 0) return "transparent";
              return colorScale(d.value);
            })
            .attr("opacity", 0.8)
            .text(function(d) { return d.data.name + "\n" + d.value; })
            .on("mouseover", function(d) {
              d3.select(this)
                .transition().duration(500)
                // .attr("fill", "lightgray");
                .attr("fill", function(d) {
                  while(d.depth > 1) d = d.parent;
                  if(d.depth == 0) return "transparent";
                  return "lightgray";
                });
              
              d3.select(this)
                .append("div")
                .attr("fill", "black")
                .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                .attr("dy", "5px")
                .attr("font", "10px")
                .attr("text-anchor", "middle")
                .text(function(d) { return d.data.name; });
              
              //データの深さ
              // console.log(d.target.__data__.parent);
              var arr = [];
              if(d.target.__data__.depth > 0){
                // tooltip
                const e = d.target.__data__.data.name;
                
                tooltip
                  .style("left", d.x + 30 + 'px')
                  .style("top", d.y + 'px')
                  .html(e)
                  .style("opacity", 1);
                //現在地
                arr.push(d.target.__data__.data.name);

                if(d.target.__data__.depth > 1) {
                  arr.push(d.target.__data__.parent.data.name);
                  if(d.target.__data__.depth > 2) {
                    arr.push(d.target.__data__.parent.parent.data.name);
                    if(d.target.__data__.depth > 3) {
                      arr.push(d.target.__data__.parent.parent.parent.data.name);

                      const c = "<p>" + d.target.__data__.data.name + d.target.__data__.data.img + d.target.__data__.data.description + "</p>";
                      card.style("left", 100 + 'px')
                                .style("top", 50 + 'px')
                                .html(c)
                                .style("opacity", 1);
                      // console.log(c)

                      if(d.target.__data__.depth > 4) {
                        arr.push(d.target.__data__.parent.parent.parent.parent.data.name);
                      }
                    } 
                  } 
                } 
              }
              // console.log(arr)
              arr.forEach((element) => {
                const legend = d3.select("div#legend")
                  .append("div")
                  .style("position", "absolute")
                  .style("text-align", "left")
                  .style("background", "#ffffff")
                  .style("border", "1px solid #000000")
                  .style("padding", "10px")
                  .style("opacity", 0);
                
                legend.html(element)
                  .style("opacity", 1);
              })
            })
            .on("mouseout", function() {
              d3.select(this)
                .transition().duration(500)
                .attr("fill", function(d) {
                  while(d.depth > 1) d = d.parent;
                  if(d.depth == 0) return "transparent";
                  return colorScale(d.value);
                });
              
              tooltip
                .transition().duration(3000)
                .style("opacity", 0);
            })
            .on("click", function(d) {
              if(d.target.__data__.depth == 4){
                location.href = d.target.__data__.data.href;
              }
            }) 
        })
        .catch((error) => {
          console.log(error)
        })
    },
    mouseover(d) {
      console.log("mouseover")
    }
  },
}
</script>

