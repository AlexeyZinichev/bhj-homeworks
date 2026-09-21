document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const sendButton = document.getElementById('send');
    const progressBar = document.getElementById('progress');
    const labelDesc = document.querySelector('.input__wrapper-desc');

    // Функция сброса интерфейса
    function resetUI() {
        sendButton.disabled = false;
        progressBar.value = 0;
        if (labelDesc) labelDesc.textContent = 'Имя файла...';
    }

    /* --- ВАШ КОД ДЛЯ ОТОБРАЖЕНИЯ ИМЕНИ ФАЙЛА --- */
    // Отслеживаем выбор файла пользователем
    fileInput.onchange = function() {
        let fileName = 'Файл не выбран';
        
        // Проверяем, выбрал ли пользователь что-то
        if (this.files && this.files.length > 0) {
            // Используем File API — это самый надежный современный способ
            fileName = this.files[0].name;
            
            /*
             * Если нужно оставить именно вашу логику split("\\"), 
             * она потребует небольшой доработки для работы с "C:\fakepath\":
             * let pathArray = this.value.split("\\").filter(item => item !== "fakepath");
             * fileName = pathArray[pathArray.length - 1];
            */
        }
        
        if (labelDesc) {
            labelDesc.textContent = fileName;
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (!file) return;

        // Синхронизируем текст описания на случай, если сработал onchange,
        // но мы зашли сюда программно (например, после сброса формы)
        if (labelDesc) labelDesc.textContent = file.name;
        
        sendButton.disabled = true;
        uploadFile(file);
    });

    function uploadFile(file) {
        const xhr = new XMLHttpRequest();
        const url = 'https://students.netoservices.ru/nestjs-backend/upload';
        
        xhr.open('POST', url, true);

        const formData = new FormData();
        formData.append('file', file);

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progressBar.value = percentComplete;
            }
        }, false);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                sendButton.disabled = false;
                if (xhr.status === 200) {
                    alert('Файл успешно загружен!');
                    console.log(xhr.responseText);
                } else {
                    alert(`Ошибка при загрузке: ${xhr.status}`);
                    console.error(xhr.responseText);
                }
                setTimeout(resetUI, 500);
            }
        };

        xhr.send(formData);
    }
});
