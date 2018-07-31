const Ele = {
  create: (tag, cla="", inner="", params={}) => {
    let container = document.createElement(tag)
    if( cla ) {
      container.classList.add(cla)
    }
    container.innerHTML = inner
    for( let param in params ) {
      container.setAttribute(param, params[param])
    }
    return container
  }
}

export default Ele
