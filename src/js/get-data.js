//
// ПОЛУЧЕНИЕ МАССИВА
//

const requestUrl = 'db.json'

fetch(requestUrl).then(response => {
    return response.json()
})
.then(data => 
        {
            let newData = data.flatlist
            // Находим ul
            const flatArr = document.querySelector('.flat-list')
            //Функция обновления массива
            updateList = (updateArr) => {
                // Фильтруем массив на входе
                return updateArr = newData.filter(function (item) {
                    // Сравниваем значения слайдеров
                    let sliderPriceValues = sliderByPrice.noUiSlider.get()
                    let sliderSizeValues = sliderBySize.noUiSlider.get()
                    // Находим активную кнопку фильтра по количеству комнат
                    const radioBtnChecked = document.querySelector('input:checked')
                    return  item.price >= sliderPriceValues[0] &&
                            item.price <= sliderPriceValues[1] &&
                            item.size >= sliderSizeValues[0] &&
                            item.size <= sliderSizeValues[1] &&
                            // И значение нажатой кнопки комнат
                            item.rooms === Number(radioBtnChecked.value)
                })
            }
//
// ВСТАВКА ПЕРВЫХ LI //
//
            function showList() {
                // Очищаем i для правильного функционирования добавления li (БОЛЬШЕ ПОСТОВ)
                i = 0
                // Клонируем массив и присваиваем переменной данные первых 10 постов
                let newDataArr = Object.assign([], updateList()).splice(0, 10)
                let showList = ''
                newDataArr.forEach(function (item) {
                    showList += `
                    <li class="flat-list__item flat-item">
                        <div class="flat-item__content">
                            <span class="flat-item__rooms">${item.rooms}${item.text}</span>
                            <div class="flat-item__description">
                            <span class="flat-item__size">${item.size}</span>
                            <span class="flat-item__floor">${item.floor}</span>
                            <span class="flat-item__price">${item.price}</span></div>
                            <img class="flat-item__img" src="${item.img}" alt="flat plan">
                        </div>
                    </li>
                    `
                })
                flatArr.innerHTML = showList
                hideMoreBtn()
            }
//
// БОЛЬШЕ ПОСТОВ //
//          
            // Шаг обреза массива
            let i = 0
            // Кнопка "Загрузить ещё"
            const moreBtn = document.querySelector('#more-btn')
            // Отображение массива по клику по кнопке "Загрузить ещё"
            moreBtn.addEventListener('click', () => {
                // Определяем сдвиг массива на величину показа ShowList()
                let step = 10
                // Увеличиваем i на шаг c каждым кликом
                i = i + step
                // Клонируем массив
                let moreArr = Object.assign([], updateList()).splice(i, 10)
                // Выводим на страницу
                moreArr.forEach(function (item) {
                    flatArr.innerHTML += `
                    <li class="flat-list__item flat-item">
                        <div class="flat-item__content">
                            <span class="flat-item__rooms">${item.rooms}${item.text}</span>
                            <div class="flat-item__description">
                            <span class="flat-item__size">${item.size}</span>
                            <span class="flat-item__floor">${item.floor}</span>
                            <span class="flat-item__price">${item.price}</span></div>
                            <img class="flat-item__img" src="${item.img}" alt="flat plan">
                        </div>
                    </li>
                    `
                })
                hideMoreBtn()
            })
            // Функция скрытия и показа кнопки
            function hideMoreBtn() {
                let allLi = document.querySelectorAll('.flat-item')
                // Если длина li >= длины отфильтрованного массива, скрываем кнопку
                if (allLi.length >= updateList().length) {
                    moreBtn.classList.add('main__btn--hide')
                } else {
                    moreBtn.classList.remove('main__btn--hide')
                }
            }
//
// СОРТИРОВКА //
//
            const sortBtns = document.querySelectorAll('#sort-btn');
            let sortType = false
            // Добавление класса active элементам
            sortBtns.forEach((item) => {
                item.addEventListener('click', () => {
                    let currentBtn = item
                    // Убираем класс у всех item
                    sortBtns.forEach((item) => {
                        item.classList.remove('sort__btn--active')
                    })
                    // Добавляем класс текущей item
                    currentBtn.classList.add('sort__btn--active')
                    // Находим таргет
                    let sortTarget = currentBtn.dataset.target
                    //Проверяем sortType и в зависимости от значения сортируем по возрастанию/убыванию
                    if (sortTarget === 'price') {
                        sortType === false ? newData.sort((a, b) => a.price > b.price ? 1 : -1) : newData.sort((a, b) => a.price < b.price ? 1 : -1);
                    } else if (sortTarget === 'size'){
                        sortType === false ? newData.sort((a, b) => a.size > b.size ? 1 : -1) : newData.sort((a, b) => a.size < b.size ? 1 : -1);
                    } else if (sortTarget === 'floor'){
                        sortType === false ? newData.sort((a, b) => a.floor > b.floor ? 1 : -1) : newData.sort((a, b) => a.floor < b.floor ? 1 : -1);
                    }
                    sortType = !sortType
                    showList()
                })
            })
//
// ФИЛЬТРЫ //
//          
            // При изменении слайдеров цены отправляем fetch
            sliderByPrice.noUiSlider.on('change', function() {
                fetch(requestUrl).then(response => {
                    return response.json()
                })
                .then(data => {
                    //Обновляем изначальный массив
                    newData = data.flatlist
                    showList()
                })
            })
            // По аналогии со слайдером размеров
            sliderBySize.noUiSlider.on('change', function() {
                fetch(requestUrl).then(response => {
                    return response.json()
                })
                .then(data => {
                    newData = data.flatlist
                    showList()
                })
            })
            // Находим инпуты радио
            const radioBtns = document.querySelectorAll('.radio__input')
            // При нажатии на каждый отправляем fetch
            radioBtns.forEach(function (item) {
                item.addEventListener('click', () => {
                    fetch(requestUrl).then(response => {
                        return response.json()
                    })
                    .then(data => {
                        //Обновляем изначальный массив
                        newData = data.flatlist
                        showList()
                    })
                })
            })
            // Сброс значений фильтра
            const resetBtn = document.querySelector('.filter__reset').addEventListener('click', () => {
                sliderByPrice.noUiSlider.reset()
                sliderBySize.noUiSlider.reset()
                newData = data.flatlist
                showList()
            })

            // Изначальный рендер списка
            showList()
        })
    .catch(err => console.log(err));