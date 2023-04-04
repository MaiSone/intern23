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

// CSVフォーマット
// rank,pref,rate
// 1,山形県,0.6197 
// 2,島根県,0.6048 
// 平均,全国,0.5362 

const defaulViewFilename = 'lowerHouse';
var barChart = null;

// 初回表示
if(barChart == null){
    var defaulView = {'currentTarget': document.getElementById('default')};
    // console.log(defaulView.currentTarget);

    voteCount(defaulView, defaulViewFilename);
}

function voteCount(evt, filename) {
    if(barChart != null){
        barChart.destroy();
    }

    // Declare all variables
    var i, tablinks;
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    evt.currentTarget.className += " active";

    main(filename);
}


function main(filename) {

    // 1) ajaxでCSVファイルをロード
    var reqBar = new XMLHttpRequest();
    var filePath = filename+'.csv';
    reqBar.open("GET", filePath, true);
    reqBar.responseType = 'text';
    reqBar.onload = function () {
        // 2) CSVデータ変換の呼び出し
        const data = csv2json(reqBar.responseText);

        // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
        drawBarChart(data);

    }
    reqBar.send(null);
}


// 2) CSVから２次元配列に変換
function csv2json(csvArray) {
    var jsonArray = [];
    var rows = csvArray.split(/\r?\n/); //改行で区切る
    var columnName = rows[0].split(","); // 1行目から「項目名」の配列を生成する

    for (var i = 0; i < rows.length; i++) { //行数の分繰り返す
        var row = new Array();
        var cells = rows[i].split(",");
        for (var j = 0; j < columnName.length; j++) { //列数の分繰り返す
            row[columnName[j]] = cells[j];
        }
        jsonArray.push(row);
    }
    return jsonArray;
}

function drawBarChart(data) {
    
    var Array = [];
    var aveRank = 1;
    for(var i = 0; i < data.length; i++){
        Array.push(data[i]);

        // 全国平均の順位を取得する
        if(data[i].pref == '全国') aveRank = i;
    }

    barLabels = [];
    //作った配列に入れる
    for (var i = 1; i < Array.length; i++){
        barLabels.push(Array[i]['rank']);
    };
    // console.log(barLabels);
    // console.log(Array);
    firstDatasets = [];
    for (var i = 1; i < Array.length; i++){
        firstDatasets.push(Math.round(Array[i]['rate']*100*10000)/10000);
        // console.log(Array[i]['rate'])
    };
    // console.log(firstDatasets)

    ave = [];
    for (var i = 1; i < Array.length; i++){
        // console.log(Array);
        ave.push(Math.round(Array[aveRank]['rate']*100*10000)/10000);
        // console.log(Array[i]['rate'])
    };
    // console.log(ave);


    // var barlabels = barLabels.slice();
    // //21位と25位が二つある順位作る
    // var barlabels2 = barLabels.slice();//コピー作成
    // barlabels2[21] = 21;
    // barlabels2[25] = 25;
    // //20位が二つある順位作る
    // var barlabels3 = barLabels.slice();//コピー作成
    // barlabels3[20] = 20;
    

    color = [];
    for (var i = 1; i < Array.length; i++){
        if(i == aveRank){
            color.push("#EDB444");
        }else{
            color.push("#52A69F");
        }
        
        // console.log(Array[i]['rate'])
    };
    // console.log(color);
    
    


    var ctx = document.getElementById("chart").getContext("2d");

    Chart.defaults.global.defaultFontColor = '#000000';
    // Chart.defaults.global.defaultFontFamily = "'Heebo', 'Heebo', sans-serif";
    // Chart.defaults.global.defaultFontStyle = ''


    barChart = new Chart(ctx, {
        type: 'horizontalBar',
        data:{
            labels: barLabels,
            datasets: [
                {
                    label: '平均投票率',
                    backgroundColor: color,
                    data: firstDatasets,
                    // xAxisID: 'top-y-axis'
                    order: 1
                },
                {
                    label: 'Dataset 2',
                    data: ave,
                    // borderColor: 'red',
                    // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
                    type: 'line',
                    order: 2
                }
            ]
        },
        options: {
            responsive: true, //trueにすると画面の幅に合わせて作図してしまう
            aspectRatio: 0.5,
            legend: {
                display: false,
            },
            plugins: {
                datalabels: {
                    // font: function(){
                    //     if(isSP){
                    //         return '7px';
                    //     }
                    // },
                    formatter: function(value, context) {
                        return data[context.dataIndex + 1]['pref'];
                    },
                    anchor: 'end',
                    align: 'end',
                    clamp: true,
                    clip: false, //はみ出るデータラベルは非表示
                },
            },
            scales: {
                xAxes: [
                    {
                        // id: 'top-y-axis',
                        // type: 'linear',
                        position: 'top',
                        gridLines: {
                            color: "rgba(234, 234, 234, 0)",//#EAEAEA
                            drawTicks: false,
                            zeroLineColor: '#000000'
                        },    
                        ticks: {
                            
                            // suggestedMax: max,
                            // beginAtZero: false,
                            maxRotation: 0,//軸ラベルを横にする
                            minRotation: 0,
                            // suggestedMin: 0,
                            max: 70,
                            min: 40,
                            padding: 5,
                            callback: function(value){
                                return value+'%';  //labelに「〜位」をつける
                            },
                            
                            sampleSize: 5,
                            sampleSize: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: '衆参6回平均投票率',
                            fontColor: '#666666',
                        }
                    },
                    // {
                    //     id: 'bottom-y-axis',
                    //     type: 'linear',
                    //     position: 'bottom',
                    //     gridLines: {
                    //         color: "rgba(234, 234, 234, 0)",//#EAEAEA
                    //         drawTicks: false,
                    //         zeroLineColor: '#000000'
                    //     }, 
                    //     ticks: {
                    //         // suggestedMax: max,
                    //         beginAtZero: false,
                    //         padding: 5
                    //     }
                    // }
                ],
                yAxes: [{
                    gridLines: {
                        // color: "rgba(234, 234, 234, 0)",//#EAEAEA
                        drawTicks: false,
                        zeroLineColor: '#000000',
                    },
                    ticks: {
                        suggestedMin: 0,
                        padding: 20,
                        // min: minRank,
                        // max: maxRank,
                        callback: function(value){
                            if(value === "平均"){
                                return value;
                            }
                            return value+'位';  //labelに「〜位」をつける
                        }
                    },
                    // scaleLabel: {
                    //     display: true,
                    //     labelString: '衆参6回平均投票率',
                    //     fontColor: '#666666',
                    // }
                }]
            },
            tooltips:{
                enabled: false,

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

                    // Hide if no tooltip
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
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


                    // Set Text
                    if (tooltipModel.body) {
                        var titleLines = tooltipModel.title || [];
                        var bodyLines = tooltipModel.body.map(getBody);
                        

                        var innerHtml = '<thead>';

                        titleLines.forEach(function(title) {
                            if(title === "平均"){
                                innerHtml += '<tr><th>' + title + '</th></tr>';
                            }else{
                                innerHtml += '<tr><th>' + title + '位</th></tr>';
                            }
                        });
                        innerHtml += '</thead><tbody>';

                        bodyLines.forEach(function(body, i) {
                            var colors = tooltipModel.labelColors[i];
                            var style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            var span = '<span style="' + style + '"></span>';
                            innerHtml += '<tr><td>' + span + body + '％</td></tr>';
                        });
                        innerHtml += '</tbody>';

                        var tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }

                    // `this` will be the overall tooltip
                    var position = this._chart.canvas.getBoundingClientRect();

                    // Display, position, and set styles for font
                    tooltipEl.style.backgroundColor = '#FFFFFF'
                    tooltipEl.style.opacity = 0.85;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                    tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                    tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                }
            }
        }
    });
}