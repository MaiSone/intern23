// 円
const circles = [
  { type: 'small', r: 50, x: 100, y: 150 },
  { type: 'medium', r: 100, x: 200, y: 150 },
  { type: 'large', r: 150, x: 300, y: 150 }  
]
const svg = d3.select('#circles')
              .append('svg')
              .attr('width', 500)
              .attr('height', 500)
svg.selectAll('circles')
    .data(circles)
    .enter()
    .append('circle')
    .attr('r', d => d.r)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('class', d => d.type) 

//棒グラフ
const dataSet = [100, 200, 20, 45, 300];
const maxValue = Math.max(...dataSet);
const OriginAttr = {
    fill: "rgba(255, 0, 0, 0)"
};
const bar = d3.select('#bar')
              .append('svg')
              .attr('width', 500)
              .attr('height', 500)
bar.selectAll("rect")                                                   // 対象要素の設定
  .data(dataSet)                                                        // データセットを設定
  .enter()                                                              // データ数に応じて要素を追加
  .append("rect")                                                       // 四角形のSVGを作成
  .attr("x", 0)                                                         // X座標(始点)
  .attr("y", (d, i) => {return i * 25;})                                // Y座標(各データセットの描画位置)
  .attr("width", (d, i) => {return `${d}px`; })                         // 横棒グラフの横幅(X座標の終点)
  .attr("height", "20px")                                               // 横棒グラフの縦幅
  .attr("fill", (d, i) => {return `rgba(255, 0, 0, ${d/maxValue})`;})   // 棒グラフの色
  .on("mouseover", function() {
      OriginAttr.fill = this.attributes.fill.value;                     // 変更前の状態を記憶                  
      d3.select(this) 
          .attr("fill", "blue");                                        // クリックされたグラフの色を変更
  })
  .on("mouseout", function() {
      d3.select(this)
          .attr("fill", OriginAttr.fill);                              // 変更前の状態に戻す
  });