
let testObj = new SelectAndRemove('.product-cart', {
   dataSelect: 'cost',
   costAreaClass: '.product-cart__price',
   totalArea: '.checkout-total span',
   gotoSelect: {
      really: true,
      htmlForSelect: '.checkout-btn',
      locationforSelect: 'select-products.html',
   },
   cart: {
      costs: [50000, 30000, 40000],
      inner: '.order-checkout__container',
      percent: 5,
      sign: 'fa-times'
   },
   setButton: {
      close: [true, '.item-order__delete'],
      add: [false, '.item-order__delete']
   },
   icons: {
      close: 'fa-times',
      add: 'fa-plus',
   }
})

console.log(testObj);

