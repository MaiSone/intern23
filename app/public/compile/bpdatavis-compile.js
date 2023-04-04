if (typeof articleBody !== undefined) {
    articleBody = document.getElementsByClassName('articleBody')[0];
    bpChart = [];
}

function addScriptCrossorigin(src) {
    var newScript = document.createElement('script');
    newScript.src = src;
    newScript.setAttribute('crossorigin', 'anonymous');
    document.body.appendChild(newScript);
};

function addScript(src) {
    var newScript = document.createElement('script');
    newScript.src = src;
    document.body.appendChild(newScript);
};

function addBabelScript(src) {
    var newScript = document.createElement('script');
    newScript.src = src;
    newScript.type = "text/babel";
    document.body.appendChild(newScript);
};

function addLink(href) {
    var newLink = document.createElement('link');
    newLink.href = href;
    newLink.rel = 'stylesheet';
    document.body.appendChild(newLink);
};

// グラフ描画
var currentScript = document.currentScript;
var params = JSON.parse(decodeURI(encodeURI(currentScript.text)));
// console.log(params);
addBpchart(params);






// BPCMSパラメータフォーマット
// {
//     "Source" : "bpchartsetting.json",
//     "Width": "650",
//     "Title": "棒グラフタイトル",
//     "Caption": "棒グラフキャプション",
//     "ImageName": "ScreenshotBarChart.png"
// }
function addBpchart(params) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('bpChart');
    newDiv.style.width = params.Width + 'px';
    newDiv.style.marginTop = '30px';
    newDiv.style.marginBottom = '30px';

    let newLegend = document.createElement('div');
    newLegend.classList.add('bpChartLegend');
    newLegend.style.display = 'inline-block';
    newLegend.style.width = params.Width + 'px';

    let newCanvas = document.createElement('div');
    newCanvas.classList.add('bpChart');
    newCanvas.dataset.bpcmsSource = params.Source;
    newCanvas.dataset.bpcmsTitle = params.Title;
    newCanvas.dataset.bpcmsCaption = params.Caption;
    newCanvas.dataset.bpcmsImageName = params.ImageName;
    newCanvas.width = params.Width;
    newCanvas.height = params.Width;

    // newDiv.appendChild(newLegend);
    // newDiv.appendChild(newCanvas);
    articleBody.appendChild(newCanvas);
}

if (document.querySelector("script[src='/compile/bpchart.js']") == null){
    
    addBabelScript('/compile/bpchart.js');
    // css追加
    addLink('/css/visualdata/legend.css')
    // scriptタグ追加
    addScript('/js/bpcommon/visualdata/Chart.min.js');

   
}

