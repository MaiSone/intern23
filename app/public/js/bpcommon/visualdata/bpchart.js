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
    line: { type: 'line', fill: false, stack: false, xAutoSkip:true, yAutoSkip: true },
    area: { type: 'line', fill: true, stack: false, xAutoSkip:true, yAutoSkip: true },
    // stackedArea: { type: 'line', fill: true, stack: true},
    bar: { type: 'bar', fill: false, stack: false, xAutoSkip:true, yAutoSkip: true },
    horizontalBar: { type: 'horizontalBar', fill: false, stack: false, xAutoSkip:true, yAutoSkip: false },
    stackedBar: { type: 'bar', fill: false, stack: true, xAutoSkip:true, yAutoSkip: true },
    stackedHorizontalBar: { type: 'horizontalBar', fill: false, stack: true, xAutoSkip:true, yAutoSkip: false },
    rankingBar: { type:'horizontalBar', fill:false, stack:false, xAutoSkip:true, yAutoSkip: false }
}

const defaultBackgroundColor = 'rgba(250, 250, 249)';
async function loadFonts() {
    const Heebo = new FontFace('Heebo', 'url(/css/visualdata/Heebo/static/Heebo-Regular.ttf)', { style: 'normal', weight: 700 });
    await Heebo.load();
    document.fonts.add(Heebo);
};

const defaultOptins = {
    responsive: false,
    maintainAspectRatio: true,
    aspectRatio: 1,
    legend: {
        display: false
    },
    tooltips: {
        enabled: false,
        intersect: false,
        // mode: 'index', // ツールチップまとめて表示
        mode: 'nearest', // カーソルに最も近いツールチップを表示
        custom: function (tooltipModel) {
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
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }
            function getBody(bodyItem) {
                return bodyItem.lines;
            }
            // Set Text
            if (tooltipModel.body) {
                var titleLines = tooltipModel.title || [];
                var bodyLines = tooltipModel.body.map(getBody);
                var innerHtml = '<thead>';
                titleLines.forEach(function (title) {
                    innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';
                bodyLines.forEach(function (body, i) {
                    var style = 'background:' + '#fff';
                    style += '; border-color:' + '#fff';
                    style += '; border-width: 2px';
                    var span = '<span style="' + style + '"></span>';
                    innerHtml += '<tr><td>' + span + body + '</td></tr>';
                });
                innerHtml += '</tbody>';
                var tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
            }
            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();
            // Display, position, and set styles for font
            tooltipEl.style.backgroundColor = '#FFFFFF'
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.borderRadius = '5px';
            tooltipEl.style.boxShadow = '0 1px 10px 1px rgba(128,128,128,0.6)';
        }
    },
    elements: {
        point: {
            radius: 0
        },
        line: {
            tension: 0
        }
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    drawTicks: false,
                    zeroLineColor: '#000000'
                },
                ticks: {
                    callback: function (value) {
                        if (typeof (value) === "number") {
                            return value.toLocaleString(); //カンマで区切る
                        } else {
                            return value;
                        }
                    },
                    maxRotation: 0, //軸ラベルを横にする
                    minRotation: 0,
                    padding: 10,
                    suggestedMin: 0,
                    suggestedMax: 0
                },
            }
        ],
        yAxes: [
            {
                gridLines: {
                    drawTicks: false,
                    zeroLineColor: '#000000'
                },
                ticks: {
                    callback: function (value) {
                        if (typeof (value) === "number") {
                            return value.toLocaleString(); //カンマで区切る
                        } else {
                            return value;
                        }
                    },
                    maxRotation: 0, //軸ラベルを横にする
                    minRotation: 0,
                    padding: 10,
                    min: 0
                }
            }
        ]
    }
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
let legendList = document.querySelectorAll('.bpChartLegend');
legendList.forEach(function (legend) {

    // グラフタイトル から Y軸タイトルまでの背景色指定
    legend.parentNode.style.backgroundColor = defaultBackgroundColor;

});



function drawLegend(lagendIndex, chartData, selectedData, selectedDataIndex = null) {
    // dataヘッダー行を取得
    let dataHeaderRow = getHaderRow(chartData);
    let globalsetting = getGlobalSetting(chartData);
    let innerHtml = '';
    // グラフタイトル
    if (globalsetting.titleText !== null) {
        innerHtml += '<div><div><div class="chart_title__27gYT">';
        innerHtml += globalsetting.titleText;
        innerHtml += '</div></div></div>';
    }
    // 凡例タイトル
    if (globalsetting.legendTitle !== null) {
        innerHtml += '<div class="chart_label__QWLBr">';
        innerHtml += globalsetting.legendTitle;
        innerHtml += '</div>';
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
        innerHtml += '<div><div class="chart_axis__B-zYA chart_y__1huGV">';
        innerHtml += globalsetting.scaleLabelLabelStringyAxes;
        innerHtml += '</div></div>';
    };
    legendList[lagendIndex].innerHTML = innerHtml;

    // クリックイベント
    const bpChartLegendList = document.querySelectorAll('.bpChartLegend');
    const legendItem = bpChartLegendList[lagendIndex].querySelectorAll('.legend_legend-item__hVZal');
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

            if (selectedData.length == count) {
                // 全凡例をハイライトしたときは、未ハイライトとして扱う
                let legendUnSelectedData = [];
                Object.keys(selectedData).forEach(function (key, i) {
                    legendUnSelectedData[i] = false;
                });

                drawLegend(lagendIndex, chartData, legendUnSelectedData);
                updateBpChart(bpChart[lagendIndex], chartData, dataHeaderRow, selectedData)
            
            } else if (count > 0) {
                // 凡例ハイライト
                drawLegend(lagendIndex, chartData, selectedData, i);
                updateBpChart(bpChart[lagendIndex], chartData, dataHeaderRow, selectedData)
            
            } else {
                // count == 0
                // 全凡例を非ハイライトしたときは、全ハイライトとして扱う
                let legendUnSelectedData = [];
                let chartAllSelectedData = [];

                Object.keys(selectedData).forEach(function (key, i) {
                    legendUnSelectedData[i] = false;
                    chartAllSelectedData[i] = true;
                });

                drawLegend(lagendIndex, chartData, legendUnSelectedData);
                updateBpChart(bpChart[lagendIndex], chartData, dataHeaderRow, chartAllSelectedData)
            }
        });
    });
};



// ChartView
function drawChart(chartIndex, chartData) {
    let canvasList = document.querySelectorAll('.bpChart');
    canvasList[chartIndex].style.backgroundColor = defaultBackgroundColor;
    canvasList[chartIndex].style.margin = "8px 0px 0px 0px";
    const ctx = canvasList[chartIndex].getContext('2d');

    // オプション
    let options = defaultOptins;
    data = makeDataByLabel(chartData);

    let datasets = [];
    let dataHeaderRow = getHaderRow(chartData);
    // 重複
    Object.keys(dataHeaderRow).forEach(function (key, i) {
        if (chartType[chartData.globalsetting[0].type].stack) {
            datasets.push(
                {
                    label: chartData.data[0]['data' + i],
                    data: data['data' + i],
                    backgroundColor: colorTheme.default[i],
                    borderColor: colorTheme.default[i],
                    fill: chartType[chartData.globalsetting[0].type].fill,
                    stack: chartType[chartData.globalsetting[0].type].stack,
                    order: i,
                }
            );
        } else {
            datasets.push(
                {
                    label: chartData.data[0]['data' + i],
                    data: data['data' + i],
                    backgroundColor: colorTheme.default[i],
                    borderColor: colorTheme.default[i],
                    fill: chartType[chartData.globalsetting[0].type].fill,
                    // stack: chartType[chartData.globalsetting[0].type].stack,
                    order: i,
                }
            );
        }
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

    bpChart[chartIndex] = new Chart(ctx, {
        type: chartType[chartData.globalsetting[0].type].type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: options
    });
    bpChart[chartIndex].options.scales.xAxes[0].stacked = chartType[chartData.globalsetting[0].type].stack;
    bpChart[chartIndex].options.scales.xAxes[0].ticks.autoSkip = chartType[chartData.globalsetting[0].type].xAutoSkip;
    bpChart[chartIndex].options.scales.yAxes[0].stacked = chartType[chartData.globalsetting[0].type].stack;
    bpChart[chartIndex].options.scales.yAxes[0].ticks.autoSkip = chartType[chartData.globalsetting[0].type].yAutoSkip;
    // console.log(bpChart);


    //キャプション
    if(typeof chartData.globalsetting[0].captionText !== 'undefined'){//jsonファイルにcaptionTextがないグラフの対応
        if (chartData.globalsetting[0].captionText !== null) {
            let addCaption = document.createElement('div');
            let innerHtml = '<div><div class="chart_caption">';
            innerHtml += chartData.globalsetting[0].captionText;
            innerHtml += '</div></div>';
            addCaption.innerHTML = innerHtml;
            canvasList[chartIndex].parentNode.insertBefore(addCaption, canvasList[chartIndex].nextElementSibling);
        };
    }
    

    // X軸タイトル
    if (chartData.globalsetting[0].scaleLabelLabelStringxAxes !== null) {
        let addXAxesLabel = document.createElement('div');
        let innerHtml = '<div><div class="chart_axis__B-zYA chart_x__2AUNC">';
        innerHtml += chartData.globalsetting[0].scaleLabelLabelStringxAxes;
        innerHtml += '</div></div>';
        addXAxesLabel.innerHTML = innerHtml;
        canvasList[chartIndex].parentNode.insertBefore(addXAxesLabel, canvasList[chartIndex].nextElementSibling);
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
    let bpChartList = document.querySelectorAll('.bpChart');
    bpChartList.forEach(function (bpChart, i) {

        let filePath = bpChart.dataset.bpcmsSource;
        fetch(filePath, {
            method: "GET",
          }).then(response => response.json())
          .then(text => {
            if (text.globalsetting[0].type === 'table') {
                // table
                // console.log('table');

            } else {
                // chart
                const selectedData = generateSelectedData(text);
                drawLegend(i, text, selectedData);
                drawChart(i, text, i);
            }
          });
        // let req = new XMLHttpRequest();
        // req.open("GET", filePath, true);
        // req.responseType = 'json';
        // req.onload = function () {

        //     if (req.response.globalsetting[0].type === 'table') {
        //         // table
        //         // console.log('table');

        //     } else {
        //         // chart
        //         const selectedData = generateSelectedData(req.response);
        //         drawLegend(i, req.response, selectedData);
        //         drawChart(i, req.response, i);
        //     }
        // }
        // req.send(null);
    });
}
catch (error) {
    console.error(error.message)
}



function updateBpChart(chart, chartData, dataHeaderRow, selectedData) {

    let datasets = [];
    data = makeDataByLabel(chartData);
    // 重複
    Object.keys(dataHeaderRow).forEach(function (key, i) {
        if (chartType[chartData.globalsetting[0].type].stack) {
            datasets.push(
                {
                    label: chartData.data[0]['data' + i],
                    data: data['data' + i],
                    backgroundColor: selectedData[i] ? colorTheme.default[i] : colorTheme.notSelected[i],
                    borderColor: selectedData[i] ? colorTheme.default[i] : colorTheme.notSelected[i],
                    fill: chartType[chartData.globalsetting[0].type].fill,
                    stack: chartType[chartData.globalsetting[0].type].stack,
                    order: i,
                }
            );
        } else {
            datasets.push(
                {
                    label: chartData.data[0]['data' + i],
                    data: data['data' + i],
                    backgroundColor: selectedData[i] ? colorTheme.default[i] : colorTheme.notSelected[i],
                    borderColor: selectedData[i] ? colorTheme.default[i] : colorTheme.notSelected[i],
                    fill: chartType[chartData.globalsetting[0].type].fill,
                    // stack: chartType[chartData.globalsetting[0].type].stack,
                    order: i,
                }
            );
        }
    });
    chart.data.datasets = datasets;
    chart.update();
}
