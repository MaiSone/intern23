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

//font
loadFonts();

// Env
const colorTheme = {
    'default': ['rgba(82,166,159)', 'rgb(89,109,184)', 'rgb(237,180,68)', 'rgb(212,98,139)', 'rgb(153,173,74)', 'rgb(126,82,46)', 'rgb(87,169,215)', 'rgb(161,92,185)', 'rgb(224,121,46)', 'rgb(165,118,103)'],
    'notSelected': ['rgba(82,166,159,0.25)', 'rgb(89,109,184,0.25)', 'rgb(237,180,68,0.25)', 'rgb(212,98,139,0.25)', 'rgb(153,173,74,0.25)', 'rgb(126,82,46,0.25)', 'rgb(87,169,215,0.25)', 'rgb(161,92,185,0.25)', 'rgb(224,121,46,0.25)', 'rgb(165,118,103,0.25)'],
};

const chartType = {
    line: { type: 'line', fill: false, stack: false },
    area: { type: 'line', fill: true, stack: false },
    // stackedArea: { type: 'line', fill: true, stack: true },
    bar: { type: 'bar', fill: false, stack: false },
    horizontalBar: { type: 'horizontalBar', fill: false, stack: false },
    stackedBar: { type: 'bar', fill: false, stack: true },
    stackedHorizontalBar: { type: 'horizontalBar', fill: false, stack: true }
}

const defaultBackgroundColor = 'rgba(250, 250, 249)';
async function loadFonts() {
    const Heebo = new FontFace('Heebo', 'url(/css/visualdata/Heebo/static/Heebo-Regular.ttf)', { style: 'normal', weight: 700});
    await Heebo.load();
    document.fonts.add(Heebo);
};

const defaultOptins = {
    
};


// Model
function getHaderRow(chartData) {
    // dataヘッダー行を取得
    let dataHeaderRow = [];
    Object.keys(chartData.data[0]).forEach(function (key) {
        // data[0-9]のみ凡例に表示する
        if (key.match(/^data[0-9]$/)) {
            dataHeaderRow.push(key);
        };
    });

    return dataHeaderRow;
};

function makeDataByLabel(chartData) {
    let dataByLabel = [];
    Object.keys(chartData.data[0]).forEach(function (key) {
        if (key.match(/^data[0-9]$/)) {

            // ヘッダー行を除く
            let data = []
            for (let i = 1; i < Object.keys(chartData.data).length; i++) {
                data.push(chartData.data[i][key]);
            };

            dataByLabel[key] = data;
        };
    });
    // console.log(dataByLabel);
    return dataByLabel;
}


function getGlobalSetting(chartData) {
    return chartData.globalsetting[0];
};


// LegendView
let legend = document.getElementById('bpChartLegend');

// グラフタイトル から Y軸タイトルまでの背景色指定
legend.parentNode.style.backgroundColor = defaultBackgroundColor;

function drawLegend(chartData, selectedData, selectedDataIndex = null) {

    // dataヘッダー行を取得
    let dataHeaderRow = getHaderRow(chartData);
    let globalsetting = getGlobalSetting(chartData);
    let innerHtml = '';
    // グラフタイトル
    if (globalsetting.titleText !== null) {
        innerHtml += '<div><div><span class="chart_title__27gYT">';
        innerHtml += globalsetting.titleText;
        innerHtml += '</span></div></div>';
    }
    // 凡例タイトル
    if (globalsetting.legendTitle !== null) {
        innerHtml += '<span class="chart_label__QWLBr">';
        innerHtml += globalsetting.legendTitle;
        innerHtml += '</span>';
    }
    // dataヘッダー行から凡例を表示
    innerHtml += '<div class="legend_legend__24eBL css-1d3bbye">';
    dataHeaderRow.forEach(function (key, i) {
        if (key.match(/^data[0-9]$/)) {
            innerHtml += '<div>';
            // 選択項目ハイライト
            if (selectedDataIndex !== null) {
                // console.log('highlighted')
                // 色判定
                const color = selectedData[i] ? colorTheme.default[i] : colorTheme.notSelected[i];
                innerHtml += '<div class="is-highlighted legend_legend-item__hVZal css-1wxaqej">';
                innerHtml += '<div class="legend_legend-rect__3_0lc" style="background-color:' + color + ';"></div>';
            }
            // デフォルト
            else {
                innerHtml += '<div class="legend_legend-item__hVZal css-1wxaqej">';
                innerHtml += '<div class="legend_legend-rect__3_0lc" style="background-color:' + colorTheme.default[i] + ';"></div>';
            }

            innerHtml += '<span>' + chartData.data[0][key] + '</span>';
            innerHtml += '</div></div>';
        };
    });
    innerHtml += '</div>';

    // Y軸タイトル
    if (globalsetting.scaleLabelLabelStringyAxes !== null) {
        innerHtml += '<div><span class="chart_axis__B-zYA chart_y__1huGV">';
        innerHtml += globalsetting.scaleLabelLabelStringyAxes;
        innerHtml += '</span></div>';
    };
    legend.innerHTML = innerHtml;

    // クリックイベント
    const legendItem = document.querySelectorAll('.legend_legend-item__hVZal');
    legendItem.forEach(function (elm, i) {
        elm.addEventListener('click', function () {
            // どのデータが選択中かを管理する配列
            // console.log(selectedData)
            selectedData[i] = !selectedData[i];
            var count = 0;
            for (var n = 0; n < selectedData.length; n++) {
                if (selectedData[n] == true) {
                    count++;
                }
            }
            // console.log('count'+count)


            if (count > 0) {
                drawLegend(chartData, selectedData, i);
                updateBpChart(bpChart, chartData, dataHeaderRow, selectedData, i)
            } else {
                selectedData[i] = !selectedData[i];
            }
        });
    });
    const notLegendItem = document.querySelectorAll("canvas#bpChart");//凡例外＝グラフをクリックするとリセット
    notLegendItem.forEach(function (elm, i) {
        elm.addEventListener('click', function () {
            drawLegend(chartData, selectedData);
            updateBpChart(bpChart, chartData, dataHeaderRow, selectedData)
        });
    });

};



// ChartView
function drawChart(chartData) {
    let canvas = document.getElementById('bpChart');
    canvas.style.backgroundColor = defaultBackgroundColor;
    const ctx = canvas.getContext('2d');

    // オプション
    let options = defaultOptins;
    data = makeDataByLabel(chartData);

    let datasets = [];
    let dataHeaderRow = getHaderRow(chartData);
    // 重複
    Object.keys(dataHeaderRow).forEach(function (key, i) {
        datasets.push(
            {
                label: chartData.data[0]['data' + i],
                data: data['data' + i],
                backgroundColor: colorTheme.default[i],
                borderColor: colorTheme.default[i],
                fill: chartType[chartData.globalsetting[0].type].fill,
                stack: chartType[chartData.globalsetting[0].type].stack,
                order: data['data' + i][0]
            }
        );
    });




    let labels = [];
    Object.keys(chartData.data).forEach(function (key, i) {
        // ヘッダー行を除く
        if (i > 0) {
            labels.push(chartData.data[i].label);
        }
    });

    // ガイドライン
    Chart.defaults.global.defaultFontColor = '#000000';
    Chart.defaults.global.defaultFontFamily = "'Heebo', sans-serif";
    bpChart = new Chart(ctx, {
        type: chartType[chartData.globalsetting[0].type].type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: options
    });

    // X軸タイトル
    if (chartData.globalsetting[0].scaleLabelLabelStringxAxes !== null) {
        let addXAxesLabel = document.createElement('div');
        let innerHtml = '<div><span class="chart_axis__B-zYA chart_x__2AUNC">';
        innerHtml += chartData.globalsetting[0].scaleLabelLabelStringxAxes;
        innerHtml += '</span></div>';
        addXAxesLabel.innerHTML = innerHtml;
        canvas.parentNode.insertBefore(addXAxesLabel, canvas.nextElementSibling);
    };
};


// State
function generateSelectedData(chartData) {
    // どのデータが選択中かを管理する配列
    const selectedData = [];
    Object.keys(chartData.data[0]).forEach(function (key, i) {
        // data[0-9]のみ
        if (key.match(/^data[0-9]$/)) {
            selectedData[i - 1] = false; //labelを除くため-1
        };
    });
    return selectedData;
};


// Controller
const isSP = (window.parent.screen.width < 600) ? true : false;
//スマホ判定
if (isSP) {
    var chartHeight = 300;
};

// 初回描画
try {
    let filePath = document.getElementById('bpChart').dataset.bpcmsSource;
    let req = new XMLHttpRequest();
    req.open("GET", filePath, true);
    req.responseType = 'json';
    req.onload = function () {
        const selectedData = generateSelectedData(req.response);
        drawLegend(req.response, selectedData);
        drawChart(req.response);


    }
    req.send(null);
}
catch (error) {
    console.error(error.message)
}



function updateBpChart(chart, chartData, dataHeaderRow, selectedData, selectedDataIndex = null) {

    let datasets = [];
    data = makeDataByLabel(chartData);

    // 選択項目あり
    if (selectedDataIndex !== null) {
        Object.keys(dataHeaderRow).forEach(function (key, i) {
            datasets.push(
                {
                    label: chartData.data[0]['data' + i],
                    data: data['data' + i],
                    backgroundColor: selectedData[i] ? colorTheme.default[i] : colorTheme.notSelected[i],
                    borderColor: selectedData[i] ? colorTheme.default[i] : colorTheme.notSelected[i],
                    fill: chartType[chartData.globalsetting[0].type].fill,
                    stack: chartType[chartData.globalsetting[0].type].stack,
                    order: data['data' + i][0]
                }
            );
        });
    }
    // デフォルト
    // 重複
    else {
        Object.keys(dataHeaderRow).forEach(function (key, i) {
            datasets.push(
                {
                    label: chartData.data[0]['data' + i],
                    data: data['data' + i],
                    backgroundColor: colorTheme.default[i],
                    borderColor: colorTheme.default[i],
                    fill: chartType[chartData.globalsetting[0].type].fill,
                    stack: chartType[chartData.globalsetting[0].type].stack,
                    order: data['data' + i][0]
                }
            );
        });
    }
    chart.data.datasets = datasets;
    chart.update();
}
