// <Helper functions>

function _slideUp(e, t) {
   // var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
   e.style.transitionProperty = "height, margin, padding",
      e.style.transitionDuration = t + "ms",
      e.style.height = e.offsetHeight + "px",
      e.offsetHeight,
      e.style.overflow = "hidden",
      e.style.height = 0,
      e.style.paddingTop = 0,
      e.style.paddingBottom = 0,
      e.style.marginTop = 0,
      e.style.marginBottom = 0,
      window.setTimeout((function () {
         e.style.display = "none",
            e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide")
      }), t)
}
function _slideDown(e, t) {
   // var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
   e.style.removeProperty("display");
   var o = window.getComputedStyle(e).display;
   "none" === o && (o = "block"),
      e.style.display = o;
   var r = e.offsetHeight;
   e.style.overflow = "hidden",
      e.style.height = 0,
      e.style.paddingTop = 0,
      e.style.paddingBottom = 0,
      e.style.marginTop = 0,
      e.style.marginBottom = 0,
      e.offsetHeight,
      e.style.transitionProperty = "height, margin, padding",
      e.style.transitionDuration = t + "ms",
      e.style.height = r + "px",
      e.style.removeProperty("padding-top"),
      e.style.removeProperty("padding-bottom"),
      e.style.removeProperty("margin-top"),
      e.style.removeProperty("margin-bottom"),
      window.setTimeout((function () {
         e.style.removeProperty("height"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
      }), t);
}
function _slideToggle(e, t) {
   // var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
   if (!e.classList.contains("_slide")) return e.classList.add("_slide"),
      "none" === window.getComputedStyle(e).display ? _slideDown(e, t) : _slideUp(e, t)
};
(function () {
   let ibg = document.querySelectorAll(".ibg");
   for (let i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector("img")) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
})()
var isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
   },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};
function dn(el) {
   el.style.display = 'none'
}
// </Helper functions>
// ======================================================================================================================================================================================

// <Universal> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// <BURGER> ================================================
let icon_menu = document.querySelector('.icon-menu');
icon_menu.addEventListener('click', () => {
   icon_menu.classList.toggle('active');
   document.querySelector('.menu__body').classList.toggle('active');
   document.body.classList.toggle('lock');
});
// </BURGER> ================================================

// <Opening SubMenu> =======================================
let pageMenuParents = document.querySelectorAll('.page-menu__parent');
if (isMobile.any()) {
   let menuParents = document.querySelectorAll('.page-menu__parent>a');

   for (let i = 0; i < menuParents.length; i++) {
      const menuParent = menuParents[i];

      menuParent.addEventListener('click', function (e) {

         e.preventDefault();
         menuParent.classList.toggle('open')
         _slideToggle(menuParent.nextElementSibling, 400);
      })
   }
}
else {
   console.log(`not any`);
   for (let i = 0; i < pageMenuParents.length; i++) {
      const menuParent = pageMenuParents[i];

      menuParent.addEventListener('mouseenter', () => {
         menuParent.classList.add('active');
      });
      menuParent.addEventListener('mouseleave', () => {
         menuParent.classList.remove('active');
      });
   }
}
let menuPageBurger = document.querySelector('.page-menu__burger');
let menuPageBody = document.querySelector('.page-menu__body');
menuPageBurger.addEventListener(('click'), () => {
   setTimeout(() => {
      menuPageBurger.classList.toggle('active');
   }, 100)
   _slideToggle(menuPageBody, 400)

})
// </Opening SubMenu> =======================================


// </Universal> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!