const BlockWidth = 60
const Speed = 1
const AppearBlockRate = 300
const UpAccel = 6
const Gravity = 0.2
const AircraftPosX = 40
const AircraftHitbox = 20

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
  private ImgAircraft: HTMLImageElement
  private ctx: CanvasRenderingContext2D
  private gameoverCallback: (score: number) => void
  private startCallback: () => void
  private width: number
  private height: number
  private mainLoopTimer: NodeJS.Timeout
  private blocks: Block[]
  private appearBlockCount: number
  private speed: number
  private aircraft: Aircraft
  private score: number
  private isStart: boolean

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
    })

    this.ctx.save()
    this.ctx.translate(
      AircraftPosX + AircraftHitbox / 2,
      this.height - this.aircraft.pos + AircraftHitbox / 2
    )

    if (this.ImgAircraft) {
      this.ctx.rotate((6 * (-6 - this.aircraft.accel) * Math.PI) / 180)
      this.ctx.drawImage(this.ImgAircraft, -37, -22, 60, 39)
      this.ctx.restore()
    }

    // this.ctx.fillStyle = 'red'
    // this.ctx.fillRect(AircraftPosX, this.height - this.aircraft.pos, AircraftHitbox, AircraftHitbox)

    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`SCORE: ${this.score}`, 10, 20)

    const calculatedBlockX = this.width - this.blocks[0].pos.x
    const calculatedAirplateY = this.height - this.aircraft.pos

    // check hitbox
    if (
      AircraftPosX >= calculatedBlockX - AircraftHitbox &&
      AircraftPosX <= calculatedBlockX + BlockWidth
    ) {
      if (
        calculatedAirplateY + AircraftHitbox >= this.blocks[0].pos.y + this.blocks[0].size ||
        calculatedAirplateY <= this.blocks[0].pos.y
      ) {
        // hit!
        this.stop()
        this.gameoverCallback(this.score)
      }
    }

    // remove blocks that have passed
    this.blocks = this.blocks.filter((block) => block.pos.x < this.width + BlockWidth)

    if (this.isStart) {
      // add new block
      this.appearBlockCount += 1
      if (this.appearBlockCount > AppearBlockRate / this.speed) {
        this.appearBlockCount = 0
        this.blocks.push({
          pos: { x: 0, y: Math.random() * 200 + 50 },
          size: Math.random() * 200 + 100,
        })
      }

      // move blocks
      this.blocks.map((block) => {
        block.pos.x += this.speed
        return block
      })

      // move aircraft
      this.aircraft.pos += this.aircraft.accel
      this.aircraft.accel -= Gravity
      if (this.aircraft.pos < AircraftHitbox) {
        this.aircraft.pos = AircraftHitbox
        this.aircraft.accel = 0
      }

      this.score += Math.round(this.speed)
      // increase speed
      this.speed += this.speed * 0.0005
    }
  }

  reset() {
    this.isStart = false
    this.blocks = [{ pos: { x: 10, y: 100 }, size: 300 }]
    this.aircraft = { pos: 100, accel: 2 }
    this.appearBlockCount = 0
    this.speed = Speed
    this.score = 0
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
  }

  setImage(img: HTMLImageElement) {
    this.ImgAircraft = img
  }

  setGameoverCallback(callback) {
    this.gameoverCallback = callback
  }

  setStartCallback(callback) {
    this.startCallback = callback
  }

  start() {
    this.reset()
    this.mainLoopTimer = setInterval(() => {
      this.draw()
    }, 1000 / 60)
  }

  stop() {
    this.isStart = false
    if (this.mainLoopTimer) {
      clearInterval(this.mainLoopTimer)
      this.mainLoopTimer = undefined
    }
  }

  up() {
    if (!this.isStart && this.ImgAircraft) {
      this.startCallback()
      this.isStart = true
      this.aircraft.accel += UpAccel
    } else {
      this.aircraft.accel += UpAccel
    }
  }
}

const Game = new LuftpiyonzaGame()
export default Game
