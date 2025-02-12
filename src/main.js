import './style.scss'

const root = document.querySelector('#app')

const WEATHER_DATA = [
    {
        type: 'summer',
        color: '#dca21a'
    },
    {
        type: 'rain',
        color: '#a1408d'
    },
    {
        type: 'winter',
        color: '#2c3844'
    }
]

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

for (let weatherElem of WEATHER_DATA) {
    renderWeatherBlock(weatherElem)
}

const audioElement = new Audio('assets/sounds/summer.mp3');
audioElement.loop = true
rangeInput.addEventListener('input', event => {
    audioElement.volume = event.target.value;
});
function renderWeatherBlock(weatherElem) {
    const div = document.createElement('div')
    const btn = document.createElement('button')

    div.className = weatherElem.type
    btn.id = `btn-${weatherElem.type}`

    div.append(btn)
    container.append(div)
}
container.addEventListener('click', e => {
    const targetElem = e.target
    const buttonElem = targetElem.closest('button')

    if (buttonElem !== null) {
        const weatherElem = WEATHER_DATA.find(elem => elem.type === buttonElem.id.split('-')[1])
        handleClickBtn(weatherElem, audioElement)
        e.stopPropagation()
    }
})

function handleClickBtn(weatherElem, audioElement) {
    const { type, color } = weatherElem
    document.body.style.backgroundImage = `url(assets/${type}-bg.jpg)`
    document.querySelector('h1').style.color = color

    if (!audioElement.src.includes(`assets/sounds/${type}.mp3`)) {
        audioElement.src = `assets/sounds/${type}.mp3`
    }

    if (audioElement.paused) {
        audioElement.play()
        document.querySelector(`#btn-${type}`).style.backgroundImage = `url(assets/icons/${type}.svg)`
    } else {
        audioElement.pause()
        document.querySelector(`#btn-${type}`).style.backgroundImage = 'url(assets/icons/pause.svg)'
    }
}

