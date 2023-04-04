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
var filePath = 'trendmap_data_2021apr.csv';
req.open("GET", filePath, true);
req.responseType = 'text';
req.onload = function () {
    // 2) CSVデータ変換の呼び出し
    const data = csv2json(req.responseText);

    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    drawChart(data);

}
req.send(null);

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

function drawChart(data) {
    // ラベル書き換えのため退避
    for (row in data) {
        data[row].const_label = data[row].label;
    }
    const isSP = (window.parent.screen.width < 600) ? true : false;
    const defaultBGColor = 'rgba(82,166,159)';
    const dateSliderValMap = {
        '2018-06-01': '2018年下期',
        '2019-02-01': '2019年上期',
        '2019-06-01': '2019年下期',
        '2020-02-01': '2020年上期',
        '2020-06-01': '2020年下期',
        '2021-02-01': '2021年上期',
        '2021-06-01': '2021年下期',
        '2022-02-01': '2022年上期'
    };
    let backgroundColor = defaultBGColor;
    let isKeywordDetail = false;
    let keywordData = [];

    //デフォルトのデータ
    filteredData = data.filter(function (item, index) {
        if (item.date == '2022-02-01') return true;//更新
    });

    document.getElementById("categorySwitch").addEventListener('change',
        function () {
            // ラベルの調査年月をもどす
            for (row in filteredData) {
                filteredData[row].label = filteredData[row].const_label;
            }
            category = document.getElementById("categorySwitch").value;
            sliderVal = document.getElementById("slider").value;

            if (category == '全て') {
                if (sliderVal == 0) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2018-06-01') return true;
                    })
                    date = '2018年下期';
                } else if (sliderVal == 1) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2019-02-01') return true;
                    })
                    date = '2019年上期';
                } else if (sliderVal == 2) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2019-06-01') return true;
                    })
                    date = '2019年下期';
                } else if (sliderVal == 3) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2020-02-01') return true;
                    })
                    date = '2020年上期';
                } else if (sliderVal == 4) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2020-06-01') return true;
                    })
                    date = '2020年下期';
                } else if (sliderVal == 5) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2021-02-01') return true;
                    })
                    date = '2021年上期';
                } else if (sliderVal == 6) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2021-06-01') return true;
                    })
                    date = '2021年下期';
                } else if (sliderVal == 7) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2022-02-01') return true;
                    })
                    date = '2022年上期';
                };
            } else {
                if (sliderVal == 0) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2018-06-01') return true;
                    })
                    date = '2018年下期';
                } else if (sliderVal == 1) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2019-02-01') return true;
                    })
                    date = '2019年上期';
                } else if (sliderVal == 2) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2019-06-01') return true;
                    })
                    date = '2019年下期';
                } else if (sliderVal == 3) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2020-02-01') return true;
                    })
                    date = '2020年上期';
                } else if (sliderVal == 4) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2020-06-01') return true;
                    })
                    date = '2020年下期';
                } else if (sliderVal == 5) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2021-02-01') return true;
                    })
                    date = '2021年上期';
                } else if (sliderVal == 6) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2021-06-01') return true;
                    })
                    date = '2021年下期';
                } else if (sliderVal == 7) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2022-02-01') return true;
                    })
                    date = '2022年上期';
                };
            }
            if (category == 'マーケ') {
                backgroundColor = 'rgba(82,166,159)';
            } else if (category == '技術') {
                backgroundColor = 'rgb(89,109,184)';
            } else if (category == '消費') {
                backgroundColor = 'rgb(237,180,68)';
            } else {
                backgroundColor = defaultBGColor;
            }

            // scatterChart.data.datasets[0].data = filteredData;
            // scatterChart.data.datasets.pop();

            scatterChart.data.datasets[0].data = filteredData;
            scatterChart.data.datasets[0].label = date;
            scatterChart.data.datasets[0].backgroundColor = backgroundColor;
            scatterChart.data.datasets[0].showLine = false;
            scatterChart.data.datasets[0].fill = true;
            scatterChart.update();
            isKeywordDetail = false;
            keywordDescArea.innerText = '';
            document.getElementById("reloadButton").style.visibility = "hidden";
            document.getElementById("searchLink").style.visibility = "hidden";
        }
    )

    document.getElementById("slider").addEventListener('change',
        function () {
            // ラベルの調査年月をもどす
            for (row in filteredData) {
                filteredData[row].label = filteredData[row].const_label;
            }
            sliderVal = document.getElementById("slider").value;
            category = document.getElementById("categorySwitch").value;



            if (category == '全て') {
                if (sliderVal == 0) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2018-06-01') return true;
                    })
                    date = '2018年下期';
                } else if (sliderVal == 1) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2019-02-01') return true;
                    })
                    date = '2019年上期';
                } else if (sliderVal == 2) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2019-06-01') return true;
                    })
                    date = '2019年下期';
                } else if (sliderVal == 3) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2020-02-01') return true;
                    })
                    date = '2020年上期';
                } else if (sliderVal == 4) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2020-06-01') return true;
                    })
                    date = '2020年下期';
                } else if (sliderVal == 5) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2021-02-01') return true;
                    })
                    date = '2021年上期';
                } else if (sliderVal == 6) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2021-06-01') return true;
                    })
                    date = '2021年下期';
                } else if (sliderVal == 7) {
                    filteredData = data.filter(function (item, index) {
                        if (item.date == '2022-02-01') return true;
                    })
                    date = '2022年上期';
                };
            } else {
                if (sliderVal == 0) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2018-06-01') return true;
                    })
                    date = '2018年下期';
                } else if (sliderVal == 1) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2019-02-01') return true;
                    })
                    date = '2019年上期';
                } else if (sliderVal == 2) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2019-06-01') return true;
                    })
                    date = '2019年下期';
                } else if (sliderVal == 3) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2020-02-01') return true;
                    })
                    date = '2020年上期';
                } else if (sliderVal == 4) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2020-06-01') return true;
                    })
                    date = '2020年下期';
                } else if (sliderVal == 5) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2021-02-01') return true;
                    })
                    date = '2021年上期';
                }  else if (sliderVal == 6) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2021-06-01') return true;
                    })
                    date = '2021年下期';
                }  else if (sliderVal == 7) {
                    filteredData = data.filter(function (item, index) {
                        if (item.category == category && item.date == '2022-02-01') return true;
                    })
                    date = '2022年上期';
                };
            }

            if (category == 'マーケ') {
                backgroundColor = '#008000';
            } else if (category == '技術') {
                backgroundColor = '#0000ff';
            } else if (category == '消費') {
                backgroundColor = '#ffa500';
            } else {
                backgroundColor = defaultBGColor;
            }

            scatterChart.data.datasets[0].data = filteredData;
            scatterChart.data.datasets[0].label = date;
            scatterChart.data.datasets[0].backgroundColor = backgroundColor;
            scatterChart.data.datasets[0].showLine = false;
            scatterChart.data.datasets[0].fill = true;
            scatterChart.update();
            isKeywordDetail = false;
            keywordDescArea.innerText = '';
            document.getElementById("reloadButton").style.visibility = "hidden";
            document.getElementById("searchLink").style.visibility = "hidden";
        }
    )

    document.getElementById("reloadButton").addEventListener('click',
        function () {
            // onChangeをエミュレート
            var elem = document.getElementById("slider");
            // ブラウザ判定
            if ( /*@cc_on ! @*/ false) {
                // IEの場合
                elem.fireEvent("onchange");
            }
            else {
                // Firefoxの場合
                var evt = document.createEvent("MouseEvents"); // マウスイベント作成
                evt.initEvent("change", false, true); // イベントの設定
                elem.dispatchEvent(evt); // イベントを強制的に発生
            }
        }
    );

    if (isSP) {
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
            anchor: 'end', // データラベルの位置（'start' は下端）
            align: 'end', // データラベルの位置（'start' は下側）
            textAlign: 'center',
            padding: {
                bottom: 1
            },
            display: 'auto'
        })
        // document.getElementsByClassName("switch").style.display = flex;
        // document.getElementsByClassName("switch").style.flex-direction = column;


    } else {
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
            // color: '#FE777B',
            anchor: 'end', // データラベルの位置（'start' は下端）
            align: 'end', // データラベルの位置（'start' は下側）
            textAlign: 'center',
            padding: {
                bottom: 1
            }
        })
    }

    const ctx = document.getElementById("bpChart").getContext("2d");
    let keywordDescArea = document.getElementById("keywordDescArea");

    // 背景色設定
    const bGFillStyle = "rgba(255, 0, 100, 0.2)";
    const highScoreThreshold = 4;
    function drawBackground(target) {
        let xScale = target.scales["x-axis-1"];
        let yScale = target.scales["y-axis-1"];

        // 将来性
        if (yScale.end > highScoreThreshold) {
            var plotAreaTop = Math.min(yScale.getPixelForValue(yScale.max), yScale.getPixelForValue(yScale.end));
            var fillHeight = Math.min(yScale.getPixelForValue(yScale.start), yScale.getPixelForValue(highScoreThreshold)) - plotAreaTop;
            ctx.fillStyle = bGFillStyle;
            ctx.fillRect(xScale.left, plotAreaTop, xScale.width, fillHeight);
        }
        // 経済インパクト
        if (xScale.end > highScoreThreshold) {
            var fillLeft = Math.max(xScale.getPixelForValue(highScoreThreshold), xScale.getPixelForValue(xScale.start));
            var plotAreaRight = xScale.getPixelForValue(xScale.max) - fillLeft;
            ctx.fillStyle = bGFillStyle;
            ctx.fillRect(fillLeft, plotAreaTop, plotAreaRight, yScale.height);
        }
    };

    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            label: "aaa",
            datasets: [
                {
                    label: '2022年上期',//更新
                    data: filteredData,
                    backgroundColor: defaultBGColor,
                    pointRadius: 4,
                    pointHoverRadius: isSP ? 20 : 10
                },
                // {label: 'マーケティング', data: dataM, backgroundColor: '#008000'},
                // {label: '消費トレンド', data: dataC, backgroundColor: '#ffa500'},
                // {label: '技術キーワード', data: dataT, backgroundColor: '#0000ff'},

            ]
        },
        options: {
            layout: {
                padding: {
                    left: isSP ? 0 : 50,
                    right: isSP ? 0 : 50,
                    top: 0,
                    bottom: 0
                }
            },
            legend: {
                align : 'start',
                onClick: function () { return false; },
                labels: {
                    boxWidth: 12,
                    generateLabels: function (chart) {
                        return chart.data.datasets.map(function (dataset, i) {
                            // 凡例とグラフエリアの距離
                            chart.legend.afterFit = function () {
                                this.height = this.height + 20;
                            };
                            return {
                                text: dataset.label,
                                fillStyle: dataset.backgroundColor,
                                hidden: dataset.hidden,
                                lineCap: dataset.borderCapStyle,
                                lineDash: dataset.borderDash,
                                lineDashOffset: dataset.borderDashOffset,
                                lineJoin: dataset.borderJoinStyle,
                                lineWidth: dataset.borderWidth,
                                strokeStyle: dataset.borderColor,
                                pointStyle: dataset.pointStyle
                            };
                        });
                    }
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: "経済インパクト"
                    },

                }],
                yAxes: [{
                    display: true,
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: "将来性"
                    }

                }]

            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        let label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].keyword_formal_name;
                        return label;
                    },
                    footer: function (tooltipItems, data) {
                        let tooltipCategory = filteredData[tooltipItems[0].index].category;
                        let tooltipX = tooltipItems[0].xLabel.toFixed(2);
                        let tooltipY = tooltipItems[0].yLabel.toFixed(2);
                        // 表示しきれないため、1行25文字制限
                        let tooltipDesc = filteredData[tooltipItems[0].index].description;
                        let tooltipDescList = tooltipDesc.match(/.{1,25}/g);

                        return [
                            'カテゴリ: ' + tooltipCategory,
                            '経済インパクト: ' + tooltipX,
                            '将来性: ' + tooltipY,
                            '解説:'
                        ].concat(tooltipDescList);
                    }
                }
            },
            onClick: function (e, el) {
                if (false === isKeywordDetail) {
                    if (!el || el.length === 0) return;
                    // キーワード詳細の抽出
                    let keywordDate = filteredData[el[0]._index].date;
                    let keywordId = filteredData[el[0]._index].keyword_id;
                    let KeywordLabel = filteredData[el[0]._index].label;
                    let keywordDesc = filteredData[el[0]._index].description;
                    filteredData = data.filter(function (item) {
                        return item.keyword_id === keywordId;
                    });
                    // 説明文
                    keywordDescArea.innerText = '●' + KeywordLabel + ': ' + keywordDesc;

                    // ラベルを調査年月に置き換え
                    for (row in filteredData) {
                        filteredData[row].label = dateSliderValMap[filteredData[row].date];
                    }

                    scatterChart.data.datasets[0].data = filteredData;
                    scatterChart.data.datasets[0].label = KeywordLabel;
                    scatterChart.data.datasets[0].backgroundColor = backgroundColor;
                    scatterChart.data.datasets[0].showLine = true;
                    scatterChart.data.datasets[0].fill = false;
                    scatterChart.update();
                    isKeywordDetail = true;
                    document.getElementById("reloadButton").style.visibility = "visible";
                    let searchLink = document.getElementById("searchLink");
                    searchLink.href = '/atcl/search/?KEYWORD=' + KeywordLabel;
                    searchLink.innerText = '「' + KeywordLabel + '」の関連記事を探す'
                    searchLink.style.visibility = "visible";
                }

            }
        },
        plugins: [
            {
                beforeDraw: drawBackground
            }
        ]
    });

}


