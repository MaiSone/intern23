// csvファイルを読み込む
function load() {
  // ajaxでCSVファイルをロード
  var req = new XMLHttpRequest();
  var filePath = ['data.csv'];
  req.open("GET", filePath, true);
  req.responseType = 'text';

  req.onload = function () {
      // CSVデータ変換の呼び出し
      const data = csv2arr(req.responseText);
      console.log(data)
  }
  req.send(null);
}

//CSVから２次元配列に変換
function csv2arr(csvArray) {

  var arr = [];
  var rows = csvArray.split(/\r?\n/); //改行で区切る
  var columnName = rows[0].split(","); // 1行目から「項目名」の配列を生成する

  for (var i = 1; i < rows.length ; i++) { //行数の分繰り返す
      var row = new Array();
      var cells = rows[i].split(",");
      for (var n = 0; n < columnName.length; n++) { //列数の分繰り返す
          row[columnName[n]] = cells[n];
      }
      arr.push(row);
  }

// arr.forEach(e => {
  fetch("https://bpsearch.nikkeibp.co.jp/NXT/2020/query.js?output=JSON&query=fq=path:/sites/tech.nikkeibp.co.jp/atcl/nxt/column/18/00998/index.html")
  .then(response => response.json())
  .then(data => {
    // レスポンスデータをオブジェクトとして扱う
    console.log(data);
  })
  .catch(error => console.error(error));
// })
  





  console.log(arr)
}

load();
//   cate1 = [];
//   for (var n = 0; n < arr.length; n++) {
//       cate1.push(arr[n]["cate1"]);
//   } 
//   cate2 = [];
//   for (var n = 0; n < arr.length; n++) {
//       cate2.push(arr[n]["cate2"]);
//   } 
//   level = [];
//   for (var n = 0; n < arr.length; n++) {
//       level.push(arr[n]["level"]);
//   } 
//   title = [];
//   for (var n = 0; n < arr.length; n++) {
//       title.push(arr[n]["title"]);
//   } 

//   var set1 = new Set(cate1);
//   var set2 = new Set(cate2);
//   var set3 = new Set(level);
//   var set4 = new Set(title);

//   var newArr1 = [...set1];
//   var newArr2 = [...set2];
//   var newArr3 = [...set3];
//   var newArr4 = [...set4];

//   console.log([newArr1,newArr2,newArr3]);
//   arr1 = [];
//   depth1 = {};
//   arr2 = [];
//   depth2 = {};
//   arr3 = [];
//   depth3 = {};
//   arr4 = [];
//   depth4 = {};
  
//   newArr1.forEach(el => {
//     depth1 = {
//       "name":el, 
//       "children": {
//         "name":"",
//         "children":{
//           "name":"",
//           "children":{
            
//           }
//         }
//       }
//     }
//     arr1.push(depth1);
//   })
//   console.log(["arr1",arr1])

//   newArr2.forEach(el => {
//     depth2 = {
//       "name":el, "children": ""
//     }
//     arr2.push(depth2);
//   })
//   console.log(["arr2",arr2])

//   newArr3.forEach(el => {
//     depth3 = {
//       "name":el, "children": ""
//     }
//     arr3.push(depth3);
//   })
//   console.log(["arr3",arr3])

//   newArr4.forEach(el => {
//     depth4 = {
//       "name":el, "children": ""
//     }
//     arr4.push(depth4);
//   })
//   console.log(["arr4",arr4])

  
//   var filteredArrs = [];
//   for(var i = 0; i < newArr1.length; i++){
//     const filteredArr = arr.filter(function(item) {
//       return item["cate1"] === newArr1[i];
//     });
//     console.log(filteredArr); // [[1, 2, 3]]
//     filteredArrs.push(filteredArr);

//     for(var n = 0; n < filteredArr.length; n++){
//       arr1[i].children.children.children = {
//         "name":filteredArr[n].title, 
//         "value": 1,
//         "href": filteredArr[n].url,
//         "description": filteredArr[n].description,
//         "img": filteredArr[n].img,
//         "level":filteredArr[n].level
//       };
//     }
    
//   }
//   console.log(filteredArrs);

//   const obj = {prop1: "value1", prop2: "value2", prop3: "value3"};

//   const propNames = Object.keys(obj);

//   for (let i = 0; i < propNames.length; i++) {
//     console.log(obj[propNames[i]]);
//   }


//   var filteredArrs2 = [];
//   for(var i = 0; i < newArr1.length; i++){
//     if (hasValue(filteredArrs[0], newArr1[i])) {

//       console.log("値が 'alice@example.com' のプロパティが存在します");
//     } else {
//       console.log("値が 'alice@example.com' のプロパティは存在しません");
//     }
//   }
//   console.log(filteredArrs2); // [[1, 2, 3]]
//   // arr1[i].children = {
//   //   "name":newArr2[i], "children": ""
//   // };

//   function hasValue(obj, value) {
//     // オブジェクトの値を含む配列を取得する
//     const values = Object.values(obj);
  
//     // 配列の要素を1つずつ調べる
//     for (const val of values) {
//       if (typeof val === "object") {
//         // 要素がオブジェクトの場合は再帰的に探索する
//         if (hasValue(val, value)) {
//           return true;
//         }
//       } else {
//         // 要素が値の場合は比較する
//         if (val === value) {
//           return true;
//         }
//       }
//     }
  
//     return false;
//   }
  
  
  



  
  
    
//     for(var i = 0; i < arr3.length; i++){
//     //   if(el.level === arr3.name){
//         arr3[i].children = arr4;
//     //   }
//     }
  

//   // for(var i = 0; i < arr.length; i++){
//   //   if(arr[i].cate1  
//   // }
  
  

//   console.log(arr1)
  
  

  
    




//   // console.log(arr);
//   for(var i = 0; i < arr.length; i++) {
    
//     // async function callDescription() {

//     //   var url = arr[i]["url"];//http://tech.nikkeibp.co.jp/atcl/learning/lecture/19/00001/
//     //   var path = url.split('atcl');
//     //   var parentPath = '/sites/tech.nikkeibp.co.jp/atcl' + path[1]
//     //   // console.log(parentPath);


//     //   var reqUrl = 'https://bpsearch.nikkeibp.co.jp/NXT/2020/query.js?output=JSON&query=' + parentPath;
//     //   var res = await fetch(reqUrl);

//     //   var description = res["docs"]["Description"];
//     //   arr[i]["description"] = description;

//     //   var img = res["docs"]["TypicalImageS"];
//     //   var imgReqUrl = 'https://bpsearch.nikkeibp.co.jp/ALL/img2bpimage.json?path='+ parentPath + img + '&callback=cb_bpimage';
//     //   var imgRes = await fetch(imgReqUrl);
//     //   var cdnImg = imgRes["result"][parentPath + img];
//     //   // console.log(cdnImg)
//     //   arr[i]["img"] = cdnImg;

//     // }
//     // callDescription();
//   }

  
  
  
//   return arr;

// }

// function arr2json(arr){
  

//   var cate1 = [];
  
//   arr.forEach(element => {
//     cate1.push(element["cate1"]);
//   });
//   var set = new Set(arr);
//   var newArr = [...set];
//   console.log(newArr);

// }






// (async function() {
//   try {
//     const res = await fetch("data.json");
//     const json = await res.json();
//     console.log(json);
//     load();
//   } catch(error) {
//     console.log(error);
//   }
// })();