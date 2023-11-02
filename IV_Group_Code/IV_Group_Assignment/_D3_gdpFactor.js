var piechart = {};

piechart.init = function() {
    var div = d3.select("#chart-container");
    var width = +div.style("width").replace("px", "");
    var height = +div.style("height").replace("px", "");
    var radius = Math.min(width, height) / 2;

    var svg = div.append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Pie Chart 的代码部分，请确保使用 piechart 命名空间来定义变量和函数
    // 避免使用全局变量
    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

var pie = d3.pie().value(function(d) { 
    return d.percentage; 
});

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(150);

var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 80);

d3.csv("gdpFactor.csv", function(error, data) {
    if (error) {
        throw error;
    }
    var arc = g.selectAll(".edit")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "edit");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.factor); });

    arc.append("text")
        .attr("transform", function(d) { 
            return "translate(" + label.centroid(d) + ")"; 
        })
        .text(function(d) { return d.data.factor; });
});

svg.append("g")
    .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
    .append("text")
    .text("Singapore Economy Factor GDP - 2022")
    .attr("class", "title");
};

piechart.init();

