const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
     const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector); 

     function hideTabContent(){ // ховає всі таби
       content.forEach(item => {
         item.style.display = 'none'; 
       })
       tab.forEach(item => {
         item.classList.remove(activeClass)// забираємо клас що активує підсвітку
       })
     } 

     function showTabContent(i = 0){
        content[i].style.display = display;// показує вибраний блок
        tab[i].classList.add(activeClass); // додаємо цей клас вибраному табу
     }
     hideTabContent()
     showTabContent()  
     
     header.addEventListener('click', (e) => {
       const target = e.target; 
       if(target &&  (target.classList.contains(tabSelector.replace(/\./, "")) || target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) ){// перевіряємо що користувач дійсно клікнув по елементу з певним селектором, а так як в переміній він з точнкою, то щоб працював в контайнс де передається просто назва селектора за допомогою регулярного виразу ми відрізаємо точку за допомогою метода реплайс і міняємо її на пусту строку, друга перевірка виявляє чи дійнео елмент з батьківського вузла
        
        tab.forEach((item, i) => {
          if(target == item || target.parentNode == item){
            hideTabContent();
            showTabContent(i); 
          }
        })

       }
     })
}

export default tabs; 