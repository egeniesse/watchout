//Bar graph will display high score and current score. Both will dynamically change as game progresses

var results = [playerStats.currentScore, playerStats.highScore, playerStats.collisions]

//Define new SVG area and parameters of objects

var chart = d3.select('body')
              .append('svg')
              .attr('class' , 'container')
              .attr('height', height)
              .attr('width', width)
              .attr('fill','black')

console.log(chart)

var bar = chart.selectAll('div')
              .data(results)
              .enter()
              .transition()
              .duration(100)
              .append('div')
              .attr('class', 'bar')
              .style('height', 40)
              .style('width', 20)
              .attr('fill', 'blue')



//Draw and label the Axes
  
  //be bound to dataset





//Draw the rectangles

  //height will be data

  //width will be constant