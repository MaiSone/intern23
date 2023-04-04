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
var reqRadar = new XMLHttpRequest();
var filePath = 'score_nikkei_ent_result2021ver2.csv';
reqRadar.open("GET", filePath, true);
reqRadar.responseType = 'text';
reqRadar.onload = function () {
    // 2) CSVデータ変換の呼び出し
    const data = csv2json(reqRadar.responseText);

    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    drawRadarChart(data);
    
}
reqRadar.send(null);

// 2) CSVから２次元配列に変換
function csv2json(csvArray) {
    var jsonArray = [];
    var rows = csvArray.split(/\r?\n/); //改行で区切る
    var columnName = rows[0].split(","); // 1行目から「項目名」の配列を生成する

    for (var i = 0; i < rows.length; i++) { //行数の分繰り返す
        var row = new Object();
        var cells = rows[i].split(",");
        for (var j = 0; j < columnName.length; j++) { //列数の分繰り返す
            row[columnName[j]] = cells[j];
        }
        jsonArray.push(row);
    }
    return jsonArray;
}

const colorCode = {
    'light' : ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
    'dark': ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666']
};

function drawRadarChart(data) {

    // 配列にデータ入れ直す
    var tmpLabels = [],tmpLabel = [],tmpData1 = [],tmpData2 = [],tmpData3 = [],tmpData4 = [],tmpData5 = [],tmpData6 = [];
    for (var i = 1; i < data.length; i++){
        tmpLabels.push(data[i].name);
    };

    // プルダウンの中身作成
    // const pull = document.getElementById("radarPull");
    // let optionLabel = tmpLabels;
    // for(var i = 0; i < optionLabel.length; i++){
    //     let option = document.createElement('option');
    //     option.setAttribute('value', optionLabel[i]);
    //     option.innerHTML = optionLabel[i];
    //     pull.appendChild(option);
    // }

    //スマホ判定
    const isSP = (window.parent.screen.width < 600) ? true : false;

    //選択の中身作成
    const options = document.getElementById("radarOptions");
    options.setAttribute('style','display: flex;');
    let ul = document.createElement('ul');
    ul.setAttribute('style','list-style: none; display: flex; flex-wrap: wrap;');
    options.appendChild(ul);
    let optionLabel = tmpLabels;
    for(var i = 0; i < optionLabel.length; i++){
        let li = document.createElement('li');
        let label = document.createElement('label');
        label.setAttribute('class', 'tag');
        let input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute("class","custom-checkbox");
        input.setAttribute('id',optionLabel[i]);
        input.setAttribute('value', optionLabel[i]);
        let span = document.createElement('span');
        span.innerHTML = optionLabel[i];
        ul.insertBefore(li, null);
        li.appendChild(label);
        label.appendChild(input);
        label.insertBefore(span, null);
        //スマホ判定
        if(isSP){
            input.setAttribute("class","checkbox_input");
            span.setAttribute("class","checkbox_label");
            span.setAttribute("style","font-size: 16px");
            options.setAttribute("style","overflow: scroll; height: 150px; border: 1px solid #ccc");
            li.setAttribute("style","list-style: none;");
        }
        //最初の人にチェックしておく
        firstInput = document.querySelector('div#radarOptions input[type="checkbox"]');
        firstInput.checked = true;
    }

    //カラーコード
    // let borderColor = getColorCode('light', n);
    function getColorCode(theme, n) {
        n -= 1 // テンプレート用jsでは0
        let colorCodeLength = colorCode[theme].length;
        let i = n.toString(colorCodeLength);
        return colorCode[theme][i.substring(i.length -1, i.length - 0)];
    };

    

    // プルダウン/tagの挙動
   const checkbox = document.querySelectorAll('div#radarOptions input[type="checkbox"]')
   const checkboxArr = Array.prototype.slice.call(checkbox);
    checkboxArr.forEach(function(el){
        el.addEventListener('click',
            function() {
                elems = document.querySelectorAll('div#radarOptions input[type="checkbox"]');
                if(el.checked === true){
                    inputCount = 0;
                    for(var i = 0; i < elems.length; i++){
                        if(elems[i].checked){
                            inputCount++;
                        }
                    }
                    //console.log(inputCount);
                    // データのupdate
                    data.filter(function(item, index){
                        if (item.name == el.value) {
                            tmpLabel = item.name;
                            tmpData1 = item.ytFollower_h;
                            tmpData2 = item.ytAvg_h;
                            tmpData3 = item.igFollower_h;
                            tmpData4 = item.igImp_h;
                            tmpData5 = item.twFollower_h;
                            tmpData6 = item.twImp_h;
                        }
                    });
                    var newDataset = {
                        label: tmpLabel,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: getColorCode('dark', inputCount),
                        pointRadius:0,
                        data: [tmpData1, tmpData2, tmpData3, tmpData4, tmpData5, tmpData6],
                    };
                    radarChart.data.datasets.push(newDataset);
                    radarChart.update();
                }else if(el.checked === false){
                    radarChart.data.datasets.splice(0);
                    inputCount = 0;
                    for(var i = 0; i < elems.length; i++){
                        if(elems[i].checked){
                            inputCount++;
                        }
                    }
                    //console.log(inputCount);
                    if(inputCount > 0){
                        checkedCount = 0;
                        for(var i = 0; i < elems.length; i++){
                            if(elems[i].checked){
                                checkedCount++;
                                // console.log(i);
                                // データのupdate
                                data.filter(function(item, index){
                                    if (item.name == elems[i].value) {
                                        tmpLabel = item.name;
                                        tmpData1 = item.ytFollower_h;
                                        tmpData2 = item.ytAvg_h;
                                        tmpData3 = item.igFollower_h;
                                        tmpData4 = item.igImp_h;
                                        tmpData5 = item.twFollower_h;
                                        tmpData6 = item.twImp_h;
                                    }
                                });
                                var newDataset = {
                                    label: tmpLabel,
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    borderColor: getColorCode('dark', checkedCount),
                                    pointRadius:0,
                                    data: [tmpData1, tmpData2, tmpData3, tmpData4, tmpData5, tmpData6],
                                };
                                radarChart.data.datasets.push(newDataset);
                                radarChart.update();
                            }
                        }
                    }else if(inputCount === 0){
                        alert('一つ以上選択して下さい');
                        //console.log(inputCount);
                        el.checked = true;
                        data.filter(function(item, index){
                            if (item.name == el.value) {
                                tmpLabel = item.name;
                                tmpData1 = item.ytFollower_h;
                                tmpData2 = item.ytAvg_h;
                                tmpData3 = item.igFollower_h;
                                tmpData4 = item.igImp_h;
                                tmpData5 = item.twFollower_h;
                                tmpData6 = item.twImp_h;
                            }
                        });
                        var newDataset = {
                            label: tmpLabel,
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: getColorCode('dark', inputCount+1),
                            pointRadius:0,
                            data: [tmpData1, tmpData2, tmpData3, tmpData4, tmpData5, tmpData6],
                        };
                        radarChart.data.datasets.push(newDataset);
                        radarChart.update();
                    }
                    
                } 
            }
        )
    })

    elem = document.querySelector('div#radarOptions input[type="checkbox"]');//最初の人
    data.filter(function(item, index){
        if (item.name == elem.value) {
            tmpLabel = item.name;
            tmpData1 = item.ytFollower_h;
            tmpData2 = item.ytAvg_h;
            tmpData3 = item.igFollower_h;
            tmpData4 = item.igImp_h;
            tmpData5 = item.twFollower_h;
            tmpData6 = item.twImp_h;
        }
    })
    var newDataset = {
        label: tmpLabel,
        // backgroundColor: (borderColor, 0.75),
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: getColorCode('dark', 1),
        pointRadius:0,
        data: [tmpData1, tmpData2, tmpData3, tmpData4, tmpData5, tmpData6],
    };

    var ctx = document.getElementById("radarChart").getContext("2d");

    var radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['YouTubeチャンネル登録者数', 'YouTube平均再生回数','Instagramフォロワー数','Instagram平均リアクション数','Twitterフォロワー数','Twitter平均リアクション数'],
            datasets: [newDataset],
        },
        options: {
            plugins: {
                datalabels: {
                    display: false
                }
            },
            tooltips:{
                enabled:false
            },
            scale: {
			 	ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
          }
    });

}
