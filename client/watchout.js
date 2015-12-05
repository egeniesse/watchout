// start slingin' some d3 here.

var width = window.innerWidth - 200;
var height = window.innerHeight - 200;

var Circle = function(){
  this.newLeft = window.innerWidth * Math.random();
  this.newTop = window.innerHeight * Math.random();
  this.left = 0;
  this.top = 0;
  this.curPosLeft;
  this.curPosTop;
  this.color = 'black';
}

Circle.prototype.findStartPoint = function(curWall){
  var possibleWalls = Math.floor(Math.random()*4)
  this.left = this.newLeft;
  this.top = this.newTop;
  if (possibleWalls === 0 && possibleWalls !== curWall) {
    this.newLeft = 100 
    this.newTop = Math.random()*height

  } else if (possibleWalls === 1 && possibleWalls !== curWall) {
    this.newLeft = width - 100;
    this.newTop = Math.random()*height

  } else if (possibleWalls === 2 && possibleWalls !== curWall) {
    this.newLeft = Math.random()*width 
    this.newTop = height - 100;

  } else if (possibleWalls !== curWall){
    this.newLeft = Math.random()*width 
    this.newTop = 100
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

var playerStats = new Circle()

playerStats.currentScore = 0;
playerStats.collisions = 3;
playerStats.highScore = 0;



var colorChange = function(){
  return Math.floor(Math.random()*colors.length);
}

//Move objects around. Call again
var iterations = 0;
var moveAsteroids = function() {
  playerStats.currentScore += 1;
  if(playerStats.highScore < playerStats.currentScore){
    playerStats.highScore = playerStats.currentScore;
  }
  d3.select('.currentScore')
    .data([playerStats])
    .text(function(d) {return d.currentScore})
  d3.select('.highScore')
    .data([playerStats])
    .text(function(d) {return d.highScore})
  d3.select('.collision')
    .data([playerStats])
    .text(function(d){return d.collisions})

  if(iterations % 5 === 0){   
    asteroids.push(new Circle())
    appendAsteroids();
    colorIndex = colorChange()
  }  

  svg.selectAll('.asteroids')
    .transition()
    .duration(1000)
      // .attr("cx", function(d) {return d.newLeft})
      // .attr("cy", function(d) {return d.newTop})
      .attr('fill', function(d){ return d.color})
      .each("end", function(d) {
        d.findStartPoint();
        if (iterations % 5 === 0) {
          d.color = colors[colorIndex]
        }
    })
      .tween('custom', updateEnemy)
  iterations++

  }

setInterval(moveAsteroids,1300)


var updateEnemy = function() {
  var ass = d3.select(this);
  var newTop, newLeft, top, left;
  var assLocate = ass.attr('location', function(d) {
    newTop = parseInt(d.newTop);
    newLeft = parseInt(d.newLeft); 
    top = parseInt(d.top);
    left = parseInt(d.left);
    })

  return function(t) {
    ass.attr("newPositionX", function(d){ d.curPosLeft = (left) + (newLeft - left)*t;
                                         d.curPosTop = top + (newTop - top)*t;
    ass.attr('cx', d.curPosLeft)
       .attr('cy', d.curPosTop);
    })
  }
}

var bringDaFunk = function(){
  //locate player
  var playerLocationX = parseInt(svg.select('.player1').attr('cx'))
  var playerLocationY = parseInt(svg.select('.player1').attr('cy'))
  
                                            
                      svg.selectAll('.asteroids').attr('tween', function(d){return d.color}).each(function(d) {
                        if (Math.sqrt(Math.pow(parseInt(d.curPosLeft) - playerLocationX, 2) + Math.pow(parseInt(d.curPosTop) - playerLocationY, 2)) < 50){
                          playerStats.collisions--;
                          clearInterval(collisionIndicator)
                          
                          
                          if (playerStats.collisions === 0) {
                            playerStats.currentScore = 0;
                            playerStats.collisions = 3;
                          }
                          setTimeout(1000, function() {})
                          collisionIndicator = setInterval(bringDaFunk, 10)
                        }
                      })
                        //check the total distance
}
//funk();

var collisionIndicator = setInterval(bringDaFunk, 10)
bringDaFunk();



//Enter/Exit/Update

//Enter(). More data than DOM elements or Data > DOM
//Update. more DOM than data or Data === DOM
//Exit. More DOM elements than data or Data < DOM

