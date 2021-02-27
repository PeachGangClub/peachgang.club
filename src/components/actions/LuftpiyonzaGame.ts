class LuftpiyonzaGame {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private mainLoopTimer: NodeJS.Timeout

  setCanvas(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
  }
  private draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillRect(
      Math.random() * this.width,
      Math.random() * this.height,
      this.width / 2,
      this.height / 2
    )
  }
  start() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: LuftpiyonzaGame = this
    this.mainLoopTimer = setInterval(() => {
      self.draw()
    }, 30)
  }
  stop() {
    if (this.mainLoopTimer) {
      clearInterval(this.mainLoopTimer)
      this.mainLoopTimer = undefined
    }
  }
  up() {
    console.log('up')
  }
}

const Game = new LuftpiyonzaGame()
export default Game
