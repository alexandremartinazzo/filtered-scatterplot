var margin = {top: 20, right: 15, bottom: 60, left: 60}
  , width = 960 - margin.left - margin.right
  , height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
		  //.domain([0, d3.max(data, function(d) { return d[0]; })])
		  .domain([-2, 2])
		  .range([ 0, width ]);

var y = d3.scale.linear()
		  .domain([0, 500])
		  .range([ height, 0 ]);

var chart = d3.select('body')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
	
// draw the x axis
var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

// draw the y axis
var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

var full_data = [];

d3.csv("avaliacoes.csv",
	function(d) { return { ID: d.ID, nota: d.nota, norm: d.norm}; },
	function(error, rows)
	{
		if (error) console.error(rows);
		full_data = rows;

		// data loading is assynchronous, so we render after data is loaded
		render(full_data);
	}
)

var g = main.append("svg:g");

function render(dataset)
{
	if(dataset == null || dataset.length == 0)
		dataset = full_data;

	// D3 general update pattern: http://bl.ocks.org/mbostock/3808218
	var points = g.selectAll('circle').data(dataset);

	points
	  .enter().append("svg:circle")
		  .attr("cx", function (d) { return x( d.norm ); } )
		  .attr("cy", function (d) { return y( d.nota ); } )
		  .attr("r", 5);

	points.exit().remove();
}

function filter1()
{
	// just a stupid example: ID < 200
	var data = full_data.filter(function(d,i){ return d.ID < 200; });
	render(data);
}
