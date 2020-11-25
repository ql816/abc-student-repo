let margin = 300;
let gap_between_views = 150;
var max_x = 1000;
var max_y = 1000;
var max_y2 = 1000;
console.log(document.body)
var dict_mon = {1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep"};

function render (month_chosen) {
	d3.csv('citi_bike_2020.csv').then(function(csvdata){
	   //console.log(csvdata);
	   //console.log(csvdata.length);
		 var data = new Array();
		 var data_dict = {};
			csvdata.forEach(d => {
					var station = d.station;
					var start_from = +d.start_from;
					var end_in = +d.end_in;
	        var trip_duration_start_from = +d.trip_duration_start_from;
	        var trip_duration_end_in = +d.trip_duration_end_in;
	        var month = d.month;
	        var thisdata = [];
	        thisdata.push(month);
	        thisdata.push(trip_duration_start_from);
	        thisdata.push(trip_duration_end_in);
					thisdata.push(start_from);
	        if (Object.keys(data_dict).includes(station)){
						data_dict[station].push(thisdata);
					}
					else{
						data_dict[station] = [thisdata];
					}
	        if (parseFloat(trip_duration_start_from) > max_x) {
	          max_x = parseFloat(trip_duration_start_from);
	        }
	        if (parseFloat(trip_duration_end_in) > max_y) {
	          max_y = parseFloat(trip_duration_end_in);
	        }
					if (parseFloat(start_from) > max_y2) {
						max_y2 = parseFloat(start_from);
					}
					// console.log( "station: " + station + "\n" +
					// 			 "start_from: " + start_from + "\n" +
					// 			 "end_in: " + end_in         +"\n" +
	       	// 			 "trip_duration_start_from: " + trip_duration_start_from + "\n" +
	        //        "trip_duration_end_in: " + trip_duration_end_in + "\n" +
	        //        "month: " + month  );
				});
				//console.log(data);
				for (this_station in data_dict){
					temp_data = data_dict[this_station];
					for (let i = 0; i<temp_data.length;i++) {
						monthly_data = temp_data[i];
						if (monthly_data[0] == month_chosen){
							this_data = [];
							this_data.push(this_station);
							this_data.push(monthly_data[1]);
							this_data.push(monthly_data[2]);
							this_data.push(monthly_data[3]);
							data.push(this_data);
						}
					}
				}
				//console.log(data);

				var svg = d3.select("svg");
				d3.select("svg").selectAll("g").remove();
				var w = svg.attr("width") - margin ;
				var h  = (svg.attr("height") - margin - 70)/2 ;
				var padding = 4;
				var xScale = d3.scaleLinear()
								.domain([0,  max_x])
								.range([0, w])
								.nice();
				var yScale = d3.scaleLinear()
								.domain([0, max_y])
								.range([h, 0])
								.nice();
				var xAxis = d3.axisBottom(xScale);
				var yAxis = d3.axisLeft(yScale)
																		 .ticks(5);


				var g = svg.append("g")
								.attr("transform", "translate(" + margin/2 + "," + margin/2 + ")");

				g.append('g')
				 .attr("transform", "translate(0," +h+ ")")
				 .attr('class', 'x-axis')
				 .style('z-index', '2')
				 .call(xAxis);

				g.append("text")
 				.text("Trip Duration start from")
					.attr("dy","21.5em")
					.attr("dx","30em")
					.attr("font-size","12px");

				g.append('g')
				 .attr('class', 'y-axis')
				 .style('z-index', '2')
				 .call(yAxis);

				 g.append("text")
				 .text("Trip Duration End In")
				 .attr("transform", "rotate(-90)")
					.attr("dy","1em")
					.attr("dx","-9em")
					.attr("font-size","12px");

				 var xScale2 = d3.scaleBand()
												 .domain(data.map(function(d) { return d[0]; }))
												 .range([0, w]);

				var yScale2 = d3.scaleLinear()
												.domain([0, max_y2])
												.range([h, 0])
												.nice();

				 var xAxis_2 = d3.axisBottom(xScale2);
				 var yAxis_2 = d3.axisLeft(yScale2)
																	.ticks(5);
				 var bar = svg.append("g")
										 .attr("transform", "translate(" + margin/2 + "," + (margin/2 + h + 70) + ")");
										 bar.append('g')
												 .attr("transform", "translate(0," +h+ ")")
												 .attr('class', 'x-axis')
												 .style('z-index', '2')
												 .call(xAxis_2)
												.selectAll("text")
												.style("font-size", "8px")
												.style("text-anchor", "end")
												.attr("transform", "rotate(-55 -5 10)");
						 bar.append('g')
								 .attr('class', 'y-axis')
								 .style('z-index', '2')
								 .call(yAxis_2);
						bar.append("text")
							.text("Biker start from")
				 			.attr("dy","-1em")
				 			.attr("dx","-1em")
				 			.attr("font-size","12px");

				 let tooltip = d3.select('body')
				       	.append('div')
				       	.style('position', 'absolute')
				         .style('z-index', '10')
				       	.style('color', 'black')
				         .style('visibility', 'hidden')
				         .style('font-size', '12px')
				       	.style('font-weight', 'bold')
								.style("background-color",'yellow')
				       	.text('')


	      g.selectAll('.point')
	         .data(data)
	         .enter()
	          .append("circle")
	          .attr('class','point')
						.attr('id',function(d){
							let id=d[0].replace(/[^A-Z0-9]+/ig, "_");
							id = id.replace(/\d/g, "X");
							return id;
						})
	          .attr("cx", function(d) {
	                  return xScale(d[1]);
	                })
	          .attr("cy", function(d) {
	                   return yScale(d[2]);
	                  })
	          .attr("r", 5)
	          .attr("fill","steelblue")
	          .attr("stroke","black")
	          .attr("stroke-width",2)
						.style('z-index', '1')
	          .on("mouseover",function(d,i){
								tooltip.style('visibility', 'visible').text(i[0])
								d3.selectAll("#"+this.id)
								.transition(300)
								.attr("fill","red");
								d3.select(this)
									.transition(300)
									.attr("fill","red")
									.attr("r",10);


	      })

	        .on('mousemove', function (d, i) {
	          return tooltip.style('top', (event.pageY-10)+'px').style('left',(event.pageX+10)+'px')
	        })
	          .on("mouseout",function(d,i){
										tooltip.style('visibility', 'hidden')
										d3.selectAll("#"+this.id)
										.transition(300)
										.attr("fill","steelblue");
										d3.select(this)
											.transition(300)
											.attr("fill","steelblue")
											.attr("r",5)
								});

						let length = data.length;
						let each = max_x/length;
							bar.selectAll("rect")
								   .data(data)
								   .enter()
								   .append("rect")
									 .attr("class","MyRect")
									 .attr('id',function(d){
										 let id=d[0].replace(/[^A-Z0-9]+/ig, "_");
										 id = id.replace(/\d/g, "X");
				 						return id;
									 })
									 .attr("x", function(d,i){
						            return i*xScale2.bandwidth() ;
						        } )
										.attr("y",function(d){
						            return yScale2(d[3]);
						        })
								    .attr("width", xScale2.bandwidth()  )
									 .attr("height", function(d) {
	    					 		return  h - yScale2(d[3]);
	})
									.attr("fill","steelblue")
									.attr("stroke","black")
									.attr("stroke-width",2)
									.style('z-index', '1')
									.on("mouseover",function(d,i){
										d3.selectAll("#"+this.id)
										.transition(300)
										.attr("r",10)
										.attr("fill","red");
											 d3.select(this)
												 .transition(300)
												 .attr("fill","red")
							})
									.on("mouseout",function(d,i){
										d3.selectAll("#"+this.id)
										.transition(300)
										.attr("r",5)
										.attr("fill","steelblue");
														d3.select(this)
															.transition(300)
															.attr("fill","steelblue")
											});

	});

};

var slider = document.getElementById("slider")
var text = document.getElementById("slidertext")
let now_month = 5;
slider.addEventListener("input" ,function() {
	now_month = slider.value;
	text.value = dict_mon[now_month];
	d3.select("svg").selectAll("g").remove();
	render(dict_mon[now_month]);
})
slidertext.addEventListener("change" ,function() {
	now_month = slidertext.value;
	d3.select("svg").selectAll("g").remove().transition(300);
	render(now_month);
}
)
setTimeout(render("May"),1000);
