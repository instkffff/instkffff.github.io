// dark mode utils
const invertImgs = (function() {
  const invertImg = img =>
    (img.style.filter =
      img.style.filter !== 'invert(100%)' ? 'invert(100%)' : '')
  const invertImgs = imgs => Array.prototype.forEach.call(imgs, invertImg)
  return invertImgs
})()



function Darkmode() {
  this.mask = document.getElementById('darkmode-mask')
  this.imgs = document.getElementsByTagName('img')
  this.metaThemeColor = document.querySelector('meta[name=theme-color]')
  this.metaThemeColorCatch = ''
}
Darkmode.prototype.turnOnDarkmode = function() {
  // fix chrome bug
  document.querySelector('html').style.background = '#ffffff'
  this.mask.classList.add('darkmode-mask--dark')
  // invert the images color
  // so that they can render with the right color
  // invertImgs(this.imgs)

  //#6da051
  let hoverShadow = 'img {filter: invert(100%)} article.post-view__article .article__content a:hover {box-shadow: inset 0 -0.8em 0 #6da051;}.sidebar__link a:hover, .sidebar__archives a:hover, .sidebar__categories a:hover, .sidebar__tags a:hover {box-shadow: inset 0 -0.8em 0 #6da051;}.tocbot .is-active-link::before {background: #6da051;}.sidebar__link, .sidebar__archives, .sidebar__categories, .sidebar__tags {padding: 0 0 0 1em;border-left: 2px solid #6da051;margin: 1.6rem 0 1.6rem 1rem;} .location-bar .text .active:hover {box-shadow: inset 0 -0.8em 0 #6da051;}.location-bar .text .active {pointer-events: all;text-decoration: none;box-shadow: inset 0 -0.3em 0 #6da051;transition: box-shadow 0.5s cubic-bezier(0.71, 0, 0, 0.99);} .posts-item:hover h2 a {box-shadow: inset 0 -0.8em 0 #6da051} .posts-item__title a {text-decoration: none;box-shadow: inset 0 -0.3em 0 #6da051;transition: box-shadow 0.5s cubic-bezier(0.71, 0, 0, 0.99) '
  let style = document.createElement('style');
  style.setAttribute("id","DarkMode")
  if (style.styleSheet) {
    style.styleSheet.cssText = hoverShadow;
  } else {
    style.appendChild(document.createTextNode(hoverShadow));
  }
  document.getElementsByTagName('head')[0].appendChild(style);

  // set <meta name="theme-color" content="xxxx">
  this.metaThemeColorCatch = this.metaThemeColor.content
  this.metaThemeColor.setAttribute('content', '#333') // dark-mode tab color #333
}
Darkmode.prototype.turnOffDarkmode = function() {
  this.mask.classList.remove('darkmode-mask--dark')
  // invertImgs(this.imgs)
  this.metaThemeColor.content = this.metaThemeColorCatch
  document.getElementById('DarkMode').remove()
}

window.addEventListener('DOMContentLoaded', () => {
  // darkmode
  ;(() => {
    const darkmode = new Darkmode()
    const { isDarkMode } = localStorage
    const checkbox = document.querySelector('input[name=mode]')
    if (isDarkMode && JSON.parse(isDarkMode)) {
      darkmode.turnOnDarkmode()
      checkbox.checked = true
    }
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        darkmode.turnOnDarkmode()
        localStorage.setItem('isDarkMode', true)
      } else {
        darkmode.turnOffDarkmode()
        localStorage.setItem('isDarkMode', false)
      }
    })
  })()

  // sidebar
  ;(() => {
    let toggle = true
    const sidebar = document.querySelector('.sidebar')
    const sidebarButton = document.querySelector('.sidebar__button')
    sidebarButton.addEventListener('click', function() {
      toggle
        ? sidebar.classList.add('sidebar--expend')
        : sidebar.classList.remove('sidebar--expend')
      toggle
        ? sidebarButton.classList.add('sidebar__button--expend')
        : sidebarButton.classList.remove('sidebar__button--expend')
      toggle = !toggle
    })
  })()
})

// mathjax
MathJax = {
  tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]}
}

