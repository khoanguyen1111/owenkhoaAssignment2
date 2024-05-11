document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.getElementById (`cnv_element`)
cnv.width = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext (`2d`)



cnv.style.backgroundColor = 'deeppink';


const glitch_arr = [];


const textArr = [];


const add_glitch = () => {
   
    for (let i = 0; i < 10; i++) {
        const noiseData = generateRandomNoise(cnv.width, cnv.height);
        const imageData = new ImageData(new Uint8ClampedArray(noiseData), cnv.width, cnv.height);
        createImageBitmap(imageData).then((imageBitmap) => {
            glitch_arr.push(imageBitmap);
            
            if (glitch_arr.length === 10) draw_frame();
        });
    }
};


const draw_frame = () => {

    ctx.clearRect(0, 0, cnv.width, cnv.height);
    const glitch_i = Math.floor(Math.random() * glitch_arr.length);
    ctx.drawImage(glitch_arr[glitch_i], 0, 0, cnv.width, cnv.height);
    textArr.forEach(text => {
        text.update();
        text.draw();
    });

   
    requestAnimationFrame(draw_frame);
};


function generateRandomNoise(width, height) {
    const noiseData = [];
    for (let i = 0; i < width * height * 4; i++) {
        noiseData.push(Math.floor(Math.random() * 256));
    }
    return noiseData;
}


class FloatingText {
    constructor(x, y, text, fontSize) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.dx = Math.random() * 2 + 1; // Speed in x direction
        this.dy = Math.random() * 2 + 1; // Speed in y direction
        this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`; // Random color
        this.fontSize = fontSize; // Font size
    }

    update() {
        if (this.x < 0 || this.x + ctx.measureText(this.text).width > cnv.width) {
            this.dx *= -1;
        }
        if (this.y < 0 || this.y > cnv.height) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize}px Arial`; 
        ctx.fillText(this.text, this.x, this.y);
    }
}


add_glitch();


textArr.push(new FloatingText(cnv.width / 2, cnv.height / 2, "I", 60)); 
textArr.push(new FloatingText(cnv.width / 3, cnv.height / 3, "LOVE YOU", 40)); 
textArr.push(new FloatingText(cnv.width * 2 / 3, cnv.height * 2 / 3, "MISS YOU", 50)); 
textArr.push(new FloatingText(cnv.width / 2, cnv.height / 2, "I", 60)); 
textArr.push(new FloatingText(cnv.width / 3, cnv.height / 3, "BE", 40)); 
textArr.push(new FloatingText(cnv.width * 2 / 3, cnv.height * 2 / 3, "HAPPY", 50)); 
textArr.push(new FloatingText(cnv.width / 2, cnv.height / 2, "BE PRODUCTIVE", 60)); 
textArr.push(new FloatingText(cnv.width / 3, cnv.height / 3, "STOP", 40)); 
textArr.push(new FloatingText(cnv.width * 2 / 3, cnv.height * 2 / 3, "NEGATIVE", 50)); 
textArr.push(new FloatingText(cnv.width / 2, cnv.height / 2, "DRINK", 60)); 
textArr.push(new FloatingText(cnv.width / 3, cnv.height / 3, "WATER", 40)); 
textArr.push(new FloatingText(cnv.width * 2 / 3, cnv.height * 2 / 3, "PLEASE", 50));
