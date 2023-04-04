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

//フォント読み込み
// loadFonts();
//csvファイル名特定
const table = document.querySelector('.vis-table');
const defaultCode = table.dataset.visCsv;
//csvファイル読み込み
load(defaultCode);

//NotoSansJP,Heeboの追加
// async function loadFonts() {
//     const NotoSansJP = new FontFace('Noto Sans JP', 'url(/css/nfm/2021/fonts/Noto_Sans_JP/NotoSansJP-Regular.otf)', { style: 'normal', weight: 700});
//     const Heebo = new FontFace('Heebo', 'url(/css/nfm/2021/fonts/Noto_Sans_JP/NotoSansJP-Regular.otf)', { style: 'normal', weight: 700});
//     // wait for font to be loaded
//     await NotoSansJP.load();
//     await Heebo.load();
//     // add font to document
//     document.fonts.add(NotoSansJP);
//     document.fonts.add(Heebo);
// }

// csvファイルを読み込む
function load(defaultCode) {
    // ajaxでCSVファイルをロード
    var req = new XMLHttpRequest();
    var filePath = [defaultCode + '.csv'];
    req.open("GET", filePath, true);
    req.responseType = 'text';

    req.onload = function () {
        // CSVデータ変換の呼び出し
        const data = csv2json(req.responseText);
        // console.log(data);
        //もっと見るまでの行数
        button = document.querySelector('.vis-more-button');
        count = Number(button.dataset.visRow);
        // console.log(count)
        // 描画
        drawLineChart(data[0], data[1], count);
        // 矢印クリック時
        change(data[0], data[1], count);
    }
    req.send(null);
}

//CSVから２次元配列に変換
function csv2json(csvArray) {
    // console.log(csvArray);
    var rows = csvArray.split(/\r?\n/); //改行で区切る
    
    var header = rows[0].split(/,/); // 1行目から「項目名」の配列を生成する
    // console.log(header);

    var jsonObject = [];
    for (var i = 1; i < rows.length; i++) { //行数の分繰り返す
        var row = new Object();
        // var row = new Array();
        var cells = rows[i].split(/,(?! .*)|,(?!.*")/);//引用符の中にあるカンマ以外のカンマで区切る　否定後読み｜否定先読み　/(?<!".*),|,(?!.*")/
        // 否定先読み|否定先日読み　/,(?! .*)|,(?!.*")/　後ろにスペースがないカンマ ｜ 後ろに"がないカンマ
        for (var n = 0; n < header.length; n++) { //列数の分繰り返す
            row[header[n]] = isNaN(cells[n]) ? cells[n] : Number(cells[n]); // 数字でない ? 文字列※引用符削除 : 数字;
            //row[header[n]] = isNaN(cells[n]) ? cells[n].replace(/"/g, '') : Number(cells[n]);
        }
        jsonObject.push(row);
    }
    console.log(jsonObject);

    return [jsonObject, header];

}

//描画
function drawLineChart(jsonObject, header, count) {
    let innerHtml = '';
    // console.log(header.length)
    //列追加（ヘッダー追加）
    innerHtml += '<table class="vis-tableBody"><tr>';
    for(var n = 0; n < header.length; n++){
        if(header[n] == 'website'){
            ;
        }else{
            innerHtml += '<th class="vis-header-'
            innerHtml += header[n];
            innerHtml += '">';
            innerHtml += header[n];
            innerHtml += '<div><span class="vis-sort-up" value="';
            innerHtml += header[n];
            innerHtml += '">∧</span><span class="vis-sort-down" value="';
            innerHtml += header[n];
            innerHtml += '">∨</span></div>';
            innerHtml += '</th>';
        }
    }
    innerHtml += '</tr>';
    //行追加
    for(var i = 0; i < jsonObject.length; i++){
        if(i < count){
            innerHtml += '<tr>';
        }else{
            innerHtml += '<tr class="vis-hidden">';
        }
        for(var n = 0; n < header.length; n++){
            if(n == header.indexOf('website')-1){
                innerHtml += '<td><a href="';
                innerHtml += jsonObject[i]['website'];
                innerHtml += '">';
                innerHtml += jsonObject[i][header[n]];
                innerHtml += '</a></td>';
            }else if(header[n] == 'website'){
                ;
            }else{
                innerHtml += '<td>';
                innerHtml += jsonObject[i][header[n]];
                innerHtml += '</td>';
            }
        }
        innerHtml += '</tr>';
    }
    innerHtml += '</table>';
    document.querySelector('.vis-table').innerHTML = innerHtml;
    
}

//もっと見る・戻す
more = new Boolean();
function moreOrLess() {
    // console.log('click');
    more = !more
    // console.log(more);

    if(more == false){
        const hidden = document.querySelectorAll(".vis-hidden");
        hidden.forEach(element => element.classList.remove('vis-hidden'));
        document.querySelector('.vis-more-button').textContent = "たたむ";
    }else{
        const tr = document.querySelectorAll('.vis-table tr');
        console.log(tr);
        tr.forEach((element,i) => {if(i > count){element.classList.add('vis-hidden')}});
        document.querySelector('.vis-more-button').textContent = "もっと見る";
    }
    
}

const buttonLeft = document.querySelector('.vis-left');
buttonLeft.onclick = function () {
    document.querySelector('.vis-table').scrollLeft -= 100;
};
const buttonRight = document.querySelector('.vis-right');
buttonRight.onclick = function () {
    document.querySelector('.vis-table').scrollLeft += 100;
};

//矢印クリック
function change(jsonObject, header, count){
    //昇順
    const sort = document.querySelectorAll("[class^='vis-sort']");
    sort.forEach(function(el, i) {
        el.addEventListener('click', function(){
            var value = el.getAttribute("value");
            // console.log(value);
            // var type = el.parentNode.dataset.type;
            if(el.className == "vis-sort-up"){
                // console.log(".vis-up");
                //ソート昇順
                // console.log(typeof jsonObject[0][value]);
                jsonObject.sort(function(a, b) {
                    if(typeof jsonObject[0][value] == "number"){
                        return (a[value] < b[value] ? -1 : 1);
                    }else if(typeof jsonObject[0][value] == "string"){
                        try{
                            return a[value].localeCompare(b[value], 'ja', {ignorePunctuation: true}); 
                        }catch(e){ //Android Webviewはlocales, optionsに非対応
                            return a[value].localeCompare(b[value]); 
                        }
                        
                    }    
                });
                // jsonObject.sort(new Intl.Collator('de', { sensitivity: 'base' }).compare(a[value], b[value]))
            }else if(el.className == "vis-sort-down"){
                // console.log(".vis-down");
                //ソート降順
                // console.log(typeof jsonObject[0][value]);

                jsonObject.sort(function(a, b) {
                    if(typeof jsonObject[0][value] == "number"){
                        return (a[value] > b[value] ? -1 : 1);
                    }else if(typeof jsonObject[0][value] == "string"){
                        try{
                            return b[value].localeCompare(a[value], 'ja', {ignorePunctuation: true});
                        }catch(e){ //Android Webviewはlocales, optionsに非対応
                            return b[value].localeCompare(a[value]); 
                        }
                    }
                });
            }
            // console.log(jsonObject);
            //描画
            drawLineChart(jsonObject, header, count);
            //ソート
            change(jsonObject, header, count);
        })
    })
}