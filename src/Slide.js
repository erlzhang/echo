import { TweenMax, TimelineLite } from 'gsap/TweenMax'

export default class Slide {

  constructor(book, slider) {
    this.book = book
    this.slider = slider
    this.initContent()
  }

  reverse () {
    this.timeLine.reverse()
  }

  reveal () {
    this.show()

    if( this.timeLine ) {
      this.timeLine.play()
      return
    } 

    this.timeLine = new TimelineLite();

    this.timeLine.add( TweenMax.to( this.imgPlaceholder, 0.75, {
      height: '100%',
      translateY: 0,
      opacity: 1
    }));
    this.timeLine.add( TweenMax.to( this.desc, 0.5, {
      translateY: 0,
      opacity: 1
    }), '-=0.3');
    this.timeLine.add( TweenMax.to( this.titleInner, 0.35, {
      width: '100%',
      opacity: 1
    }), '-=0.7');
    this.timeLine.add( TweenMax.to( this.titleText, 0.35, {
      translateX: 0,
      opacity: 1
    }), '-=0.3');
    this.timeLine.add( TweenMax.to( this.timeInner, 0.35, {
      width: '100%',
      opacity: 1
    }), '-=0.3')
    this.timeLine.add( TweenMax.to( this.timeText, 0.35, {
      translateX: 0,
      opacity: 1
    }));

    let self = this

    this.timeLine.eventCallback('onReverseComplete', () => {
      self.hide()
      self.slider.move()
    });
    
    this.timeLine.eventCallback('onStart', function() {
      self.slider.inAnimation = true;
    });
    
    this.timeLine.eventCallback('onComplete', function() {
      self.slider.inAnimation = false;
    })
  }

  initContent () {
    let container = document.createElement("div")
    container.classList.add("slide__section")

    if( this.isEven(this.book.id) ) {
      container.appendChild(this.textContent())
      container.appendChild(this.imgContent())
    } else {
      container.appendChild(this.imgContent())
      container.appendChild(this.textContent()) 
    }
    this.content = this.slider.mainContainer.appendChild(container);
  }

  linkContent() {
    let link = document.createElement("a")
    link.href = this.book.url()
    link.classList.add("slide__link")
    return link
  }

  textContent() {
    let container = document.createElement("div")
    container.classList.add("slide__text")
    container.classList.add( this.isEven(this.book.id) ? "slide__text_left" : "slide__text_right" )

    container.appendChild(this.linkContent())

    container.appendChild(this.titleContent())
    container.appendChild(this.timeContent())
    this.desc = container.appendChild(this.descContent())

    return container
  }

  descContent () {
    let desc = document.createElement("div")
    desc.classList.add("slide__desc");
    desc.innerText = this.book.desc
    return desc 
  }

  titleContent () {
    let container = document.createElement("div"),
        inner = document.createElement("div"),
        text = document.createElement("h1")

    container.classList.add("slide__title")

    text.innerText = this.book.title
    text.classList.add("slide__title_text")

    inner.classList.add("slide__title_inner")
    this.titleText = inner.appendChild(text)

    this.titleInner = container.appendChild(inner)

    return container
  }

  timeContent () {
    let container = document.createElement("div"),
        inner = document.createElement("div"),
        text = document.createElement("p")

    container.classList.add("slide__time")

    text.innerText = this.book.time()
    text.classList.add("slide__time_text")

    inner.classList.add("slide__time_inner")
    this.timeText = inner.appendChild(text)

    this.timeInner = container.appendChild(inner)

    return container
  }

  imgContent() {
    let container = document.createElement("div")
    container.classList.add("slide__img")

    let img = new Image()
    img.src = this.book.imageUrl()

    let placeholder = document.createElement("div")
    placeholder.classList.add("slide__img_placehold")
    placeholder.style = "background-image: url('" + img.src + "');"

    container.appendChild(this.linkContent())
    container.appendChild(img)
    this.imgPlaceholder = container.appendChild(placeholder)
    return container
  }

  isEven (num) {
    return num%2 === 0
  }

  hide () {
    this.control.classList.remove("current")
    this.content.style.opacity = '0';
    this.content.style.zIndex = '1';
  }

  show () {
    this.content.style.opacity = '1';
    this.content.style.zIndex = '5';
    this.control.classList.add("current") 
  }
  
}
