import {start, clear} from "./app.js"


export class Grid {
    constructor(canvas, resolution) {
        this.grid
        this.ctx = canvas.getContext("2d")
        this.resolution = resolution  
        this.cell_size =  canvas.width / resolution 
        this.states = ["#C3CEDA", "#071330", "#738FA7" ] 

        this.initializeGrid()
    }

    // Creates a 2D array with initiallized values of 0
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

    randomGrid(probability){
        let buffer = []

        for(let i = 0; i < this.resolution / 2; i++){
            let row_buffer =[]

            for(let j = 0; j < this.resolution; j++){
                chance(probability) ?   row_buffer.push(1):
                                        row_buffer.push(0) 
            }
            buffer.push(row_buffer)
        }



        for(let i = 0; i < this.resolution / 2; ++i){
            buffer.push(buffer[this.resolution / 2 - i - 1])
        }


        this.grid = buffer
        this.update()
        
    }

    // Initiallizes the grid memory with 0s
    initializeGrid(){
        this.grid = this.makeGrid()
    }

    // Redraws grid from memory
    update() {
        for(let i = 0; i < this.resolution; i++){
            for(let j = 0; j < this.resolution; j++){
                this.draw(i, j, this.grid[i][j])
            }
        }
    } 

    // Resests ands fills an individual cell of the grid
    draw(x, y, state = this.grid[x][y]){
        x = this.cell_size * x
        y = this.cell_size * y

        this.ctx.beginPath();
        this.ctx.stokeStyle = "#C3CEDA"
        this.ctx.strokWidth = 2
        this.ctx.rect(x, y, this.cell_size, this.cell_size)
        this.ctx.fillStyle = "#C3CEDA"
        this.ctx.fill()

        this.ctx.beginPath();
        this.ctx.stokeStyle = "white"
        this.ctx.strokWidth = "0"
        this.ctx.rect(x+2, y+2, this.cell_size-4, this.cell_size-4)
        //this.ctx.rect(x, y, this.cell_size, this.cell_size)
        
        this.ctx.fillStyle = this.states[state]
        this.ctx.fill()
    }

    // Updates the state of an individual cell
    changeState(x, y){
        let state;
        this.grid[x][y] == 0 ?  state = 1:
                                state = 0

        this.grid[x][y] = state
        this.draw(x, y)
    }

    // Monitor mouse position
    mouseOver(x, y){
        this.grid[x][y] == 0 ? this.draw(x, y, 2) : 
                               this.draw(x, y, 2)
    }

    // Clears mouse position display
    clearPointer(x, y) {
        this.draw(x, y, this.grid[x][y])
    }

    // Translate grid
    scrollLeft(update = true){
        let buffer = this.makeGrid()
        for(let i = 0; i < this.resolution; i++){
            for(let j = 0; j < this.resolution; j++){
                buffer[i][j] = this.grid[(i+1)% this.resolution][j]
            }
        } 
        this.grid = buffer
        if(update) this.update()
    }

    scrollRight(update = true){
        for(let i = 0; i < this.resolution - 1; i++){
            this.scrollLeft(false)
        }
        if(update) this.update()
    }

    scrollUp(update = true){
        let buffer = this.makeGrid()
        for(let i = 0; i < this.resolution; i++){
            for(let j = 0; j < this.resolution; j++){
                buffer[i][j] = this.grid[i][(j + 1)% this.resolution]
            }
        } 
        this.grid = buffer
        if(update) this.update()
    }

    scrollDown(update = true){
        for(let i = 0; i < this.resolution - 1; i++){
            this.scrollUp(false)
        }
        if(update) this.update()
    }


    // Produce the next generation
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

        if(!matchingArrays(this.grid, buffer)){
            this.grid = buffer
            this.update()
            return
        }

        document.dispatchEvent(start)
    }
}

function matchingArrays(array1, array2) {
    for(let i = 0; i < array1[0].length; i++){
        for(let j = 0; j < array1[0].length; j++){
            if(array1[i][j] != array2[i][j]){
                return false
            }
        }
    }
    return true
}

 
function chance(probability) {
    let n = Math.random() * 100

    if (n <= probability) return true
    return false
}