class LineLeftElement extends squareElement {
    constructor(x,y,status,color){
        super(x,y,status,LineLeftElement);
        this.color = color;
        this.statusList = [
            [{offsetX:0,offsetY:0},{offsetX:0,offsetY:1},{offsetX:1,offsetY:1},{offsetX:1,offsetY:2}],
            [{offsetX:0,offsetY:2},{offsetX:1,offsetY:2},{offsetX:1,offsetY:1},{offsetX:2,offsetY:1}],
            [{offsetX:0,offsetY:0},{offsetX:0,offsetY:1},{offsetX:1,offsetY:1},{offsetX:1,offsetY:2}],
            [{offsetX:0,offsetY:2},{offsetX:1,offsetY:2},{offsetX:1,offsetY:1},{offsetX:2,offsetY:1}]
        ]
        for(let i = 0; i < 4; i++){
            let temp = createSquare(this.color,
                this.basePoint.x + this.statusList[this.status][i].offsetX,
                this.basePoint.y + this.statusList[this.status][i].offsetY
                )
            this.squareList.push(temp);
        }
    }
}
tetrisTypeList.push(LineLeftElement)