import Slide from './Slide.js'
import Ele from './ele.js'

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

    this.mainContainer = document.body.appendChild( Ele.create("div", "slide") )

    this.controlContainer = document.body.appendChild( Ele.create("ul", "slide__controls") )

    this.initPrevBtn()
  }

  createSlides () {
    let i = 0
    for ( let book of this.books ) {
      let slide = new Slide(book, this)
      this.slides.push(slide)

      let control = this.controlContainer.appendChild( Ele.create("li", "slide__control") )

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
    this.prevBtn = this.controlContainer.appendChild( Ele.create("div", "slide__control__icon", '<svg width="40" height="40"><circle class="circle-progress" r="18" cy="20" cx="20"  stroke-linejoin="round" stroke-linecap="round" ></cricle></svg><span class="slide__control_arrow slide__control_up"></span>') )
    this.prevBtn.classList.add("slide__control__top")
    this.prevBtn.addEventListener("click", () => this.prevSlide())
  }

  initNextBtn () {
    this.nextBtn = this.controlContainer.appendChild( Ele.create("div", "slide__control__icon", '<svg width="40" height="40"><circle class="circle-progress" r="18" cy="20" cx="20"  stroke-linejoin="round" stroke-linecap="round" ></cricle></svg><span class="slide__control_arrow slide__control_down"></span>') )
    this.nextBtn.classList.add("slide__control__bottom")
    this.nextBtn.addEventListener("click", () => this.nextSlide())
  }
}
