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
var reqBar = new XMLHttpRequest();
var filePath = 'nikkei_ent_result.csv';
reqBar.open("GET", filePath, true);
reqBar.responseType = 'text';
reqBar.onload = function () {
    // 2) CSVデータ変換の呼び出し
    const data = csv2json(reqBar.responseText);

    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    drawBarChart(data);

}
reqBar.send(null);

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
    for(var i = 0; i < data.length; i++){
        Array.push(data[i]);
    }

    // yt
    var arrayYt = Array.slice();//コピー作成
    arrayYt.sort(function(a,b){
        return b.ytFollower - a.ytFollower;//yt降順
    })
    var arrayYtCount = Array.slice();//コピー作成
    arrayYtCount.sort(function(a,b){
        return b.ytCount - a.ytCount;//yt降順
    })
    var arrayYtRate = Array.slice();//コピー作成
    arrayYtRate.sort(function(a,b){
        return b.ytRate - a.ytRate
    })
    // ig
    var arrayIg = Array.slice();//コピー作成
    arrayIg.sort(function(a,b){
        return b.igFollower - a.igFollower;//yt降順
    })
    var arrayIgCount = Array.slice();//コピー作成
    arrayIgCount.sort(function(a,b){
        return b.igCount - a.igCount;//yt降順
    })
    var arrayIgRate = Array.slice();//コピー作成
    arrayIgRate.sort(function(a,b){
        return b.igRate - a.igRate
    })
    // tw
    var arrayTw = Array.slice();//コピー作成
    arrayTw.sort(function(a,b){
        return b.twFollower - a.twFollower;//yt降順
    })
    var arrayTwCount = Array.slice();//コピー作成
    arrayTwCount.sort(function(a,b){
        return b.twCount - a.twCount;//yt降順
    })
    var arrayTwRate = Array.slice();//コピー作成
    arrayTwRate.sort(function(a,b){
        return b.twRate - a.twRate
    })


    var barLabels = [], barLabels1_1 = [], barLabels1_2 = [], barLabels1_3 = [], barLabels2_1 = [], barLabels2_2 = [], barLabels2_3 = [], barLabels3_1 = [], barLabels3_2 = [], barLabels3_3 = [], barData1_1 = [], barData1_2 = [], barData1_3 = [], barData2_1 = [], barData2_2 = [], barData2_3 = [], barData3_1 = [], barData3_2 = [], barData3_3 = [];


    //作った配列に入れる
    for (var i = 1; i < Array.length; i++){
        barLabels.push(i);
    };
    var barlabels = barLabels.slice();
    //21位と25位が二つある順位作る
    var barlabels2 = barLabels.slice();//コピー作成
    barlabels2[21] = 21;
    barlabels2[25] = 25;
    //20位が二つある順位作る
    var barlabels3 = barLabels.slice();//コピー作成
    barlabels3[20] = 20;
    
    

    // フォロワー数
    for (var i = 1; i < arrayYt.length; i++){
        barLabels1_1.push(arrayYt[i].name);
        barData1_1.push(arrayYt[i].ytFollower);
    };
    for (var i = 1; i < arrayIg.length; i++){
        barLabels2_1.push(arrayIg[i].name);
        barData2_1.push(arrayIg[i].igFollower);
    };
    for (var i = 1; i < arrayTw.length; i++){
        barLabels3_1.push(arrayTw[i].name);
        barData3_1.push(arrayTw[i].twFollower);
    };
    // 反響数、再生回数
    for (var i = 1; i < arrayYtCount.length; i++){
        barLabels1_2.push(arrayYtCount[i].name);
        barData1_2.push(arrayYtCount[i].ytCount);
    };
    for (var i = 1; i < arrayIgCount.length; i++){
        barLabels2_2.push(arrayIgCount[i].name);
        barData2_2.push(arrayIgCount[i].igCount);
    };

    for (var i = 1; i < arrayTwCount.length; i++){
        barLabels3_2.push(arrayTwCount[i].name);
        barData3_2.push(arrayTwCount[i].twCount);
    };
    // 率
    for (var i = 1; i < arrayYtRate.length; i++){
        barLabels1_3.push(arrayYtRate[i].name);
        barData1_3.push(arrayYtRate[i].ytRate);
    };
    for (var i = 1; i < arrayIgRate.length; i++){
        barLabels2_3.push(arrayIgRate[i].name);
        barData2_3.push(arrayIgRate[i].igRate);
    };
    for (var i = 1; i < arrayTwRate.length; i++){
        barLabels3_3.push(arrayTwRate[i].name);
        barData3_3.push(arrayTwRate[i].twRate);
    };

    //SNSプルダウンの中身作成
    const snsPull = document.getElementById("barPull");
    let snsLabel = ['Twitter', 'Instagram', 'YouTube'];
    for(var i = 0; i < snsLabel.length; i++){
        snsOption = document.createElement('option');
        snsOption.setAttribute('value', snsLabel[i]);
        snsOption.innerHTML = snsLabel[i];
        snsPull.appendChild(snsOption);
    } 
    //ランキング種類プルダウンの中身作成
    const pull = document.getElementById("Pull");
    let optionLabel = ['follower', 'count', 'rate'];
    let optionName = ['フォロワー数', '平均リアクション数', '平均エンゲージメント率'];
    for(var i = 0; i < optionLabel.length; i++){
        option = document.createElement('option');
        option.setAttribute('value', optionLabel[i]);
        option.innerHTML = optionName[i];
        pull.appendChild(option);
    } 
    //スマホ判定
    const isSP = (window.parent.screen.width < 600) ? true : false;
    if(isSP){
        document.getElementById("barChart").setAttribute('width','1');
        document.getElementById("barChart").setAttribute('height','3');
    }


    document.getElementById("barPull").addEventListener('change',
        function(){
            sns = document.getElementById("barPull");
            if(sns.value === 'YouTube'){
                var newDatasets = [{
                    label: '登録者数',
                    backgroundColor: "#FFCDD2",
                    data: barData1_1
                }]
                var newBarLabel = function(value, context) {
                    return barLabels1_1[context.dataIndex]; 
                }
                if(isSP){
                    var max = 20000000;
                } else {
                    var max = 12000000;
                }
                barChart.data.labels = barlabels2;
                //ランキング選択肢作成
                const pull = document.getElementById("Pull");
                pull.innerHTML = '';//子要素をリセット
                let optionLabel = ['follower', 'count', 'rate'];
                let optionName = ['登録者数', '平均再生回数', '再生率'];
                for(var i = 0; i < optionLabel.length; i++){
                    option = document.createElement('option');
                    option.setAttribute('value', optionLabel[i]);
                    option.innerHTML = optionName[i];
                    pull.appendChild(option);
                }
                //ランキングを選択
                document.getElementById("Pull").addEventListener('change',
                    function(){
                        category = document.getElementById("Pull");
                        if(category.value === 'follower'){
                            var newDatasets = [{
                                label: '登録者数',
                                backgroundColor: "#FFCDD2",
                                data: barData1_1
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels1_1[context.dataIndex];
                            }
                            if(isSP){
                                var max = 20000000;
                            } else {
                                var max = 12000000;
                            }
                            barChart.data.labels = barlabels2;
                        }else if(category.value === 'count'){
                            var newDatasets = [{
                                label: '平均再生回数',
                                backgroundColor: "#FFCDD2",
                                data: barData1_2
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels1_2[context.dataIndex];
                            }
                            var max = 30000000;
                            barChart.data.labels = barlabels;
                        }else if(category.value === 'rate'){
                            var newDatasets = [{
                                label: '再生率',
                                backgroundColor: "#FFCDD2",
                                data: barData1_3
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels1_3[context.dataIndex];
                            }
                            if(isSP){
                                var max = 600;
                            } else {
                                var max = 500;
                            }
                            barChart.data.labels = barlabels;
                        }
                        barChart.data.datasets = newDatasets;
                        barChart.options.plugins.datalabels.formatter = newBarLabel;
                        barChart.options.scales.xAxes[0].ticks.suggestedMax = max;
                        barChart.update();
                    }
                )
            }else if(sns.value === 'Instagram'){
                var newDatasets = [{
                    label: 'フォロワー数',
                    backgroundColor: "#E1BEE7",
                    data: barData2_1
                }]
                var newBarLabel = function(value, context) {
                    return barLabels2_1[context.dataIndex];
                }
                var max = 12000000;
                barChart.data.labels = barlabels;
                //ランキング選択肢作成
                const pull = document.getElementById("Pull");
                pull.innerHTML = '';//子要素をリセット
                let optionLabel = ['follower', 'count', 'rate'];
                let optionName = ['フォロワー数', '平均リアクション数', '平均エンゲージメント率'];
                for(var i = 0; i < optionLabel.length; i++){
                    option = document.createElement('option');
                    option.setAttribute('value', optionLabel[i]);
                    option.innerHTML = optionName[i];
                    pull.appendChild(option);
                } 
                //ランキングを選択
                document.getElementById("Pull").addEventListener('change',
                    function(){
                        category = document.getElementById("Pull");
                        if(category.value === 'follower'){
                            var newDatasets = [{
                                label: 'フォロワー数',
                                backgroundColor: "#E1BEE7",
                                data: barData2_1
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels2_1[context.dataIndex];
                            }
                            var max = 12000000;
                            barChart.data.labels = barlabels;
                        }else if(category.value === 'count'){
                            var newDatasets = [{
                                label: '平均リアクション数',
                                backgroundColor: "#E1BEE7",
                                data: barData2_2
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels2_2[context.dataIndex];
                            }
                            if(isSP){
                                var max = 1500000;
                            } 
                            barChart.data.labels = barlabels;
                        }else if(category.value === 'rate'){
                            var newDatasets = [{
                                label: '平均エンゲージメント率',
                                backgroundColor: "#E1BEE7",
                                data: barData2_3
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels2_3[context.dataIndex];
                            }
                            if(isSP){
                                var max = 30;
                            } 
                            barChart.data.labels = barlabels;
                        }
                        barChart.data.datasets = newDatasets;
                        barChart.options.plugins.datalabels.formatter = newBarLabel;
                        barChart.options.scales.xAxes[0].ticks.suggestedMax = max;
                        barChart.update();
                    }
                )
            }else if(sns.value === 'Twitter'){
                var newDatasets = [{
                    label: 'フォロワー数',
                    backgroundColor: "#90CAF9",
                    data: barData3_1
                }]
                var newBarLabel = function(value, context) {
                    return barLabels3_1[context.dataIndex];
                }
                if(isSP){
                    var max = 16000000;
                } 
                barChart.data.labels = barlabels;
                //ランキング選択肢作成
                const pull = document.getElementById("Pull");
                pull.innerHTML = '';//子要素をリセット
                let optionLabel = ['follower', 'count', 'rate'];
                let optionName = ['フォロワー数', '平均リアクション数', '平均エンゲージメント率'];
                for(var i = 0; i < optionLabel.length; i++){
                    option = document.createElement('option');
                    option.setAttribute('value', optionLabel[i]);
                    option.innerHTML = optionName[i];
                    pull.appendChild(option);
                }
                //ランキングを選択
                document.getElementById("Pull").addEventListener('change',
                    function(){
                        category = document.getElementById("Pull");
                        if(category.value === 'follower'){
                            var newDatasets = [{
                                label: 'フォロワー数',
                                backgroundColor: "#90CAF9",
                                data: barData3_1
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels3_1[context.dataIndex];
                            }
                            if(isSP){
                                var max = 16000000;
                            }
                            barChart.data.labels = barlabels;
                        }else if(category.value === 'count'){
                            var newDatasets = [{
                                label: '平均リアクション数',
                                backgroundColor: "#90CAF9",
                                data: barData3_2
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels3_2[context.dataIndex];
                            }
                            if(isSP){
                                var max = 350000;
                            } else{
                                var max = 250000;
                            }
                            barChart.data.labels = barlabels;
                        }else if(category.value === 'rate'){
                            var newDatasets = [{
                                label: '平均平均エンゲージメント率',
                                backgroundColor: "#90CAF9",
                                data: barData3_3
                            }]
                            var newBarLabel = function(value, context) {
                                return barLabels3_3[context.dataIndex];
                            }
                            barChart.data.labels = barlabels3;
                        }
                        barChart.data.datasets = newDatasets;
                        barChart.options.plugins.datalabels.formatter = newBarLabel;
                        barChart.options.scales.xAxes[0].ticks.suggestedMax = max;
                        barChart.update();
                    }
                )
            }
            barChart.data.datasets = newDatasets;
            barChart.options.plugins.datalabels.formatter = newBarLabel;
            barChart.options.scales.xAxes[0].ticks.suggestedMax = max;
            barChart.update();
        }
    )
    document.getElementById("Pull").addEventListener('change',
        function(){
            category = document.getElementById("Pull");
            if(category.value === 'follower'){
                var newDatasets = [{
                    label: 'フォロワー数',
                    backgroundColor: "#90CAF9",
                    data: barData3_1
                }]
                var newBarLabel = function(value, context) {
                    return barLabels3_1[context.dataIndex];
                }
                if(isSP){
                    var max = 16000000;
                } 
                barChart.data.labels = barlabels;
            }else if(category.value === 'count'){
                var newDatasets = [{
                    label: '平均リアクション数',
                    backgroundColor: "#90CAF9",
                    data: barData3_2
                }]
                var newBarLabel = function(value, context) {
                    return barLabels3_2[context.dataIndex];
                }
                if(isSP){
                    var max = 350000;
                } else{
                    var max = 250000;
                }
                barChart.data.labels = barlabels;
            }else if(category.value === 'rate'){
                var newDatasets = [{
                    label: '平均エンゲージメント率',
                    backgroundColor: "#90CAF9",
                    data: barData3_3
                }]
                var newBarLabel = function(value, context) {
                    return barLabels3_3[context.dataIndex];
                }
                barChart.data.labels = barlabels3;
            }
            barChart.data.datasets = newDatasets;
            barChart.options.plugins.datalabels.formatter = newBarLabel;
            barChart.options.scales.xAxes[0].ticks.suggestedMax = max;
            barChart.update();
        }
    )

    
    var firstDatasets =  [{
        data: barData3_1,
        label: 'フォロワー数',
        backgroundColor: "#90CAF9",
        
    }]
    var minRank = 1;
    var maxRank = 35;
    if(isSP){
        var max = 16000000;
    }

    var ctx = document.getElementById("barChart").getContext("2d");

    
    var barChart = new Chart(ctx, {
        type: 'horizontalBar',
        data:{
            labels: barLabels,
            datasets: firstDatasets
        },
        options: {
            plugins: {
                datalabels: {
                    font: function(){
                        if(isSP){
                            return '7px';
                        }
                    },
                    formatter: function(value, context) {
                        return barLabels3_1[context.dataIndex];
                    },
                    anchor: 'end',
                    align: function(){
                        if(isSP){
                            return 'right';
                        } else {
                            return 'right';
                        }
                    },
                    clip: true, //はみ出るデータラベルは非表示
                },
            },
            scales: {
                xAxes: [{
                    ticks: {
                        suggestedMax: max,
                        beginAtZero: false,
                        callback: function(value){
                            category = document.getElementById("Pull");
                            if(category.value === 'follower'){
                                return value / 10000 +'万人';  //labelに「〜位」をつける
                            }else if(category.value === 'count'){
                                return value / 10000 +'万回';
                            }else if(category.value === 'rate'){
                                return value +'％';
                            }
                        }
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: minRank,
                        max: maxRank,
                        callback: function(value){
                            return value+'位';  //labelに「〜位」をつける
                        }
                    }
                }]
            },
            tooltips:{
                callbacks: {
                    title: function() {},
                }
            }
        }
    });
}