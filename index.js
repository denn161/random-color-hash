const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', e => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space') {
        setRendomColors()
    }
})

document.addEventListener('click', e => {
    const type = e.target.dataset.type
    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')

    }
    if (type === 'copy') {
        copyToClickBoard(e.target.textContent)
    }
})

function generateRandomColor() {

    const hexCods = '0123456789ABCDEF'

    let color = ''

    for (let i = 0; i < 6; i++) {

        color += hexCods[Math.floor(Math.random() * hexCods.length)]
    }

    return `#${color}`


}

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text)
}

function setRendomColors(isInitial) {

    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((item, index) => {
        const isLocked = item.querySelector('i').classList.contains('fa-lock')
        const text = item.querySelector('h2')
        const btn = item.querySelector('button')
        const color = isInitial ?
            colors[index] ? colors[index] : chroma.random()
            : chroma.random()

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        item.style.backgroundColor = color
        setTextColor(text, color)
        setTextColor(btn, color)

    })

    updateColorsHash(colors)

}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}


function updateColorsHash(colors = []) {
    document.location.hash = colors.map(item => item.toString().substring(1)).join('-')


}


function getColorsFromHash() {

    isHash = document.location.hash.length
    if (isHash > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color)

    }

    return []
}

setRendomColors(true)


