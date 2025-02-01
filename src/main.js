import './style.scss'

const root = document.querySelector('#app')

const WEATHER_TYPES = ['summer', 'rain', 'winter']

const container = document.createElement('div')
container.className = 'container'
root.append(container)

const inputContainer = document.createElement('div')
inputContainer.className = 'input-container'
root.append(inputContainer)

const rangeInput = document.createElement('input')
rangeInput.setAttribute('type', 'range');
rangeInput.setAttribute('min', '0');
rangeInput.setAttribute('max', '1');
rangeInput.setAttribute('step', '0.1');
inputContainer.append(rangeInput)

const audioElementsArr = []

for (let i = 0; i < 3; i++) {
    renderWeatherBlock(i)
}

function renderWeatherBlock(index) {
    const div = document.createElement('div')
    const btn = document.createElement('button')
    const audioElement = new Audio(`assets/sounds/${WEATHER_TYPES[index]}.mp3`);
    audioElementsArr.push(audioElement)
    audioElement.loop = true
    rangeInput.addEventListener('input', event => {
        audioElement.volume = event.target.value;
    });
    div.className = WEATHER_TYPES[index]
    btn.id = `btn-${index}`
    audioElement.id = `audio-${index}`
    btn.onclick = () => handleClickBtn(WEATHER_TYPES[index], audioElement, index)
    div.append(btn)
    container.append(div)
}

function handleClickBtn(type, audioElement, index) {
    document.body.style.backgroundImage = `url(assets/${type}-bg.jpg)`
    if (type === 'summer') {
        document.querySelector('h1').style.color = '#dca21a'
    } else if (type === 'rain') {
        document.querySelector('h1').style.color = '#a1408d'
    } else {
        document.querySelector('h1').style.color = '#2c3844'
    }

    audioElementsArr.forEach(elem => {
            if (elem.id.indexOf(index) === -1) {
                elem.pause()
            }
        }
    )

    //Хотела сделать так, но почему-то не ищутся элементы :(
    /*for (let i = 0; i < 3; i++) {
        if (i !== index) {
            document.querySelector(`#audio-${i}`).pause()
        }
    }*/

    if (audioElement.paused) {
        audioElement.play()
        document.querySelector(`#btn-${index}`).style.backgroundImage = `url(assets/icons/${type}.svg)`
    } else {
        audioElement.pause()
        document.querySelector(`#btn-${index}`).style.backgroundImage = 'url(assets/icons/pause.svg)'
    }
}

