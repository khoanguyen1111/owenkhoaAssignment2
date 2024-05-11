document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const cnv = document.getElementById(`cnv_element`);
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext(`2d`);

cnv.style.backgroundColor = "deeppink";

cnv.style.backgroundColor = "darkseagreen";

let hitMe = true; // Boolean variable to control animation

// Function to generate random noise with color
function generateRandomColoredNoise(width, height) {
  const noiseData = ctx.createImageData(width, height);
  for (let i = 0; i < noiseData.data.length; i += 4) {
    // Generate random values for RGB channels
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    // Assign random color to each pixel
    noiseData.data[i] = red; // Red channel
    noiseData.data[i + 1] = green; // Green channel
    noiseData.data[i + 2] = blue; // Blue channel
    noiseData.data[i + 3] = 255; // Alpha channel
  }
  return noiseData;
}

// Function to apply glitch effect to the canvas
function applyGlitchEffect() {
  // Generate random colored noise
  const noiseData = generateRandomColoredNoise(cnv.width, cnv.height);
  // Draw the noise pattern on the canvas
  ctx.putImageData(noiseData, 0, 0);
}

// Class for bouncing text
class BouncingText {
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
    if (this.y < this.fontSize || this.y + this.fontSize > cnv.height) {
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

// Array to hold bouncing text objects
const textArr = [];

// Function to create bouncing texts
function createBouncingTexts() {
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "I", 50)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 3, cnv.height / 3, "LOVE", 60)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "YOU", 20)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 3, cnv.height / 3, "I", 30)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "LOVE", 70)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 3, cnv.height / 3, "YOU", 30)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "I", 80)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 3, cnv.height / 3, "LOVE", 30)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "I", 40)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 3, cnv.height / 3, "LOVE", 30)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "YOU", 70)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 3, cnv.height / 3, "I", 30)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "LOVE", 50)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 3, cnv.height / 3, "YOU", 30)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "I", 70)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 3, cnv.height / 3, "PRESS", 90)); // Add bouncing text
  textArr.push(new BouncingText(cnv.width / 2, cnv.height / 2, "SPACE", 90)); // Add bouncing text
  // Add more bouncing texts as needed
}

// Function to update and draw bouncing texts
function updateAndDrawBouncingTexts() {
  // Apply glitch effect if animation is toggled on
  if (hitMe) {
    applyGlitchEffect();
  }
  // Update and draw each bouncing text if animation is toggled on
  if (hitMe) {
    textArr.forEach((text) => {
      text.update();
      text.draw();
    });
  }
}

// Function to create glitch effect animation
function glitchAnimation() {
  // Clear canvas
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  // Update and draw bouncing texts
  updateAndDrawBouncingTexts();
  // Schedule next frame
  if (hitMe) {
    requestAnimationFrame(glitchAnimation);
  }
}

// Start the glitch animation
createBouncingTexts(); // Create initial bouncing texts
glitchAnimation();

// Toggle animation on spacebar press
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    hitMe = !hitMe; // Toggle animation
    if (hitMe) {
      glitchAnimation(); // Start animation if toggled on
    }
  }
});
