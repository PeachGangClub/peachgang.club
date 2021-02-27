const BlockWidth = 60
const Speed = 1
const AppearBlockRate = 300
const UpAccel = 6
const Gravity = 0.2
const AircraftSize = 30

interface Block {
  pos: {
    x: number
    y: number
  }
  size: number
}

interface Aircraft {
  pos: number
  accel: number
}

class LuftpiyonzaGame {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private mainLoopTimer: NodeJS.Timeout
  private blocks: Block[]
  private appearBlockCount: number
  private speed: number
  private aircraft: Aircraft

  constructor() {
    this.reset()
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.blocks.forEach((block) => {
      // this.ctx.fillStyle = 'black'
      // this.ctx.fillRect(o.pos.x, o.pos.y, ObstacleWidth, o.size)
      this.ctx.fillStyle = 'grey'
      this.ctx.fillRect(this.width - block.pos.x, 0, BlockWidth, block.pos.y)
      this.ctx.fillRect(this.width - block.pos.x, block.size + block.pos.y, BlockWidth, this.height)
      block.pos.x += this.speed
    })

    this.ctx.beginPath()
    this.ctx.fillStyle = 'red'
    this.ctx.arc(70, this.height - this.aircraft.pos, AircraftSize, 0, 360)
    this.ctx.fill()

    // remove blocks that have passed
    this.blocks = this.blocks.filter((block) => block.pos.x < this.width + BlockWidth)

    // add new block
    this.appearBlockCount += 1
    if (this.appearBlockCount > AppearBlockRate / this.speed) {
      this.appearBlockCount = 0
      this.blocks.push({
        pos: { x: 0, y: Math.random() * 200 + 50 },
        size: Math.random() * 200 + 100,
      })
    }

    // move aircraft
    this.aircraft.pos += this.aircraft.accel
    this.aircraft.accel -= Gravity
    if (this.aircraft.pos < AircraftSize) {
      this.aircraft.pos = AircraftSize
      this.aircraft.accel = 0
    } else if (this.aircraft.pos > this.height - AircraftSize) {
      this.aircraft.pos = this.height - AircraftSize
      this.aircraft.accel = 0
    }

    // increase speed
    this.speed += this.speed * 0.001
  }

  reset() {
    this.blocks = [{ pos: { x: 10, y: 100 }, size: 300 }]
    this.aircraft = { pos: 100, accel: 0 }
    this.appearBlockCount = 0
    this.speed = Speed
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
  }

  start() {
    this.mainLoopTimer = setInterval(() => {
      this.draw()
    }, 1000 / 60)
  }

  stop() {
    if (this.mainLoopTimer) {
      clearInterval(this.mainLoopTimer)
      this.mainLoopTimer = undefined
    }
  }

  up() {
    this.aircraft.accel += UpAccel
    console.log(this.aircraft.accel)
  }
}

const Game = new LuftpiyonzaGame()
export default Game
