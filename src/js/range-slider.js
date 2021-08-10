//Фильтр 1
const sliderByPrice = document.querySelector('#slider-price');

if(sliderByPrice) {
    noUiSlider.create(sliderByPrice, {
        start: [2000000, 9000000],
        connect: true,
        step: 1,
        range: {
            'min': [2000000],
            'max': [9000000]
        },
    });
    // Инпуты значений слайдера
    const inputPrice1 = document.querySelector('#input-price-1');
    const inputPrice2 = document.querySelector('#input-price-2');

    const inputs = [inputPrice1, inputPrice2];
    // При изменении ползунков показывать значение в импутах
    sliderByPrice.noUiSlider.on('update', function(values, handle) {
        inputs[handle].value = Math.round(values[handle])
    })

    const setRangeSlider = (i, value) => {
        let priceArr = [null, null]
        priceArr[i] = value
        sliderByPrice.noUiSlider.set(priceArr)
    }
    
    inputs.forEach((item, index) => {
        item.addEventListener('change', (e) => {
            setRangeSlider(index, e.currentTarget.value)
        })
    })
}

// Фильтр 2

const sliderBySize = document.querySelector('#slider-size');

if (sliderBySize) {
    noUiSlider.create(sliderBySize, {
        start: [33, 200],
        connect: true,
        step: 1,
        range: {
            'min': [33],
            'max': [200]
        }
    });
    const inputSize1 = document.querySelector('#input-size-1');
    const inputSize2 = document.querySelector('#input-size-2');

    const inputs = [inputSize1, inputSize2];

    sliderBySize.noUiSlider.on('update', function(values, handle) {
        inputs[handle].value = Math.round(values[handle])
    })
    let sizeArr = [null, null]
    const setRangeSlider = (i, value) => {
        sizeArr[i] = value
        sliderBySize.noUiSlider.set(sizeArr)
    }
    
    inputs.forEach((item, index) => {
        item.addEventListener('change', (e) => {
            setRangeSlider(index, e.currentTarget.value)
        })
    })
}

// Сброс значений фильтра

// sliderByPrice.noUiSlider.reset()
// sliderBySize.noUiSlider.reset()

// Получение значений слайдеров

// console.log(sliderByPrice.noUiSlider.get())
// console.log(sliderByPrice.noUiSlider.get())