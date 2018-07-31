const bookConfig = require('./books.json')

import Slider from './Slider.js'
import Book from './Book.js'
import Sidebar from './Sidebar.js'

const books = []

let i = 0

for( let b in bookConfig ) {
  let book = new Book(b, bookConfig[b]) 
  book.id = ++i
  books.push(book)
}

const sidebar = new Sidebar(books)

const slider = new Slider(books)
slider.revealSlide()

