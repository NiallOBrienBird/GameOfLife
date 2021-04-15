import {start, clear} from "./app.js"

export class InputHandeler {
    constructor(canvas, grid) {
        this.canvas  =  canvas
        this.grid = grid
        this.lastVisted = [0, 0]
        this.pressed = []

        this.canvas.addEventListener("mousemove", event =>{
            let {x, y} = this.quantizeMouse(event.offsetX, event.offsetY)
        
            this.grid.clearPointer(this.lastVisted[0], this.lastVisted[1], 0)
            grid.mouseOver(x, y)
        
            this.lastVisted = [x, y]
        })

        this.canvas.addEventListener("mousedown", event => {
            let {x, y} = this.quantizeMouse(event.offsetX, event.offsetY)
            this.grid.changeState(x, y)
        })

        addEventListener("keydown", e =>{
            if(!this.pressed.includes(e.key, 0)){
                this.pressed.push(e.key)
                this.eventHandeler(e.key)
            }
        })
        
        addEventListener("keyup", e => {
            let index = this.pressed.indexOf(e.key)
            if(index != -1) this.pressed.splice(index, 1)        
        }) 
    }

    quantizeMouse(x, y){
        x = Math.floor((x  / this.canvas.width) * (this.grid.resolution - 0.001))
        y = Math.floor((y / this.canvas.width) * (this.grid.resolution - 0.001))
    
        return {x: x, y: y}
    }

    eventHandeler(keydown) {
        switch (keydown.toLowerCase()){
            case " ":
                document.dispatchEvent(start)
                break
            case "c":
                document.dispatchEvent(clear)
                break
            case "r":
                this.grid.randomGrid(25)
                break     
            case "arrowleft":
                this.grid.scrollLeft()
                break
            case "arrowright":
                console.log(keydown)
                this.grid.scrollRight()
                break
            case "arrowup":
                this.grid.scrollUp()
                break
            case "arrowdown":
                console.log(keydown)
                this.grid.scrollDown()
                break                
        }
    }
}