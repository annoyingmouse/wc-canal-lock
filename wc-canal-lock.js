class WCCanalLock extends HTMLElement {
  #moving = false
  constructor() {
    super()
    this.shadow = this.attachShadow({
      mode: 'open'
    })
    this.speed = 5
    this.boatX = 30
    this.boatY = 130
  }
  set moving(value) {
    this.#moving = value
    this.checkButtons()
  }
  get moving() {
    return this.#moving
  }
  gatesAndSluicesClosed() {
    return (
      !this.moving
      &&
      this.leftGate.dataset.status === 'closed'
      &&
      this.rightGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    )
  }
  rightSluiceOpen() {
    return (
      !this.moving
      &&
      this.rightSluice.dataset.status === 'open'
    )
  }
  leftSluiceOpen() {
    return (
      !this.moving
      &&
      this.leftSluice.dataset.status === 'open'
    )
  }
  waterLowAndGatesAndSluicesClosed() {
    return (
      this.water.dataset.level === 'low'
      &&
      this.gatesAndSluicesClosed()
    )
  }
  waterHighAndGatesAndSluicesClosed() {
    return (
      this.water.dataset.level === 'high'
      &&
      this.gatesAndSluicesClosed()
    )
  }
  waterHighAndLeftGateOpen() {
    return (
      !this.moving
      &&
      this.water.dataset.level === 'high'
      &&
      this.leftGate.dataset.status === 'open'
      &&
      this.rightGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    )
  }
  waterLowAndRightGateOpen() {
    return (
      !this.moving
      &&
      this.water.dataset.level === 'low'
      &&
      this.rightGate.dataset.status === 'open'
      &&
      this.leftGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    )
  }
  canMoveLeft() {
    return (
      !this.moving
      &&
      (
        this.boat.dataset.position === 'middle'
        ||
        this.boat.dataset.position === 'right'
      )
      &&
      (
        (
          this.boat.dataset.position === 'middle'
          &&
          this.leftGate.dataset.status === 'open'
        )
        ||
        (
          this.boat.dataset.position === 'right'
          &&
          this.rightGate.dataset.status === 'open'
        )
      )
    )
  }
  canMoveRight() {
    return (
      !this.moving
      &&
      (
        this.boat.dataset.position === 'left'
        ||
        this.boat.dataset.position === 'middle'
      )
      &&
      (
        (
          this.boat.dataset.position === 'left'
          &&
          this.leftGate.dataset.status === 'open'
        )
        ||
        (
          this.boat.dataset.position === 'middle'
          &&
          this.rightGate.dataset.status === 'open'
        )
      )
    )
  }
  checkButtons() {
    this.openLeftSluiceButton.setAttribute('fill-opacity', this.gatesAndSluicesClosed() ? '0' : '0.5')
    this.openRightSluiceButton.setAttribute('fill-opacity', this.gatesAndSluicesClosed() ? '0' : '0.5')
    if(this.gatesAndSluicesClosed()){
      this.openLeftSluiceButton.parentNode.classList.remove('not-allowed')
      this.openRightSluiceButton.parentNode.classList.remove('not-allowed')
    } else {
      this.openLeftSluiceButton.parentNode.classList.add('not-allowed')
      this.openRightSluiceButton.parentNode.classList.add('not-allowed')
    }
    this.closeRightSluiceButton.setAttribute('fill-opacity', this.rightSluiceOpen() ? '0' : '0.5')
    if(this.rightSluiceOpen()) {
      this.closeRightSluiceButton.parentNode.classList.remove('not-allowed')
    } else {
      this.closeRightSluiceButton.parentNode.classList.add('not-allowed')
    }
    this.closeLeftSluiceButton.setAttribute('fill-opacity', this.leftSluiceOpen() ? '0' : '0.5')
    if(this.leftSluiceOpen()) {
      this.closeLeftSluiceButton.parentNode.classList.remove('not-allowed')
    } else {
      this.closeLeftSluiceButton.parentNode.classList.add('not-allowed')
    }
    this.openRightGateButton.setAttribute('fill-opacity', this.waterLowAndGatesAndSluicesClosed() ? '0' : '0.5')
    if(this.waterLowAndGatesAndSluicesClosed()) {
      this.openRightGateButton.parentNode.classList.remove('not-allowed')
    } else {
      this.openRightGateButton.parentNode.classList.add('not-allowed')
    }
    this.openLeftGateButton.setAttribute('fill-opacity', this.waterHighAndGatesAndSluicesClosed() ? '0' : '0.5')
    if(this.waterHighAndGatesAndSluicesClosed()) {
      this.openLeftGateButton.parentNode.classList.remove('not-allowed')
    } else {
      this.openLeftGateButton.parentNode.classList.add('not-allowed')
    }
    this.openLeftGateButton.setAttribute('fill-opacity', this.waterHighAndGatesAndSluicesClosed() ? '0' : '0.5')
    if(this.waterHighAndGatesAndSluicesClosed()) {
      this.openLeftGateButton.parentNode.classList.remove('not-allowed')
    } else {
      this.openLeftGateButton.parentNode.classList.add('not-allowed')
    }
    this.closeLeftGateButton.setAttribute('fill-opacity', this.waterHighAndLeftGateOpen() ? '0' : '0.5')
    if(this.waterHighAndLeftGateOpen()) {
      this.closeLeftGateButton.parentNode.classList.remove('not-allowed')
    } else {
      this.closeLeftGateButton.parentNode.classList.add('not-allowed')
    }
    this.openRightGateButton.setAttribute('fill-opacity', this.waterLowAndGatesAndSluicesClosed() ? '0' : '0.5')
    if(this.waterLowAndGatesAndSluicesClosed()) {
      this.openRightGateButton.parentNode.classList.remove('not-allowed')
    } else {
      this.openRightGateButton.parentNode.classList.add('not-allowed')
    }
    this.closeRightGateButton.setAttribute('fill-opacity', this.waterLowAndRightGateOpen() ? '0' : '0.5')
    if(this.waterLowAndRightGateOpen()) {
      this.closeRightGateButton.parentNode.classList.remove('not-allowed')
    } else {
      this.closeRightGateButton.parentNode.classList.add('not-allowed')
    }
    this.moveLeftButton.setAttribute('fill-opacity', this.canMoveLeft() ? '0' : '0.5')
    if(this.canMoveLeft()) {
      this.moveLeftButton.parentNode.classList.remove('not-allowed')
    } else {
      this.moveLeftButton.parentNode.classList.add('not-allowed')
    }
    this.moveRightButton.setAttribute('fill-opacity', this.canMoveRight() ? '0' : '0.5')
    if(this.canMoveRight()) {
      this.moveRightButton.parentNode.classList.remove('not-allowed')
    } else {
      this.moveRightButton.parentNode.classList.add('not-allowed')
    }
  }
  get css() {
    return `
      <style>
        .button {
          cursor: pointer;
        }
        .button.not-allowed {
          cursor: not-allowed;
        }
      </style>
    `
  }
  get svg() {
    return `
      <svg height="auto"
           width="100%"
           viewBox="0 0 900 400"
           preserveAspectRatio="xMinYMin slice"
           xmlns="http://www.w3.org/2000/svg"
           style="width: 100%;">
        <rect x="0" y="140" width="220" height="220" fill="#cccccc" stroke="none"></rect>
        <rect x="220" y="140" width="220" height="220" fill="#cccccc" stroke="none" id="water" data-level="high"></rect>
        <rect x="440" y="200" width="220" height="160" fill="#cccccc" stroke="none"></rect>
        <path fill="#32369b" stroke="none" d="
          M 30, 130
          L 50, 130
          L 50, 110
          L 160, 110
          L 160, 130
          L 180, 130
          L 170, 140
          L 40, 140
        " id="boat" data-position="left"></path>
        <g>
          <rect x="210" y="130" width="20" height="190" fill="#6faede" stroke="none" id="leftSluice" data-status="closed"></rect>
          <rect x="210" y="320" width="20" height="40" fill="#6faede" stroke="none"></rect>
        </g>              
        <g>    
          <rect x="430" y="130" width="20" height="190" fill="#329a9b" stroke="none" id="rightSluice" data-status="closed"></rect>
          <rect x="430" y="320" width="20" height="40" fill="#329a9b" stroke="none"></rect>
        </g>
        <rect x="220" y="135" width="0" height="225" fill="#6faede" stroke="none" id="leftGate" data-status="closed"></rect>
        <rect x="440" y="135" width="0" height="225" fill="#329a9b" stroke="none" id="rightGate" data-status="closed"></rect>
        <g onclick="this.getRootNode().host.closeLeftSluice()" class="button not-allowed">
          <rect x="730" y="300" width="60" height="60" fill="#6faede" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M760,310L760,350" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M740,330L760,350L780,330" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="300" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="closeLeftSluice"></rect>
        </g>
        <g onclick="this.getRootNode().host.closeRightSluice()" class="button not-allowed">
          <rect x="840" y="300" width="60" height="60" fill="#329a9b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M870,310L870,350" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M850,330L870,350L890,330" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="300" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="closeRightSluice"></rect>
        </g>
        <g onclick="this.getRootNode().host.openLeftSluice()" class="button not-allowed">
          <rect x="730" y="230" width="60" height="60" fill="#6faede" stroke="none"></rect>
          <g>
          <path fill="none" stroke="#000000" d="M760,240L760,280" stroke-width="5px" stroke-linecap="round"></path>
          <path fill="none" stroke="#000000" d="M740,260L760,240L780,260" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="230" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="openLeftSluice"></rect>
        </g>
        <g onclick="this.getRootNode().host.openRightSluice()" class="button not-allowed">
          <rect x="840" y="230" width="60" height="60" fill="#329a9b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M870,240L870,280" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M850,260L870,240L890,260" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="230" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="openRightSluice"></rect>
        </g>
        <g onclick="this.getRootNode().host.closeLeftGate()" class="button not-allowed">
          <rect x="730" y="160" width="60" height="60" fill="#6faede" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M740,190L780,190" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M760,170L740,190L760,210" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="160" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="closeLeftGate"></rect>
        </g>
        <g onclick="this.getRootNode().host.closeRightGate()" class="button not-allowed">
          <rect x="840" y="160" width="60" height="60" fill="#329a9b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M850,190L890,190" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M870,170L850,190L870,210" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="160" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="closeRightGate"></rect>
        </g>
        <g onclick="this.getRootNode().host.openLeftGate()" class="button not-allowed">
          <rect x="730" y="90" width="60" height="60" fill="#6faede" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M740,120L780,120" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M760,100L780,120L760,140" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="90" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="openLeftGate"></rect>
        </g>
        <g onclick="this.getRootNode().host.openRightGate()" class="button not-allowed">
          <rect x="840" y="90" width="60" height="60" fill="#329a9b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M850,120L890,120" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M870,100L890,120L870,140" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="90" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="openRightGate"></rect>
        </g>
        <g onclick="this.getRootNode().host.moveLeft()" class="button not-allowed">
          <rect x="730" y="20" width="60" height="60" fill="#32369b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#ffffff" d="M740,50L780,50" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#ffffff" d="M760,30L740,50L760,70" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="20" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="moveLeft"></rect>
        </g>
        <g onclick="this.getRootNode().host.moveRight()" class="button not-allowed">
          <rect x="840" y="20" width="60" height="60" fill="#32369b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#ffffff" d="M850,50L890,50" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#ffffff" d="M870,30L890,50L870,70" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="20" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="moveRight"></rect>
        </g>
      </svg>
    `
  }
  updateBoat(x, y) {
    this.boat.setAttribute('d', `
      M ${x}, ${y}
      L ${x + 20}, ${y}
      L ${x + 20}, ${y - 20}
      L ${x + 130}, ${y - 20}
      L ${x + 130}, ${y}
      L ${x + 150}, ${y}
      L ${x + 140}, ${y + 10}
      L ${x + 10}, ${y + 10}
    `)
  }
  generateIncrementFunction(var1, var2, action, condition, speed) {
    return () => {
      let counter = 0
      while(var1 <= var2) {
        ((i, c) => {
          setTimeout(() => {
            action(i)
            condition(i, var2)
          }, speed * c)
        })(var1++, counter++)
      }
    }
  }
  generateDecrementFunction(var1, var2, action, condition, speed) {
    return () => {
      let counter = 0
      while(var1 >= var2) {
        ((i, c) => {
          setTimeout(() => {
            action(i)
            condition(i, var2)
          }, speed * c)
        })(var1--, counter++)
      }
    }
  }
  moveLeft() {
    if(this.canMoveLeft()) {
      this.moving = true
      this.generateDecrementFunction(this.boatX, this.boat.dataset.position === 'middle' ? 30 : 250, (i) => this.updateBoat(i, this.boatY), (i, var2) => {
        if(i === var2) {
          this.boatX = i
          this.boat.dataset.position = var2 === 30 ? 'left' : 'middle'
          this.moving = false
        }
      }, this.speed)()
    }
  }
  moveRight() {
    if(this.canMoveRight()) {
      this.moving = true
      this.generateIncrementFunction(this.boatX, this.boat.dataset.position === 'left' ? 250 : 470, (i) => this.updateBoat(i, this.boatY), (i, var2) => {
        if(i === var2) {
          this.boatX = i
          this.boat.dataset.position = var2 === 250 ? 'middle' : 'right'
          this.moving = false
        }
      }, this.speed)()
    }
  }
  openLeftGate() {
    if(this.waterHighAndGatesAndSluicesClosed()) {
      this.moving = true
      this.generateIncrementFunction(this.leftGate.width.baseVal.value, 60, (i) => this.leftGate.width.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.leftGate.dataset.status = 'open'
          this.moving = false
        }
      }, this.speed)()
    }
  }
  closeLeftGate() {
    if(this.waterHighAndLeftGateOpen()) {
      this.moving = true
      this.generateDecrementFunction(this.leftGate.width.baseVal.value, 0, (i) => this.leftGate.width.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.leftGate.dataset.status = 'closed'
          this.moving = false
        }
      }, this.speed)()
    }
  }
  openRightGate() {
    if(this.waterLowAndGatesAndSluicesClosed()) {
      this.moving = true
      this.generateIncrementFunction(this.rightGate.width.baseVal.value, 60, (i) => this.rightGate.width.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.rightGate.dataset.status = 'open'
          this.moving = false
        }
      }, this.speed)()
    }
  }
  closeRightGate() {
    if(this.waterLowAndRightGateOpen()) {
      this.moving = true
      this.generateDecrementFunction(this.rightGate.width.baseVal.value, 0, (i) => this.rightGate.width.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.rightGate.dataset.status = 'closed'
          this.moving = false
        }
      }, this.speed)()
    }
  }
  openLeftSluice() {
    if(this.gatesAndSluicesClosed()) {
      this.moving = true
      this.generateDecrementFunction(this.leftSluice.height.baseVal.value, 160, (i) => this.leftSluice.height.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.leftSluice.dataset.status = 'open'
          if(this.water.dataset.level === 'high') {
            this.moving = false
          }
        }
      }, this.speed)()
      this.generateDecrementFunction(this.water.y.baseVal.value, 140, (i) => this.water.y.baseVal.value = i, () => {}, this.speed)()
      this.generateIncrementFunction(this.water.height.baseVal.value, 220, (i) => this.water.height.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.water.dataset.level = 'high'
          if(this.leftSluice.dataset.status === 'open') {
            this.moving = false
          }
        }
      }, this.speed)()
      if(this.boat.dataset.position === 'middle'){
        this.generateDecrementFunction(this.boatY, 130, (i) => this.updateBoat(this.boatX, i), (i, var2) => {
          if(i === var2) {
            this.boatY = i
          }
        }, this.speed)()
      }
    }
  }
  closeLeftSluice() {
    if(this.leftSluiceOpen()) {
      this.moving = true
      this.generateIncrementFunction(this.leftSluice.height.baseVal.value, 190, (i) => this.leftSluice.height.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.leftSluice.dataset.status = 'closed'
          this.moving = false
        }
      }, this.speed)()
    }
  }
  openRightSluice() {
    if(this.gatesAndSluicesClosed()) {
      this.moving = true
      this.generateIncrementFunction(this.water.y.baseVal.value, 200, (i) => this.water.y.baseVal.value = i, () => {}, this.speed)()
      this.generateDecrementFunction(this.water.height.baseVal.value, 160, (i) => this.water.height.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.water.dataset.level = 'low'
          if(this.rightSluice.dataset.status === 'open') {
            this.moving = false
          }
        }
      }, this.speed)()
      this.generateDecrementFunction(this.rightSluice.height.baseVal.value, 160, (i) => this.rightSluice.height.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.rightSluice.dataset.status = 'open'
          if(this.water.dataset.level === 'low') {
            this.moving = false
          }
        }
      }, this.speed)()
      if(this.boat.dataset.position === 'middle'){
        this.generateIncrementFunction(this.boatY, 190, (i) => this.updateBoat(this.boatX, i), (i, var2) => {
          if(i === var2) {
            this.boatY = i
          }
        }, this.speed)()
      }
    }
  }
  closeRightSluice() {
    if(this.rightSluiceOpen()) {
      this.moving = true
      this.generateIncrementFunction(this.rightSluice.height.baseVal.value, 190, (i) => this.rightSluice.height.baseVal.value = i, (i, var2) => {
        if(i === var2) {
          this.rightSluice.dataset.status = 'closed'
          this.moving = false
        }
      }, this.speed)()
    }
  }
  connectedCallback() {
    this.render()
    this.boat = this.shadow.querySelector('#boat')
    this.leftGate = this.shadow.querySelector('#leftGate')
    this.rightGate = this.shadow.querySelector('#rightGate')
    this.leftSluice = this.shadow.querySelector('#leftSluice')
    this.rightSluice = this.shadow.querySelector('#rightSluice')
    this.water = this.shadow.querySelector('#water')
    this.closeLeftSluiceButton = this.shadow.querySelector('#closeLeftSluice')
    this.closeRightSluiceButton = this.shadow.querySelector('#closeRightSluice')
    this.openLeftSluiceButton = this.shadow.querySelector('#openLeftSluice')
    this.openRightSluiceButton = this.shadow.querySelector('#openRightSluice')
    this.closeLeftGateButton = this.shadow.querySelector('#closeLeftGate')
    this.closeRightGateButton = this.shadow.querySelector('#closeRightGate')
    this.openLeftGateButton = this.shadow.querySelector('#openLeftGate')
    this.openRightGateButton = this.shadow.querySelector('#openRightGate')
    this.moveLeftButton = this.shadow.querySelector('#moveLeft')
    this.moveRightButton = this.shadow.querySelector('#moveRight')
    this.buttons = this.shadow.querySelectorAll('.button')
    this.moving = false
    this.checkButtons()
  }
  render() {
    this.shadow.innerHTML = `${this.css}${this.svg}`
  }
}
window.customElements.define('wc-canal-lock', WCCanalLock)