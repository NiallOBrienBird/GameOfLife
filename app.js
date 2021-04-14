import {Grid} from './Grid.js'
const canvas = document.getElementById("game-canvas")

const grid = new Grid(canvas, 32)

//Mouse Handeling 
let lastVisted = [0, 0]

function quantizeMouse(x, y){
    x = Math.floor((x  / WIDTH) * (grid.resolution - 0.001))
    y = Math.floor((y / WIDTH) * (grid.resolution - 0.001))

    return {x, y}
}

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


grid.update()