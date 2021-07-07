document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("second-life JS imported successfully!")
  },
  false
)

var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
})


document.addEventListener("DOMContentLoaded",
  () => { console.log("maps-express-integration JS imported successfully!") }
)