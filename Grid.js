// Grid.js

export class Grid {
    constructor(canvas, resolution) {
        this.grid
        this.ctx = canvas.getContext("2d")
        this.resolution = resolution  
        this.cell_size =  canvas.width / resolution 
        this.states = ["#fefbf5", "#936b0e", "#636b0e" ] 

        this.initializeGrid()
    }

    makeGrid() {
        let buffer = []

        for(let i = 0; i < this.resolution; i++){
            let row_buffer =[]
            for(let j = 0; j < this.resolution; j++){
                row_buffer.push(0)
            }
            buffer.push(row_buffer)
        }

        return buffer
    }

    initializeGrid(){
        this.grid = this.makeGrid()
    }

    update() {
        for(let i = 0; i < this.resolution; i++){
            for(let j = 0; j < this.resolution; j++){
                this.draw(i, j, this.grid[i][j])
            }
        }
    } 

    draw(x, y, state = this.grid[x][y]){
        x = this.cell_size * x
        y = this.cell_size * y

        this.ctx.beginPath();
        this.ctx.stokeStyle = "white"
        this.ctx.strokWidth = 0
        this.ctx.rect(x, y, this.cell_size, this.cell_size)
        this.ctx.fillStyle = "aliceblue"
        this.ctx.fill()

        this.ctx.beginPath();
        this.ctx.stokeStyle = "white"
        this.ctx.strokWidth = "0"
        this.ctx.rect(x+2, y+2, this.cell_size-4, this.cell_size-4)
        this.ctx.fillStyle = this.states[state]
        this.ctx.stroke()
        this.ctx.fill()
    }

    changeState(x, y){
        let state;

        this.grid[x][y] == 0 ?  state = 1:
                                state = 0
        

        console.log(`${x}  ${y}  ${state}`)
        this.grid[x][y] = state

        this.draw(x, y)
    }

    mouseOver(x, y){
        this.grid[x][y] == 0 ? this.draw(x, y, 2) : 
                               this.draw(x, y, 2)
    }

    clearPointer(x, y) {
        this.draw(x, y, this.grid[x][y])
    }

    mutate() {
        let buffer = this.makeGrid()

        for(let i = 0;  i < this.resolution; i++){
            for(let j = 0; j < this.resolution; j++){
                // Count neighbours
                let neighbours = 0

                if(i - 1 >= 0) {
                    if((j - 1) >=  0) neighbours += this.grid[i-1][j-1]
                    if((j + 1) < this.resolution) neighbours+= this.grid[i-1][j+1]
                    neighbours += this.grid[i-1][j]
                }

                if((i + 1) < this.resolution) {
                    if((j - 1) >=  0) neighbours += this.grid[i+1][j-1]
                    if((j + 1) < this.resolution) neighbours += this.grid[i+1][j+1]
                    neighbours += this.grid[i+1][j]
                }
                
                if((j - 1) >=  0) neighbours += this.grid[i][j-1]
                if((j + 1) < this.resolution) neighbours += this.grid[i][j+1]

                // Rules
                if(neighbours <= 2 && this.grid[i][j] == 1) buffer[i][j] = 0
                if(neighbours > 3 && this.grid[i][j] == 1) buffer[i][j] = 0
                if((neighbours == 2 || neighbours == 3) && this.grid[i][j] == 1) buffer[i][j] = 1
                if(neighbours == 3 && this.grid[i][j] == 0) buffer[i][j] = 1
            }
        }

        this.grid = buffer
        this.update()
    }
}