import Slide from './Slide.js'

export default class Slider {
  constructor (books) {
    this.slides = []
    this.controls = []
    this.books = books
    this.len = this.books.length
    this.current = 0

    this.initContent()
    this.createSlides()

    this.direction = true
    this.inAnimation = false
  }

  initContent () {
    let container = document.createElement("div")
    container.classList.add("slide")

    this.mainContainer = document.body.appendChild(container)

    let toolContainer = document.createElement("ul")
    toolContainer.classList.add("slide__controls")
    this.controlContainer = document.body.appendChild(toolContainer)
    this.initPrevBtn()
  }

  createSlides () {
    let i = 0
    for ( let book of this.books ) {
      let slide = new Slide(book, this)
      this.slides.push(slide)

      let control = document.createElement("li")
      control.classList.add("slide__control")
      control = this.controlContainer.appendChild(control)
      this.controls.push(control)
      slide.control = control

      i++
    }
    this.initNextBtn()
    this.controls[this.current].classList.add("current")
  }

  move () {
    if( this.direction ) {
      this.current ++
      if( this.current >= this.len ) {
        this.current = 0
      }
    } else {
      this.current -- 
      if( this.current < 0 ) {
        this.current = this.len - 1
      }
    }
    this.revealSlide()
  }

  revealSlide () {
    this.slides[this.current].reveal()
  }

  changeSlide () {
    if( this.inAnimation ) {
      return
    }
    this.slides[this.current].reverse()
  }

  prevSlide () {
    this.direction = false
    this.changeSlide()
  }

  nextSlide () {
    this.direction = true
    this.changeSlide()
  }

  initPrevBtn () {
    let container = document.createElement("div")
    container.classList.add("slide__control__icon", "slide__control_top")
    container.innerHTML = '<svg width="40" height="40"><circle class="circle-progress" r="18" cy="20" cx="20"  stroke-linejoin="round" stroke-linecap="round" ></cricle></svg><span class="slide__control_arrow slide__control_up"></span>'
    this.prevBtn = this.controlContainer.appendChild(container)
    this.prevBtn.addEventListener("click", () => this.prevSlide())
  }

  initNextBtn () {
    let container = document.createElement("div")
    container.classList.add("slide__control__icon", "slide__control_bottom")
    container.innerHTML = '<svg width="40" height="40"><circle class="circle-progress" r="18" cy="20" cx="20"  stroke-linejoin="round" stroke-linecap="round" ></cricle></svg><span class="slide__control_arrow slide__control_down"></span>'
    this.nextBtn = this.controlContainer.appendChild(container)
    this.nextBtn.addEventListener("click", () => this.nextSlide())
  }
}
