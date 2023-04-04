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




// エリアコード定義
const areaNameMap = {
    523536802: '京都駅',
    523501253: '旧居留地・大丸前駅（神戸）',
    644142783: 'さっぽろ駅',
    534030391: '京成千葉駅',
    534053104: '成田空港駅',
    533937601: '東京ディズニーランド・ステーション駅',
    533964894: '大宮駅',
    493174303: '別府駅',
    523503492: '梅田駅',
    523503092: '大阪難波駅',
    513551291: '関西空港駅',
    574037102: '仙台駅',
    513243783: '広島駅',
    523667022: '栄町駅（名古屋）',
    523626351: '中部国際空港駅',
    533946211: '大手町駅',
    533945254: '新宿駅',
    533935961: '渋谷駅',
    533945764: '池袋駅',
    392725543: '県庁前駅（那覇）',
    543665912: '金沢駅',
    533925354: '川崎駅',
    533914594: '横浜駅',
    503067602: '小倉駅',
    503033034: '博多駅',
    543845102: '軽井沢駅',
    523950261: '熱海駅'
};

const defaultAreaCode = '533935961';//渋谷
// const defaultAreaCode = '523667022';　//栄町駅検証用

// 1) ajaxでCSVファイルをロード
var req = new XMLHttpRequest();
var filePath = 'total.csv';
req.open("GET", filePath, true);
req.responseType = 'text';

req.onload = function () {
    
    // 地図描画
    // エリアボタンクリック
    $('.map-area-group').on('click', function (event) {
        $('.map-area-button').fadeToggle();
        var areaClassName = '.area-' + event.target.dataset.area;
        // console.log(areaClassName);
        $(areaClassName).fadeToggle();
    });

    $('.area-group-close').on('click', function (event) {
        $('.map-area-button').fadeToggle();
        var areaClassName = '.area-' + $(event.target)[0].dataset.area;
        // console.log(areaClassName);
        $(areaClassName).fadeToggle();
    });

    // 2) CSVデータ変換の呼び出し
    const data = csv2json(req.responseText);
    let defaultData = data.filter(function (item) { return item.area === defaultAreaCode });

    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    const copyYAxisImage = drawLineChart(defaultData);

    // エリア選択
    $('.area-select').on('click', function () {
        var value = $(this)[0].dataset.area;
        // console.log(value);
        if (String(value).length > 8) {
            let areatData = data.filter(function (item) { return item.area === value });
            // console.log(data);
            //人口データを配列に入れる
            var pop = [];
            for (var i = 0; i < areatData.length; i++) {
                pop.push(areatData[i].population);
            }
            // pop = pop.map(Number);//文字列から数字に変換
            //データの更新
            chart.data.datasets[0].data = pop;
            chart.update();
            //y軸コピーをクリアし、新しいデータの軸を描画
            var cvsYAxis = document.createElement("canvas");
            var ctxYAxis = cvsYAxis.getContext("2d");
            ctxYAxis.clearRect(0, 0, cvsYAxis.width, cvsYAxis.height);
            copyYAxisImage(chart);

            //地点名を表示
            // console.log(areaNameMap[value]);
            document.getElementById('areaName').textContent = areaNameMap[value] + 'の人口推移';
        }
    });
}
req.send(null);

//地点名を表示
// console.log(areaNameMap[defaultAreaCode]);
document.getElementById('areaName').textContent = areaNameMap[defaultAreaCode] + 'の人口推移';

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

function drawLineChart(data) {

    //人口元データ
    var pop = [];
    for (var i = 0; i < data.length; i++) {
        pop.push(data[i].population);
    }
    // console.log(pop);


    var lineLabels = [];
    //作った配列に入れる
    for (var i = 0; i < data.length; i++) {
        lineLabels.push(data[i].date);
    }
    // console.log(lineLabels);

    //html生成
    //base取得
    var base = document.getElementById('chartWrapper');
    base.setAttribute('style', 'position: relative; background-color: #F9f1e4;');
    //chartAreaWrapper作成
    var chartAreaWrapper = document.createElement("div");
    chartAreaWrapper.setAttribute('style', 'overflow-x: scroll; margin:0px 25px;');
    //yAxisWrapper作成
    var yAxisWrapper = document.createElement("div");
    yAxisWrapper.setAttribute('style', 'position: absolute; left: 0; top: 0; background-color: #00000000; margin-left:25px;');
    //baseにchartAreaWrapper,yAxisWrapperを挿入
    base.appendChild(chartAreaWrapper);
    base.appendChild(yAxisWrapper);
    //cvsChart作成,chartAreaWrapperに挿入
    var cvsChart = document.createElement("canvas");
    chartAreaWrapper.appendChild(cvsChart);
    //cvsYAxis作成,yAxisWrapperに挿入
    var cvsYAxis = document.createElement("canvas");
    cvsYAxis.setAttribute('style', 'position: absolute; left: 0; top: 0; pointer-events:none; background: linear-gradient(to right, #F9f1e4, rgba(255,255,255,0));');
    yAxisWrapper.appendChild(cvsYAxis);
    
    //地図に戻るリンク追加
    var maplink = document.querySelector("a#maplink");


    //cvsChartキャンバス
    var ctxChart = cvsChart.getContext("2d");
    // Y軸コピー用 cvsYAxisキャンバス
    var ctxYAxis = cvsYAxis.getContext("2d");

    var unitWidth = 10; // データ当たりの幅を設定
    var width = lineLabels.length * unitWidth; // グラフ全体の幅を計算
    chartWidth = width;
    chartHeight = 400;

    
    cvsChart.style.width = chartWidth+"px"; //　グラフの幅を設定
    cvsChart.style.height = chartHeight + "px"; //htmlと同じ高さを設定

     // スクロールしたピクセル数を設定
     chartAreaWrapper.scrollLeft += chartWidth;
    


    // Y軸イメージのコピー関数
    function copyYAxisImage(chart) {
        var scale = window.devicePixelRatio;
        // console.log(scale)
        // console.log(chart.scales['y-axis-0']);
        // console.log(chart.scales['x-axis-0']);
        
        const yAxisWidth = chart.scales['y-axis-0'].width;
        const yAxisHeight = chart.scales['y-axis-0'].top + chart.scales['y-axis-0'].height
        //  + chart.scales['y-axis-0'].end;

        cvsYAxis.width = yAxisWidth * scale;
        cvsYAxis.height = (yAxisHeight + chart.scales['x-axis-0'].height) * scale;
        cvsYAxis.style.width = yAxisWidth + "px";
        cvsYAxis.style.height = yAxisHeight + chart.scales['x-axis-0'].height + "px";

        const sWidth = yAxisWidth * scale;
        const sHeight = yAxisHeight * scale;
        const dWidth = yAxisWidth;
        const dHeight = yAxisHeight;

        ctxYAxis.drawImage(cvsChart, 8*scale, 6*scale, sWidth, sHeight, 8*scale, 6*scale, sWidth, sHeight); //16px,12pxの1/2で8px,6px
        ctxChart.clearRect(0, 0, dWidth, dHeight);

        // console.log(yAxisHeight);

    }

    loadFonts();

    async function loadFonts() {
        const Heebo = new FontFace('Heebo', 'url(/css/visualdata/Heebo/static/Heebo-Regular.ttf)', { style: 'normal', weight: 700});
        await Heebo.load();
        document.fonts.add(Heebo);
    };

    Chart.defaults.global.defaultFontColor = '#254868';
    Chart.defaults.global.defaultFontFamily = 'Heebo';
    Chart.defaults.global.defaultFontSize = '12';
    Chart.defaults.global.defaultFontStyle = 'bold';
    chart = new Chart(ctxChart, {
        type: 'line',
        data: {
            labels: lineLabels,
            datasets: [{
                // backgroundColor: "rgba(37, 72, 104, 0.3)",
                borderColor: "#254868",
                data: pop,
                lineTension: 0,
                fill: false,
            }]
        },
        options: {
            // chartArea: {
            //     backgroundColor: 'rgba(230, 238, 255, 0.6)'
            // },
            responsive: false, //trueにすると画面の幅に合わせて作図してしまう
            elements: {
                point: {
                    radius: 0//折線の丸を消す
                }
            },
            layout: {
                padding: {
                    top: 50
                }
            },
            plugins: {
                datalabels: {
                    display: false,
                    color: '#D32F2F',
                    align: 'end',
                    anchor: 'end',
                    clamp: true,
                    offset: 0,
                    // clip: true,
                    font: {
                        size: 9.5
                    },
                    // formatter: function (value, context) {
                    //     if (context.chart.data.labels[context.dataIndex] == '20200407') {
                    //         // const comment = '緊急事態宣言発出';
                    //         // let splitComment = comment.split('');
                    //         // console.log(splitComment);
                    //         // for(i = 0; i < splitComment.length; i++){
                    //         //     splitComment.splice(i, 0, `/\r\n|\n|\r/`)
                    //         // }
                    //         // // let indentComment = splitComment.forEach(elements => elements.splice(1, 0, 'Feb'));
                    //         // // elements.replace(elements,/\r\n|\n|\r/+elements)
                    //         // console.log(splitComment);
                    //         // let joinedComment = splitComment.join('');
                    //         // console.log(joinedComment);
                    //         // return joinedComment;
                    //         return '緊\n急\n事\n態\n宣\n言\n発\n出';
                    //     } else if (context.chart.data.labels[context.dataIndex] == '20200525') {
                    //         return '緊\n急\n事\n態\n宣\n言\n全\n面\n解\n除';
                    //     } else if (context.chart.data.labels[context.dataIndex] == '20200722') {
                    //         return 'Go\nTo\n開\n始';
                    //     } else if (context.chart.data.labels[context.dataIndex] == '20201001') {
                    //         return 'Go\nTo\n東\n京\n追\n加';
                    //     } else if (context.chart.data.labels[context.dataIndex] == '20201228') {
                    //         return 'Go\nTo\n一\n時\n停\n止';
                    //     } else if (context.chart.data.labels[context.dataIndex] == '20210107') {
                    //         return '緊\n急\n事\n態\n宣\n言\n発\n出';
                    //     } else {
                    //         return '';
                    //     };
                    // }
                },
            },
            scales: {
                xAxes: [{
                    // stacked: true,
                    gridLines: {
                        display: false,
                        drawTicks: false,
                        // color: 'rgba(37, 72, 104, 0.3)'
                    },
                    ticks: {
                        // autoSkip: true,
                        maxTicksLimit: 10,//ラベル間隔
                        callback: function(value, index, values){
                            var arr = values.map(el => {
                                return el.match(/.{4}/);
                            })
                            var yearArr = arr.map(el => {
                                return el[0];
                            });
                            
                            var year = value.match(/.{4}/);
                            var month = value.match(/(?<=^.{4}).{2}/);
                            var date = value.match(/..$/);

                            var maxTicksLimit = this.chart.scales["x-axis-0"].options.ticks.maxTicksLimit;

                            if(index % maxTicksLimit === 0){
                                if(yearArr[index] !== yearArr[index - maxTicksLimit]){
                                    return year + '/' + month + '/' + date;
                                }
                            }
                            return month + '/' + date;
                            
                            
                        },
                        maxRotation: 0,//軸ラベルを横にする
                        minRotation: 0,
                        // labelOffset: 10,
                        padding: 5,
                    },

                }],
                yAxes: [{
                    // position: left,
                    location: "bottom",
                    gridLines: {
                        // display: false,
                        drawTicks: false,
                        color: 'rgba(37, 72, 104, 0.3)'
                    },
                    ticks: {
                        callback: function (value) {
                            if (typeof (value) === "number") {
                                return value.toLocaleString(); //カンマで区切る
                            } else {
                                return value;
                            }
                        },
                        padding: 5,
                    }
                }]
            },
            tooltips: {
                // enabled: false,
                mode: 'nearest', 
                callbacks: {
                    label: function (tooltipItem, data) {
                        // console.log(data)
                        // console.log(tooltipItem);
                        // console.log(data.labels[tooltipItem.index]);
                        // return tooltipItem.index;
                        return data.datasets[tooltipItem.datasetIndex].label;
                    },
                },
                titleMarginBottom: 0,
                backgroundColor: "#254868",
                titleFontColor: "#ffffff",
            },
            legend: {
                display: false
            }
        },
        plugins: [{
            // beforeDraw: drawBackground,
            // 描画完了後に copyYAxisImage() を呼び出す
            afterRender: copyYAxisImage,
        }]
    });
    // console.log(chart.scales['y-axis-0']);
    document.querySelector('.switchArea input').addEventListener('change',
        function () {
            if (document.querySelector('.switchArea input').checked) {
                chart.options.scales.yAxes[0].ticks.suggestedMax = 60000;
                chart.update();
            } else {
                chart.options.scales.yAxes[0].ticks.suggestedMax = '';
                chart.update();
            }
        }
    )
    return copyYAxisImage;
}

//スマホ判定
const isSP = (window.parent.screen.width < 600) ? true : false;
if (isSP) {
    var chartHeight = 300;
    document.getElementById('areaName').setAttribute('style', 'background-color: #F9F1E4; color: #254868; font-weight: bold; padding-left:5px;')
    chartAreaWrapper.setAttribute('style', 'overflow-x: scroll;margin-left:5px; margin-bottom:5px;');
    yAxisWrapper.setAttribute('style', 'position: absolute; left: 0; top: 0; background-color: #00000000;margin-left:5px;');
    document.querySelector('div#maplinkWrapper').setAttribute('style', 'background-color: #F9F1E4; color: #254868; font-weight: bold; padding-bottom:15px; padding-left:5px;');
    document.querySelector('div#toggleWrraper').setAttribute('style', 'background-color: #F9F1E4; color: #254868; font-weight: bold; padding-bottom:15px; padding-left:5px;display:flex;flex-direction:row;justify-content:center;align-items: center;');
    maplink.setAttribute('style', 'background-color: #F9F1E4; color: #254868; font-size: 14px;font-weight: bold; padding-bottom:15px; padding-top:15px; padding-left:5px;');
    // chart.options.plugins.datalabels.font.size = 9;
}