(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e){var n=e.baseUrl,r=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._url=n,this._headers=r}var n,r;return n=t,(r=[{key:"_checkResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getUserInfo",value:function(){var t=this;return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((function(e){return t._checkResponse(e)})).catch((function(t){console.log(t)}))}},{key:"setUserInfo",value:function(t){var e=this;return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then((function(t){return e._checkResponse(t)})).catch((function(t){console.log(t)}))}},{key:"setUserImage",value:function(t){var e=this;return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then((function(t){return e._checkResponse(t)})).catch((function(t){console.log(t)}))}},{key:"getInitialCards",value:function(){var t=this;return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"addCard",value:function(t){var e=this;return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify(t)}).then((function(t){return e._checkResponse(t)})).catch((function(t){console.log(t)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e,n,r,o){var i=e.name,u=e.link,a=e.owner._id;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._templateSelector=r,this._name=i,this._link=u,this._ownerId=a,this._userId=n,this._handleCardClick=o}var e,n;return e=t,(n=[{key:"generate",value:function(){return this._element=this._getElement(),this._image=this._element.querySelector(".element__foto"),this._heart=this._element.querySelector(".element__heart"),this._deleteButton=this._element.querySelector(".element__delete"),this._element.querySelector(".element__text").textContent=this._name,this._image.setAttribute("src",this._link),this._image.setAttribute("alt",this._name),this._ownerId!==this._userId&&this._deleteButton.remove(),this._setEventListeners(),this._element}},{key:"_getElement",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var t=this;this._heart.addEventListener("click",(function(){t._like()})),this._ownerId===this._userId&&this._deleteButton.addEventListener("click",(function(){t._delete()})),this._image.addEventListener("click",(function(){return t._handleCardClick(t._name,t._link)}))}},{key:"_like",value:function(){this._heart.classList.toggle("element__heart_active")}},{key:"_delete",value:function(){this._element.remove(),this._element=null}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}var c=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._form=n,this._inputList=Array.from(this._form.querySelectorAll(e.inputSelector)),this._button=this._form.querySelector(e.submitButtonSelector),this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass}var e,n;return e=t,(n=[{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_showInputError",value:function(t,e){var n=this._form.querySelector(".".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),n.classList.add(this._errorClass),n.textContent=e}},{key:"_hideInputError",value:function(t){var e=this._form.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),e.textContent=""}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_disableButton",value:function(){this._button.classList.add(this._inactiveButtonClass),this._button.disabled=!0}},{key:"_enableButton",value:function(){this._button.classList.remove(this._inactiveButtonClass),this._button.disabled=!1}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?this._disableButton():this._enableButton()}},{key:"_setEventListeners",value:function(){var t=this;this._form.addEventListener("input",(function(){t.toggleButtonState()})),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e)}))}))}}])&&a(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==l(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}var f=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popupElement=document.querySelector(e),this._closeIcon=this._popupElement.querySelector(".popup__close-icon"),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._closeIcon.addEventListener("click",(function(){t.close()})),this._popupElement.addEventListener("mousedown",(function(e){e.target===t._popupElement&&t.close()}))}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==p(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==p(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===p(o)?o:String(o)),r)}var o}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=v(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},m.apply(this,arguments)}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=v(r);if(o){var n=v(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===p(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._image=e._popupElement.querySelector(".popup-image__foto"),e._text=e._popupElement.querySelector(".popup-image__text"),e}return e=u,(n=[{key:"open",value:function(t,e){this._image.setAttribute("src",e),this._image.setAttribute("alt",t),this._text.textContent=t,m(v(u.prototype),"open",this).call(this)}}])&&y(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==d(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===d(o)?o:String(o)),r)}var o}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=w(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},g.apply(this,arguments)}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=w(r);if(o){var n=w(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===d(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._form=n._popupElement.querySelector(".popup__form"),n._inputList=n._popupElement.querySelectorAll(".popup__item"),n._button=n._popupElement.querySelector(".popup__button"),n._handleFormSubmit=e,n}return e=u,(n=[{key:"close",value:function(){this._form.reset(),g(w(u.prototype),"close",this).call(this)}},{key:"setEventListeners",value:function(){var t=this;g(w(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._handleFormSubmit(t._getInputValues())}))}},{key:"addWaitMessage",value:function(){this._button.textContent="Сохранение..."}},{key:"removeWaitMessage",value:function(){this._button.textContent="Сохранить"}},{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}}])&&_(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==k(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===k(o)?o:String(o)),r)}var o}var O=function(){function t(e){var n=e.nameSelector,r=e.aboutSelector,o=e.imageSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=document.querySelector(n),this._about=document.querySelector(r),this._image=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,about:this._about.textContent,avatar:this._image.src}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about;this._name.textContent=e,this._about.textContent=n}},{key:"setUserImage",value:function(t){var e=t.avatar;this._image.src=e}}])&&j(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==P(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==P(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===P(o)?o:String(o)),r)}var o}var I=function(){function t(e,n){var r=e.items,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._container=document.querySelector(n),this._initialArray=r,this._renderer=o}var e,n;return e=t,(n=[{key:"addInitialItems",value:function(){var t=this;this._initialArray.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(t){this._container.prepend(t)}}])&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function L(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var q,T,R={inputSelector:".popup__item",submitButtonSelector:".popup__button",errorClass:"popup__input-error_active",inputErrorClass:"popup__item_error",inactiveButtonClass:"popup__button_inactive"},B=document.querySelector(".popup__form"),x=document.querySelector(".popup_edit-profile-image"),U=document.querySelector("#form"),A=document.querySelector(".popup__item_type_name"),M=document.querySelector(".popup__item_type_about"),W=document.querySelector(".popup__item_type_image"),V=document.querySelector(".profile__edit-button"),D=document.querySelector(".profile__edit-image"),N=document.querySelector(".profile__add-button"),J=new n({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-65",headers:{authorization:"12543613-4b99-4f5b-854b-aa27b4c9eaee","Content-Type":"application/json"}}),F=new O({nameSelector:".profile__title",aboutSelector:".profile__subtitle",imageSelector:".profile__image"}),H=new c(R,B),z=new c(R,x),$=new c(R,U),G=new E(".popup_edit-profile",(function(t){G.addWaitMessage(),J.setUserInfo(t).then((function(t){F.setUserInfo(t),G.close()})).catch((function(t){console.log(t)})).finally((function(t){G.removeWaitMessage()}))})),K=new E(".popup_edit-profile-image",(function(t){K.addWaitMessage(),J.setUserImage(t).then((function(t){F.setUserImage(t),K.close()})).catch((function(t){console.log(t)})).finally((function(t){K.removeWaitMessage()}))})),Q=new E(".popup_add-element",(function(t){Q.addWaitMessage(),J.addCard(t).then((function(t){var e=Y(t,T);q.addItem(e),Q.close()})).catch((function(t){console.log(t)})).finally((function(t){Q.removeWaitMessage()}))})),X=new b(".popup-image");function Y(t,e){return new i(t,e,"#cardTemplate",X.open.bind(X)).generate()}G.setEventListeners(),K.setEventListeners(),Q.setEventListeners(),X.setEventListeners(),H.enableValidation(),$.enableValidation(),V.addEventListener("click",(function(){var t=F.getUserInfo();A.value=t.name,M.value=t.about,H.toggleButtonState(),G.open()})),D.addEventListener("click",(function(){var t=F.getUserInfo();W.value=t.avatar,z.toggleButtonState(),K.open()})),N.addEventListener("click",(function(){$.toggleButtonState(),Q.open()})),Promise.all([J.getUserInfo(),J.getInitialCards()]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,u,a=[],c=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(a.push(r.value),a.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(e,n)||function(t,e){if(t){if("string"==typeof t)return L(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?L(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];F.setUserInfo(o),F.setUserImage(o),T=o._id,(q=new I({items:i,renderer:function(t){var e=Y(t,T);q.addItem(e)}},".elements")).addInitialItems()})).catch((function(t){console.log(t)}))})();
//# sourceMappingURL=main.js.map