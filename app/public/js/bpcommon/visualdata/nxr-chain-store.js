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

// Env
// Chart
const colorCode = {
    'default': ['#52A69F', '#596DB8', '#EDB444', '#D4628B', '#99AD4A', '#7E522E', '#57A9D7', '#A15CB9', '#E0792E', '#A57667']
};

const defaultBackgroundColor = 'rgba(250, 250, 249)';


// グローバル設定用
const globalsetting = {
    type: "line",
    chartHeight: "500",
    chartWidth: "650",
    colorTheme: "default",
    datalabelAlign: "end",
    datalabelAnchor: "end",
    datalabelClamp: "true",
    datalabelColor: "#000000",
    datalabelDisplay: "false",
    datalabelFontSize: "12",
    datalabelOffset: "0",
    division: "1",
    legendDisplay: "true",
    lineTension: "0",
    paddingRight: "30",
    paddingTop: "0",
    pointRadius: "0",
    responsive: "true",
    scaleLabelDisplayxAxes: "true",
    scaleLabelDisplayyAxes: "true",
    scaleLabelLabelStringxAxes: "",
    scaleLabelLabelStringyAxes: "売上高 前年同月比",
    stacked: "false",
    titleDisplay: "false",
    titleText: "テンプレート化しています",
    tooltipEnabled: "true",
    unit: "%"
};


// Model
// 共通
const isSP = (window.parent.screen.width < 600) ? true : false;
//スマホ判定
if (isSP) {
    var chartHeight = 300;
}
//csv内の文字列true/falseをboolean型で返す
function parseStrToBoolean(str) {
    // 文字列を判定
    return (str == 'true') ? true : false;
}

function getColorCode(theme, n) {
    n -= 1 // data.csvのforは ヘッダー行を除くため1からループしている
    let colorCodeLength = colorCode[theme].length;
    let i = n.toString(colorCodeLength);
    return colorCode[theme][i.substring(i.length - 1, i.length - 0)];
};

function isNumeric(val) {
    var regex = new RegExp(/^[-+]?[0-9]+(\.[0-9]+)?$/);
    return regex.test(val);
}

// 2) CSVから２次元配列に変換
function csv2json(csvArray) {
    // console.log(csvArray);
    var jsonArray = [];
    var rows = csvArray.split(/\r?\n/); //改行で区切る
    var columnName = rows[0].split(","); // 1行目から「項目名」の配列を生成する

    for (var i = 0; i < rows.length; i++) { //行数の分繰り返す
        var row = new Array();
        var cells = rows[i].split(",");

        // 空行対策
        if (rows[i]) {
            for (var j = 0; j < columnName.length; j++) { //列数の分繰り返す

                // セル内改行対策 2行まで
                if (cells[j].slice(0, 1) === '"') {
                    // console.log(cells[j]);
                    // console.log(rows[i+1]);
                    row[columnName[j]] = cells[j].replace('"', '') + '\n' + rows[i + 1].split(",")[0].replace('"', '');
                    i++;

                } else {
                    row[columnName[j]] = cells[j];
                }
            }
            jsonArray.push(row);
        }
    }

    // console.log(jsonArray);
    return jsonArray;
}

// Table
// 業種抽出
function categoryFilter(elm) {
    // 初期値解除
    var visToggle = document.querySelectorAll('.vis-toggle');
    visToggle.forEach(function (elm) {
        elm.style.visibility = 'visible';
        elm.style.display = 'none';
    });

    let targetCategory = elm.dataset.category;

    // show target category
    let targetElement = document.getElementsByClassName(targetCategory);
    for (i = 0; i < targetElement.length; i++) {
        targetElement[i].style.display = '';

        // 初期化 グラフ表示
        var targetElementChart = targetElement[i].querySelectorAll('.vis-chart');
        targetElementChart.forEach(function (elm) {
            elm.style.display = '';
        });
        var targetElementTable = targetElement[i].querySelectorAll('.vis-table');
        targetElementTable.forEach(function (elm) {
            elm.style.display = 'none';
        });
    };

    // 初期化 グラフボタンアクティブ
    $('.btn-chart').addClass('btn-active');
    $('.btn-table').removeClass('btn-active');

}

// Action
// 共通
try {
    // 初期値toggle
    let visToggle = document.querySelectorAll('.vis-toggle');
    visToggle.forEach(function (elm) {
        elm.style.visibility = 'hidden';
    });
    window.onload = function () {
        categoryFilter({
            dataset: {
                category: 'vis-fastfood'
            }
        });
    };

    var bpchart = document.querySelectorAll('.vis-chart');
    var bpchartArr = Array.prototype.slice.call(bpchart);
    bpchartArr.forEach(function (element, i) {
        // 1) ajaxでCSVファイルをロード
        var req = new XMLHttpRequest();
        var file = element.dataset.datacsv;
        var filePath = file //データcsvの読み込み
        req.open("GET", filePath, true);
        req.responseType = 'text';
        req.onload = function () {

            // 2) CSVデータ変換の呼び出し
            const data = csv2json(req.responseText);
            // console.log(data)

            // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
            // Chart
            drawLineChart(i, data, globalsetting);
            // Table
            generateTable(i, data);

        }
        req.send(null);
    });
}
catch (error) {
    console.error(error.message)
}


// State
// 共通
window.addEventListener('DOMContentLoaded', function () {
    // 表・グラフ切り替え
    $(function () {
        // 初期化 グラフボタンアクティブ
        $('.btn-chart').addClass('btn-active');

        $('.vis-table').hide();
        $('.table-chart-toggle').click(function () {
            // ボタンアクティブ切り替え
            $('.btn-chart').toggleClass('btn-active');
            $('.btn-table').toggleClass('btn-active');
            // 表・グラフ切り替え
            $(this).parent().find('.vis-chart').toggle();
            $(this).parent().find('.vis-table').toggle();
        });
    });
});

// Chart
function drawLineChart(index, data, globalsetting) {
    // console.log(data)
    //datasetsを作成
    datasets = [];
    // ヘッダー行を除くため1からループ
    for (var i = 1; i < Object.keys(data[0]).length; i++) { //データ数（data.csvの列数）分繰り返し
        // console.log(Object.keys(data[0]));
        var chartdata = [];

        // ラベル列を除くため1からループ
        for (var j = 1; j < data.length; j++) {
            // console.log(data[j]);
            // console.log(data[j][Object.keys(data[0])[i]]);
            chartdata.push(data[j][Object.keys(data[0])[i]]);
            chartdata.map(Number); //文字列から数字に変換
        }
        // console.log(chartdata);

        let backgroundColor = getColorCode(globalsetting.colorTheme, i);
        let borderColor = getColorCode(globalsetting.colorTheme, i);

        var dataObject = {
            label: data[0][Object.keys(data[0])[i]].replace(/\r?\n/, ''),
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            fill: false,
            data: chartdata //先ほどのchartdataをセット
        };
        datasets.push(dataObject);
    }
    labels = [];
    //作った配列に入れる ラベル列を除くため1からループ
    // X軸ラベル
    for (var i = 1; i < data.length; i++) {
        // console.log(data[i][''])
        if (data[i][''].match(/年1月/)) {
            // 1月は年を表示
            labels.push(data[i]['']);

        } else {
            labels.push(data[i][''].replace(/[0-9]{4}年/, ''));

        }
    }
    // console.log(labels)

    //html生成
    //bpchart取得
    var bpchart = document.querySelectorAll('.vis-chart');
    bpchart[index].setAttribute('style', 'position: relative;');
    //chartAreaWrapper作成
    var chartAreaWrapper = document.createElement("div");
    //yAxisWrapper作成
    var yAxisWrapper = document.createElement("div");
    yAxisWrapper.setAttribute('style', 'position: absolute; left: 0; top: 0; background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));');
    //headerWrapper作成
    var headerWrapper = document.createElement("div");
    headerWrapper.setAttribute('style', 'position: absolute; left: 0; top: 0; background-color: rgba(255,255,255,0);');
    //footerWrapper作成
    var footerWrapper = document.createElement("div");
    footerWrapper.setAttribute('style', 'position: absolute; left: 0; top: 0; background-color: rgba(255,255,255,0);');
    // bpchartにchartAreaWrapper,yAxisWrapper,headerWrapperを挿入
    bpchart[index].appendChild(chartAreaWrapper);
    bpchart[index].appendChild(yAxisWrapper);
    bpchart[index].appendChild(headerWrapper);
    bpchart[index].appendChild(footerWrapper);
    //cvsChart作成,chartAreaWrapperに挿入
    var cvsChart = document.createElement("canvas");
    chartAreaWrapper.appendChild(cvsChart);
    var ctxChart = cvsChart.getContext("2d");

    var chartWidth = globalsetting.chartWidth;
    var chartHeight = globalsetting.chartHeight;

    cvsChart.width = chartWidth;
    cvsChart.height = chartHeight;
    cvsChart.style.width = chartWidth + "px"; //グラフの幅を設定
    cvsChart.style.height = chartHeight + "px"; //htmlと同じ高さを設定
    cvsChart.style.backgroundColor = defaultBackgroundColor;

    // 二重実行防止用フラグ
    var copyCalled = false;
    // Y軸イメージのコピー関数
    function copyImage(chart) {
        if (parseStrToBoolean(globalsetting.responsive) == false) {
            if (copyCalled) return;
            copyCalled = true;
            // 横スクロールを可能に
            chartAreaWrapper.setAttribute('style', 'overflow-x: scroll;');

            //cvsYAxis作成,yAxisWrapperに挿入
            var cvsYAxis = document.createElement("canvas");
            cvsYAxis.setAttribute('style', 'position: absolute; left: 0; top: 0; pointer-events:none; background-color: rgba(255,255,255,1);');
            yAxisWrapper.appendChild(cvsYAxis);
            // cvsHeader作成、headerWrapperに挿入
            var cvsHeader = document.createElement("canvas");
            cvsHeader.setAttribute('style', 'position: absolute; left: 0; top: 0; pointer-events:none; background-color: rgba(255,255,255,0);');
            headerWrapper.appendChild(cvsHeader);
            // cvsFooter作成、headerWrapperに挿入
            var cvsFooter = document.createElement("canvas");
            cvsFooter.setAttribute('style', 'position: absolute; left: 0; top: 0; pointer-events:none; background-color: rgba(255,255,255,0);');
            footerWrapper.appendChild(cvsFooter);
            // Y軸コピー用 cvsYAxisキャンバス
            var ctxYAxis = cvsYAxis.getContext("2d");
            // タイトル・凡例コピー用 cvsHeaderキャンバス
            var ctxHeader = cvsHeader.getContext("2d");
            // x軸コピー用 cvsFooterキャンバス
            var ctxFooter = cvsFooter.getContext("2d");


            // グラフ描画後は、canvas.width(height):canvas.style.width(height) 比は、下記 scale の値になっている
            var scale = window.devicePixelRatio;
            // Y軸のスケール情報
            var yAxScale = chart.scales['y-axis-0'];
            // Y軸部分としてグラフからコピーすべき幅 (TODO: 良く分かっていない)
            var yAxisStyleWidth0 = yAxScale.width - 10;
            // canvas におけるコピー幅(yAxisStyleWidth0を直接使うと微妙にずれるので、整数値に切り上げる)
            var copyWidth = Math.ceil(yAxisStyleWidth0 * scale);
            // Y軸canvas の幅(右側に少し空白部を残す)
            var yAxisCvsWidth = copyWidth + 4;
            // 実際の描画幅(styleに設定する)
            var yAxisStyleWidth = yAxisCvsWidth / scale;
            // Y軸部分としてグラフからコピーすべき高さ (TODO: 良く分かっていない) ⇒これを実際の描画高とする(styleに設定)
            var yAxisStyleHeight = yAxScale.height + yAxScale.top + 10;
            // canvas におけるコピー高
            var copyHeight = yAxisStyleHeight * scale;
            // Y軸canvas の高さ
            var yAxisCvsHeight = copyHeight;
            // Y軸canvas の幅と高さを設定
            cvsYAxis.width = yAxisCvsWidth;
            cvsYAxis.height = yAxisCvsHeight;
            // Y軸canvas.style(実際に描画される大きさ)の幅と高さを設定
            cvsYAxis.style.width = yAxisStyleWidth + "px";
            cvsYAxis.style.height = yAxisStyleHeight + "px";
            // グラフcanvasからY軸部分のイメージをコピーする
            ctxYAxis.drawImage(cvsChart, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
            // 軸ラベルのフォント色を透明に変更して、以降、再表示されても見えないようにする
            chart.options.scales.yAxes[0].ticks.fontColor = 'rgba(0,0,0,0)';
            chart.update();
            // 最初に描画されたグラフのY軸ラベル部分をクリアする
            ctxChart.clearRect(0, 0, yAxisStyleWidth, yAxisStyleHeight);
            //y軸コピーのラッパー
            yAxisWrapper.style.width = yAxisStyleWidth + "px";
            yAxisWrapper.style.height = chartHeight + "px";


            // タイトル、凡例canvas.style(実際に描画される大きさ)の幅と高さを設定
            articleWidth = document.querySelector('.articleBody').clientWidth;
            cvsHeader.style.width = articleWidth + "px";
            cvsHeader.style.height = yAxScale.top + "px";
            cvsHeader.width = articleWidth * scale;
            cvsHeader.height = yAxScale.top * scale;
            // グラフcanvasからタイトルと凡例部分のイメージをコピーする
            ctxHeader.drawImage(cvsChart,
                (chartWidth / 2 - articleWidth / 2) * scale, 0,
                articleWidth * scale, yAxScale.top * scale,
                0, 0,
                articleWidth * scale, yAxScale.top * scale
            );
            // タイトルと凡例を非表示
            chart.options.legend.labels.fontColor = 'rgba(0,0,0,0)';
            chart.options.legend.labels.boxWidth = 0;
            chart.options.title.fontColor = 'rgba(0,0,0,0)';
            chart.update();
            // 最初に描画されたグラフのヘッダー部分をクリアする
            ctxChart.clearRect(0, 0, chartWidth, yAxScale.top);
            //タイトルと凡例コピーのラッパー
            headerWrapper.style.width = articleWidth + "px";
            headerWrapper.style.height = yAxScale.top + "px";

            // x軸ラベルcanvas.style(実際に描画される大きさ)の幅と高さを設定
            articleWidth = document.querySelector('.articleBody').clientWidth;
            cvsFooter.style.width = articleWidth + "px";
            cvsFooter.style.height = chartHeight - yAxScale.height - yAxScale.top - 1.2 * 12 - 4 * 2 + "px";
            cvsFooter.width = articleWidth * scale;
            cvsFooter.height = (chartHeight - yAxScale.height - yAxScale.top - 1.2 * 12 - 4 * 2) * scale;
            // グラフcanvasからx軸ラベルのイメージをコピーする
            ctxFooter.drawImage(cvsChart,
                (chartWidth / 2 - articleWidth / 2) * scale, (yAxScale.height + yAxScale.top + 1.2 * 12 + 4 * 2) * scale,
                articleWidth * scale, (chartHeight - yAxScale.height - yAxScale.top - 1.2 * 12 - 4 * 2) * scale,
                0, 0,
                articleWidth * scale, (chartHeight - yAxScale.height - yAxScale.top - 1.2 * 12 - 4 * 2) * scale
            );
            // x軸ラベルをグラフ下部に移動
            footerWrapper.style.top = yAxScale.height + yAxScale.top + 1.2 * 12 + 4 * 2 + "px";

            // x軸ラベルを非表示
            chart.options.scales.xAxes[0].scaleLabel.fontColor = 'rgba(0,0,0,0)';
            chart.update();
            // 最初に描画されたグラフのフッター部分をクリアする
            ctxChart.clearRect(0, yAxScale.height + yAxScale.top + 1.2 * 12 + 4 * 2, chartWidth * scale, (chartHeight - yAxScale.height - yAxScale.top - 1.2 * 12 - 4 * 2) * scale);
            //x軸ラベルのラッパー
            footerWrapper.style.width = articleWidth + "px";
            footerWrapper.style.height = chartHeight - yAxScale.height - yAxScale.top - 1.2 * 12 - 4 * 2 + "px";
        } else {
            return null;
        }
    }


    chart = new Chart(ctxChart, {
        type: globalsetting.type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: parseStrToBoolean(globalsetting.responsive), //trueにすると画面の幅に合わせて作図してしまう
            layout: {
                padding: {
                    top: globalsetting.paddingTop,
                    right: globalsetting.paddingRight,
                }
            },
            legend: {
                display: parseStrToBoolean(globalsetting.legendDisplay),
                align: 'start',
                // onClick: function () { },
                labels: {
                    usePointStyle: true
                }
            },
            title: {
                display: parseStrToBoolean(globalsetting.titleDisplay),
                text: globalsetting.titleText,
            },
            tooltips: {
                enabled: parseStrToBoolean(globalsetting.tooltipEnabled),
                intersect: false,
                mode: 'index'
            },
            elements: {
                point: {
                    pointStyle: 'rect',
                    radius: globalsetting.pointRadius,
                    hoverRadius: 0,
                },
                line: {
                    tension: globalsetting.lineTension
                }
            },
            scales: {
                xAxes: [{
                    stacked: parseStrToBoolean(globalsetting.stacked),
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: parseStrToBoolean(globalsetting.scaleLabelDisplayyAxes),
                        labelString: globalsetting.scaleLabelLabelStringxAxes,
                    },
                    ticks: {
                        reverse: true,
                        callback: function (value) {
                            return value;
                        },
                        autoSkip: true,
                        maxRotation: 0
                    },

                }],
                yAxes: [{
                    stacked: parseStrToBoolean(globalsetting.stacked),
                    scaleLabel: {
                        display: parseStrToBoolean(globalsetting.scaleLabelDisplayxAxes),
                        labelString: globalsetting.scaleLabelLabelStringyAxes,
                    },
                    ticks: {
                        callback: function (value) {
                            return value / globalsetting.division + globalsetting.unit;
                        }
                    }
                }]
            },
            plugins: {
                datalabels: {
                    display: parseStrToBoolean(globalsetting.datalabelDisplay),
                    color: globalsetting.datalabelColor,
                    align: globalsetting.datalabelAlign,
                    anchor: globalsetting.datalabelAnchor,
                    clamp: parseStrToBoolean(globalsetting.datalabelClamp),
                    offset: globalsetting.datalabelOffset,
                    font: {
                        size: globalsetting.datalabelFontSize,
                    },
                },
            },
        },
        plugins: {
            // 描画完了後に copyImage() を呼び出す
            afterRender: copyImage
        }
    });
}

// Table
function generateTable(index, data) {
    var vistable = document.querySelectorAll('.vis-table');
    var tbl = document.createElement('table');

    var tblThead = document.createElement('thead');
    var row = document.createElement('tr');
    for (var j = 0; j < Object.keys(data[0]).length; j++) {
        var cell = document.createElement('th');
        var cellSpan = document.createElement('span');
        cell.appendChild(cellSpan);

        // セル内改行対応
        var header = data[0][Object.keys(data[0])[j]];
        var headerRows = header.split(/\r?\n/);

        if (headerRows.length > 1) {
            var br = document.createElement('br');

            for (var i = 0; i < headerRows.length; i++) {
                cellSpan.appendChild(br);
                cellSpan.appendChild(document.createTextNode(headerRows[i]));
            };

        } else {
            cellSpan.appendChild(document.createTextNode(header));

        }

        row.appendChild(cell);
    }
    tblThead.appendChild(row);

    var tblBody = document.createElement('tbody');

    // ヘッダー行を除くため1からループ
    for (var i = 1; i < data.length; i++) {
        var row = document.createElement('tr');

        for (var j = 0; j < Object.keys(data[i]).length; j++) {
            var cell = document.createElement('td');
            // Chart.jsでプロットしない点は'null'となる
            var cellText = (data[i][Object.keys(data[i])[j]] == 'null') ? '' : data[i][Object.keys(data[i])[j]];

            // データ列は数字に変換
            if (j > 0) cellText = Number(cellText);
            var cellTextNode = document.createTextNode(cellText);

            // 成長・衰退の色付け
            var highlighter = document.createElement('span');
            // 成長色、減退色に分ける
            if (isNumeric(cellText) && 100 <= cellText) highlighter.className = 'incline';
            else if (isNumeric(cellText) && cellText < 100) highlighter.className = 'decline';

            cell.appendChild(highlighter);
            highlighter.appendChild(cellTextNode);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }

    tbl.appendChild(tblThead);
    tbl.appendChild(tblBody);
    vistable[index].appendChild(tbl);

    var articleWidth = document.querySelector('.articleBody').clientWidth;
    tbl.style.width = articleWidth;
}