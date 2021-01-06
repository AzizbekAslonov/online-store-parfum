
let selecting = new SelectAndRemove('.product-cart', {
   dataSelect: 'cost',
   costAreaClass: '.product-cart__price',
   totalArea: '.checkout-total span',
   htmlForSelect: '.checkout-btn',
   locationforSelect: 'select-products.html',
   closeEl: '.item-order__delete',
   gotoSelect: { really: false },
   cart: {
      costs: [25000, 30000, 90000, 49800, 90000],
      inner: '.page__content',
      percent: 15,
      sign: 'fa-plus'
   },
   setButton: {
      close: [false, '.item-order__delete'],
      add: [true, '.item-order__delete'],
      table: {
         titles: ['Имя продукта', 'Цена', 'Цена со скидкой'],
         areaTable: '.selecting-products__table',
         infoSelector: '.empty',
         totalClass: '.selecting-total span'
      }
   },
   icons: {
      close: 'fa-times',
      add: 'fa-plus',
   }

})



