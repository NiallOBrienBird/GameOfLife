const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")

//Mouse Handeling 
let lastVisted = [0, 0]

canvas.addEventListener("mousemove", event =>{
    let x = Math.floor((event.offsetX  / WIDTH) * (grid.resolution - 0.001))
    let y = Math.floor((event.offsetY  / WIDTH) * (grid.resolution - 0.001))

    grid.clearPointer(lastVisted[0], lastVisted[1], 0)
    grid.mouseOver(x, y)

    lastVisted = [x, y]
})

canvas.addEventListener("mousedown", event => {
    let x = Math.floor((event.offsetX  / WIDTH) *  (grid.resolution - 0.001))
    let y = Math.floor((event.offsetY  / WIDTH) *  (grid.resolution - 0.001))
    
    grid.changeState(x, y)
})


// Key handeling
let pressed = []

addEventListener("keydown", e =>{
    if(!pressed.includes(e.key, 0)){
        pressed.push(e.key)
        eventHandeler(e.key)
    }
})

addEventListener("keyup", e => {
    let index = pressed.indexOf(e.key)
    if(index != -1) pressed.splice(index, 1)        
})

function eventHandeler(keydown) {
    switch (keydown.toLowerCase()){
        case " ":
            grid.mutate()
            break
        case "c":
            grid.initializeGrid()
            grid.update()
            break       
    }
}


const WIDTH = canvas.width
const HEIGHT = canvas.height

let lastTime = 0
let deltaTime = 0

class Grid {
    constructor(resolution) {
        this.grid
        this.resolution = resolution  
        this.cell_size = WIDTH / resolution 
        this.states = ["#fefbf5", "#936b0e", "#636b0e" ] 
        console.log(this.cell_size)

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

        ctx.beginPath();
        ctx.stokeStyle = "white"
        ctx.strokWidth = 0
        ctx.rect(x, y, this.cell_size, this.cell_size)
        ctx.fillStyle = "aliceblue"
        ctx.fill()

        ctx.beginPath();
        ctx.stokeStyle = "white"
        ctx.strokWidth = "0"
        ctx.rect(x+2, y+2, this.cell_size-4, this.cell_size-4)
        ctx.fillStyle = this.states[state]
        ctx.stroke()
        ctx.fill()
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


const grid = new Grid(32)
grid.update()
