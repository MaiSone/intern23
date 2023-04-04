npm install -g geoproject


cat L01-23_40.geojson \
  | geoproject 'd3.geoConicEqualArea().parallels([35.4,36.3]).rotate([86, 0]).fitSize([960, 960], d)' \
  > L01-23_40_projected.geo.json
