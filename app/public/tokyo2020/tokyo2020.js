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

// 1) ajaxでCSVファイルをロード
var req = new XMLHttpRequest();
var filePath = '0721_0808cmmetadata_tokyo2020.csv';
req.open("GET", filePath, true);
req.responseType = 'text';
req.onload = function () {
    // 2) CSVデータ変換の呼び出し
    const csvArr = csv2array(req.responseText);

    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    const chart2 = drawChart2(csvArr);
    drawChart1(csvArr,chart2);
    

    // click(chart1, chart2, csvArr);
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


//日テレ（黒）、テレ朝（ピンク）、TBS（青）、テレ東（紺、赤、黄色）、フジ（赤）
// const color = ['black','#ff6384','blue','navy','red'];
// #36a2eb
var color = ['rgb(78, 121, 167)','rgb(89, 161, 79)','rgb(118, 183, 178)','rgb(242, 142, 43)','rgb(225, 87, 89)'];
// var color = ['#e62e2e','#00b3a4','#937e28','#ff670c','#00629d'];
// var color = ['#e62e2e', '#e6e62e','#2ee68a','#2e8ae6','#e62ee6'];
// #ffce56

Chart.defaults.global.defaultFontColor = '#000';

function drawChart1(array,chart2) {
    // console.log(array);

    var labels = [];
    for(var i = 0; i < array.length; i++){
        labels.push(array[i]['五輪スポンサー名']);
    }
    // console.log(labels);

    //重複無くす
    var count2 = labels.filter(function(ele, pos){
        return labels.indexOf(ele) === pos;
    })
    // console.log(count2);
    // console.log(count2.length);


    var counts = [];
    
    for(var i = 0; i < count2.length; i++){

        var filtered = array.filter(function (elm) {
            return elm['五輪スポンサー名'] == count2[i]; 
        });

        count = {};
        // count['五輪スポンサー名'] = count2[i];
        for (var n = 0; n < filtered.length; n++) {
            var elm = filtered[n]['局'];
            count[elm] = count[elm] ? count[elm] + 1 : 1;   
        }
        
        counts.push(count);
    }
    
    var label = [];
    for(i = 0; i < counts.length; i++){
        label.push(Object.keys(counts[i]));
    }
    // console.log(label)
    var tbs = [];
    for(i = 0; i < counts.length; i++){
        tbs.push(counts[i]['TBS'] ? counts[i]['TBS'] : 0);
    }
    // console.log(tbs)  
    var ntv = [];
    for(i = 0; i < counts.length; i++){
        ntv.push(counts[i]['NTV'] ? counts[i]['NTV'] : 0);
    }
    // console.log(ntv) 
    var tx = [];
    for(i = 0; i < counts.length; i++){
        tx.push(counts[i]['TX'] ? counts[i]['TX'] : 0);
    }
    // console.log(tx) 
    var cx = [];
    for(i = 0; i < counts.length; i++){
        cx.push(counts[i]['CX'] ? counts[i]['CX'] : 0);
    }
    // console.log(cx) 
    var ex = [];
    for(i = 0; i < counts.length; i++){
        ex.push(counts[i]['EX'] ? counts[i]['EX'] : 0);
    }
    // console.log(ex)

    var totals = [];
    for(var i = 0; i < count2.length; i++){
        var total = tbs[i] + ntv[i] + tx[i] + cx[i] + ex[i];
        // totals.push(total);
        var totalsobj = {};
        totalsobj['no'] = i;
        totalsobj['total'] = total;
        totals.push(totalsobj);
    }
    
    // console.log(totals);
    // console.log(totalsobj);

    var result = totals.sort(function(a, b){return b.total - a.total});//降順
    // console.log(result);


    var count3 = [];
    var tbs2 = [];
    var ntv2 = [];
    var tx2 = [];
    var cx2 = [];
    var ex2 = [];
    for(var i = 0; i < count2.length; i++){
        count3.push(count2[result[i]['no']]);
        tbs2.push(tbs[result[i]['no']]);
        ntv2.push(ntv[result[i]['no']]);
        tx2.push(tx[result[i]['no']]);
        cx2.push(cx[result[i]['no']]);
        ex2.push(ex[result[i]['no']]);
    }
    // console.log(count3);

    //データセット
    var datasets = [
        {label: 'NTV', backgroundColor: color[0], data:ntv2},
        {label: 'EX', backgroundColor: color[1], data:ex2},
        {label: 'TBS', backgroundColor: color[2], data: tbs2},
        {label: 'TX', backgroundColor: color[3], data:tx2},
        {label: 'CX', backgroundColor: color[4], data:cx2},   
    ];
    
    
    // データ
    var data = {
        labels: count3,
        datasets: datasets
    };

    // グラフオプション
    var options = {
        responsive: true,
        // maintainAspectRatio: false,
        aspectRatio: 0.65,
        plugins: {
            datalabels: {
                color: '#ffffff',
                display: function(context){
                    if(context.dataset.data[context.dataIndex] == 0){
                        return false;
                    }else{
                        return 'auto';
                    }
                }
            }
        },
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    autoSkip: false,
                }
            }]
        },
        tooltips: {
            callbacks: {
                footer: function(tooltipItem, chart) {
                    return 'クリック/タップで日別データが表示されます';
                }
            }
        },
        title: {
            display: true,
            text: '五輪関連番組で放映された公式スポンサー企業のテレビCM放映回数ランキング'
        },
        onClick: function(event, element) {
            // console.log(`Found ${elements.length} elements`);
            var firstPoint = chart.getElementAtEvent(event)[0];
            if (firstPoint) {
                let label = chart.data.labels[firstPoint._index];
                // console.log(label);
                update(chart2, label, array);
            }
        },
        legend: {
            display: true,
            labels: {
                boxWidth: 12
            },
            onClick: function(){
                return false;
            }
        }
    };

    // プラグイン
    // var plugins = [
    //     ChartDataLabels
    // ];

    
    var ctx = document.getElementById('no1').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: data,
        options: options,
        // plugins: plugins
    });

    return chart;

}

function drawChart2(array){

    // console.log(array);

    var value = 'コカ・コーラ';

    var filtered = array.filter(function (elm) {
        return elm['五輪スポンサー名'] == value; 
    });
    // console.log(filtered);

    var labels = [];
    for(var i = 0; i < filtered.length; i++){
        labels.push(filtered[i]['会社名']);
    }
    // console.log(labels);

    //ラベルの重複無くす
    var count2 = labels.filter(function(ele, pos){
        return labels.indexOf(ele) === pos;
    })
    //  console.log(count2);

    //日付取り出す
    var date1 = [];
    for(var i = 0; i < array.length; i++){
        date1.push(array[i]['CM放送開始日24h']);
    }
    // console.log(date1);
    //日付の重複無くす
    var date2 = date1.filter(function(ele, pos){
        return date1.indexOf(ele) === pos;
    })
    // console.log(date2)
    // 日付から2021トル
    var date3 = [];
    for(var i = 0; i < date2.length; i++){
        var withoutY = date2[i].substr(5);
        date3.push(withoutY);
    }
    // console.log(date3);

    var filtered3 = [];
    for(var i = 0; i < count2.length; i++){
        var filtered2 = filtered.filter(function (elm) {
            return elm['会社名'] == count2[i]; 
        });
        filtered3.push(filtered2);
    }
    // console.log(filtered3);

    

    var datasets = Array(filtered3.length);
    
    for (var n = 0; n < filtered3.length; n++) {
        var count = {};
        var obj = {};
        var elms = [];

        for (var i = 0; i < filtered3[n].length; i++) {

            var elm = filtered3[n][i]['CM放送開始日24h'];
            elms.push(elm);
            var elms = elms.filter(function(ele, pos){
                return elms.indexOf(ele) === pos;
            })
        }

        for (var b = 0; b < date2.length; b++) {
            count[date2[b]] = 0;
        }

        for (var i = 0; i < filtered3[n].length; i++) {
            var elm = filtered3[n][i]['CM放送開始日24h'];
            count[elm] = count[elm] ? count[elm] + 1 : 1;
        }
        
        // console.log(date2);
        // console.log(elms);
        // console.log(count);
        obj['label'] = count2[n];
        obj['data'] = Object.keys(count).map(function(key) { return count[key]; })
        obj['backgroundColor'] = color[n];
        // console.log(obj);
        datasets[n] = obj;
    }
    // console.log(datasets);
    

    // データ
    var data = {
        labels: date3,
        datasets: datasets

    };

    // グラフオプション
    var options = {
        responsive: true,
        // maintainAspectRatio: true,
        aspectRatio: 3,
        plugins: {
            datalabels: {
                color: '#ffffff',
                display: function(context){
                    if(context.dataset.data[context.dataIndex] == 0){
                        return false;
                    }else{
                        return 'auto';
                    }
                }
            }
        },
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    autoSkip: true,
                    maxRotation: 0,//軸ラベルを横にする
                    minRotation: 0
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true, //0から始まる
                    stepSize: 10,
                },
            }]
        },
        title: {
            display: true,
            text: '五輪関連番組で放映されたCM放映回数（日別）',
        },
        legend: {
            display: true,
            labels: {
                boxWidth: 12,
                // padding: 0
            },
            onClick: function(){
                return false;
            }
        }
    };

    // プラグイン
    // var plugins = [
    //     ChartDataLabels
    // ];

    
    var ctx = document.getElementById('no2').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options,
        // plugins: plugins
    });

    return chart;

}

// function click(chart1, chart2, array){
//     var canvas = document.getElementById('no1');
//     canvas.addEventListener('click', function clickHandler(evt) {
//         var firstPoint = chart1.getElementAtEvent(evt)[0];

//         if (firstPoint) {
//             var label = chart1.data.labels[firstPoint._index];
//             update(chart2, label, array);
//             // console.log(label);
//             // chart1.data.labels[firstPoint._index] = 'aaa'
//             // chart1.update();
//         }
//     },false);
// }

function update(chart, value, array){

    // var color = ['#ff6384','#36a2eb','rgba(153, 102, 255, 1)','rgba(255, 206, 86, 1)','rgba(255, 159, 64, 1)'];

    var filtered = array.filter(function (elm) {
        return elm['五輪スポンサー名'] == value; 
    });
    // console.log(filtered);

    var labels = [];
    for(var i = 0; i < filtered.length; i++){
        labels.push(filtered[i]['会社名']);
    }
    // console.log(labels);

    //ラベルの重複無くす
    var count2 = labels.filter(function(ele, pos){
        return labels.indexOf(ele) === pos;
    })
    //  console.log(count2);

    //日付と日付の重複無くす
    var date1 = [];
    for(var i = 0; i < array.length; i++){
        date1.push(array[i]['CM放送開始日24h']);
    }
    // console.log(date1);
    //ラベルの重複無くす
    var date2 = date1.filter(function(ele, pos){
        return date1.indexOf(ele) === pos;
    })
    // console.log(date2)

    var filtered3 = [];
    for(var i = 0; i < count2.length; i++){
        var filtered2 = filtered.filter(function (elm) {
            return elm['会社名'] == count2[i]; 
        });
        filtered3.push(filtered2);
    }
    // console.log(filtered3);

    

    var datasets = Array(filtered3.length);
    
    for (var n = 0; n < filtered3.length; n++) {
        var count = {};
        var obj = {};
        var elms = [];

        for (var i = 0; i < filtered3[n].length; i++) {

            var elm = filtered3[n][i]['CM放送開始日24h'];
            elms.push(elm);
            var elms = elms.filter(function(ele, pos){
                return elms.indexOf(ele) === pos;
            })
        }

        for (var b = 0; b < date2.length; b++) {
            count[date2[b]] = 0;
        }

        for (var i = 0; i < filtered3[n].length; i++) {
            var elm = filtered3[n][i]['CM放送開始日24h'];
            count[elm] = count[elm] ? count[elm] + 1 : 1;
        }

        // console.log(date2);
        // console.log(elms);
        // console.log(count);
        obj['label'] = count2[n];
        obj['data'] = Object.keys(count).map(function(key) { return count[key]; });
        obj['backgroundColor'] = color[n];
        // console.log(obj);
        datasets[n] = obj;
    }
    // console.log(datasets);

    chart.data.datasets = datasets;
    chart.update();


}