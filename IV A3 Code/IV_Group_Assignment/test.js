// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 45, left: 60},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var div = d3.select("#chart-container");
var width = +div.style("width").replace("px", "");
var height = +div.style("height").replace("px", "");
var radius = Math.min(width, height) / 2;