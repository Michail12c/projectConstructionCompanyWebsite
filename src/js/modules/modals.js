const modals = () => {
  function bindModal (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true){
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll(); 
       
    trigger.forEach(item => {//foreEach можна застосувати до колекції лише у випадку querySelectorAll
      item. addEventListener('click', (e) => {//вішаємо обработчики на всі елементи колекціїї
        if(e.target){
          e.preventDefault()
        }
         windows.forEach(item => {
           item.style.display = 'none';
         })

        modal.style.display = 'block'; //Відкриваємо модальне вікно
        document.body.style.overflow = 'hidden'//Заморожуємо сторінку поки модалка відкрита  
        document.body.style.marginRight = `${scroll}px` 
        /*  document.body.classList.add('modal-open') */// Те саме але з використанням бутсрапівських стилів
      });/*  */
    })
    
   

    close.addEventListener('click', () => {//Повертаємо все назад
      windows.forEach(item => {
        item.style.display = 'none';
      })
      modal.style.display = 'none'; 
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`
       /* document.body.classList.remove('modal-open') */
    })
    modal.addEventListener('click', (e) => {// те саме по кліку поза модальним
      if(e.target === modal && closeClickOverlay){
        windows.forEach(item => {
          item.style.display = 'none';
        })
        modal.style.display = 'none'; 
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`
        /*  document.body.classList.remove('modal-open') */
      }
    })

  }
   
  function showModalByTime (selector, time){//поява модального вікна через певний час перебування користувача на сайті
    setTimeout(function(){
      document.querySelector(selector).style.display = 'block'; 
      document.body.style.overflow = '';
    }, time)
  }
  
 function calcScroll(){
   let div = document.createElement('div'); 

   div.style.width = '50px';
   div.style.height = '50px'; 
   div.style.overflow = 'scroll';
   div.style.visibility = 'hidden';  

   document.body.appendChild(div); 

   let scrollWidth = div.offsetWidth - div.clientWidth; 
   div.remove();
   return scrollWidth; 
 } 
  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close'); 
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close'); 
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false) 
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
  /* showModalByTime('.popup', 60000);    */
}

export default modals; 