class drawCarts {
   constructor(selector, options) {
      this.options = options;
      this.$selectorClass = selector;
      const { cart } = this.options;
      this.drawCartInHtml(cart);
   }

   drawCartInHtml(cart) {
      const { costs, inner, percent, sign } = cart;
      let out = '';

      for (let i = 0; i < costs.length; i++) {
         const price = costs[i];

         out += getTemplate(price, percent, i, sign)

      }
      document.querySelector(inner).innerHTML = out;
   }
}
class CalculateTotal extends drawCarts {
   constructor(selector, options) {
      super(selector, options);
      this.amountSum = [];
      this.amount = 0;

      const { dataSelect, totalArea } = this.options;
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.$dataSelectors = document.querySelectorAll(selector);


      this.showPrice(dataSelect);
      this.showAmount(totalArea, this.amount);
   }

   showPrice(dataSelect) {
      this.$dataSelectors.forEach((item) => {
         let cartData = +item.dataset[dataSelect];
         this.calculateAmountArr(cartData)
      })
      this.calculateAmount()
   }
   calculateAmountArr(cartData) {
      this.amountSum.push(cartData);
   }
   calculateAmount() {
      this.amountSum.forEach((num) => {
         this.amount += num;
      })
   }
   changeAmount() {
      let count = 0;
      this.amountSum.forEach((num) => {
         count += num;
      })
      this.amount = count;
   }
   showAmount(totalArea, amount) {
      document.querySelector(totalArea).textContent = amount;
   }
}
class SelectAndRemove extends CalculateTotal {
   constructor(selector, options) {
      super(selector, options);
      this.tableElements = [];
      this.tableTotalPrice = 0;
      this.localProducts = JSON.parse(localStorage.getItem('products')) || [];
      this.localtableElements = [];
      this.#setup()
   }
   #setup() {
      const { gotoSelect, setButton } = this.options;
      this.setButton(gotoSelect);
      this.checkButton(setButton);
   }

   checkButton(setButton) {
      const { close, add, table } = setButton;
      // Close bo'lishi
      if (close[0]) {
         this.closeBtn(close[1])
      }
      // Add bo'lishi
      else if (add[0]) {
         this.setTable(add, table);

         this.checkNotEmpthy(this.tableElements, table.infoSelector, table.totalClass);
      }
   }
   setButton(gotoSelect) {
      const { really } = gotoSelect;
      if (really) {
         const { htmlForSelect, locationforSelect } = gotoSelect
         let elementForSelect = document.querySelector(htmlForSelect);
         elementForSelect.addEventListener('click', (e) => {
            e.preventDefault()
            window.open(locationforSelect, '_blank')
         })
      }
   }
   closeBtn(closeEl) {
      let closeButtons = document.querySelectorAll(this.$selectorClass + ' ' + closeEl);
      closeButtons.forEach((item) => {
         item.addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteAmount(item)
         })
      })
   }
   deleteAmount(item) {
      // ParentElementni datasi
      let element = item.closest(this.$selectorClass);
      let data = +element.dataset[this.options.dataSelect]
      // ParentElement datasi massivdan o'chirish 
      delete this.amountSum[this.amountSum.indexOf(data)]

      // falsyy qiymatlardan qutulish
      this.amountSum = this.amountSum.filter((item) => {
         if (!item) return false
         return true
      })

      this.changeAmount();
      this.showAmount(this.options.totalArea, this.amount)
      dn(element);
   }
   setTable(add, table) {
      // add[1] -> add element klassi
      let addButtons = document.querySelectorAll(this.$selectorClass + ' ' + add[1]);
      addButtons.forEach((item) => {
         item.addEventListener('click', (e) => {
            e.preventDefault()
            let parentCart = this.addActiveClasses(item);
            // Tanlangan praduktni massivga push
            this.addToMassive(parentCart, 'added', this.tableElements);
            // Summani hisoblash
            this.tabletotal(this.tableElements);
            // Table ni htmlga chiqarish
            this.drawTable(this.tableElements, table);
            // Save to localstorage
            // saveToLocalStorage(this.tableElements, this.options);
            // Tabledagi summani htmlga chiqarish
            this.showAmount(table.totalClass, this.tableTotalPrice);
            // Empty ligini tekshirish
            this.checkNotEmpthy(this.tableElements, table.infoSelector, table.totalClass);
         })
      })
   }
   addActiveClasses(item) {
      let parentCart = item.closest(this.$selectorClass);
      parentCart.classList.toggle('added');
      item.firstElementChild.classList.toggle(this.options.icons.close);

      return parentCart
   }
   checkNotEmpthy(tableElements, infoClass, totalClass) {
      let infoblock = document.querySelector(infoClass);
      let totalblock = document.querySelector(totalClass);
      let table = document.querySelector(this.options.setButton.table.areaTable);
      if (tableElements.length > 0) {
         infoblock.classList.remove('show');
         table.classList.add('show');
         totalblock.parentElement.classList.add('show');

      }
      else {
         infoblock.classList.add('show');
         table.classList.remove('show');
         totalblock.parentElement.classList.remove('show');
      }
   }
   addToMassive(parentCart, className, tableElements) {
      if (parentCart.classList.contains(className)) tableElements.push(parentCart)
      else tableElements.pop(parentCart)
   }
   drawTable(tableElements, table) {
      let output = getTableTemplate(tableElements, table.titles);

      document.querySelector(table.areaTable).innerHTML = output;
   }
   tabletotal(elements) {
      let a = 0
      elements.forEach((el) => {
         let data = +el.dataset[this.options.dataSelect]
         a += data
      })
      this.tableTotalPrice = a;
   }
}



// Functions

function sale(cost, percent) {
   return Math.ceil(cost * (100 - percent) / 100)
}
function getTableTemplate(elements, titles,) {
   let out = '';
   // Set header
   out += `<table class="table"><tr>
   <th>N</th>`;
   out += titles.map((each) => {
      return `<th>${each}</th>`
   }).join('')
   out += `</tr>`
   // Set body
   elements.forEach((item, index) => {
      let title = item.querySelector('.item-title').textContent;
      let price = item.querySelector('.item-price').textContent;
      let priceSale = item.querySelector('.item-sale-price').textContent;

      out += `
      <tr class="products">
         <td>${index + 1}</td>
         <td>${title}</td>
         <td class='rub'> ${price} </td>
         <td class='rub'> ${priceSale} </td>
      </tr>
      `
   })
   out += `</table>`
   return out
}
function getTemplate(cost, percent, imageIndex, sign) {
   let a = sale(cost, percent);
   return `
   <div class="order-checkout__items product-cart"data-cost="${a}" data-articul="${Math.floor(a - (Math.random() * 100))}">
   <div class="order-checkout__item item-order">
      <div class="item-order__content">
         <a href="" class="item-order__image">
            <img src="images/products/0${imageIndex % 2 + 1}.jpg" alt="">
         </a>
         <div class="item-order__body">
            <a href="" class="item-order__title item-title"><span>BH Fitness F1 G6414V</span> N${imageIndex % 2 + 1}</a>
            <div class="item-order__price item-price rub">${cost}</div>
         </div>
      </div>
      <div class="item-order__total">
         <div class="item-order__label">скидка ${percent}%
            </div>
         <div class="item-order__price product-cart__price item-sale-price">${a}</div>
      </div>
      <a href="#" class="item-order__delete"><i class="fas ${sign} text-primary"></i></a>
   </div>
</div>
`
}




