
// var d3 = require('d3');
// var Sunburst = require('d3-sunburst');
// var sunburst = new Sunburst();
// sunburst.setData([
//   ["account-account-account", 22781],
//   ["account-account-end", 3311],
//   ["account-account-home", 906]
// ]);

// https://codepen.io/brisor/pen/WNEJaX
// Dimensions of sunburst.
var width = 750;
var height = 600;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 150, h: 25, s: 5, t: 10
};

// Mapping of step names to colors.
var colors = {
  // カテゴリー1
  "セキュリティー": "#52A69F",
  "AI": "#596DB8",
  "ネットワーク": "#EDB444",
  "プログラミング": "#D4628B",
  // カテゴリー2
  "基礎知識": "#99AD4A",
  "数学的知識": "#7E522E",
  "資格対策": "#57A9D7",
  "実装":"#A15CB9",
  "暗号":"#E0792E",
  "実験":"#A57667",
  "脆弱性":"#EAEAEA",
  "認証":"#EAEAEA",
  "インターネットの仕組み":"#EAEAEA",
  "ネットワークの基本":"#EAEAEA",
  "ネットワーク運用":"#EAEAEA",
  "ネットワーク入門":"#EAEAEA",
  "運用":"#EAEAEA",
  "無線通信":"#EAEAEA",
  "歴史":"#EAEAEA",
  "JavaScript":"#EAEAEA",
  "Python":"#EAEAEA",
  "アルゴリズム":"#EAEAEA",
  "論理演算":"#EAEAEA",
  // レベル
  "初級":"#666666",
  "中級":"#A0A0A0",
  "上級":"#CACACA",
};

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });


var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.


var csv = [
  [
      "AI-基礎知識-初級-ビジネスパーソンが最低限知っておくべきAIの基本",
      "1"
  ],
  [
      "AI-基礎知識-中級-AI入門",
      "1"
  ],
  [
      "AI-基礎知識-中級-教養として知っておきたいAIの到達点",
      "1"
  ],
  [
      "AI-資格対策-中級-ディープラーニング「G検定」対策［前編］",
      "1"
  ],
  [
      "AI-数学的知識-中級-機械学習のための数学入門",
      "1"
  ],
  [
      "AI-数学的知識-上級-AIブームの立役者「強化学習」を直感的に理解する",
      "1"
  ],
  [
      "AI-資格対策-中級-ディープラーニング「G検定」対策［後編］",
      "1"
  ],
  [
      "AI-実装-中級-Pythonで役立つAIをつくる方法",
      "1"
  ],
  [
      "セキュリティー-暗号-初級-図解 暗号の用語と仕組み",
      "1"
  ],
  [
      "セキュリティー-実験-中級-試してわかるセキュリティー実験室",
      "1"
  ],
  [
      "セキュリティー-脆弱性-中級-ソフトに脆弱性が生まれるワケ",
      "1"
  ],
  [
      "セキュリティー-認証-初級-絶対に分かる「ユーザー認証」",
      "1"
  ],
  [
      "セキュリティー-認証-初級-基礎から理解、ゼロトラストネットワーク",
      "1"
  ],
  [
      "セキュリティー-認証-初級-さらばパスワード、FIDOの正体",
      "1"
  ],
  [
      "セキュリティー-認証-中級-ゼロトラストを支える技術",
      "1"
  ],
  [
      "ネットワーク-インターネットの仕組み-初級-図解で学ぶIP",
      "1"
  ],
  [
      "ネットワーク-インターネットの仕組み-初級-図解で学ぶTCP",
      "1"
  ],
  [
      "ネットワーク-インターネットの仕組み-初級-図解で学ぶHTTP",
      "1"
  ],
  [
      "ネットワーク-インターネットの仕組み-初級-図解で学ぶIPアドレス",
      "1"
  ],
  [
      "ネットワーク-インターネットの仕組み-中級-図解で学ぶHTTP/3",
      "1"
  ],
  [
      "ネットワーク-ネットワークの基本-初級-異例の存在 イーサネット",
      "1"
  ],
  [
      "ネットワーク-ネットワークの基本-初級-イラストで学ぶネットワークのき・ほ・ん",
      "1"
  ],
  [
      "ネットワーク-ネットワークの基本-初級-まるわかりDHCP",
      "1"
  ],
  [
      "ネットワーク-ネットワーク運用-初級-やさしく分かるネットワーク監視",
      "1"
  ],
  [
      "ネットワーク-ネットワーク入門-初級-ネスペ試験に学ぶネットワーク技術",
      "1"
  ],
  [
      "ネットワーク-ネットワーク入門-初級-イラストでわかるネットワークの基礎",
      "1"
  ],
  [
      "ネットワーク-運用-中級-トラブル解決にはこう使う！コマンド七つ道具",
      "1"
  ],
  [
      "ネットワーク-無線通信-初級-絶対分かる5Gの仕組み",
      "1"
  ],
  [
      "ネットワーク-無線通信-初級-イラストで学ぶ無線LANの基本［設計・構築］",
      "1"
  ],
  [
      "ネットワーク-無線通信-中級-安くて遠くまで届くIoT無線「LPWA」",
      "1"
  ],
  [
      "ネットワーク-無線通信-中級-見えてきた次世代モバイル「6G」",
      "1"
  ],
  [
      "ネットワーク-無線通信-中級-6GHz帯の無線LAN、WiFi 6Eのインパクト",
      "1"
  ],
  [
      "ネットワーク-無線通信-中級-LPWAの仕組み",
      "1"
  ],
  [
      "ネットワーク-歴史-初級-インターネット進化論",
      "1"
  ],
  [
      "ネットワーク-歴史-中級-懐かしのプロトコル図鑑",
      "1"
  ],
  [
      "プログラミング-JavaScript-初級-クジラ飛行机「仕事に役立つJavaScript入門」",
      "1"
  ],
  [
      "プログラミング-Python-初級-Python入門講座",
      "1"
  ],
  [
      "プログラミング-Python-初級-Pythonを使って学ぶ高校数学の基礎",
      "1"
  ],
  [
    "プログラミング-Python-初級-Python開発、はじめの一歩",
    "1"
  ],
  [
    "プログラミング-Python-初級-技術者のためのPython",
    "1"
  ],
  [
    "プログラミング-Python-初級-7日間でマスター、Pythonの基本",
    "1"
  ],
  [
    "プログラミング-Python-初級-イラストで学ぶ！はじめてのPython",
    "1"
  ],
  [
    "プログラミング-Python-初級-独学で一気に学ぶPython",
    "1"
  ],
  [
    "プログラミング-Python-中級-Pythonなら手軽に学べる！SQLの基本",
    "1"
  ],
  [
    "プログラミング-Python-中級-Pythonで役立つAIをつくる方法",
    "1"
  ],
  [
    "プログラミング-Python-中級-Pythonで作る3Dゲーム",
    "1"
  ],
  [
    "プログラミング-Python-上級-Pythonで作る人工生命",
    "1"
  ],
  [
    "プログラミング-アルゴリズム-上級-身近なアルゴリズム",
    "1"
  ],
  [
    "プログラミング-アルゴリズム-中級-万年カレンダーで学ぶアルゴリズム",
    "1"
  ],
  [
    "プログラミング-アルゴリズム-中級-ソフト開発の要、必修アルゴリズム10選",
    "1"
  ],
  [
    "プログラミング-論理演算-初級-論理演算の基本",
    "1"
  ],
]

// var req = new XMLHttpRequest();
// var filePath = 'data.csv';
// req.open("GET", filePath, true);
// req.responseType = 'text';

// req.onload = function () {
//   // CSVデータ変換の呼び出し
//   const data = csv2json(req.responseText);
//   console.log(data);
// }
// req.send(null);

// // CSVから２次元配列に変換
// function csv2json(csvArray) {
//   // console.log(csvArray);
//   var jsonArray = [];
//   var rows = csvArray.split(/\r?\n/); //改行で区切る
//   var columnName = rows[0].split(","); // 1行目から「項目名」の配列を生成する

//   for (var i = 1; i < rows.length; i++) { //行数の分繰り返す
//     var row = new Array();
//     var cells = rows[i].split(",");
//     for (var n = 0; n < columnName.length; n++) { //列数の分繰り返す
//         row[columnName[n]] = cells[n];
//     }
//     jsonArray.push(row);
//   }
//   console.log(jsonArray);
//   return jsonArray;
// }


// var csv = d3.csv.parseRows(text);
console.log(csv)
var json = buildHierarchy(csv);
console.log(json)
createVisualization(json);


// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  // drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter()
      .append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name] !== undefined ? colors[d.name]: "#EAEAEA"; })
      .style("opacity", 1)
      .on("mouseover", mouseover)

      d3.select("#chart").append("svg:text")
      .data(nodes)
      .enter()
      
      .attr("d", arc)
      .text(function(d) { return d.name})
      ;

      
      
      
  
    

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
 };

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  var percentage = d.value;
  var percentageString = percentage + " 連載";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  

  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString);
  console.log(sequenceArray)
  var current = [];
  sequenceArray.forEach(element => current.push(element.name))
  console.log(current);
  var currentLabels = current.join('<');
  console.log(currentLabels)

  d3.select("#percentage")
      .text(currentLabels);//現在地

  d3.select("#explanation")
      .style("visibility", "");


  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .transition()
      .duration(1000)
      .style("visibility", "hidden");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#242424");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return colors[d.name] !== undefined ? colors[d.name]: "#EAEAEA"; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

// function drawLegend() {

//   // Dimensions of legend item: width, height, spacing, radius of rounded rect.
//   var li = {
//     w: 75, h: 30, s: 3, r: 3
//   };

//   var legend = d3.select("#legend").append("svg:svg")
//       .attr("width", li.w)
//       .attr("height", d3.keys(colors).length * (li.h + li.s));

//   var g = legend.selectAll("g")
//       .data(d3.entries(colors))
//       .enter().append("svg:g")
//       .attr("transform", function(d, i) {
//               return "translate(0," + i * (li.h + li.s) + ")";
//            });

//   g.append("svg:rect")
//       .attr("rx", li.r)
//       .attr("ry", li.r)
//       .attr("width", li.w)
//       .attr("height", li.h)
//       .style("fill", function(d) { return d.value; });

//   g.append("svg:text")
//       .attr("x", li.w / 2)
//       .attr("y", li.h / 2)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .text(function(d) { return d.key; });
// }

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how 
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};