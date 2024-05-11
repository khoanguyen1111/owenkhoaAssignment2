document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);

// const draw_frame = () => {
//    ctx.fillStyle = `turquoise`
//    ctx.fillRect (0, 0, innerWidth, innerHeight)

//    requestAnimationFrame (draw_frame)
// }

// draw_frame ()

// window.onresize = () => {
//    cnv.width = innerWidth
//    cnv.height = innerHeight
// }

const glitch_arr = [];

// Array to hold floating text objects
const textArr = [];

// Define function that adds glitch effect to the glitch array
const add_glitch = () => {
  // Generate glitch frames
  for (let i = 0; i < 10; i++) {
    const noiseData = generateRandomNoise(cnv.width, cnv.height);
    const imageData = new ImageData(
      new Uint8ClampedArray(noiseData),
      cnv.width,
      cnv.height
    );
    createImageBitmap(imageData).then((imageBitmap) => {
      glitch_arr.push(imageBitmap);
      // Once there are enough frames, start animating
      if (glitch_arr.length === 10) draw_frame();
    });
  }
};

// Define function to draw the glitch frame
const draw_frame = () => {
  // Clear canvas
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  // Draw the glitch frame
  const glitch_i = Math.floor(Math.random() * glitch_arr.length);
  ctx.drawImage(glitch_arr[glitch_i], 0, 0, cnv.width, cnv.height);

  // Update and draw floating text
  textArr.forEach((text) => {
    text.update();
    text.draw();
  });

  // Schedule next frame
  requestAnimationFrame(draw_frame);
};

// Function to generate random noise data
function generateRandomNoise(width, height) {
  const noiseData = [];
  for (let i = 0; i < width * height * 4; i++) {
    noiseData.push(Math.floor(Math.random() * 256));
  }
  return noiseData;
}

// Class for floating text
class FloatingText {
  constructor(x, y, text, fontSize) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.dx = Math.random() * 2 + 1; // Speed in x direction
    this.dy = Math.random() * 2 + 1; // Speed in y direction
    this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`; // Random color
    this.fontSize = fontSize; // Font size
  }

  update() {
    // Bounce off horizontal borders
    if (this.x < 0 || this.x + ctx.measureText(this.text).width > cnv.width) {
      this.dx *= -1;
    }
    // Bounce off vertical borders
    if (this.y < 0 || this.y > cnv.height) {
      this.dy *= -1;
    }
    // Update position
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.font = `${this.fontSize}px Arial`; // Set font size
    ctx.fillText(this.text, this.x, this.y);
  }
}

// Start adding glitch frames and floating text
add_glitch();

// Add floating text to the array
textArr.push(new FloatingText(cnv.width / 2, cnv.height / 2, "I", 60)); // Font size 30
textArr.push(new FloatingText(cnv.width / 3, cnv.height / 3, "LOVE YOU", 40)); // Font size 40
textArr.push(
  new FloatingText((cnv.width * 2) / 3, (cnv.height * 2) / 3, "MISS YOU", 50)
); // Font size 50
textArr.push(new FloatingText(cnv.width / 2, cnv.height / 2, "I", 60)); // Font size 30
textArr.push(new FloatingText(cnv.width / 3, cnv.height / 3, "BE", 40)); // Font size 40
textArr.push(
  new FloatingText((cnv.width * 2) / 3, (cnv.height * 2) / 3, "HAPPY", 50)
); // Font size 50
textArr.push(
  new FloatingText(cnv.width / 2, cnv.height / 2, "BE PRODUCTIVE", 60)
); // Font size 30
textArr.push(new FloatingText(cnv.width / 3, cnv.height / 3, "STOP", 40)); // Font size 40
textArr.push(
  new FloatingText((cnv.width * 2) / 3, (cnv.height * 2) / 3, "NEGATIVE", 50)
); // Font size 50
textArr.push(new FloatingText(cnv.width / 2, cnv.height / 2, "DRINK", 60)); // Font size 30
textArr.push(new FloatingText(cnv.width / 3, cnv.height / 3, "WATER", 40)); // Font size 40
textArr.push(
  new FloatingText((cnv.width * 2) / 3, (cnv.height * 2) / 3, "PLEASE", 50)
);
