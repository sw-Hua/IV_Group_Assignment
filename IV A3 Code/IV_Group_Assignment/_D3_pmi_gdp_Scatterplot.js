var scatterplot = {};

scatterplot.init = function() {
    var margin = {top: 10, right: 30, bottom: 45, left: 60};
    var width = 460 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#div_graph_id")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scatter Plot 的代码部分，请确保使用 scatterplot 命名空间来定义变量和函数
    // 避免使用全局变量
    //Read the data
d3.csv("pmi_gdpG.csv", function(data) {

    // Add X axis
    var x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return +d.pmi_value; })-2, d3.max(data, function(d) { return +d.pmi_value; })])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
  
        // Add X axis label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 40) // 调整Y坐标以确保标签在x轴下方
      .style("text-anchor", "middle")
      .text("Purchasing Managers' Index (PMI)");
  
      svg.append("line")
      .attr("x1", x(50))
      .attr("y1", 0)
      .attr("x2", x(50))
      .attr("y2", height)
      .attr("stroke", "black") // 设置线的颜色
      .attr("stroke-width", 2); // 设置线的宽度
      
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return +d.gdp_in_chained_2015_dollars; })-2, d3.max(data, function(d) { return +d.gdp_in_chained_2015_dollars; })])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
  
        // Add Y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("GDP Growth Rate(%)");
  
      // 为y轴添加一条水平线
  svg.append("line")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", width)
      .attr("y2", y(0))
      .attr("stroke", "black") // 设置线的颜色
      .attr("stroke-width", 2); // 设置线的宽度
  
    // Add dots
    svg.append('g')
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) {  return x(d.pmi_value); } )
        .attr("cy", function (d) {  return y(d.gdp_in_chained_2015_dollars); } )
        .attr("r", 5)
        .style("fill", "#69b3a2")
  
  })
  
};

scatterplot.init();









