// start slingin' some d3 here.

var width = window.innerWidth;
var height = window.innerHeight;
var findStartPoint = function(){
  var arr = [0, 0];

  // var index = Math.floor(Math.random * 2)
  // var othIndex = (index === 0) ? 1 : 0;
  // var axis = (index === 0) ? width : height;
  // var othAxis = (index === 1) ? width : height;
  // (Math.random > 0.5) ? arr[index] = 0 : axis;
  // arr[othIndex] = Math.random()* othAxis;
  // return arr;

  var possibleWalls = Math.floor(Math.random()*4)
  if (possibleWalls === 0) {
    arr[0] = 0 
    arr[1] = Math.random()*height

  } else if (possibleWalls === 1) {
    arr[0] = width 
    arr[1] = Math.random()*height

  } else if (possibleWalls === 2) {
    arr[0] = Math.random()*width 
    arr[1] = height

  } else {
    arr[0] = Math.random()*width 
    arr[1] = 0
  }
  return arr;
}

// var go = function(lastDestination) {
//   lastDestination = lastDestination || Math.floor(Math.random(4));
//   var sameWall = true;
//   while (sameWall) {
//    var newWall = Math.floor(Math.random()*4)
//    if (newWall !== lastDestination) {
//     sameWall = false
//     }
//   }

//   ;
// }

var Circle = function(){
  this.left = window.innerWidth * Math.random();
  this.top = window.innerHeight * Math.random();
  this.destination = findStartPoint();
}

var test = new Circle();

var enemies = [10, 40, 80]

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

// var circle1 = svg.append("circle")
//               .attr("cx", 50)
//               .attr("cy", 250)
//               .attr("r", 50)
//               .attr("fill", "black")



// var circles = svg.selectAll("circle")
//                 .data(enemies)
//                 //.attr("fill", "blue") //update
//                 .enter()
//                   .append("circle")
//                   .attr("cx", function(d){ return d})
//                   .attr("cy", 50)
//                   .attr("r", 25)
//                   .attr("fill", "red") //creates circle since at this point, less circles than data

// var circle3 = svg.append("circle")
//                 .attr("cx", 50)
//                 .attr("cy", 450)
//                 .attr("r", 50)
//                 .attr("fill", "green")

    
// svg.selectAll("circle")
//     .transition()
//     .duration(800)
//       .delay(1000)
//       .attr("cx", Math.random()*650)
//       .attr("cy", Math.random()*650)
//     .each("start", function() {
//       d3.select(this).attr("fill", "blue")
//     })

var asteroids = [];
for (var i = 0; i < 11; i++){
  asteroids.push(new Circle());
}
var player1 = [new Circle]

svg.selectAll('circle')
   .data(asteroids)
   .enter()
   .append('circle')
   .attr('class', 'asteroids')
   .attr('cx', function(d){ return d.left})
   .attr('cy', function(d){ return d.top})
   .attr('r', 50)


var player1 = svg.append('circle')
                 .attr('cx', 200)
                 .attr('cy', 50)
                 .attr('class', 'player1')
                 .attr('r', 25)
                 .attr('fill', 'red')

svg.on('mousemove', function() {
    var coordinates = [0,0]
    coordinates = d3.mouse(this)
    player1.attr('cx', coordinates[0])
           .attr('cy', coordinates[1])
    })

sve.selectAll('.asteroids')




















//Enter/Exit/Update

//Enter(). More data than DOM elements or Data > DOM
//Update. more DOM than data or Data === DOM
//Exit. More DOM elements than data or Data < DOM

