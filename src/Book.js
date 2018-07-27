export default class Book {

  constructor(name, config, id) {
    this.name = name 
    this.id = id
    this.title = config["title"]
    this.desc = config["desc"] || ""
    this.cover = config["cover"] || ""
    this.start = config["start"]
    this.end = config["end"] || this.start
  } 

  time () {
    let result = "(" + this.start
    if( this.end !== this.start ) {
      result += "-" + this.end
    }
    return result + ")"
  }

  url () {
    return "/" + this.name + "/" 
  }

  imageUrl () {
    return "images/" + this.cover 
  }
}
