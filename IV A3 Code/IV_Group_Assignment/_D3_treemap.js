var treemap_GDP = {};
treemap_GDP.init = function () {
    var data = {
        "name": "A1",
        "children": [
            {
                "name": "B1",
                "children": [
                    {
                        "name": "Manufacturing",
                        "value": 115464.60
                    },
                    {
                        "name": "Construction",
                        "value": 14407.60
                    },
                    {
                        "name": "Retail",
                        "value": 111165.90
                    },
                    {
                        "name": "Professional Services",
                        "value": 130494.70
                    },
                    {
                        "name": "Other Services Industries",
                        "value": 94780.10
                    }
                ]
            },
            // {
            //   "name": "B2",
            //   "value": 522010.40
            // }
        ]
    };

    var treemapLayout = d3.treemap()
        .size([400, 200])
        .paddingOuter(16);

    var rootNode = d3.hierarchy(data)

    rootNode.sum(function (d) {
        return d.value;
    });

    treemapLayout(rootNode);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10); // 创建一个颜色比例尺

    var nodes = d3.select('#treemap-container svg g')
        .selectAll('g')
        .data(rootNode.descendants())
        .enter()
        .append('g')
        .attr('transform', function (d) { return 'translate(' + [d.x0, d.y0] + ')' });

    nodes
        .append('rect')
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style('fill', function (d) {
            return colorScale(d.depth); // 设置不同层次的元素不同颜色
        });

    nodes
        .append('text')
        .attr('dx', 4)
        .attr('dy', 14)
        .style('fill', 'white') // 设置字体颜色
        .text(function (d) {
            return d.data.name;
        });

    // 自定义A1和B1的颜色
    nodes.filter(function (d) {
        return d.depth === 0; // A1的深度为0
    }).select('rect')
        .style('fill', 'lightblue');

    nodes.filter(function (d) {
        return d.depth === 1; // B1的深度为1
    }).select('rect')
        .style('fill', 'lightgreen');
};

treemap_GDP.init();


treemap_GDP.init();
