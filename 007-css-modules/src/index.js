import button from './button.scss'
console.log('css modules', button)

document.body.innerHTML = `
<div class="${button.container}">
<button class="${button.button} ${button.red}">button</button>
<button class="${button.button} ${button.green}">button</button>
<button class="${button.button} ${button.yellow} ${button.bigButton}">button</button>
</div>
`