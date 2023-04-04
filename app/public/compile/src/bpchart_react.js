// MIT License

// Copyright (c) 2020 Yu Fukuda, Risa Furushima, Mai Sone

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
// Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

//カラーコード
const colorCode = {
    'default': ['#52A69F', '#596DB8', '#EDB444', '#D4628B', '#99AD4A', '#7E522E', '#57A9D7', '#A15CB9', '#E0792E', '#A57667'],
    'notSelected': ['rgba(82,166,159,0.25)', 'rgb(89,109,184,0.25)', 'rgb(237,180,68,0.25)', 'rgb(212,98,139,0.25)', 'rgb(153,173,74,0.25)', 'rgb(126,82,46,0.25)', 'rgb(87,169,215,0.25)', 'rgb(161,92,185,0.25)', 'rgb(224,121,46,0.25)', 'rgb(165,118,103,0.25)'],
};
//チャートタイプ
const type = {
  'line': 'line',
  'area': 'line',
  'stackedArea': 'line',
  'bar': 'bar',
  'horizontalBar': 'horizontalBar',
  'stackedBar': 'bar',
  'stackedHorizontalBar': 'horizontalBar',
  'rankingBar': 'horizontalBar',
  'scatter': 'scatter',
  'bubble': 'bubble',
  'pie':'pie'
}
//積み上げ
//x軸
const xAxesStacked = {
  'line': false,
  'area': false,
  'stackedArea': false,
  'bar': false,
  'horizontalBar': false,
  'stackedBar': true,
  'stackedHorizontalBar': true,
  'rankingBar': false,
  'scatter': false,
  'bubble': false,
  'pie':false,
}
//y軸
const yAxesStacked = {
  'line': false,
  'area': false,
  'stackedArea': true,
  'bar': false,
  'horizontalBar': false,
  'stackedBar': true,
  'stackedHorizontalBar': true,
  'rankingBar': false,
  'scatter': false,
  'bubble': false,
  'pie':false,
}
//fill
const fill = {
  'line': false,
  'area': true,
  'stackedArea': true,
  'bar': false,
  'horizontalBar': false,
  'stackedBar': false,
  'stackedHorizontalBar': false,
  'rankingBar': false,
  'scatter': true,
  'bubble': true,
  'pie':false,
}

const xAutoSkip ={
  'line': true,
  'area': true,
  'stackedArea': true,
  'bar': true,
  'horizontalBar': true,
  'stackedBar': true,
  'stackedHorizontalBar': true,
  'rankingBar': true,
  'scatter': false,
  'bubble': false,
  'pie':false,
}

const yAutoSkip ={
  'line': true,
  'area': true,
  'stackedArea': true,
  'bar': true,
  'horizontalBar': false,
  'stackedBar': true,
  'stackedHorizontalBar': false,
  'rankingBar': false,
  'scatter': false,
  'bubble': false,
  'pie':false,
}

const pointRadius = {
  'line': 0,
  'area': 0,
  'stackedArea': 0,
  'bar': 0,
  'horizontalBar': 0,
  'stackedBar': 0,
  'stackedHorizontalBar': 0,
  'rankingBar': 0,
  'scatter': 3,
  'bubble': 3,
  'pie':0,
}

const datalabels = {
  'line': false,
  'area': false,
  'stackedArea': false,
  'bar': false,
  'horizontalBar': false,
  'stackedBar': false,
  'stackedHorizontalBar': false,
  'rankingBar': true,
  'scatter': true,
  'bubble': true,
  'pie':false,
}

const dataObject = {
  'line': {labels: null, datasets: null},
  'area': {labels: null, datasets: null},
  'stackedArea': {labels: null, datasets: null},
  'bar': {labels: null, datasets: null},
  'horizontalBar': {labels: null, datasets: null},
  'stackedBar': {labels: null, datasets: null},
  'stackedHorizontalBar': {labels: null, datasets: null},
  'rankingBar': {labels: null, datasets: null},
  'scatter': {datasets: null},
  'bubble': {datasets: null},
  'pie': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderAlign: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    data: [],
    hoverBackgroundColor: undefined,
    hoverBorderColor: undefined,
    hoverBorderWidth: undefined,
    weight: 1
  }
}

const axes = {
  'line': true,
  'area': true,
  'stackedArea': true,
  'bar': true,
  'horizontalBar': true,
  'stackedBar': true,
  'stackedHorizontalBar': true,
  'rankingBar': true,
  'scatter': true,
  'bubble': true,
  'pie': false,
}

const tooltipAlign = {
  'line': 'left',
  'area': 'left',
  'stackedArea': 'left',
  'bar': 'left',
  'horizontalBar': 'left',
  'stackedBar': 'left',
  'stackedHorizontalBar': 'left',
  'rankingBar': 'left',
  'scatter': 'left',
  'bubble': 'left',
  'pie': 'center',
}

const tooltipsPosition = {
  'line': 'average',
  'area': 'average',
  'stackedArea': 'average',
  'bar': 'average',
  'horizontalBar': 'average',
  'stackedBar': 'average',
  'stackedHorizontalBar': 'average',
  'rankingBar': 'average',
  'scatter': 'average',
  'bubble': 'average',
  'pie': 'pie',
}



function generateDataset(jsonArray, colorTheme, type, sw){
  // datasetsを作成
  const datasets = [];
  if(type === 'scatter'){
    const legends = [];
    for(var i = 1; i < jsonArray.length; i++){//0行目はカラム名が入るので飛ばす
      legends.push(jsonArray[i]['legend']);
    }
    const legend = Array.from(new Set(legends)); //Set で重複除去したオブジェクトに、それを配列にする
    for(var n = 0; n < legend.length; n++){//分繰り返し
      const chartdata = [];
      const filterd = jsonArray.filter(el => el.legend === legend[n]);
      for(var i = 0; i < filterd.length; i++){
        if(type === 'scatter'){
          chartdata.push({x:Number(filterd[i]['x']), y:Number(filterd[i]['y']), label:filterd[i]['label']});
        } else if(type === 'bubble'){
          chartdata.push({x:Number(filterd[i]['x']), y:Number(filterd[i]['y']), r:Number(filterd[i]['r']), label:filterd[i]['label']});
        }
        // chartdata.map(Number);//文字列から数字に変換
      };
      const backgroundColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      const borderColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      const chartFill = fill[type];
      const dataObject = {
        label: legend[n],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        fill: chartFill,
        data: chartdata, //先ほどのchartdataをセット
      };
      datasets.push(dataObject);
    }
  } else if(type === 'bubble'){ 
    const legends = [];
    for(var i = 1; i < 11; i++){//0行目はカラム名が入るので飛ばす
      legends.push(jsonArray[i]['label']);
    }
    for(var n = 0; n < legends.length; n++){//分繰り返し
      const chartdata = [];
      chartdata.push({x:Number(jsonArray[n+1]['x']), y:Number(jsonArray[n+1]['y']), r:Number(jsonArray[n+1]['r']), label:jsonArray[n+1]['label']});
      const backgroundColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      const borderColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      const chartFill = fill[type];
      const dataObject = {
        label: legends[n],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        fill: chartFill,
        data: chartdata, //先ほどのchartdataをセット
      };
      datasets.push(dataObject);
    }
  } else if(type === 'rankingBar') {
    const chartdata = [];
    for(var i = 1; i < jsonArray.length; i++){
      chartdata.push(jsonArray[i]['value']);
      chartdata.map(Number);//文字列から数字に変換
    }
    const chartlabel = [];
    for(var i = 1; i < jsonArray.length; i++){
      chartlabel.push(jsonArray[i]['label']);
    }
    const backgroundColor = sw[0] ? colorCode[colorTheme][0] : colorCode['notSelected'][0];// 色は1色なので0で指定
    const borderColor = sw[0] ? colorCode[colorTheme][0] : colorCode['notSelected'][0];
    const chartFill = fill[type];
    const dataObject = {
      label: chartlabel,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      fill: chartFill,
      data: chartdata, //先ほどのchartdataをセット
    };
    datasets.push(dataObject);
  } else if(type === 'pie') {
    const chartdata = [];
    const backgroundColor = [];
    const borderColor = [];
    for(var i = 0; i < jsonArray.length -1; i++){
      chartdata.push(jsonArray[i + 1][`data0`]);
      chartdata.map(Number);//文字列から数字に変換
      backgroundColor.push(sw[i] ? colorCode[colorTheme][i] : colorCode['notSelected'][i]);
      borderColor.push(sw[i] ? colorCode[colorTheme][i] : colorCode['notSelected'][i]);
    }
    dataObject[type].backgroundColor = backgroundColor;
    dataObject[type].borderColor = borderColor;
    dataObject[type].data = chartdata;
    datasets.push(dataObject[type]);
  } else {
    for(var n = 0; n < Object.keys(jsonArray[0]).length - 1; n++){//データ数（data0,data1...）分繰り返し
      const chartdata = [];
      for(var i = 1; i < jsonArray.length; i++){
        chartdata.push(jsonArray[i][`data${n}`]);
        chartdata.map(Number);//文字列から数字に変換
      }
      const backgroundColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      const borderColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      const chartFill = fill[type];
      const dataObject = {
        label: Object.values(jsonArray[0])[n + 1],//n=0はlabelなので+1
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        fill: chartFill,
        data: chartdata, //先ほどのchartdataをセット
        order: n
      };
      datasets.push(dataObject);
    }
  }
  return datasets;
}
  
function generateLabel(jsonArray){
  const labels = [];
  // 作った配列に入れる
  if(type === 'rankingBar'){
    for(var i = 1; i < jsonArray.length; i++){
      labels.push(jsonArray[i]['rank']);
    }
  }else{
    for(var i = 1; i < jsonArray.length; i++){
      labels.push(jsonArray[i]['label']);
    }
  }
  // console.log(labels);
  return labels;
}

function generateData(type, labels, datasets){
  if(type === 'scatter' || type === 'bubble'){
    return {labels:labels, datasets:datasets};
  }
  return {labels:labels, datasets:datasets};
}

function setLegend(jsonArray, type) {
  if(type ===  'scatter' || type === 'bubble' || type === 'pie'){
     //データの列名
    const legends = [];
    for(var i = 1; i < jsonArray.length; i++){
       if(type === 'pie' || type === 'bubble'){
         legends.push(jsonArray[i]['label']);
       }else{
         legends.push(jsonArray[i]['legend']);
       }
    }
    const legend = Array.from(new Set(legends));
    setLegendLength(legend.length);
    setLegendLabel(legend);
   } else if(type === 'rankingBar'){
    setLegendLength(1);
    setLegendLabel(legendLabel);
   } else {
    setLegendLength(Object.keys(jsonArray[0]).length -1);//label列は不要なため-1
    setLegendLabel(Object.values(jsonArray[0]).slice(1));
   }
 }


  

function LineGraph(props){
  // 関数コンポーネントでref使えない。DOM 要素またはクラスコンポーネントを参照している限り、関数コンポーネント内で ref 属性を使用することは可能（https://ja.reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components）
  const chartRef = React.useRef(null);

  const [count, setCount] = React.useState(0);
  const [selectedArray, setSelectedArray] = React.useState(new Array(10).fill(true));
  const [notSelectedArray, setNotSelectedArray] = React.useState(new Array(10).fill(false));

  const [legendLength, setLegendLength] =  React.useState(3);
  const [legendLabel, setLegendLabel] = React.useState(new Array(10).fill("a"));

  


  const reBuildChart = (i) => {
    
    let newSelected = notSelectedArray;
    newSelected[i] = !notSelectedArray[i];

    setCount(() => {
      let newCount = 0;
      for(var n = 0; n < legendLength; n++){
        if(newSelected[n] === true){
          newCount++;
        }
      }
      // console.log(newCount);
      if(newCount === 0 || newCount === legendLength){
        // console.log(newSelected)
        setSelectedArray(Array(legendLength).fill(true));
        setNotSelectedArray(Array(legendLength).fill(false));
      } else {
        // console.log(newSelected)
        setSelectedArray(newSelected);
      }
      return newCount;
    });
    
  }

  React.useEffect(() =>{
    buildChart();
  })

  React.useEffect(() => {
    setLegend(props.dataForChart, props.type);
  },[]);//初回だけ実行


  const setLegend = (jsonArray, type) => {
    if(type ===  'scatter' || type === 'bubble' || type === 'pie'){
       //データの列名
       const legends = [];
       for(var i = 1; i < jsonArray.length; i++){
         if(type === 'pie' || type === 'bubble'){
          if(i < 11){
            legends.push(jsonArray[i]['label']);
          }
         }else{
          if(i < 11){
            legends.push(jsonArray[i]['legend']);
          }
         }
       }
       const legend = Array.from(new Set(legends));
       setLegendLength(legend.length);
       setLegendLabel(legend);
    } else if(type === 'rankingBar'){
      setLegendLength(1);
      setLegendLabel(legendLabel);
    } else {
      setLegendLength(Object.keys(jsonArray[0]).length -1);//label列は不要なため-1
      setLegendLabel(Object.values(jsonArray[0]).slice(1));
    }
  }

 
  
  const buildChart = () => {
    
    const cvsChart = chartRef;
    const ctxChart = cvsChart.current.getContext("2d");

    const labels = generateLabel(props.dataForChart);
    // console.log(props.dataForChart);
    const datasets = generateDataset(props.dataForChart, props.colorTheme, props.type, selectedArray);
    // console.log(datasets);
    const chartData = generateData(props.type, labels, datasets);
    // console.log(chartData)

    const originalType = props.type;
    const chartType = type[props.type];
    // console.log(chartType)
    const chartxAxesStacked = xAxesStacked[props.type];
    const chartyAxesStacked = yAxesStacked[props.type];

    const xTicksAutoSkip = xAutoSkip[props.type];
    const yTicksAutoSkip = yAutoSkip[props.type];
    const radius = pointRadius[props.type];
    const datalabelsDisplay = datalabels[props.type];
    const axesDisplay = axes[props.type];
    const bodyAlign = tooltipAlign[props.type];
    const position = tooltipsPosition[props.type];

    Chart.defaults.global.defaultFontColor = '#000000';
    Chart.defaults.global.defaultFontFamily = "'Heebo', sans-serif";

    Chart.Tooltip.positioners.pie = (elements, eventPosition) => {
      // console.log(elements[0]._chart.width);
      return {
        x: elements[0]._chart.width / 4,
        y: elements[0]._chart.height / 4,
      };
    };

    ctxChart.fillStyle = '#FAFAF9';

    const chart = new Chart(ctxChart, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true, //trueにすると画面の幅に合わせて作図してしまう
        maintainAspectRatio: true,
        aspectRatio: 1,
        legend: {
            display: false,
        },
        tooltips: {
          enabled: false,//カスタムの時false
          mode: 'nearest',
          position: position,
          bodyAlign: 'center',
          footerAlign: 'center',
          custom: function(tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');
            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
            }
            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }
            function getBody(bodyItem) {
              // console.log(bodyItem);
              return bodyItem.lines;   
            }
            if(typeof tooltipModel.body !== 'undefined'){// bodyがないときがあるため
              // console.log(tooltipModel.body[0].lines[0]);
              var newBody = tooltipModel.body[0].lines[0].split(":");
              // console.log(newBody);
              if(typeof newBody[1] !== 'undefined'){
                var newBody1 = newBody[1].replace(/[\[\]']+/g ,'');
                // console.log(newBody1);
                var noKakko = newBody[1].replace(/[\(\)']+/g ,'').replace(/\s/g ,'').split(",");
                // console.log(noKakko)
                var newEle = newBody1.split(",");
                // console.log(newEle);
              }else{
                var newBody = tooltipModel.body[0].lines[0];
                var noKakko = newBody.replace(/[\(\)']+/g ,'').replace(/\s/g ,'').split(",");
                // console.log(tooltipModel.body[0])
              }
            }
            // Set Text
            if (tooltipModel.body) {
              if(originalType === 'scatter' || originalType === 'bubble'){
                var titleLines = Array(this._data.datasets[tooltipModel.dataPoints[0].datasetIndex].data[tooltipModel.dataPoints[0].index].label);
              } else {
                var titleLines = tooltipModel.title;
              }
              // console.log(this._data.datasets);
              var bodyLines = tooltipModel.body.map(getBody);
              var innerHtml = '<thead>';
              titleLines.forEach(function(title) {  
                  // console.log(titleLines)
                  innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';
              bodyLines.forEach(function(body, i) {
                var style = 'background:' + '#fff';
                style += '; border-color:' + '#fff';
                style += '; border-width: 2px';
                var span = '<span style="' + style + '"></span>';
                if(originalType === 'scatter') {
                  if(props.scaleLabelLabelStringxAxes !== null || props.scaleLabelLabelStringyAxes !== null){
                    innerHtml += '<tr><td>' + props.scaleLabelLabelStringxAxes + " : " + noKakko[0] + " " + props.scaleLabelLabelStringyAxes + " : " + noKakko[1] + '</td></tr>';
                  } else {
                    innerHtml += '';
                  }
                } else if(originalType === 'bubble'){
                  if(props.scaleLabelLabelStringxAxes !== null || props.scaleLabelLabelStringyAxes !== null){
                    innerHtml += '<tr><td>' + props.scaleLabelLabelStringxAxes + " : " + noKakko[0] + " " + props.scaleLabelLabelStringyAxes + " : " +  noKakko[1] + "規模" + noKakko[2]+ '</td></tr>';
                  } else {
                    innerHtml += '';
                  }
                  
                } else if(originalType === 'rankingBar') {
                  innerHtml += '<tr><td style="font-size: 12px;">' + span + newBody[0][i] + " : " + Number(newEle[0]) + '</td></tr>'; // label:value
                // } else if(originalType === 'pie') {
                //   innerHtml += '<tr><td style="padding:' + 0 + 'px ' + width / 8 + 'px">' + span + body + '</td></tr>';
                //   // console.log(document.querySelectorAll("#chartjs-tooltip td").clientWidth);
                //   // let td = document.querySelectorAll("#chartjs-tooltip td");
                //   // td.style.padding = 100 + 'px';
                } else {
                  innerHtml += '<tr><td>' + span + body + '</td></tr>';
                }
              });
              innerHtml += '</tbody>';
              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();
            // console.log(position);

            // Display, position, and set styles for font
            tooltipEl.style.backgroundColor = '#FFFFFF'
            // tooltipEl.style.opacity = 0.85;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            
            tooltipEl.style.pointerEvents = 'none';
            // if(originalType === 'pie'){
            //   tooltipEl.style.borderRadius = '50%';
            //   tooltipEl.style.width = this._chart.chart.width / 2 + 'px';
            //   tooltipEl.style.height = this._chart.chart.height / 2 + 'px';
            //   tooltipEl.style.textAlign = 'end';
            //   tooltipEl.style.lineHeight = this._chart.chart.height / 2 + 'px';
            // } else {
              tooltipEl.style.borderRadius = '5px';
              tooltipEl.style.width = 'initial';
              tooltipEl.style.height = 'initial';
              tooltipEl.style.textAlign = 'initial';
              tooltipEl.style.lineHeight = 'initial';
              tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            // }
            tooltipEl.style.boxShadow = '0 1px 10px 1px rgba(128,128,128,0.6)';
          }
        },
        elements: {
          point: {
            radius: radius,//折線の丸を消す
          },
          line: {
            tension: 0,
          }
        },
        scales: {
          xAxes: [{
            display: axesDisplay,
            stacked: chartxAxesStacked,
            gridLines: {
              // color: "rgba(234, 234, 234, 0)",//#EAEAEA
              drawTicks: false,
              zeroLineColor: '#000000',
              // display: false
            },
            ticks: {
              callback: function(value) {
                if(typeof(value) === "number") {
                  return value.toLocaleString();//カンマで区切る
                }else{
                  return value;
                }
              },
              autoSkip: xTicksAutoSkip,
              autoSkipPadding: 50,//メモリの間の間隔
              maxRotation: 0, //軸ラベルを横にする
              minRotation: 0,
              padding: 10,
              // labelOffset: 10
            },
          }],
          yAxes: [{
            display: axesDisplay,
            // type: this.state.yAxes,
            stacked: chartyAxesStacked,
            gridLines: {
              drawTicks: false,
              zeroLineColor: '#000000',
            },
            ticks: {
              callback: function(value) {
                if(typeof(value) === "number") {
                  return value.toLocaleString();//カンマで区切る
                }else{
                  return value;
                }
              },
              // fontSize: 12,
              autoSkip: yTicksAutoSkip,
              autoSkipPadding: 50,//メモリの間の間隔
              maxRotation: 0, //軸ラベルを横にする
              minRotation: 0,
              padding: 10,
              // suggestedMin: 0,
              min:0
            }
          }]
        },
        plugins: {
          datalabels: {
            display: datalabelsDisplay,
            anchor: 'end', // データラベルの位置（'start' は下端）
            align: 'end', // データラベルの位置（'start' は下側）
            textAlign: 'center',
            padding: {
              bottom: 1
            },
            formatter: function(value, context) {
              if(originalType === 'scatter' || originalType === 'bubble'){
                return value.label;
              } else if(originalType === 'rankingBar'){
                return context.chart.data.datasets[0].label[context.dataIndex];
              }
            }
          }
        }
      }
    });
    //横棒グラフで長いラベルがある時にpaddingを追加する
    if(chartType === 'horizontalBar'){
      if(typeof chart.chart.scales["y-axis-0"].longestLabelWidth !== 'undefined' && typeof chart.chartArea.left !== 'undefined'){
        let a = chart.chart.scales["y-axis-0"].longestLabelWidth;
        let b = chart.scales["y-axis-0"].width;
        let c = (a - b + 10) * 2;// 10は軸からラベルの距離に設定している値
        // console.log([a,b,c,window.devicePixelRatio])
        if(c > 0){
          chart.options.layout.padding.left = c;
          chart.update();
        }
      }
    }
    return chart;
  }
  
  return (
    <div style={{fontFamily:'Noto Sans JP'}}>
      <div style={{marginBottom:4, fontSize:24}} id="title">{props.titleText}</div>
      <div>
        <div style={{marginBottom:8, fontSize:16}} id="legendTitle">{props.legendTitle}</div>
        {(
          () => {
          const items = Array();
          if(legendLength > 1){
            for(let i = 0; i < legendLength; i++){
              const backgroundColor = selectedArray[i] ? colorCode[props.colorTheme][i] : colorCode['notSelected'][i];
              items.push(
                <div style={{display:'flex', marginRight:12}} key={i} className="legend_legend-item__hVZal css-1wxaqej">
                  <div style={{background:backgroundColor, width:15, height:15, margin:3}} onClick={() => reBuildChart(i)} className="legend_legend-rect__3_0lc"></div>
                  <div>{legendLabel[i]}</div>
                </div>
              )
            }
          } else {
            return false;
          }
          return <div style={{display:'flex',flexWrap:'wrap'}}  id="legend" className="legend_legend__24eBL css-1d3bbye">{items}</div>;
        }) ()}
      </div>
      <div style={{marginTop:12, marginBottom:10, fontSize:12}} id="yAxesLabel" className="chart_axis__B-zYA chart_y__1huGV">{props.scaleLabelLabelStringyAxes}</div>
      <canvas ref={chartRef} id="bpchart" />
      <div>
        <p style={{marginBottom:10, marginLeft:10, fontSize:12, textAlign:"right"}} id="xAxesLabel" className="chart_axis__B-zYA chart_x__2AUNC">{props.scaleLabelLabelStringxAxes}</p>
      </div>
      {(() =>{
        //キャプションは初期リリース時にはなかったため、有無の判定をする。あれば入れる。
        if(typeof props.captionText !== 'undefined'){
          return <div style={{marginBottom:4, fontSize:14}} id="caption">{props.captionText}</div>;
        }
      }) ()}
    </div>
  )
}


 

const bpChartList = document.querySelectorAll('.bpChart');
// console.log(bpChartList);
const data = [];
bpChartList.forEach(i => {
  let filePath = i.dataset.bpcmsSource;
  // console.log(filePath)
  fetch(filePath, {
      method: "GET",
  }).then(response => response.json())
  .then(text => {
    // console.log(text);
    data.push(text);
    const root = ReactDOM.createRoot(i);
    root.render(
    <LineGraph
      dataForChart={text.data}
      type={text.globalsetting[0].type}
      colorTheme={text.globalsetting[0].colorTheme}
      responsive={text.globalsetting[0].responsive}
      legendTitle={text.globalsetting[0].legendTitle}
      titleText={text.globalsetting[0].titleText}
      captionText={text.globalsetting[0].captionText}
      scaleLabelLabelStringxAxes={text.globalsetting[0].scaleLabelLabelStringxAxes}
      scaleLabelLabelStringyAxes={text.globalsetting[0].scaleLabelLabelStringyAxes}
    />
    );
  })
})