//build codes hierarchy
var codesHierarchy = {code:"Total",children:[
  {code:"Part1",children:[{code:"1_1"},{code:"1_2"},{code:"1_3"},{code:"1_4"}]},
  {code:"Part2",children:[
      {code:"2_1",children:[{code:"2_1_1"},{code:"2_1_2"},{code:"2_1_3"},]},
      {code:"2_2"}
  ]},
  {code:"Part3",children:[{code:"3_1"}]},
  {code:"Part4"}
]};

//values
var values = {
  "1_1":12.4, "1_2":2.4, "1_3":5.8, "1_4":9.2, "2_1_1":2.0, "2_1_2":6.0, "2_1_3":10, "2_2":5.4, "3_1":15.8, "Part4":32.3
};

//build sunburst with first set of values
var sb = d3.sunburst()
    .codesHierarchy(codesHierarchy)
    .set(values);

