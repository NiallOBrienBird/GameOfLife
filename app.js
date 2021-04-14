const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")




let lastVisted = [0, 0]

canvas.addEventListener("mouseover", event =>{
    canvas.addEventListener("mousemove", event =>{
        let x = Math.round((event.offsetX  / WIDTH) * 32)
        let y = Math.round((event.offsetY  / WIDTH) * 32)
        
        grid.clearPointer(ctx, lastVisted[0], lastVisted[1], 0)
        grid.draw(ctx, x, y, 1)

        lastVisted = [x, y]
    })

    /// Work here /// 
    canvas.addEventListener("mousedown", event => {
        let x = Math.round((event.offsetX  / WIDTH) * 32)
        let y = Math.round((event.offsetY  / WIDTH) * 32)


        changeState(x, y, 2)
        grid.draw(ctx, x, y, 2)
    })
})

const WIDTH = canvas.width
const HEIGHT = canvas.height

let lastTime = 0
let deltaTime = 0

class Grid {
    constructor(resolution) {
        this.grid = []
        this.resolution = resolution  
        this.cell_size = WIDTH / resolution 
        this.states = ["#fefbf5", "#efc050", "#936b0e"] 


        this.initializeGrid()
    }

    initializeGrid() {
        this.grid = [];
        for(let i = 0; i < this.resolution; i++){
            let row_buffer =[]
            for(let j = 0; j < this.resolution; j++){
                row_buffer.push(0)
            }
            this.grid.push(row_buffer)
        }
    }

    update(ctx) {
        for(let i = 0; i < this.resolution; i++){
            for(let j = 0; j < this.resolution; j++){
                this.draw(ctx, i, j, this.grid[i][j])
            }
        }
    } 

    draw(ctx, x, y, state){
        x = this.cell_size * x
        y = this.cell_size * y
        ctx.beginPath();
        ctx.rect(x, y, this.cell_size, this.cell_size)

        ctx.fillStyle = this.states[state]
        ctx.fill()

        ctx.stokeStyle = "black"
        ctx.lineWidth = "2"
        ctx.stroke()
    }

    clearPointer(ctx, x, y) {
        this.draw(ctx, x, y, 0)
    }
    changeState(x, y, state){
        this.grid[x][y] = state
    }
}





const grid = new Grid(32)

grid.update(ctx)
