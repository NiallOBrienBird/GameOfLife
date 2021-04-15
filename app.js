import {Grid} from './Grid.js'
import {InputHandeler} from './InputHandeler.js'

const canvas = document.getElementById("game-canvas")
const speed_slider = document.getElementById("speed-slider")
const speed_monitor = document.getElementById("speed-monitor")
const start_button = document.getElementById("start-button")
const clear_button = document.getElementById("clear-button")

let speed = 400



// Custom Events
let running = false
let my_timer

function run(time) {
    if(running) {
        setTimeout(()=>{
            grid.mutate()
            run(speed)
        }, speed)
    }
}

document.addEventListener("start", ()=>{
    if(!running) {
        running = true
        run(speed)
        start_button.classList.add("active")
    }
    else {
        clearInterval(my_timer)
        running = false
        start_button.classList.remove ("active")
    }
})

export let start = new CustomEvent("start", ()=>{})

document.addEventListener("clear", ()=>{
    grid.initializeGrid()
    grid.update()

    clear_button.style = "background: red"
    setTimeout(()=>{
        clear_button.style = "background: antiqewhite"
    }, 100)

})

export let clear = new CustomEvent("clear", ()=>{})


// Document listener
speed_slider.addEventListener("input", updateSpeed)

function updateSpeed(){
    let value = (Math.pow(speed_slider.value / 100, 2) * 900) + 50
    speed_monitor.innerText = "" + value.toPrecision(4) +" ms"
    speed = value
}

start_button.addEventListener("mousedown", ()=>{
    document.dispatchEvent(start)
})

clear_button.addEventListener("mousedown", ()=>{
    document.dispatchEvent(clear)
})



// initialize objects
const grid = new Grid(canvas, 16)
const inputHandeler = new InputHandeler(canvas, grid)

grid.update()
updateSpeed()