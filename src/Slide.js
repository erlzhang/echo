import { TweenMax, TimelineLite } from 'gsap/TweenMax'
import Ele from './ele.js'

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
      this.timeLine.restart()
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
    let container = Ele.create("div", "slide__section")

    if( this.isEven( this.book.id ) ) {
      container.appendChild( this.textContent() )
      container.appendChild( this.imgContent() )
    } else {
      container.appendChild( this.imgContent() )
      container.appendChild( this.textContent() ) 
    }
    this.content = this.slider.mainContainer.appendChild(container);
  }

  linkContent() {
    return Ele.create("a", "slide__link", "", {
      href: this.book.url()
    })
  }

  textContent() {
    let container = Ele.create("div", "slide__text")
    container.classList.add( this.isEven(this.book.id) ? "slide__text_left" : "slide__text_right" )

    container.appendChild(this.linkContent())

    container.appendChild(this.titleContent())
    container.appendChild(this.timeContent())
    this.desc = container.appendChild(this.descContent())

    return container
  }

  descContent () {
    return Ele.create("div", "slide__desc", this.book.desc)
  }

  titleContent () {
    let container = Ele.create("div", "slide__title"),
        text = Ele.create("h1", "slide__title_text", this.book.title),
        inner = Ele.create("div", "slide__title_inner")

    this.titleText = inner.appendChild(text)
    this.titleInner = container.appendChild(inner)
    return container
  }

  timeContent () {
    let container = Ele.create("div", "slide__time"),
        text = Ele.create("p", "slide__time_text", this.book.time()),
        inner = Ele.create("div", "slide__time_inner")

    this.timeText = inner.appendChild(text)
    this.timeInner = container.appendChild(inner)

    return container
  }

  imgContent() {
    let container = Ele.create("div", "slide__img"),
        img = Ele.create("img", "", "", {
          src: this.book.imageUrl()
        }),
        placeholder = Ele.create("div", "slide__img_placehold", "", {
          style: "background-image: url('" + this.book.imageUrl() + "')"
        })

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
