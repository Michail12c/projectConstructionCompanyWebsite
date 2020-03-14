import checkNumInputs from "./chackNumInputs";

const forms = (state) => {
   const form = document.querySelectorAll('form'),
         input = document.querySelectorAll('input');
 

   checkNumInputs('input[name = "user_phone"]'); // Перевірка, якщо вводлять не число заміна пустою
 
   const message = {
     loading: 'Загрузка...',
     success: 'Списибо! Скоро мы с вами свяжемся!',
     failure: 'Что-то пошло не так...'
   } 
   
   const postData = async (url, data) => {
     document.querySelector('.status').textContent = message.loading; 
     let res = await fetch(url, {

       method: 'POST',
       body: data
     })
     return await res.text(); // для асинхронщини, text - це метод проміса вивід даних у форматі
   }
  
   const clearInputs = () => {
     input.forEach(item => {
       item.value = ''; 
     })
   }

   form.forEach(item => {
     item.addEventListener('submit', (e) => {
         e.preventDefault(); 
         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status'); 
         item.appendChild(statusMessage); 
          
         const formData = new FormData(item); // обэкт для збору структуризації даних з форми 
        if(item.getAttribute('data-calc') === 'end'){
          for (let key in state){
            formData.append(key, state[key]); 
          }
        }

          postData('assets/server.php', formData)
          .then(res => {// робимо щось із даними які прийшли і сидять в res
            console.log(res)
            statusMessage.textContent = message.success; // повідомляємо користувачу що відправка пройшла успішно
          })
          .catch(() => statusMessage.textContent = message.failure)// обробка помилки 
          .finally(() => {// метод промісу що виконається обовязково
             clearInputs(); 
             setTimeout(() => {
               statusMessage.remove();
             }, 5000)
          })
     })
   })

  
}
export default forms; 