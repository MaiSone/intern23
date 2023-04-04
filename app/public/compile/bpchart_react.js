var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
var colorCode = {
  'default': ['#52A69F', '#596DB8', '#EDB444', '#D4628B', '#99AD4A', '#7E522E', '#57A9D7', '#A15CB9', '#E0792E', '#A57667'],
  'notSelected': ['rgba(82,166,159,0.25)', 'rgb(89,109,184,0.25)', 'rgb(237,180,68,0.25)', 'rgb(212,98,139,0.25)', 'rgb(153,173,74,0.25)', 'rgb(126,82,46,0.25)', 'rgb(87,169,215,0.25)', 'rgb(161,92,185,0.25)', 'rgb(224,121,46,0.25)', 'rgb(165,118,103,0.25)']
};
//チャートタイプ
var type = {
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
  'pie': 'pie'
  //積み上げ
  //x軸
};var xAxesStacked = {
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
  'pie': false
  //y軸
};var yAxesStacked = {
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
  'pie': false
  //fill
};var fill = {
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
  'pie': false
};

var xAutoSkip = {
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
  'pie': false
};

var yAutoSkip = {
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
  'pie': false
};

var pointRadius = {
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
  'pie': 0
};

var datalabels = {
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
  'pie': false
};

var dataObject = {
  'line': { labels: null, datasets: null },
  'area': { labels: null, datasets: null },
  'stackedArea': { labels: null, datasets: null },
  'bar': { labels: null, datasets: null },
  'horizontalBar': { labels: null, datasets: null },
  'stackedBar': { labels: null, datasets: null },
  'stackedHorizontalBar': { labels: null, datasets: null },
  'rankingBar': { labels: null, datasets: null },
  'scatter': { datasets: null },
  'bubble': { datasets: null },
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
};

var axes = {
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
  'pie': false
};

var tooltipAlign = {
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
  'pie': 'center'
};

var tooltipsPosition = {
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
  'pie': 'pie'
};

function generateDataset(jsonArray, colorTheme, type, sw) {
  // datasetsを作成
  var datasets = [];
  if (type === 'scatter') {
    var i;
    var n;
    var i;

    (function () {
      var legends = [];
      for (i = 1; i < jsonArray.length; i++) {
        //0行目はカラム名が入るので飛ばす
        legends.push(jsonArray[i]['legend']);
      }
      var legend = Array.from(new Set(legends)); //Set で重複除去したオブジェクトに、それを配列にする
      for (n = 0; n < legend.length; n++) {
        //分繰り返し
        var chartdata = [];
        var filterd = jsonArray.filter(function (el) {
          return el.legend === legend[n];
        });
        for (i = 0; i < filterd.length; i++) {
          if (type === 'scatter') {
            chartdata.push({ x: Number(filterd[i]['x']), y: Number(filterd[i]['y']), label: filterd[i]['label'] });
          } else if (type === 'bubble') {
            chartdata.push({ x: Number(filterd[i]['x']), y: Number(filterd[i]['y']), r: Number(filterd[i]['r']), label: filterd[i]['label'] });
          }
          // chartdata.map(Number);//文字列から数字に変換
        };
        var backgroundColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
        var borderColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
        var chartFill = fill[type];
        var _dataObject = {
          label: legend[n],
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          fill: chartFill,
          data: chartdata //先ほどのchartdataをセット
        };
        datasets.push(_dataObject);
      }
    })();
  } else if (type === 'bubble') {
    var legends = [];
    for (var i = 1; i < 11; i++) {
      //0行目はカラム名が入るので飛ばす
      legends.push(jsonArray[i]['label']);
    }
    for (var n = 0; n < legends.length; n++) {
      //分繰り返し
      var chartdata = [];
      chartdata.push({ x: Number(jsonArray[n + 1]['x']), y: Number(jsonArray[n + 1]['y']), r: Number(jsonArray[n + 1]['r']), label: jsonArray[n + 1]['label'] });
      var backgroundColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      var borderColor = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      var chartFill = fill[type];
      var _dataObject2 = {
        label: legends[n],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        fill: chartFill,
        data: chartdata //先ほどのchartdataをセット
      };
      datasets.push(_dataObject2);
    }
  } else if (type === 'rankingBar') {
    var _chartdata = [];
    for (var i = 1; i < jsonArray.length; i++) {
      _chartdata.push(jsonArray[i]['value']);
      _chartdata.map(Number); //文字列から数字に変換
    }
    var chartlabel = [];
    for (var i = 1; i < jsonArray.length; i++) {
      chartlabel.push(jsonArray[i]['label']);
    }
    var _backgroundColor = sw[0] ? colorCode[colorTheme][0] : colorCode['notSelected'][0]; // 色は1色なので0で指定
    var _borderColor = sw[0] ? colorCode[colorTheme][0] : colorCode['notSelected'][0];
    var _chartFill = fill[type];
    var _dataObject3 = {
      label: chartlabel,
      backgroundColor: _backgroundColor,
      borderColor: _borderColor,
      fill: _chartFill,
      data: _chartdata //先ほどのchartdataをセット
    };
    datasets.push(_dataObject3);
  } else if (type === 'pie') {
    var _chartdata2 = [];
    var _backgroundColor2 = [];
    var _borderColor2 = [];
    for (var i = 0; i < jsonArray.length - 1; i++) {
      _chartdata2.push(jsonArray[i + 1]['data0']);
      _chartdata2.map(Number); //文字列から数字に変換
      _backgroundColor2.push(sw[i] ? colorCode[colorTheme][i] : colorCode['notSelected'][i]);
      _borderColor2.push(sw[i] ? colorCode[colorTheme][i] : colorCode['notSelected'][i]);
    }
    dataObject[type].backgroundColor = _backgroundColor2;
    dataObject[type].borderColor = _borderColor2;
    dataObject[type].data = _chartdata2;
    datasets.push(dataObject[type]);
  } else {
    for (var n = 0; n < Object.keys(jsonArray[0]).length - 1; n++) {
      //データ数（data0,data1...）分繰り返し
      var _chartdata3 = [];
      for (var i = 1; i < jsonArray.length; i++) {
        _chartdata3.push(jsonArray[i]['data' + n]);
        _chartdata3.map(Number); //文字列から数字に変換
      }
      var _backgroundColor3 = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      var _borderColor3 = sw[n] ? colorCode[colorTheme][n] : colorCode['notSelected'][n];
      var _chartFill2 = fill[type];
      var _dataObject4 = {
        label: Object.values(jsonArray[0])[n + 1], //n=0はlabelなので+1
        backgroundColor: _backgroundColor3,
        borderColor: _borderColor3,
        fill: _chartFill2,
        data: _chartdata3, //先ほどのchartdataをセット
        order: n
      };
      datasets.push(_dataObject4);
    }
  }
  return datasets;
}

function generateLabel(jsonArray) {
  var labels = [];
  // 作った配列に入れる
  if (type === 'rankingBar') {
    for (var i = 1; i < jsonArray.length; i++) {
      labels.push(jsonArray[i]['rank']);
    }
  } else {
    for (var i = 1; i < jsonArray.length; i++) {
      labels.push(jsonArray[i]['label']);
    }
  }
  // console.log(labels);
  return labels;
}

function generateData(type, labels, datasets) {
  if (type === 'scatter' || type === 'bubble') {
    return { labels: labels, datasets: datasets };
  }
  return { labels: labels, datasets: datasets };
}

function setLegend(jsonArray, type) {
  if (type === 'scatter' || type === 'bubble' || type === 'pie') {
    //データの列名
    var legends = [];
    for (var i = 1; i < jsonArray.length; i++) {
      if (type === 'pie' || type === 'bubble') {
        legends.push(jsonArray[i]['label']);
      } else {
        legends.push(jsonArray[i]['legend']);
      }
    }
    var legend = Array.from(new Set(legends));
    setLegendLength(legend.length);
    setLegendLabel(legend);
  } else if (type === 'rankingBar') {
    setLegendLength(1);
    setLegendLabel(legendLabel);
  } else {
    setLegendLength(Object.keys(jsonArray[0]).length - 1); //label列は不要なため-1
    setLegendLabel(Object.values(jsonArray[0]).slice(1));
  }
}

function LineGraph(props) {
  // 関数コンポーネントでref使えない。DOM 要素またはクラスコンポーネントを参照している限り、関数コンポーネント内で ref 属性を使用することは可能（https://ja.reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components）
  var chartRef = React.useRef(null);

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      count = _React$useState2[0],
      setCount = _React$useState2[1];

  var _React$useState3 = React.useState(new Array(10).fill(true)),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selectedArray = _React$useState4[0],
      setSelectedArray = _React$useState4[1];

  var _React$useState5 = React.useState(new Array(10).fill(false)),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      notSelectedArray = _React$useState6[0],
      setNotSelectedArray = _React$useState6[1];

  var _React$useState7 = React.useState(3),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      legendLength = _React$useState8[0],
      setLegendLength = _React$useState8[1];

  var _React$useState9 = React.useState(new Array(10).fill("a")),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      legendLabel = _React$useState10[0],
      setLegendLabel = _React$useState10[1];

  var reBuildChart = function reBuildChart(i) {

    var newSelected = notSelectedArray;
    newSelected[i] = !notSelectedArray[i];

    setCount(function () {
      var newCount = 0;
      for (var n = 0; n < legendLength; n++) {
        if (newSelected[n] === true) {
          newCount++;
        }
      }
      // console.log(newCount);
      if (newCount === 0 || newCount === legendLength) {
        // console.log(newSelected)
        setSelectedArray(Array(legendLength).fill(true));
        setNotSelectedArray(Array(legendLength).fill(false));
      } else {
        // console.log(newSelected)
        setSelectedArray(newSelected);
      }
      return newCount;
    });
  };

  React.useEffect(function () {
    buildChart();
  });

  React.useEffect(function () {
    setLegend(props.dataForChart, props.type);
  }, []); //初回だけ実行


  var setLegend = function setLegend(jsonArray, type) {
    if (type === 'scatter' || type === 'bubble' || type === 'pie') {
      //データの列名
      var legends = [];
      for (var i = 1; i < jsonArray.length; i++) {
        if (type === 'pie' || type === 'bubble') {
          if (i < 11) {
            legends.push(jsonArray[i]['label']);
          }
        } else {
          if (i < 11) {
            legends.push(jsonArray[i]['legend']);
          }
        }
      }
      var legend = Array.from(new Set(legends));
      setLegendLength(legend.length);
      setLegendLabel(legend);
    } else if (type === 'rankingBar') {
      setLegendLength(1);
      setLegendLabel(legendLabel);
    } else {
      setLegendLength(Object.keys(jsonArray[0]).length - 1); //label列は不要なため-1
      setLegendLabel(Object.values(jsonArray[0]).slice(1));
    }
  };

  var buildChart = function buildChart() {

    var cvsChart = chartRef;
    var ctxChart = cvsChart.current.getContext("2d");

    var labels = generateLabel(props.dataForChart);
    // console.log(props.dataForChart);
    var datasets = generateDataset(props.dataForChart, props.colorTheme, props.type, selectedArray);
    // console.log(datasets);
    var chartData = generateData(props.type, labels, datasets);
    // console.log(chartData)

    var originalType = props.type;
    var chartType = type[props.type];
    // console.log(chartType)
    var chartxAxesStacked = xAxesStacked[props.type];
    var chartyAxesStacked = yAxesStacked[props.type];

    var xTicksAutoSkip = xAutoSkip[props.type];
    var yTicksAutoSkip = yAutoSkip[props.type];
    var radius = pointRadius[props.type];
    var datalabelsDisplay = datalabels[props.type];
    var axesDisplay = axes[props.type];
    var bodyAlign = tooltipAlign[props.type];
    var position = tooltipsPosition[props.type];

    Chart.defaults.global.defaultFontColor = '#000000';
    Chart.defaults.global.defaultFontFamily = "'Heebo', sans-serif";

    Chart.Tooltip.positioners.pie = function (elements, eventPosition) {
      // console.log(elements[0]._chart.width);
      return {
        x: elements[0]._chart.width / 4,
        y: elements[0]._chart.height / 4
      };
    };

    ctxChart.fillStyle = '#FAFAF9';

    var chart = new Chart(ctxChart, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true, //trueにすると画面の幅に合わせて作図してしまう
        maintainAspectRatio: true,
        aspectRatio: 1,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false, //カスタムの時false
          mode: 'nearest',
          position: position,
          bodyAlign: 'center',
          footerAlign: 'center',
          custom: function custom(tooltipModel) {
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
            if (typeof tooltipModel.body !== 'undefined') {
              // bodyがないときがあるため
              // console.log(tooltipModel.body[0].lines[0]);
              var newBody = tooltipModel.body[0].lines[0].split(":");
              // console.log(newBody);
              if (typeof newBody[1] !== 'undefined') {
                var newBody1 = newBody[1].replace(/[\[\]']+/g, '');
                // console.log(newBody1);
                var noKakko = newBody[1].replace(/[\(\)']+/g, '').replace(/\s/g, '').split(",");
                // console.log(noKakko)
                var newEle = newBody1.split(",");
                // console.log(newEle);
              } else {
                var newBody = tooltipModel.body[0].lines[0];
                var noKakko = newBody.replace(/[\(\)']+/g, '').replace(/\s/g, '').split(",");
                // console.log(tooltipModel.body[0])
              }
            }
            // Set Text
            if (tooltipModel.body) {
              if (originalType === 'scatter' || originalType === 'bubble') {
                var titleLines = Array(this._data.datasets[tooltipModel.dataPoints[0].datasetIndex].data[tooltipModel.dataPoints[0].index].label);
              } else {
                var titleLines = tooltipModel.title;
              }
              // console.log(this._data.datasets);
              var bodyLines = tooltipModel.body.map(getBody);
              var innerHtml = '<thead>';
              titleLines.forEach(function (title) {
                // console.log(titleLines)
                innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';
              bodyLines.forEach(function (body, i) {
                var style = 'background:' + '#fff';
                style += '; border-color:' + '#fff';
                style += '; border-width: 2px';
                var span = '<span style="' + style + '"></span>';
                if (originalType === 'scatter') {
                  if (props.scaleLabelLabelStringxAxes !== null || props.scaleLabelLabelStringyAxes !== null) {
                    innerHtml += '<tr><td>' + props.scaleLabelLabelStringxAxes + " : " + noKakko[0] + " " + props.scaleLabelLabelStringyAxes + " : " + noKakko[1] + '</td></tr>';
                  } else {
                    innerHtml += '';
                  }
                } else if (originalType === 'bubble') {
                  if (props.scaleLabelLabelStringxAxes !== null || props.scaleLabelLabelStringyAxes !== null) {
                    innerHtml += '<tr><td>' + props.scaleLabelLabelStringxAxes + " : " + noKakko[0] + " " + props.scaleLabelLabelStringyAxes + " : " + noKakko[1] + "規模" + noKakko[2] + '</td></tr>';
                  } else {
                    innerHtml += '';
                  }
                } else if (originalType === 'rankingBar') {
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
            tooltipEl.style.backgroundColor = '#FFFFFF';
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
            radius: radius //折線の丸を消す
          },
          line: {
            tension: 0
          }
        },
        scales: {
          xAxes: [{
            display: axesDisplay,
            stacked: chartxAxesStacked,
            gridLines: {
              // color: "rgba(234, 234, 234, 0)",//#EAEAEA
              drawTicks: false,
              zeroLineColor: '#000000'
              // display: false
            },
            ticks: {
              callback: function callback(value) {
                if (typeof value === "number") {
                  return value.toLocaleString(); //カンマで区切る
                } else {
                  return value;
                }
              },
              autoSkip: xTicksAutoSkip,
              autoSkipPadding: 50, //メモリの間の間隔
              maxRotation: 0, //軸ラベルを横にする
              minRotation: 0,
              padding: 10
              // labelOffset: 10
            }
          }],
          yAxes: [{
            display: axesDisplay,
            // type: this.state.yAxes,
            stacked: chartyAxesStacked,
            gridLines: {
              drawTicks: false,
              zeroLineColor: '#000000'
            },
            ticks: {
              callback: function callback(value) {
                if (typeof value === "number") {
                  return value.toLocaleString(); //カンマで区切る
                } else {
                  return value;
                }
              },
              // fontSize: 12,
              autoSkip: yTicksAutoSkip,
              autoSkipPadding: 50, //メモリの間の間隔
              maxRotation: 0, //軸ラベルを横にする
              minRotation: 0,
              padding: 10,
              // suggestedMin: 0,
              min: 0
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
            formatter: function formatter(value, context) {
              if (originalType === 'scatter' || originalType === 'bubble') {
                return value.label;
              } else if (originalType === 'rankingBar') {
                return context.chart.data.datasets[0].label[context.dataIndex];
              }
            }
          }
        }
      }
    });
    //横棒グラフで長いラベルがある時にpaddingを追加する
    if (chartType === 'horizontalBar') {
      if (typeof chart.chart.scales["y-axis-0"].longestLabelWidth !== 'undefined' && typeof chart.chartArea.left !== 'undefined') {
        var a = chart.chart.scales["y-axis-0"].longestLabelWidth;
        var b = chart.scales["y-axis-0"].width;
        var c = (a - b + 10) * 2; // 10は軸からラベルの距離に設定している値
        // console.log([a,b,c,window.devicePixelRatio])
        if (c > 0) {
          chart.options.layout.padding.left = c;
          chart.update();
        }
      }
    }
    return chart;
  };

  return React.createElement(
    'div',
    { style: { fontFamily: 'Noto Sans JP' } },
    React.createElement(
      'div',
      { style: { marginBottom: 4, fontSize: 24 }, id: 'title' },
      props.titleText
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { style: { marginBottom: 8, fontSize: 16 }, id: 'legendTitle' },
        props.legendTitle
      ),
      function () {
        var items = Array();
        if (legendLength > 1) {
          var _loop = function _loop(i) {
            var backgroundColor = selectedArray[i] ? colorCode[props.colorTheme][i] : colorCode['notSelected'][i];
            items.push(React.createElement(
              'div',
              { style: { display: 'flex', marginRight: 12 }, key: i, className: 'legend_legend-item__hVZal css-1wxaqej' },
              React.createElement('div', { style: { background: backgroundColor, width: 15, height: 15, margin: 3 }, onClick: function onClick() {
                  return reBuildChart(i);
                }, className: 'legend_legend-rect__3_0lc' }),
              React.createElement(
                'div',
                null,
                legendLabel[i]
              )
            ));
          };

          for (var i = 0; i < legendLength; i++) {
            _loop(i);
          }
        } else {
          return false;
        }
        return React.createElement(
          'div',
          { style: { display: 'flex', flexWrap: 'wrap' }, id: 'legend', className: 'legend_legend__24eBL css-1d3bbye' },
          items
        );
      }()
    ),
    React.createElement(
      'div',
      { style: { marginTop: 12, marginBottom: 10, fontSize: 12 }, id: 'yAxesLabel', className: 'chart_axis__B-zYA chart_y__1huGV' },
      props.scaleLabelLabelStringyAxes
    ),
    React.createElement('canvas', { ref: chartRef, id: 'bpchart' }),
    React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        { style: { marginBottom: 10, marginLeft: 10, fontSize: 12, textAlign: "right" }, id: 'xAxesLabel', className: 'chart_axis__B-zYA chart_x__2AUNC' },
        props.scaleLabelLabelStringxAxes
      )
    ),
    function () {
      //キャプションは初期リリース時にはなかったため、有無の判定をする。あれば入れる。
      if (typeof props.captionText !== 'undefined') {
        return React.createElement(
          'div',
          { style: { marginBottom: 4, fontSize: 14 }, id: 'caption' },
          props.captionText
        );
      }
    }()
  );
}

var bpChartList = document.querySelectorAll('.bpChart');
// console.log(bpChartList);
var data = [];
bpChartList.forEach(function (i) {
  var filePath = i.dataset.bpcmsSource;
  // console.log(filePath)
  fetch(filePath, {
    method: "GET"
  }).then(function (response) {
    return response.json();
  }).then(function (text) {
    // console.log(text);
    data.push(text);
    var root = ReactDOM.createRoot(i);
    root.render(React.createElement(LineGraph, {
      dataForChart: text.data,
      type: text.globalsetting[0].type,
      colorTheme: text.globalsetting[0].colorTheme,
      responsive: text.globalsetting[0].responsive,
      legendTitle: text.globalsetting[0].legendTitle,
      titleText: text.globalsetting[0].titleText,
      captionText: text.globalsetting[0].captionText,
      scaleLabelLabelStringxAxes: text.globalsetting[0].scaleLabelLabelStringxAxes,
      scaleLabelLabelStringyAxes: text.globalsetting[0].scaleLabelLabelStringyAxes
    }));
  });
});