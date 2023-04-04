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


// クラスター一覧
const clusterObj = {
    next: { label: 'NEXTブレイク', backgroundColor: 'rgb(103, 169, 86)' },
    now: { label: '今旬', backgroundColor: 'rgb(118, 183, 178)' },
    big: { label: '大御所＆安定', backgroundColor: 'rgb(176, 122, 161)' },
    hot: { label: '注目', backgroundColor: 'rgb(237, 201, 72)' },
    na: { label: '該当なし', backgroundColor: 'rgb(162, 162, 162)' },
    empty: { label: '', backgroundColor: '' }
};


// 1) ajaxでCSVファイルをロード
var req = new XMLHttpRequest();
var filePath = '2102TP.csv';
req.open("GET", filePath, true);
req.responseType = 'text';
req.onload = function () {
    // 2) CSVデータ変換の呼び出し
    const csvArr = csv2array(req.responseText);

    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    const chart = drawChart(csvArr);

}
req.send(null);

// 2) CSVから２次元配列に変換
function csv2array(csvData) {
    var jsonArray = [];
    var rows = csvData.split(/\r?\n/); // 改行で区切る
    var columnName = rows[0].split(","); // 1行目から「項目名」の配列を生成する

    for (var i = 1; i < rows.length; i++) { // ヘッダー行を除き行数の分繰り返す
        var row = new Object();
        if (rows[i]) { // 空行対策
            var cells = rows[i].split(",");
            for (var j = 0; j < columnName.length; j++) { //列数の分繰り返す
                row[columnName[j]] = cells[j];
            }
            jsonArray.push(row);
        }
    }
    return jsonArray;
}

function drawChart(csvArr) {
    console.log(csvArr);

    var clusterNext = csvArr.filter(function (elm) {
        return elm.cluster == clusterObj.next.label;
    });
    var clusterNow = csvArr.filter(function (elm) {
        return elm.cluster == clusterObj.now.label;
    });
    var clusterBig = csvArr.filter(function (elm) {
        return elm.cluster == clusterObj.big.label;
    });
    var clusterHot = csvArr.filter(function (elm) {
        return elm.cluster == clusterObj.hot.label;
    });
    var clusterNa = csvArr.filter(function (elm) {
        return elm.cluster == clusterObj.na.label;
    });
    var clusterEmpty = csvArr.filter(function (elm) {
        return elm.cluster == clusterObj.empty.label;
    });


    // データ
    var data = {
        datasets: [
            {
                label: clusterObj.next.label,
                data: clusterNext,
                // マーカー 背景色
                backgroundColor: clusterObj.next.backgroundColor,
                // マーカー 枠線の色
                borderColor: clusterObj.next.backgroundColor,
                // マーカー 大きさ
                pointRadius: 5
            },
            {
                label: clusterObj.now.label,
                data: clusterNow,
                backgroundColor: clusterObj.now.backgroundColor,
                pointRadius: 5,
            },
            {
                label: clusterObj.big.label,
                data: clusterBig,
                backgroundColor: clusterObj.big.backgroundColor,
                pointRadius: 5,
            },
            {
                label: clusterObj.hot.label,
                data: clusterHot,
                backgroundColor: clusterObj.hot.backgroundColor,
                pointRadius: 5,
            },
            {
                label: clusterObj.na.label,
                data: clusterNa,
                backgroundColor: clusterObj.na.backgroundColor,
                pointRadius: 5,
            },
            {
                label: '[未指定]',
                data: clusterEmpty,
                backgroundColor: clusterObj.na.backgroundColor,
                pointRadius: 5,
            }
        ],
    };

    // グラフオプション
    var options = {
        responsive: false,
        // tooltips: {
        //     callbacks: {
        //         label: function (tooltipItem, data) {
        //             console.log(data);
        //             console.log(tooltipItem);
        //             var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].label;
        //             return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
        //         }
        //     }
        // },
        // scales: {
        //     y: {
        //         min: 0,
        //         max: 100,
        //     }
        // },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                display: 'auto',
                formatter: function (value, context) {
                    return value.label;
                }
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    // drag: {
                    //     enabled: true
                    // },
                    mode: 'xy'
                }
            }
        }
    };

    // プラグイン
    var plugins = [
        ChartDataLabels
    ];

    var ctx = document.getElementById('bpChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: options,
        plugins: plugins
    });

    return chart;

}
