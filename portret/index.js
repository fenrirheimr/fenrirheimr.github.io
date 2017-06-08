var game = document.createElement('canvas');
var gamectx=game.getContext('2d');
var img;
var circles=[];

function Circle(x,y,r) {
    this.x=x;
    this.y=y;
    this.r=r;

    this.mouseOver = function(_x,_y) {
        return (Math.sqrt(Math.pow(_x-this.x,2) + Math.pow(_y-this.y,2))<=r) ? true : false;
    }

    this.fill = function() {
        gamectx.beginPath();
        gamectx.fillStyle="#ffffff";
        gamectx.rect(this.x-r,this.y-r,2*r,2*r);
        gamectx.fill();
        gamectx.closePath();
        gamectx.beginPath();
        gamectx.arc(this.x,this.y,this.r,2*Math.PI,false);
        gamectx.fillStyle=getAvgRGB(this.x-r,this.y-r,2*r,2*r);
        gamectx.fill();
        gamectx.closePath();
        return this;
    }

    this.split = function() {
        if(this.r>=5) {
            circles.push(new Circle(this.x-0.5*r,this.y-0.5*r,0.5*r).fill());
            circles.push(new Circle(this.x-0.5*r,this.y+0.5*r,0.5*r).fill());
            circles.push(new Circle(this.x+0.5*r,this.y-0.5*r,0.5*r).fill());
            circles.push(new Circle(this.x+0.5*r,this.y+0.5*r,0.5*r).fill());
            circles.delete(this);
        }
    }
}

window.onload = function() {
    img = new Image();
    img.crossOrigin = "anonymous";
    img.src='01.png';
    img.onload=function() {
        game.width=img.width;
        game.height=img.height;
        document.body.appendChild(game);

        circles.push(new Circle(game.width/2,game.height/2,game.width/2).fill());

        var t = Date.now();
        game.onmousemove = function(e) {
            if((Date.now()-t)>50) {
                t = Date.now();
                var _x = e.pageX - game.offsetLeft;
                var _y = e.pageY - game.offsetTop;
                circles.forEach(function(el) {
                    if (el.mouseOver(_x,_y)) el.split();
                });
            }
        }
        
    }
}


//копипаст с доработкой из JsFiddle
function getAvgRGB(x,y,w,h) {
    
    var blockSize = 5, // only visit every 5 pixels
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        data,
        i = -4,
        rgb = {r:0,g:0,b:0},
        count = 0;

    canvas.height = w;
    canvas.width = h;
    context.drawImage(img, x, y, w, h, 0, 0, w, h);
    
    data = context.getImageData(0, 0, canvas.width, canvas.height);
    
    while ( (i += blockSize * 4) < data.data.length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

Array.prototype.delete = function(obj) {
    if(this.indexOf(obj)!=-1) this.splice(this.indexOf(obj),1); 
}
