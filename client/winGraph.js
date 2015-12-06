//Bar graph will display high score and current score. Both will dynamically change as game progresses

var results = [playerStats.currentScore, playerStats.highScore, playerStats.collisions]
var res = [{height :480, position: 1},{height: 29, position: 2} , {height:300, position:3}]

//Define new SVG area and parameters of objects

var chart = d3.select('body')
              .append('svg')
              .attr('class' , 'container')
              .attr('height', height)
              .attr('width', width)
              .attr('fill','black')

console.log(chart)

var bar = chart.selectAll('.bar')
              .data(res)
              .enter()              
              .append('rect')
              .attr('y', function(d){return height-d.height})
              .attr('x', function(d){ return width/3 * d.position -width/4})
              .attr('class', 'bar')
              .style('height', function(d){return (d.height)})
              .style('width', width/5)
              .style('float', 'left')
              .attr('fill', 'blue')



var updateGraph = function(score, highScore, collisions){

  var updatedData = [{height: score * 10, position: 1},{height: highScore * 10, position: 2} , {height:collisions * 100, position:3}]
  console.log(updatedData[0].height)

d3.select('body')
     .selectAll('.bar')
     .data(updatedData)
     .style('height', function(d){ return d.height*100})
     .attr('y', function(d){ return height- d.height})
}
//updateGraph(playerStats.currentScore, playerStats.highScore, playerStats.collisions);
setInterval(function(){
  updateGraph(playerStats.currentScore, playerStats.highScore, playerStats.collisions);
}, 100)



//Draw and label the Axes
  
  //be bound to dataset


//Draw the rectangles

  //height will be data

  //width will be constant