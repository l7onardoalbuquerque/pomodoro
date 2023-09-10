/*
	modos:
	- foco:       25m -> 50m
	- pausacurta: 5m  -> 10m
	- pausalonga: 15m -> 30m

	4 -> ciclos
	 1. foco, pausacurta
	 2. foco, pausacurta
	 3. foco, pausacurta
	 4. foco, pausalonga
	reset

	funcoes:
	X- popup de configuracoes
	X- resetar pomodoro
	X- play, pause
	X- som quando termina um modo
*/

const openSettings = document.getElementById('open-settings');
const closeSettings = document.getElementById('close-settings');
const settingsModal = document.getElementById('pomodoro-settings');

const time = document.querySelectorAll('.time');
const minus = document.querySelectorAll('.minus');
const add = document.querySelectorAll('.add');

const playBtn = document.getElementById('play-btn');
const resetBtn = document.getElementById('reset-btn');
const circle = document.getElementById('pomodoro-circle');
const text = document.getElementById('pomodoro-countdown');
const currentMode = document.getElementById('current-mode');
const nextMode = document.getElementById('next-mode');

const audio = new Audio('../assets/alarm.wav');

const data = {
	play: false,
	session: 0,
	color: '',
	timer: 0,
	fulltimer: 0,
	focus: 1500,
	short: 300,
	long: 900,
}

const pomodoro = setInterval(() => {

	if (data.play) {
		var m = Math.floor(data.timer / 60);
		var s = Math.floor(data.timer % 60);
		s < 10 ? s = '0'+ s : {}
		m < 10 ? m = '0'+ m : {}

		offset = 703.36 - ((data.timer*1000) / (data.fulltimer*1000)) * 703.36;
		circle.style.strokeDashoffset = offset;
		text.innerHTML = m + ":" + s;

		if (m === '00' & s === '00') {
			data.session += 1;
			data.session === 8 ? data.session = 0 : {}
			audio.play();
			resetTimer();
		}

		data.timer -= 1;
	}

}, 1000);

function resetTimer() {

	data.play = false;
	circle.style.strokeDashoffset = 0;
	playBtn.children[0].src = 'assets/play.svg';

	if (data.session % 2 === 0) {
		data.timer = data.focus;
		data.fulltimer = data.focus;
		data.color = '#84CC16';

		if (data.session + 1 == 7) {
			currentMode.src = 'assets/foco.svg';
			nextMode.src = 'assets/pausa-longa.svg';
		} else {
			currentMode.src = 'assets/foco.svg';
			nextMode.src = 'assets/pausa-curta.svg';
		}

	} else if (data.session === 7) {
		data.timer = data.long;
		data.fulltimer = data.long;
		data.color = '#06B6D4';
		currentMode.src = 'assets/pausa-longa.svg';
		nextMode.src = 'assets/foco.svg';
	} else {
		data.timer = data.short;
		data.fulltimer = data.short;
		data.color = '#F59E0B';
		currentMode.src = 'assets/pausa-curta.svg';
		nextMode.src = 'assets/foco.svg';
	}

	var m = Math.floor(data.timer / 60);
	var s = Math.floor(data.timer % 60);
	s < 10 ? s = '0'+ s : {}
	m < 10 ? m = '0'+ m : {}

	circle.style.stroke = data.color;
	text.innerHTML = m + ":" + s;
}

playBtn.addEventListener('click', () => {
	data.play = !data.play;
	if (data.play) {
		playBtn.children[0].src = 'assets/pause.svg';
	} else {
		playBtn.children[0].src = 'assets/play.svg';
	}
});

resetBtn.addEventListener('click', () => {
	resetTimer()
});


openSettings.addEventListener('click', () => {
    settingsModal.style.display = "flex";
})

closeSettings.addEventListener('click', () => {
    settingsModal.style.display = "none";
})

add.forEach((add) => {
    add.addEventListener('click', () => {

        let attribute = add.getAttribute('data-add');

        if (attribute == 'focus' && (data.focus + 60) <= 3000) {
            data.focus += 60;
            time.forEach((time) => {
                if (time.getAttribute('data-p') == 'focus') {
                    time.innerHTML = data.focus / 60;
                    resetTimer()
                }
            })
        }
        if (attribute == 'short' && (data.short + 60) <= 600) {
            data.short += 60;
            time.forEach((time) => {
                if (time.getAttribute('data-p') == 'short') {
                    time.innerHTML = data.short / 60;
                    resetTimer()
                }
            })
        }
        if (attribute == 'long' && (data.long + 60) <= 1800) {
            data.long += 60;
            time.forEach((time) => {
                if (time.getAttribute('data-p') == 'long') {
                    time.innerHTML = data.long / 60;
                    resetTimer()
                }
            })
        }
    })
})

minus.forEach((minus) => {
    minus.addEventListener('click', () => {

        let attribute = minus.getAttribute('data-minus');

        if (attribute == 'focus' && (data.focus - 60) >= 1500) {
            data.focus -= 60;
            time.forEach((time) => {
                if (time.getAttribute('data-p') == 'focus') {
                    time.innerHTML = data.focus / 60;
                    resetTimer()
                }
            })
        }
        if (attribute == 'short' && (data.short - 60) >= 300) {
            data.short -= 60;
            time.forEach((time) => {
                if (time.getAttribute('data-p') == 'short') {
                    time.innerHTML = data.short / 60;
                    resetTimer()
                }
            })
        }
        if (attribute == 'long' && (data.long - 60) >= 900) {
            data.long -= 60;
            time.forEach((time) => {
                if (time.getAttribute('data-p') == 'long') {
                    time.innerHTML = data.long / 60;
                    resetTimer()
                }
            })
        }
    })
})

resetTimer()