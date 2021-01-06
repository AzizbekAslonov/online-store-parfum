
function range() {
   let rangeInput = document.querySelector('.section-filter__range');
   let span_1 = document.querySelector('.section-filter_result_1');
   let span_2 = document.querySelector('.section-filter_result_2');
   // Input text
   let do_x = document.querySelector('#do_x')

   span_1.textContent = rangeInput.min + ' $ - '
   span_2.textContent = rangeInput.value + ' $'
   do_x.value = rangeInput.value

   do_x.oninput = () => {
      if (do_x.value <= rangeInput.max && +do_x.value >= +rangeInput.min) {
         rangeInput.value = do_x.value
         span_2.textContent = do_x.value + ' $'
      }
      else {
         rangeInput.value = rangeInput.max
         span_2.textContent = rangeInput.max
      }
   }

   rangeInput.oninput = () => {
      range()
   }
}
range()

let titleSpoller = document.querySelectorAll('.spoller');
titleSpoller[0].nextElementSibling.style.display = 'block'
titleSpoller.forEach(function (item) {
   item.addEventListener('click', function () {
      _slideToggle(this.nextElementSibling, 400);
      this.classList.toggle('active');
   })
})

// Tabs
let paggingLinks = document.querySelectorAll('.pagging__link');

paggingLinks.forEach((item) => {
   item.addEventListener('click', function (e) {
      e.preventDefault()
      paggingLinks.forEach((element) => {
         element.classList.remove('active')
      })
      this.classList.add('active')
   })

})
