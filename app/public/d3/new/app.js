import { ref } from 'vue';

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
      const height = 500
      var radius = Math.min(width, height) / 2;
      // グラフの色
      const colorScale = d3.scaleOrdinal().range([
        "#F0CED3", "#C1CD75", "#87755E", "#6E9452", "#E5AAB4", "#CEA288", "#BAA298", "#D46981", "#B54C60"
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
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00998/",
                    "description": "AI（人工知能）に関する知識を習得することは、今後のビジネスパーソンにとって必須になる。その理由と、ITエンジニアでなくても身につけておくべきAI知識とはどんなものか、それをどう学べばよいかを解説する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00998/top.jpg?__scale=w:240,h:180&_sh=0fc03a0b06"
                  }
                },{
                  "name": "中級",
                  "children": [{
                    "name":"AI入門",
                    "value":1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00001/",
                    "description": "AI（人工知能）という言葉をテレビや新聞で目にする機会が増えています。しかし、AIがどのようなもので、どのように利用されているのかはよくわかっていない、というエンジニアは少なくないのではないでしょうか。エンジニアが知っておきたいAIの基本を解説します。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00001/top.jpg?__scale=w:240,h:180&_sh=0b408d0650"
                  },{
                    "name":"教養として知っておきたいAIの到達点",
                    "value":1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01563/",
                    "description": "大きな進歩を遂げて活用が広がる人工知能（AI）。これまで数年の周期で「ブーム」と「冬の時代」を繰り返し、今まさにブームである春の真っただ中だ。本特集では、世界的名著「ゲーデル、エッシャー、バッハ あるいは不思議の環」（白揚社）の著者、ダグラス・ホフスタッターのまな弟子が「AIの春」について4回にわたってお届けする。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01563/top.jpg?__scale=w:240,h:180&_sh=0870f20d50"
                  }]
                }]
              },{
                "name": "数学的知識", 
                "children": [{
                  "name": "中級",
                  "children": {
                    "name":"機械学習のための数学入門",
                    "value":1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00816/",
                    "description": "機械学習を理解する上でカギとなる数学。数学をマスターすることは、機械学習エンジニアになるための最短コースといえる。本特集では、なぜ機械学習で数学が必要なのかを、高校1年生レベルの数学を使って説明する。",
                    "img": ""
                  }
                },{
                  "name": "上級",
                  "children": {
                    "name":"AIブームの立役者「強化学習」を直感的に理解する",
                    "value":1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00913/",
                    "description": "現在は第3次人工知能（AI）ブームといわれています。このブームの立役者の1つが「強化学習」と呼ばれる技術です。本連載は、強化学習の基礎から最新の話題まで、分かりやすく解説します。読者の方に技術のエッセンスを直感的に理解してもらい、より専門的な教科書や論文を読みこなせるようになってもらうことが目標です。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00913/top.jpg?__scale=w:240,h:180&_sh=0b60ba0c30"
                  }
                }]
              },{
                "name": "資格対策", 
                "children": {
                  "name": "中級",
                  "children": [{
                    "name":"ディープラーニング「G検定」対策［前編］",
                    "value":1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00072/",
                    "description": "日本ディープラーニング協会が実施する「G検定」は、ディープラーニングをビジネス活用するための知識を問う検定試験である。合格のために特に重要となるポイントを解説する。前編では、検定の全体像と人工知能の歴史、機械学習を取り上げる。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00072/top.jpg?__scale=w:240,h:180&_sh=031048000c"
                  },{
                    "name":"ディープラーニング「G検定」対策［後編］",
                    "value":1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00073/",
                    "description": "日本ディープラーニング協会（JDLA）が実施する「G検定」合格を目指す上で、重要なポイントを前後編で解説する本講座。後編は、いよいよディープラーニングの技術を取り上げる。最後には番外編として、受験記も用意した。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00073/top.jpg?__scale=w:240,h:180&_sh=0410608105"
                  }]
                }
              },{
                "name": "実装",
                "children": {
                  "name": "中級",
                  "children": {
                    "name":"Pythonで役立つAIをつくる方法",
                    "value":1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01408/",
                    "description": "AI（人工知能）開発のプログラミング言語として高い人気を誇るPython。データ処理や機械学習のためのライブラリも豊富です。本特集では5回にわたって、Pythonの実習を通じて実際の機械学習モデルの開発方法を解説していきます。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01408/top.jpg?__scale=w:240,h:180&_sh=07401c03a0"
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
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00308/",
                    "description": "ネットワークを安全に利用するには、データの秘密を守る暗号が不可欠だ。公開鍵暗号、共通鍵暗号、ハッシュの三大暗号の仕組みから、IPsecやTLS、無線LANの暗号技術を一気に解説していく。これさえ読めば、暗号はもう怖くない。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00308/top.jpg?__scale=w:240,h:180&_sh=0a10dc0630"
                  }
                }
              },{
                "name": "実験", 
                "children": {
                  "name": "中級",
                  "children": {
                    "name":"試してわかるセキュリティー実験室", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01800/",
                    "description": "マスクを付けたまま顔認証が成功するのか、ハードディスクやUSBメモリーを泥水につかってもデータは読み出せるか――セキュリティーに関する素朴な疑問を実際に試して検証する「セキュリティー実験室」。セキュリティーの専門家による検証結果を紹介する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01800/top.jpg?__scale=w:240,h:180&_sh=0990c501a0"
                  }
                }
              },{
                "name": "脆弱性", 
                "children": {
                  "name": "中級",
                  "children": {
                    "name":"ソフトに脆弱性が生まれるワケ", 
                    "value": 1,
                    "href": "https://xtech.nikkei.comp/atcl/column/17/090100359/",
                    "description": "「脆弱性」が原因で大きなセキュリティ事故が起こる事例が後を絶たない。脆弱性は、ソフトウエアが抱えるセキュリティ上の弱点のこと。悪意がある人が脆弱性を悪用して攻撃すると、様々な問題が起こる。",
                    "img": "https://cdn-xtech.nikkei.com/it/atcl/column/17/090100359/top.jpg?__scale=w:240,h:180&_sh=05803101a0"
                  }
                }
              },{
                "name": "認証", 
                "children": [{
                  "name": "初級", 
                  "children": [{
                    "name":"絶対に分かる「ユーザー認証」", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01255/",
                    "description": "ユーザー認証と聞くと難しそうに思えるが、認証の概念自体はシンプルだ。この特集ではユーザー認証をはじめとする認証の原理や具体的な実現方法などを分かりやすく解説する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01255/top.jpg?__scale=w:240,h:180&_sh=0260c00720"
                  },{
                    "name":"基礎から理解、ゼロトラストネットワーク", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01391/",
                    "description": "企業ネットワークのセキュリティーを確保するため急速に関心が高まっている「ゼロトラストネットワーク」。「社内ネットワークは安全」という考え方を改め、「どこもインターネットと同じ危険な場所」と考える。その実現技術を解説する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01391/top.jpg?__scale=w:240,h:180&_sh=02103a0f00"
                  },{
                    "name":"さらばパスワード、FIDOの正体", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01097/",
                    "description": "パスワードレスでサービスにログインできるようにする仕組みが「FIDO」だ。FIDOの正体を分かりやすく解説する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01097/top.jpg?__scale=w:240,h:180&_sh=05906602c0"
                  }]
                },{
                  "name": "中級",
                  "children": {
                    "name":"ゼロトラストを支える技術", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01449/",
                    "description": "「何も信頼しない」ことを前提としたセキュリティー対策、ゼロトラストを実現するためには、様々な技術や製品を組み合わせる必要がある。ゼロトラストを支える技術を個別に解説しよう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01449/top.jpg?__scale=w:240,h:180&_sh=02e0550270"
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
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00020/",
                    "description": "IPは、最も重要なネットワーク技術と言っても過言ではありません。本講座で、IPを体系立てて理解しましょう。本講座を読み終えれば、初心者でも、IPがどんなものか理解できるはずです。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00020/top.jpg?__scale=w:240,h:180&_sh=03308e0bd0"
                  },{
                    "name":"図解で学ぶTCP", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00021/",
                    "description": "TCPは、データをきちんと送り届ける縁の下の力持ちのような存在です。TCPの役割や、やり取りするデータを相手に届けるメカニズムを学習しましょう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00021/top.jpg?__scale=w:240,h:180&_sh=0860bc07b0"
                  },{
                    "name":"図解で学ぶHTTP", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00022/",
                    "description": "Webブラウザーを立ち上げて、画面の中のリンクをクリックすると、目的のWebページが表示される――。このWebアクセスを実現するプロトコル、HTTPの仕組みを学びましょう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00022/top.jpg?__scale=w:240,h:180&_sh=0eb0ed07f0"
                  },{
                    "name":"図解で学ぶIPアドレス", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00023/",
                    "description": "IPアドレスは、ネットワークとコンピュータに割り当てるインターネット上の住所です。IPアドレスの種類や構造、ブロードキャストやサブネットマスクについて学びましょう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00023/top.jpg?__scale=w:240,h:180&_sh=0630ff0380"
                  }]
                },{
                  "name": "中級",
                  "children": {
                    "name":"図解で学ぶHTTP/3", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00038/",
                    "description": "Webアクセスに使われるプロトコルであるHTTPに、新しいバージョンである「HTTP/3」が加わる。従来よりもWebアクセスを効率化するのが特徴だ。HTTP/3が登場した背景やその詳細を図を交えて解説するとともに、TCPやHTTPの基礎知識をおさらいする。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00038/top.jpg?__scale=w:240,h:180&_sh=0af0470b00"
                  }
                }]
              },{ 
                "name": "ネットワークの基本", 
                "children": {
                  "name": "初級", 
                  "children": [{
                    "name":"異例の存在 イーサネット", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00252/",
                    "description": "IT技術者なら必ず知っておくべきネットワーク技術の一つが「イーサネット」だ。1973年の誕生以来、動きの激しい情報通信分野において標準技術として常に第一線で活躍し続けてきた異例の存在だ。基本から歴史、仕組みまで、今こそイーサネットの全貌を学ぼう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00252/top.jpg?__scale=w:240,h:180&_sh=0110b30220"
                  },{
                    "name":"イラストで学ぶネットワークのき・ほ・ん", 
                    "value": 1,
                    "href": "https://xtech.nikkei.comp/atcl/column/17/103100466/",
                    "description": "日経NETWORK イラストで学ぶネットワークのき・ほ・ん",
                    "img": "https://cdn-xtech.nikkei.com/it/atcl/column/17/103100466/top.jpg?__scale=w:240,h:180&_sh=0d10eb0da0"
                  },{
                    "name":"まるわかりDHCP", 
                    "value": 1,
                    "href": "https://xtech.nikkei.comp/atcl/column/17/112900546/",
                    "description": "",
                    "img": "https://cdn-xtech.nikkei.com/it/atcl/column/17/112900546/top.jpg?__scale=w:240,h:180&_sh=0a20410b50"
                  }]
                }
              },{
                "name": "ネットワーク運用", 
                "children": {
                  "name": "初級", 
                  "children": {
                    "name":"やさしく分かるネットワーク監視", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01525/",
                    "description": "企業ネットワークでひとたびトラブルが発生すれば、業務に支障を来す。ただトラブルを予兆や初期の段階で発見し対処すれば、被害を最小限に抑えられる。そのために有効なのがネットワーク監視だ。サーバーや経路の異常を検知し、トラブルを積極的に探す。pingやSNMPといった様々な監視方法の効果や仕組みを理解するとともに、導入方法を押さえておこう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01525/top.jpg?__scale=w:240,h:180&_sh=03708105b0"
                  }
                }
              },{
                "name": "ネットワーク入門", 
                "children": {
                  "name": "初級", 
                  "children": [{
                    "name":"ネスペ試験に学ぶネットワーク技術", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01900/",
                    "description": "あまたあるネットワーク技術用語。これから学ぼうとする人は、どれから習得すればよいのか迷うところだ。そこで本特集では、ネットワーク技術者に人気の国家試験「ネットワークスペシャリスト（ネスペ）」の出題傾向を参考に4つの技術を厳選。近年のネスペ試験で出された問題を例に挙げながら分かりやすく解説する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01900/top.jpg?__scale=w:240,h:180&_sh=0a03b0960f"
                  },{
                    "name":"イラストでわかるネットワークの基礎", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01842/",
                    "description": "ネットワークに関する素朴な疑問の答えや押さえておきたい重要キーワードを、イラストを用いてわかりやすく解説します。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01842/top.jpg?__scale=w:240,h:180&_sh=0a10c403f0"
                  }]
                }
              },{
                "name": "運用",
                "children": {
                  "name": "中級",
                  "children": {
                    "name":"トラブル解決にはこう使う！コマンド七つ道具", 
                    "value": 1,
                    "href": "https://xtech.nikkei.comp/atcl/column/17/110700486/",
                    "description": "",
                    "img": ""
                  }
                }
              },{
                "name": "無線通信", 
                  "children": [{
                    "name": "初級", 
                    "children": [{
                      "name":"絶対分かる5Gの仕組み", 
                      "value": 1,
                      "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01329/",
                      "description": "携帯大手が5G（第5世代移動通信システム）の商用サービスを開始した。新型コロナウイルス感染症（COVID-19）の影響に加え、当初はエリア展開や対応端末が限られていることから、人々の関心はそれほど高まっていない。しかし、5Gは今後10年にわたり、モバイル通信の主役となる存在であることに違いはなく、その重要性は変わらない。5Gはこれまでのモバイル通信技術と何が違うのか、徹底解説する。",
                      "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01329/top.jpg?__scale=w:240,h:180&_sh=06a0940890"
                    },{
                      "name":"イラストで学ぶ無線LANの基本［設計・構築］", 
                      "value": 1,
                      "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00060/",
                      "description": "無線LANの設計や構築に必要な基礎知識を、イラストを使って学びましょう。無線LANの設計・構築のポイントに加えて、快適な無線LAN環境を実現するための主要技術も解説します。",
                      "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00060/top.jpg?__scale=w:240,h:180&_sh=0830f0ce0e"
                    }]
                  },{
                    "name": "中級",
                    "children": [{
                      "name":"安くて遠くまで届くIoT無線「LPWA」", 
                      "value": 1,
                      "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01930/",
                      "description": "IoT（Internet of Things）の無線通信技術の中でも様々な用途で使われ始め、地位を固めつつあるのが「LPWA」だ。無線LANの技術を応用した「IEEE 802.11ah（Wi-Fi HaLow）」もまもなく実用化される。こうした最新動向や各通信方式の特徴などを分かりやすく解説する。",
                      "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01930/top.jpg?__scale=w:240,h:180&_sh=0720d02d02"
                    },{
                      "name":"見えてきた次世代モバイル「6G」", 
                      "value": 1,
                      "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01766/",
                      "description": "日本国内では2020年3月に第5世代移動通信システム（5G）の商用サービスが開始された。2021年現在、その次の世代となる「第6世代移動通信システム（6G）」への関心が世界中で高まっている。そこでこの特集では、6Gに至るまでの移動通信システムの進化、6Gの標準化スケジュール、要求条件やユースケース、要素技術を詳しく解説する。",
                      "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01766/top.jpg?__scale=w:240,h:180&_sh=0550005017"
                    },{
                      "name":"6GHz帯の無線LAN、Wi-Fi 6Eのインパクト", 
                      "value": 1,
                      "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01764/",
                      "description": "無線LAN関連記事やPCのスペック表などで「Wi-Fi 6E」の表記を見かける機会が増えてきた。このWi-Fi 6Eは、どのような特徴を持つ無線LAN規格で、Wi-Fi 6とはどこが違うのか。Wi-Fi 6Eの基本と最新状況を解説する。 ",
                      "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01764/top.jpg?__scale=w:240,h:180&_sh=0310880340"
                    },{
                      "name":"LPWAの仕組み", 
                      "value": 1,
                      "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00537/",
                      "description": "IoT時代のキーワードとして、IT技術者が知っておくべき通信規格「LPWA」。SigfoxやLoRaWANといったアンライセンス型LPWA、LTE-MやNB-IoTなどのライセンス型LPWAの仕組みをそれぞれ解説する。",
                      "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00537/top.jpg?__scale=w:240,h:180&_sh=08a0e404f0"
                    }]
                  }]
              },{
                "name": "歴史",
                "children": [{
                  "name": "初級", 
                  "children": {
                    "name":"インターネット進化論", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00273/",
                    "description": "インターネットは、それまで使われていた回線交換とは全く異なるパケット交換というアイデアを取り入れたネットワークだ。その後、IPやルーティング、名前解決といった仕組みが整備され、現在のようなWebの世界が出来上がっていく。インターネットの生い立ちを知ることで、インターネットを構成する様々な要素技術の理解を深めよう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00273/top.jpg?__scale=w:240,h:180&_sh=07a06508a0"
                  }
                },{
                  "name": "中級",
                  "children": {
                    "name":"懐かしのプロトコル図鑑", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00886/",
                    "description": "ネットワークを動かす基本原理であるプロトコルは、ネットワーク技術の進歩と共に移り変わってきた。だがそこには、電気通信の黎明（れいめい）期に作られた規格のエッセンスが今なお息づいている。新しい技術の本質を捉えるためにも、懐かしのプロトコルを振り返ってみよう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00886/top.jpg?__scale=w:240,h:180&_sh=0390a709e0"
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
                    "value": 1,
                    "href": "https://xtech.nikkei.comp/atcl/column/14/112000106/",
                    "description": "パソコンやスマートフォンを活用していると遭遇する「ちょっと困ったこと」や「できたらいいなと思うこと」をJavaScriptでスッキリ解決しましょう。サンプルプログラムや改造のヒントを示して、プログラミング初心者でも分かりやすく解説します。",
                    "img": "https://cdn-xtech.nikkei.com/it/atcl/column/14/112000106/top.jpg?__scale=w:240,h:180&_sh=0820740640"
                  }
                }
              },{
                "name": "Python", 
                "children": [{
                  "name": "初級", 
                  "children": [{
                    "name":"Python入門講座", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00108/",
                    "description": "人気のプログラミング言語「Python」を習得するためのポイントを6回にわたって解説します。「プログラミング経験はあるがPythonは初めて」という人だけでなく、AIや機械学習を学ぶためにこれからプログラミングを始める人にも読んでいただけるよう、基本から解説します。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00108/top.jpg?__scale=w:240,h:180&_sh=0e603d0360"
                  },{
                    "name":"Pythonを使って学ぶ高校数学の基礎", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00754/",
                    "description": "機械学習やブロックチェーンなど、数学理論に裏打ちされたシステムが脚光を浴びています。数学が苦手なままでやってこられたSEの皆さんも、いよいよ避けては通れない状況です。話題のPythonを使って数学を学び直しましょう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00754/top.jpg?__scale=w:240,h:180&_sh=0340780610"
                  },{
                    "name":"Python開発、はじめの一歩", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00777/",
                    "description": "今はやりのAI（人工知能）や機械学習、データ分析のシステム構築には、プログラミング言語「Python」の活用が欠かせない。Pythonを使ったシステム開発には、デファクトスタンダードと呼べるライブラリー群やコーディング規約が存在する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00777/top.jpg?__scale=w:240,h:180&_sh=035076000d"
                  },{
                    "name":"技術者のためのPython", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00843/",
                    "description": "プログラミング言語の1つであるPythonの人気が高まっている。もはやすべての技術者にとって無縁ではいられない。すぐにPythonを使えるサービスを利用して解説する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00843/top.jpg?__scale=w:240,h:180&_sh=04a03c03e0"
                  },{
                    "name":"7日間でマスター、Pythonの基本", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00995/",
                    "description": "今や人気ナンバーワン言語のPython。これからPythonのプログラミングを始めたいという方は多いでしょう。ところが、Pythonは様々な用途に応えるために膨大な機能といろいろなツールを備えています。ですから、最初の頃は何から手を付ければよいのかわからず、戸惑ってしまうのが普通でしょう。そこで、広大なPythonの世界の中から、まずは知っておきたい事柄をいくつかピックアップして、7日間にわたってステップ別に解説します。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00995/top.jpg?__scale=w:240,h:180&_sh=05001a0b10"
                  },{
                    "name":"イラストで学ぶ！はじめてのPython", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01933/",
                    "description": "「プログラミング初心者だけどPythonをやってみたい」という人は多いのではないでしょうか。この特集では、小学生プログラマーのタケルくんとお父さんとのかけ合いから、Pythonプログラミングのイロハを学んでいきます。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01933/top.jpg?__scale=w:240,h:180&_sh=090b40580b"
                  },{
                    "name":"独学で一気に学ぶPython", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/02030/",
                    "description": "近年目覚ましい進歩を遂げている人工知能（AI）。その開発用プログラミング言語の事実上の標準となっているのが「Python」だ。この特集では、入門者向けにPythonの基礎を一気に解説する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/02030/top.jpg?__scale=w:240,h:180&_sh=02704404d0"
                  }]
                },{
                  "name": "中級",
                  "children": [{
                    "name":"Pythonなら手軽に学べる！SQLの基本", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01862/",
                    "description": "データベースを扱うにはSQLの知識が不可欠です。Pythonに付属の「SQLite 3」を使えば、SQLデータベースのプログラミングを手軽に始められます。SQLの基本的な使い方を解説しましょう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01862/top.jpg?__scale=w:240,h:180&_sh=0a90220810"
                  },{
                    "name":"Pythonで役立つAIをつくる方法", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01408/",
                    "description": "AI（人工知能）開発のプログラミング言語として高い人気を誇るPython。データ処理や機械学習のためのライブラリも豊富です。本特集では5回にわたって、Pythonの実習を通じて実際の機械学習モデルの開発方法を解説していきます。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01408/top.jpg?__scale=w:240,h:180&_sh=07401c03a0"
                  },{
                    "name":"Pythonで作る3Dゲーム", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/02075/",
                    "description": "人工知能（AI）の開発などで注目を集めるプログラミング言語「Python」では、「Panda3D」というライブラリーを使うことで、3次元（3D）ゲームも開発できる。Panda3Dの基本的な使い方を紹介するとともに、実際に遊べる「ビー玉迷路ゲーム」を開発する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/02075/top.jpg?__scale=w:240,h:180&_sh=050da0e00c"
                  }]
                },{
                  "name": "上級",
                  "children": {
                    "name":"Pythonで作る人工生命", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/01996/",
                    "description": "コンピューターの得意分野の1つがシミュレーションだ。自分でプログラムを書けば、架空生物の生命すらシミュレートできる。本特集ではプログラミング言語「Python」を使って人工生命を作る方法を解説する。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/01996/top.jpg?__scale=w:240,h:180&_sh=0a00710290"
                  }
                }]
              },{
                "name": "アルゴリズム", 
                "children": [{
                  "name": "初級", 
                  "children": {
                    "name":"身近なアルゴリズム", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/nxt/column/18/00321/",
                    "description": "アルゴリズムは「何らかの問題を解決する手順」を指し、アルゴリズムの良しあしでソフトウエアの性能が決まると言っても過言ではない。私たちの生活は、高度なアルゴリズムで実装されたソフトウエアに支えられている。エレベーターや信号機の制御ソフトを例に、身近なアルゴリズムの一端を見ていこう。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/nxt/column/18/00321/top.jpg?__scale=w:240,h:180&_sh=0b30b20e90"
                  }
                },{
                  "name": "中級",
                  "children": [{
                    "name":"万年カレンダーで学ぶアルゴリズム", 
                    "value": 1,
                    "href": "",
                    "description": "",
                    "img": ""
                  },{
                    "name":"ソフト開発の要、必修アルゴリズム10選", 
                    "value": 1,
                    "href": "",
                    "description": "",
                    "img": ""
                  }]
                }]
              },{
                "name": "論理演算", 
                "children": {
                  "name": "初級", 
                  "children": {
                    "name":"論理演算の基本", 
                    "value": 1,
                    "href": "https://xtech.nikkei.com/atcl/learning/lecture/19/00006/",
                    "description": "C言語やJavaなど、何らかのプログラミング言語をマスターするには、論理演算を理解する必要があります。論理演算が分からなければプログラムを作成できない、と言っても過言ではないでしょう。論理演算の意味と使い方を、短く整理して説明します。",
                    "img": "https://cdn-xtech.nikkei.com/atcl/learning/lecture/19/00006/top.jpg?__scale=w:240,h:180&_sh=0de01506b0"
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
            // .style("class", "v-banner v-banner--stacked v-banner--one-line v-banner--density-default v-theme--light my-4")
            // .append("div")
            // .style("class", "v-banner__content")
            // .append("div")
            // .style("class", "v-banner-text")
            .style("position", "absolute")
            .style("text-align", "left")
            .style("background", "#ffffff")
            .style("border", "1px solid #000000")
            .style("padding", "10px")
            .style("opacity", 0);

            // <div class="v-banner v-banner--one-line v-banner--density-default v-theme--light my-4" role="banner"><div class="v-banner__prepend"><div class="v-avatar v-theme--light bg-deep-purple-accent-4 v-avatar--density-default v-avatar--size-default v-avatar--variant-flat"><i class="mdi-lock mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i><!----><span class="v-avatar__underlay"></span></div></div><div class="v-banner__content"><!----><div class="v-banner-text"> Banner with one line of text. </div></div><div class="v-banner-actions"><button type="button" class="v-btn v-theme--light text-deep-purple-accent-4 v-btn--density-default v-btn--size-default v-btn--variant-text"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span class="v-btn__content" data-no-activator="">Action</span><!----><!----></button></div></div>

          var card = d3.select("div#card")

          g.selectAll("path")
            
            .data(root.descendants())
            .enter()
            .append("path")
            .attr("d", arc)
            .attr('stroke', '#fff')
            .attr("fill", function(d) {
              while(d.depth > 1) d = d.parent;
              if(d.depth == 0) return "transparent";
              return colorScale(Math.random() * (8 - 0) + 0);
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
                  .style("z-index", 1000)
                  .html(e)
                  .style("opacity", 1);
                //現在地
                arr.push(d.target.__data__.data.name);

                // ブログカード風
                if(d.target.__data__.depth > 1) {
                  arr.push(d.target.__data__.parent.data.name);
                  if(d.target.__data__.depth > 2) {
                    arr.push(d.target.__data__.parent.parent.data.name);
                    if(d.target.__data__.depth > 3) {
                      arr.push(d.target.__data__.parent.parent.parent.data.name);

                      const c = "<div class='v-card v-theme--light v-card--density-default v-card--variant-elevated mx-auto' style='max-width: 344px;'><div class='v-card__loader'><div class='v-progress-linear v-theme--light' role='progressbar' aria-hidden='true' aria-valuemin='0' aria-valuemax='100' style='height: 0px; --v-progress-linear-height:2px;'><div class='v-progress-linear__background' style='width: 100%;'></div><div class='v-progress-linear__indeterminate'><div class='v-progress-linear__indeterminate long'></div><div class='v-progress-linear__indeterminate short'></div></div></div></div><div class='v-responsive v-img' style='height: 200px;'><div class='v-responsive__sizer' style='padding-bottom: 56.25%;'></div><img class='v-img__img v-img__img--cover' src='" + d.target.__data__.data.img + "' alt='' style=''></div><div class='v-card-title'>" + d.target.__data__.data.name + "</div><div class='v-card-subtitle pt-4'> Number 10 </div><span class='v-chip v-chip--label v-theme--light v-chip--density-default v-chip--size-x-small v-chip--variant-tonal ma-2'><span class='v-chip__underlay'></span>Chip</span><div class='v-card-text'>" + d.target.__data__.data.description + "</div><span class='v-card__underlay'></span></div>"

                      card.html(c)
                      
                      if(d.target.__data__.depth > 4) {
                        arr.push(d.target.__data__.parent.parent.parent.parent.data.name);
                      }
                    } 
                  } 
                } 
              }
              console.log(arr)

              //凡例
              arr.reverse().forEach((element) => {
                
                const arrow = "<li class='v-breadcrumbs-divider'><i class='mdi-chevron-right mdi v-icon notranslate v-theme--light v-icon--size-default' aria-hidden='true'></i></li>"
                
                legend.innerHTML += element + arrow;

              })
            })
            .on("mouseout", function() {
              d3.select(this)
                .transition().duration(500)
                .attr("fill", function(d) {
                  while(d.depth > 1) d = d.parent;
                  if(d.depth == 0) return "transparent";
                  return colorScale(Math.random() * (8 - 0) + 0);//d.value
                });
              tooltip
                // .transition().duration(3000)
                .style("opacity", 0);
              legend
                .innerHTML = '';
              // card
              //   .html("")
              
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
  template:`
  <v-app>
  
  
    <v-layout>

      <v-app-bar color="" title="エンジニアのマナビ by 日経クロステック">
      
      <template v-slot:append>
        <div class="l-compact_header_siteLogo"><a href="/" data-atlas-trackable="logo-nxt"><img src="/images/n/xtech/2020/logo_main.svg" alt="日経クロステック（xTECH）"></a></div>
      </template>
      </v-app-bar>

      
      
      
      
      <v-row justify="center">
      <v-col>
      <v-main style="min-height: 350px;">
        <div id="d3" style="margin: 50 50 0 50"></div>
        <svg viewBox="0 0 200 200">
        <path id="circle" fill="transparent" d="M114.17 66.88C114.17 88.95 96.24 106.88 74.17 106.88C52.09 106.88 34.17 88.95 34.17 66.88C34.17 44.8 52.09 26.88 74.17 26.88C96.24 26.88 114.17 44.8 114.17 66.88Z"/>
        <text width="300">
        <textPath xlink:href="#circle">
        Go above and beyond your expectations! <tspan class="color-red">NITTY GRITTY</tspan>
        </textPath>
        </text>
        </svg>
        <ul id="legend" class='v-breadcrumbs v-breadcrumbs--density-default'>
      </v-main>
      </v-col>
      <v-col>
      <v-main style="min-height: 350px;">
      <div id="card" style="margin: 50"></div>
      </v-main>
      </v-col>
      </v-row>
      
      
    </v-layout>
    
    


  <footer class="l-footer" data-atlas-trackable="footer">
  <nav class="globalFooter l-footer_global">
  <div class="l-footer_global_company"><a href="https://www.nikkeibp.co.jp" target="_blank">
  <img src="/images/bplogo/logo.svg" alt="日経BP"></a></div>
  <ul class="l-footer_global_link">
  <li class="l-footer_global_link_item"><a href="https://www.nikkeibp.co.jp/" target="_blank">会社案内</a></li>
  <li class="l-footer_global_link_item"><a href="https://www.nikkeibp.co.jp/atcl/corporate/privacy/" target="_blank">個人情報について</a></li>
  <li class="l-footer_global_link_item"><a href="https://www.nikkeibp.co.jp/atcl/corporate/privacy/#net" target="_blank">データ利用</a></li>
  <li class="l-footer_global_link_item"><a href="https://www.nikkeibp.co.jp/atcl/corporate/copyright/" target="_blank">著作権について</a></li>
  <li class="l-footer_global_link_item"><a href="http://www.nikkeibp.co.jp/ad/" target="_blank">広告ガイド</a></li>
  <li class="l-footer_global_link_item"><a href="http://www.nikkei.com/lounge/help/" target="_blank">日経ＩＤ利用案内</a></li>
  </ul>
  <div class="l-footer_switch"><a href="#" id="switchSite">モバイル版に切り替え</a></div>
  </nav>
  <div class="footerCopyright l-footer_copyright">
  <p>Copyright © Nikkei Business Publications, Inc. All Rights Reserved.</p>
  </div>
  </footer>
  </v-app>
  `,
};