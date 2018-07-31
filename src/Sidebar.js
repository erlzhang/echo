
import Ele from './ele.js'

export default class Sidebar {
  constructor (books) {
    this.books = books
    this.initContent()
  }

  initContent () {
    
    let container = Ele.create("div", "sidebar")

    container.appendChild( Ele.create("h2", "sidebar__title", "叶夕青兮") )

    let archive = container.appendChild( Ele.create("ul", "archive") )

    for( let book of this.books ) {
      let item = Ele.create("li", "archive__item") 
      item.appendChild( Ele.create("a", "archive__link", book.title, { href: book.url() }) )
      item.appendChild( Ele.create("apan", "archiv__time", book.time() ) )
      archive.appendChild(item)
    }

    container.appendChild( Ele.create("div", "sidebar__copyright", "<p>文章版权所有，盗版必究！</p><p>All rights reserved.</p>") )

    this.container = document.body.appendChild(container)
  }
}
