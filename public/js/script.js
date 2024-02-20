document.addEventListener('DOMContentLoaded', function() {

  const searchBtn = document.querySelector('.searchBtn')
  const searchBar = document.querySelector('.searchBar')
  const searchBarInput = document.getElementById('searchInput')
  const searchBarCloseBtn = document.getElementById('searchClose')

  searchBtn.addEventListener('click', function() {

    searchBar.style.visibility = 'visible'
    searchBar.classList.add('open')

    this.setAttribute('aria-expanded', 'true')

    searchBarInput.focus()

  })

  searchBarCloseBtn.addEventListener('click', function() {

    searchBar.style.visibility = 'hidden'
    searchBar.classList.remove('open')

    this.setAttribute('aria-expanded', 'false')

  })

})