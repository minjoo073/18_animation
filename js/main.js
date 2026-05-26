const stateData = {
    still: {
        title: '고요함',
        copy: '호흡의 길이가 자연스럽게 이어지는 상태입니다. 이 평온을 붙잡기보다 조용히 알아차려보세요.',
        action: '창가에서 세 번 길게 호흡하기',
        prompt: '오늘 고요를 느낀 순간은 언제였나요?'
    },
    unsteady: {
        title: '흔들림',
        copy: '생각이 빠르게 오가거나 몸의 어느 곳이 조여 있을 수 있습니다. 우선 해결하지 말고, 그 위치만 확인해보세요.',
        action: '발바닥을 바닥에 두고 숨 세기',
        prompt: '오늘 마음이 흔들렸던 순간은 무엇이었나요?'
    },
    warm: {
        title: '온기',
        copy: '연결감이나 안도감이 몸에 남아 있습니다. 작게 느껴진 온기도 기록하면 오래 돌아볼 수 있습니다.',
        action: '고마운 장면 하나 떠올리기',
        prompt: '오늘 온기가 머문 장면은 무엇이었나요?'
    }
};

const stateButtons = document.querySelectorAll('[data-state]');
const stateTitle = document.querySelector('[data-state-title]');
const stateCopy = document.querySelector('[data-state-copy]');
const stateAction = document.querySelector('[data-state-action]');
const stateReading = document.querySelector('.state-reading');
const recordPrompt = document.querySelector('[data-record-prompt]');
const recordText = document.querySelector('[data-record-text]');
const recordForm = document.querySelector('[data-record-form]');
const recordSection = document.querySelector('.record-section');
const saveStatus = document.querySelector('[data-save-status]');
const storageKey = 'innerStillnessDailyRecord';
let currentState = 'still';

function selectState(key) {
    const selected = stateData[key];

    if (!selected) return;

    currentState = key;
    stateButtons.forEach((button) => {
        const active = button.dataset.state === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', active);
        button.tabIndex = active ? 0 : -1;
    });
    stateTitle.textContent = selected.title;
    stateCopy.textContent = selected.copy;
    stateAction.textContent = selected.action;
    recordPrompt.textContent = selected.prompt;
    recordText.placeholder = selected.prompt;
    stateReading.classList.remove('is-changing');
    void stateReading.offsetWidth;
    stateReading.classList.add('is-changing');
}

stateButtons.forEach((button) => {
    button.addEventListener('click', () => selectState(button.dataset.state));
    button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

        event.preventDefault();
        const buttons = Array.from(stateButtons);
        const change = event.key === 'ArrowRight' ? 1 : -1;
        const next = (buttons.indexOf(button) + change + buttons.length) % buttons.length;
        selectState(buttons[next].dataset.state);
        buttons[next].focus();
    });
});

selectState(currentState);

recordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = recordText.value.trim();

    if (!text) {
        saveStatus.textContent = '한 문장만 적어도 기록이 됩니다.';
        recordText.focus();
        return;
    }

    localStorage.setItem(storageKey, JSON.stringify({
        state: currentState,
        text,
        savedAt: new Date().toISOString()
    }));
    saveStatus.textContent = `오늘의 ${stateData[currentState].title} 기록을 남겼습니다.`;
    recordSection.classList.remove('is-saved');
    void recordSection.offsetWidth;
    recordSection.classList.add('is-saved');
});

try {
    const saved = JSON.parse(localStorage.getItem(storageKey));

    if (saved && stateData[saved.state] && typeof saved.text === 'string') {
        selectState(saved.state);
        recordText.value = saved.text;
        saveStatus.textContent = `저장된 ${stateData[saved.state].title} 기록을 불러왔습니다.`;
    }
} catch (error) {
    localStorage.removeItem(storageKey);
}

const display = document.querySelector('[data-breath-display]');
const phase = document.querySelector('[data-breath-phase]');
const clock = document.querySelector('[data-breath-time]');
const durationButtons = document.querySelectorAll('[data-duration]');
const startButton = document.querySelector('[data-breath-start]');
let duration = 60;
let remaining = duration;
let timer = null;

function formatTime(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const rest = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${rest}`;
}

function renderClock() {
    clock.textContent = formatTime(remaining);
}

durationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (timer) return;
        duration = Number(button.dataset.duration);
        remaining = duration;
        durationButtons.forEach((item) => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.setAttribute('aria-pressed', active);
        });
        renderClock();
    });
});

startButton.addEventListener('click', () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
        phase.textContent = '잠시 멈췄습니다';
        startButton.textContent = '다시 시작';
        display.classList.remove('running');
        return;
    }

    if (remaining === 0) remaining = duration;
    phase.textContent = '숨을 천천히 따라가세요';
    startButton.textContent = '잠시 멈춤';
    display.classList.add('running');
    timer = setInterval(() => {
        remaining -= 1;
        renderClock();
        if (remaining === 0) {
            clearInterval(timer);
            timer = null;
            phase.textContent = '호흡을 마쳤습니다';
            startButton.textContent = '다시 하기';
            display.classList.remove('running');
        }
    }, 1000);
});

const audio = document.querySelector('[data-ambient-audio]');
const soundToggle = document.querySelector('[data-sound-toggle]');
const soundLabel = document.querySelector('[data-sound-label]');

soundToggle.addEventListener('click', async () => {
    if (audio.paused) {
        try {
            await audio.play();
            soundToggle.setAttribute('aria-pressed', 'true');
            soundLabel.textContent = 'SOUND ON';
        } catch (error) {
            soundLabel.textContent = 'SOUND OFF';
        }
    } else {
        audio.pause();
        soundToggle.setAttribute('aria-pressed', 'false');
        soundLabel.textContent = 'SOUND OFF';
    }
});

const navLinks = document.querySelectorAll('[data-nav]');
const sections = document.querySelectorAll('[data-section]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('active', link.dataset.nav === entry.target.id));
    });
}, {rootMargin: '-30% 0px -55%'});

sections.forEach((section) => observer.observe(section));

const loader = document.querySelector('[data-loader]');
const revealed = document.querySelectorAll('[data-reveal]');

function finishLoading() {
    document.body.classList.remove('is-loading');
    document.body.classList.add('page-ready');
    loader.classList.add('is-hidden');
    window.setTimeout(() => loader.remove(), 1000);
}

window.addEventListener('load', () => {
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2400;
    window.setTimeout(finishLoading, delay);
});

const revealObserver = new IntersectionObserver((entries, target) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        target.unobserve(entry.target);
    });
}, {threshold: 0.16, rootMargin: '0px 0px -8%'});

revealed.forEach((element) => revealObserver.observe(element));
