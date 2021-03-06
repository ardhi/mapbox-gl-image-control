export default class ImageControl {
  constructor (options = {}) {
    this.url = options.url || ''
    this.imageUrl = options.imageUrl || ''
    this.placeholder = options.placeholder || ''
  }

  insertControl () {
    this.container = document.createElement(this.url === '' ? 'div' : 'a')
    this.container.classList.add('mapboxgl-ctrl')
    this.container.classList.add('mapboxgl-ctrl-image')
    this.image = document.createElement('img')
    this.image.src = this.imageUrl
    this.text = document.createElement('div')
    this.text.innerHTML = this.placeholder
    this.text.style.display = 'none'
    this.container.appendChild(this.image)
    this.container.appendChild(this.text)
    if (this.url !== '') {
      this.container.setAttribute('href', this.url)
      this.container.setAttribute('target', '_blank')
    }
  }

  onAdd (map) {
    this.map = map
    this.insertControl()
    this.image.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    this.image.addEventListener('mouseleave', this.onMouseLeave.bind(this))
    this.onMouseLeave()
    return this.container
  }

  onRemove () {
    this.image.removeEventListener('mouseenter', this.onMouseEnter.bind(this))
    this.image.removeEventListener('mouseleave', this.onMouseLeave.bind(this))
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }

  onMouseEnter (evt) {
    this.image.style.opacity = 0.8
    this.text.style.display = 'block'
  }

  onMouseLeave (evt) {
    this.text.style.display = 'none'
    this.image.style.opacity = 0.3
  }
}
