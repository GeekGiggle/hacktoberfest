#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CONSTELLATIONS = {
  // contributors add new constellations here as small arrays of points
  orion: [{x:3,y:1},{x:6,y:2},{x:9,y:1},{x:6,y:5},{x:4,y:7}],
  tiny: [{x:2,y:2},{x:3,y:4},{x:4,y:2}]
};

function draw(constName='orion', w=24, h=12) {
  const grid = Array.from({length:h}, ()=>Array.from({length:w}, ()=>' '));
  const points = CONSTELLATIONS[constName];
  if(!points) {
    console.error('Unknown constellation:', constName);
    console.error('Available:', Object.keys(CONSTELLATIONS).join(', '));
    process.exit(1);
  }
  // scale points into grid (points are small coords)
  points.forEach((p,i)=>{
    const X = Math.max(0, Math.min(w-1, Math.round((p.x / 10) * (w-1))));
    const Y = Math.max(0, Math.min(h-1, Math.round((p.y / 10) * (h-1))));
    grid[Y][X] = '*';
    // draw simple connecting lines to previous
    if(i>0){
      const prev = points[i-1];
      const Xp = Math.round((prev.x/10)*(w-1));
      const Yp = Math.round((prev.y/10)*(h-1));
      drawLine(grid, Xp, Yp, X, Y);
    }
  });
  console.log('\n' + grid.map(row=>row.join('')).join('\n') + '\n');
}

function drawLine(grid, x0,y0,x1,y1){
  // Bresenham-like simple integer line
  const dx = Math.abs(x1-x0), sx = x0<x1?1:-1;
  const dy = -Math.abs(y1-y0), sy = y0<y1?1:-1;
  let err = dx + dy, e2;
  let x = x0, y = y0;
  while(true){
    if(grid[y] && grid[y][x] === ' ') grid[y][x] = '.';
    if(x===x1 && y===y1) break;
    e2 = 2*err;
    if(e2 >= dy){ err += dy; x += sx; }
    if(e2 <= dx){ err += dx; y += sy; }
  }
}

const arg = process.argv[2] || 'orion';
draw(arg);
