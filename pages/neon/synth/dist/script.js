// Synthwave world
let c = document.createElement('canvas').getContext('2d')
let postctx = document.body.appendChild(document.createElement('canvas')).getContext('2d')

// This is for TV-effect
let redFilter = document.createElement('canvas').getContext('2d')
let greenFilter = document.createElement('canvas').getContext('2d')
let blueFilter = document.createElement('canvas').getContext('2d')

let canvas = c.canvas
let frame = 0
let noise = 0

// Properties
let grid = 24
let perspective = 100
let depth = 5000
let cameraY = 100

// Common
let xInterval = depth / grid
let zInterval = depth / grid

let drawLine = (x1, y1, x2, y2) => {
	c.beginPath()
  c.moveTo(x1, y1)
  c.lineTo(x2, y2)
  c.stroke()
}

let drawSun = (x, y, r) => {
	c.fillStyle = c.createLinearGradient(x, y - r, x, y + r)
  c.fillStyle.addColorStop(0.1, "#99d600")
  c.fillStyle.addColorStop(0.8, "#0e453e")
  
  c.beginPath()
  c.arc(x, y, r, 0, Math.PI * 2)
  c.fill()
}
let drawSun2 = (x, y, r) => {
  c.fillStyle = c.createLinearGradient(x, y - r, x, y + r)
  // 0.8 is 80% opaque. Lower this number for more transparency.
  c.fillStyle.addColorStop(0.1, "rgba(153, 214, 0, 0.8)") 
  c.fillStyle.addColorStop(0.8, "rgba(14, 69, 62, 0.8)")
  
  c.beginPath()
  c.arc(x, y, r, 0, Math.PI * 2)
  c.fill()
}

// Render loop
let loop = () => {
	frame++
  
  // Resizing canvas
  if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) { 
  	postctx.canvas.width = 
    canvas.width = 
    redFilter.canvas.width = 
    greenFilter.canvas.width =
    blueFilter.canvas.width =
    postctx.canvas.offsetWidth / 2
    
    postctx.canvas.height = 
    canvas.height = 
    redFilter.canvas.height = 
    greenFilter.canvas.height =
    blueFilter.canvas.height =
    postctx.canvas.offsetHeight / 2
   
  }
  
	c.fillStyle = "#16091f"
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  
  drawSun(0, -64, 158)
  
  c.strokeStyle = "#00e9ff"
  	// Vertical Lines
    for (let i = 0; i < grid * 10; i++) {
    	let x1 = (-grid * 5 + i) * xInterval
      let y1 = cameraY
      let z1 = 1
      
      let x2 = x1
      let y2 = y1
      let z2 = depth
      
     	let px1 = x1 / z1 * perspective;
      let py1 = y1 / z1 * perspective;
      
      let px2 = x2 / z2 * perspective;
      let py2 = y2 / z2 * perspective;
      
      drawLine(px1, py1, px2, py2)
    }
    
    // Horizontal Lines
    for (let i = 0; i <= depth / zInterval; i++) {
			let x1 = -grid * 5 * xInterval
      let y1 = cameraY
      let z1 = i * zInterval - frame * 10 % zInterval
      
      let x2 = grid * 5 * xInterval
      let y2 = y1
      let z2 = z1
      
     	let px1 = x1 / z1 * perspective;
      let py1 = y1 / z1 * perspective;
      
      let px2 = x2 / z2 * perspective;
      let py2 = y2 / z2 * perspective;
      
      if (z1 < 0) continue
      
      drawLine(px1, py1, px2, py2)
    }

  c.fillStyle = "#16091f"
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  drawSun2(0, -64, 158)

	
  c.restore()

  // Post-processing
  // Getting only red colors from canvas
  redFilter.drawImage(canvas, 2, 0)
  redFilter.globalCompositeOperation = 'multiply'
  redFilter.fillStyle = "#f00"
  redFilter.fillRect(0, 0, canvas.width, canvas.height)
  redFilter.globalCompositeOperation = 'source-over'
  
  // Getting only green colors from canvas
  greenFilter.drawImage(canvas, 2, 0)
  greenFilter.globalCompositeOperation = 'multiply'
  greenFilter.fillStyle = "#0f0"
  greenFilter.fillRect(0, 0, canvas.width, canvas.height)
  greenFilter.globalCompositeOperation = 'source-over'
  
  // Getting only blue colors from canvas
  blueFilter.drawImage(canvas, 2, 0)
  blueFilter.globalCompositeOperation = 'multiply'
  blueFilter.fillStyle = "#00f"
  blueFilter.fillRect(0, 0, canvas.width, canvas.height)
  blueFilter.globalCompositeOperation = 'source-over'
  
  // Combine all filter in one with bloom effect and color shifting
    
  // Generates each 5 frame a new color shift
  if (frame % 5 === 0) {
  	noise = Math.random()
  }
  
  postctx.clearRect(0, 0, canvas.width, canvas.height)
  postctx.globalCompositeOperation = 'screen'
  postctx.filter = 'blur(0.5px)'
  postctx.drawImage(redFilter.canvas, 1, 0)
  postctx.drawImage(greenFilter.canvas, -1 * noise, 0)
  postctx.drawImage(blueFilter.canvas, -5 * noise, 0)
  
  
  postctx.filter = 'blur(8px)'
  postctx.drawImage(postctx.canvas, 0, 0)
  postctx.globalCompositeOperation = 'source-over'
  
  requestAnimationFrame(loop)
}

loop()
