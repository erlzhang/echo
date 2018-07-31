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

    this.bindKeyEvent()
    this.bindMouseEvent()
    this.bindTouchEvent()
  }

  bindKeyEvent () {
    document.addEventListener("keyup", (event) => {
      if( event && ( event.keyCode == 39 || event.keyCode == 40 ) ) {
        this.direction = true
        this.changeSlide() 
      }
      if( event && ( event.keyCode == 38 || event.keyCode == 37 ) ) {
        this.direction = false
        this.changeSlide()
      } 
    })
  }

  bindMouseEvent () {
    document.addEventListener("mousewheel", (event) => {
      this.direction = event.wheelDelta < 0
      this.changeSlide()
    })
    document.addEventListener("DOMMouseScroll", (event) => {
      this.direction = event.detail == 3  
      this.changeSlide()
    })
  }

  bindTouchEvent () {
    let self = this
    self.touchtimes = 0
    self.touchx = []
    document.addEventListener("touchstart", (event) => {
      self.touchtimes ++ ;
      self.touchx[self.touchtimes] = event.changedTouches[0].clientY;  
    })

    document.addEventListener("toushend", (event) => {
      self.touchtimes ++ ;
      self.touchx[self.touchtimes] = event.changedTouches[0].clientY;

      if( ( Math.abs(self.touchx[self.touchtimes] - self.touchx[self.touchtimes-1]) > 50 ) && ( event.target.id != "sidebarToggler" ) ) {
        self.direction = touchx[touchtimes] > touchx[touchtimes - 1];
        self.changeSlide();
      }
    
    })
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
      if( this.current > this.len - 1 ) {
        this.current = 0
      }
    } else {
      this.current -- 
      if( this.current < 0 ) {
        this.current = this.len - 1
      }
    }
    console.log(this.current)
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
