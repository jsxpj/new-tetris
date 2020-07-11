let nextTetris = null;
let tetrisTypeList = [];
let dynamicTetris = null;
let squareSet;
let colorTypeList = ['#D24D57','#84AF9B','#FC9D99','#00CCFF'];
let oDiv = document.getElementById('container');
let score = 0;
var timer;
class squareElement{
    constructor(x,y,status,tetrisType){
        this.basePoint = {x:x,y:y};
        this.squareList = [];
        this.statusList = [];
        this.status = status;
        this.tetrisType = tetrisType;
    }
    rotate(val){
        val = val ? val : 1;
        this.status = (this.status + val) % 4;
        this.refresh();
    }
    drop(){
        this.basePoint.y += 1;
        this.refresh();
    }
    refresh(){
        for(let i = 0; i < this.squareList.length; i++){
            this.squareList[i].x = this.basePoint.x + this.statusList[this.status][i].offsetX;
            this.squareList[i].y = this.basePoint.y + this.statusList[this.status][i].offsetY;
        }
    }
    show(parent){
        for(let i = 0; i < this.squareList.length; i++){
            parent.appendChild(this.squareList[i]);
        }
    }
}
function createSquare(color,x,y){
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = color;
    square.style.left = 30 * x + 'px';
    square.style.top = 30 * y + 'px';
    square.x = x;
    square.y = y;
    return square;
}
function initSquare(){
    squareSet = new Array(20);
    for(let i = 0; i < squareSet.length; i++){
        squareSet[i] = new Array(10);
    }
}
function randomTetris(){
    let tetrisType = Math.floor(Math.random() * tetrisTypeList.length);
    let status = Math.floor(Math.random() * 4);
    let colorType = Math.floor(Math.random() * colorTypeList.length);
    return new tetrisTypeList[tetrisType](5,-2,status,colorTypeList[colorType]);
}
function render(all){
    if(dynamicTetris){
        for(let i = 0; i < dynamicTetris.squareList.length; i++){
            dynamicTetris.squareList[i].style.left = 30 * dynamicTetris.squareList[i].x + 'px';
            dynamicTetris.squareList[i].style.top = 30 * dynamicTetris.squareList[i].y + 'px';
        }
    }
    if(all){
        for(let i = 0; i < squareSet.length; i++){
            for(let j = 0; j < squareSet[i].length; j++){
                if(squareSet[i][j]){
                    squareSet[i][j].x = j;
                    squareSet[i][j].y = i;
                    squareSet[i][j].style.left = 30 * squareSet[i][j].x + 'px';
                    squareSet[i][j].style.top = 30 * squareSet[i][j].y + 'px';
                }
            }
        }
    }
}
function checkClear(){
    var result = [];
    for(let i = 0; i < squareSet.length; i++){
        let flag =true;
        for(let j = 0; j < squareSet[i].length; j++){
            if(!squareSet[i][j]){
                flag = false;
                break;
            }
        }
        if(flag){
            result.unshift(i);
        }
    }
    return result;
}
function clear(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < squareSet[arr[i]].length; j++){
            oDiv.removeChild(squareSet[arr[i]][j]);
        }
        squareSet.splice(arr[i],1)
    }
    for(let i = 0; i < arr.length; i++){
        let tempArr = new Array(10);
        squareSet.unshift(tempArr);
    }
    score += arr.length * 10;
    render(true)
}
function checkFinish(){
    for(var i = 0; i < 10; i++){
        if(squareSet[0] && squareSet[0][i]){
            return true;
        }
    }
    return false;
}
function checkCrash(){
    for(var i = 0; i < dynamicTetris.squareList.length; i++){
        var tempX = dynamicTetris.squareList[i].x;
        var tempY = dynamicTetris.squareList[i].y;
        if(squareSet[tempY] && squareSet[tempY][tempX] != null){
            return true;
        }
    }
    return false;
}
function fixed(){
    try{
        for(let i = 0; i < dynamicTetris.squareList.length; i++){
            squareSet[dynamicTetris.squareList[i].y][dynamicTetris.squareList[i].x] = dynamicTetris.squareList[i]
        }
        dynamicTetris = null;
        clear(checkClear())
        if(checkFinish()){
            clearInterval(timer);
            alert('游戏结束，分数为:' + score);
        }
    }catch(e){
        clearInterval(timer);
        alert('游戏结束，分数为:' + score);
    }
    
}
function isDrop(){
    for(let i = 0; i < dynamicTetris.squareList.length; i++){
        if(
            squareSet[dynamicTetris.squareList[i].y + 1] &&
            squareSet[dynamicTetris.squareList[i].y + 1][dynamicTetris.squareList[i].x]
            || dynamicTetris.squareList[i].y == 19){
            console.log(111)
            fixed();
            return true;
        }
    }
    return false;
}
function checkOutOfRange(){
    let max = 0;
    for(let i = 0; i < dynamicTetris.squareList.length; i++){
        if(dynamicTetris.squareList[i].x < 0 || (dynamicTetris.squareList[i].x > 9 &&
        dynamicTetris.squareList[i].x - 9 > max)
        ){
            max = dynamicTetris.squareList[i].x < 0 ? 0 - dynamicTetris.squareList[i].x : 9 - dynamicTetris.squareList[i].x;
        }
    }
    dynamicTetris.basePoint.x += max;
    dynamicTetris.refresh();
}
function init(){
    initSquare()
    timer = setInterval(function(){
        if(!nextTetris){
            nextTetris = randomTetris()
        }
        if(!dynamicTetris){
            dynamicTetris = nextTetris;
            nextTetris = null;
            dynamicTetris.show(oDiv);
        }
        if(!isDrop()){
            dynamicTetris.drop()
        }
        render()
    },1000)
    window.addEventListener('keydown',function(e){
        if(!dynamicTetris){
            return
        }
        if(e.key === 'ArrowUp'){
            dynamicTetris.rotate();
            checkOutOfRange();
            if(checkCrash()){
                dynamicTetris.rotate(-1);
                dynamicTetris.refresh()
            }
            render();
        }else if(e.key === 'ArrowLeft'){
            dynamicTetris.basePoint.x -= 1;
            dynamicTetris.refresh()
            checkOutOfRange();
            if(checkCrash()){
                dynamicTetris.basePoint.x += 1;
                dynamicTetris.refresh()
            }
        }else if(e.key === 'ArrowRight'){
            dynamicTetris.basePoint.x += 1;
            dynamicTetris.refresh();
            checkOutOfRange();
            if(checkCrash()){
                dynamicTetris.basePoint.x -= 1;
                dynamicTetris.refresh()
            }
        }else if(e.key === 'ArrowDown'){
            if(isDrop()){
                return
            }
            dynamicTetris.drop();
        }
        render();
    })
}
window.onload = function(){
    init()
}