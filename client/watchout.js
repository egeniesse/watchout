// start slingin' some d3 here.

var width = window.innerWidth - 200;
var height = window.innerHeight - 200;

var Circle = function(){
  this.left = window.innerWidth * Math.random();
  this.top = window.innerHeight * Math.random();
  this.color = 'black';
}

Circle.prototype.findStartPoint = function(curWall){
  var possibleWalls = Math.floor(Math.random()*4)
  if (possibleWalls === 0 && possibleWalls !== curWall) {
    this.left = 100 
    this.top = Math.random()*height

  } else if (possibleWalls === 1 && possibleWalls !== curWall) {
    this.left = width - 100;
    this.top = Math.random()*height

  } else if (possibleWalls === 2 && possibleWalls !== curWall) {
    this.left = Math.random()*width 
    this.top = height - 100;

  } else if (possibleWalls !== curWall){
    this.left = Math.random()*width 
    this.top = 100
  }
}

d3.selectAll("p")
  .text("Hello World. I was selected from D3")
  .style("color","red")

d3.select("body")
  .append("p")
  .text("This is how append works. We appended a paragraph out of nowhere!")

var svg  = d3.select('body')
              .append('svg')
              .attr('width', width)
              .attr('height', height)


//Create asteroids array of Objects
var asteroids = [];
for (var i = 0; i < 5; i++){
  asteroids.push(new Circle());
}
var player1 = [new Circle]

var colors = ['orange', 'teal', 'purple', 'red', 'green']


//Select asteroids, and assign position
var appendAsteroids = function(){

  svg.selectAll('.asteroids')
     // .each("start", function(d) {
     //    //d.findStartPoint()
     //  })
     .data(asteroids)
     .enter()
     .append('circle')
     .attr('class', 'asteroids')
     .attr('cx', function(d){ return d.left})
     .attr('cy', function(d){ return d.top})
     .attr('r', 30)
}


//Create player
var player1 = svg.append('circle')
                 .attr('cx', 200)
                 .attr('cy', 50)
                 .attr('class', 'player1')
                 .attr('r', 15)
                 .attr('fill', 'red')

svg.on('mousemove', function() {
    var coordinates = [0,0]
    coordinates = d3.mouse(this)
    player1.attr('cx', coordinates[0])
           .attr('cy', coordinates[1])
    })

var colorChange = function(){
  return Math.floor(Math.random()*colors.length);
}

//Move objects around. Call again
var iterations = 0;
var moveAsteroids = function() {
  if(iterations % 5 === 0){   
    asteroids.push(new Circle())
    appendAsteroids();
    colorIndex = colorChange()
  }  

  svg.selectAll('.asteroids')
    .transition()
    .duration(900)
      .attr("cx", function(d) {return d.left})
      .attr("cy", function(d) {return d.top})
      .attr('fill', function(d){ return d.color})
      .each("end", function(d) {
        d.findStartPoint();
        if (iterations % 5 === 0) {
          d.color = colors[colorIndex]
        }
    })
  iterations++

  }

setInterval(moveAsteroids,1200)

var funk = function(){
  //locate player
  var playerLocationX = parseInt(svg.select('.player1').attr('cx'))
  var playerLocationY = parseInt(svg.select('.player1').attr('cy'))  
                                            
                      svg.selectAll('.asteroids').attr('fill' , function(d){return d.color}).each(function(d) {
                        //console.log('!!!')
                        //console.log(d.left)
                        if (Math.sqrt(Math.pow(parseInt(d.left) - playerLocationX, 2) + Math.pow(parseInt(d.top) - playerLocationY, 2)) < 50){
                          console.log("hi")
                        }
                      })
                        //check the total distance
}
//funk();

setInterval(funk, 10)

//Collision Logic

  //constantly running in background

  //Check that distance between asteroid and center of circle not less than 50;

  //if less than 50, ++



















//Enter/Exit/Update

//Enter(). More data than DOM elements or Data > DOM
//Update. more DOM than data or Data === DOM
//Exit. More DOM elements than data or Data < DOM

