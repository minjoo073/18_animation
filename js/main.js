const homeMessage = document.querySelector('[data-home-message]');
const homeMessages = [
    '우리는 모두 각자의 내면에 광활한 우주를 품고 있습니다.<br>어둠 속에 숨겨진 진정한 나를 마주하고, 쏟아지는 별빛 속에서 답을 찾아보세요.<br>당신의 깊은 내면이 들려주는 고요한 이야기에 집중할 시간입니다.',
    '잠깐 멈추면 마음의 방향이 조금 더 선명해집니다.<br>오늘의 감정과 호흡을 천천히 살피며, 나를 가꾸는 시간을 시작해보세요.<br>고요는 멀리 있는 것이 아니라 지금 돌아오는 감각입니다.',
    '내면을 돌보는 일은 거창하지 않아도 괜찮습니다.<br>한 문장, 한 번의 숨, 작은 기록이 오늘의 나를 부드럽게 정리합니다.<br>필요한 만큼 천천히 머물러보세요.'
];

if (homeMessage) {
    let messageIndex = 0;
    setInterval(() => {
        messageIndex = (messageIndex + 1) % homeMessages.length;
        homeMessage.innerHTML = homeMessages[messageIndex];
    }, 8200);
}

const moodData = {
    calm: {
        title: '평온',
        subtitle: '마음의 속도가 안정된 상태',
        copy: '큰 파도는 잦아들고, 지금 필요한 것을 차분히 바라볼 수 있는 날입니다. 이 상태에서는 무리한 확장보다 리듬을 유지하는 선택이 잘 맞습니다.',
        action: '천천히 걷기',
        levels: ['48%', '72%', '38%', '84%', '62%', '78%', '68%'],
        signalTitle: '회복 신호',
        signal: '평온한 날에는 결정의 수를 줄이고 익숙한 루틴을 유지할수록 안정감이 오래 이어집니다.',
        prompt: '오늘 평온을 지켜준 순간은 무엇이었나요?',
        notes: [
            '몸의 긴장을 살피고 호흡을 길게 가져가면 하루의 시작이 부드러워집니다.',
            '이미 잘 유지하고 있는 리듬 하나를 의식적으로 반복해보세요.',
            '오늘의 나에게 필요한 말은 “이 정도의 고요도 충분하다”입니다.'
        ]
    },
    anxious: {
        title: '불안',
        subtitle: '생각이 앞서 달리는 상태',
        copy: '아직 일어나지 않은 일까지 마음이 먼저 계산하고 있을 수 있습니다. 지금은 전체를 해결하려 하기보다 손에 잡히는 하나를 정하는 편이 좋습니다.',
        action: '할 일 하나만 적기',
        levels: ['76%', '68%', '82%', '54%', '66%', '42%', '50%'],
        signalTitle: '진정 신호',
        signal: '불안이 높을 때는 선택지를 줄이고 시간을 짧게 나누면 마음이 다시 현재로 돌아오기 쉽습니다.',
        prompt: '지금 불안을 가장 크게 만든 생각은 무엇인가요?',
        notes: [
            '아침에는 해야 할 일을 전부 펼치기보다 가장 작은 한 가지를 먼저 고르세요.',
            '오후에는 알림을 줄이고, 5분 동안 같은 호흡을 반복해보세요.',
            '오늘의 나에게 필요한 말은 “지금 한 가지면 충분하다”입니다.'
        ]
    },
    tired: {
        title: '무기력',
        subtitle: '에너지가 낮게 가라앉은 상태',
        copy: '마음이 게으른 것이 아니라 회복을 요구하고 있을 수 있습니다. 오늘은 성취보다 몸을 다시 켜는 작은 감각을 만드는 시간이 필요합니다.',
        action: '물 마시고 창문 열기',
        levels: ['34%', '42%', '30%', '46%', '38%', '52%', '44%'],
        signalTitle: '기운 회복',
        signal: '무기력한 날에는 큰 목표보다 빛, 물, 움직임처럼 즉시 느껴지는 감각이 회복의 실마리가 됩니다.',
        prompt: '지금 내 몸이 가장 먼저 필요로 하는 것은 무엇인가요?',
        notes: [
            '아침에는 물 한 잔과 자연광처럼 몸이 바로 알아차리는 자극을 주세요.',
            '오후에는 10분만 움직이고 멈춰도 괜찮습니다.',
            '오늘의 나에게 필요한 말은 “천천히 다시 켜져도 된다”입니다.'
        ]
    },
    sad: {
        title: '슬픔',
        subtitle: '마음이 안쪽으로 젖어드는 상태',
        copy: '슬픔은 빨리 지워야 하는 감정보다, 내가 무엇을 소중히 여겼는지 알려주는 신호에 가깝습니다. 오늘은 감정을 설명하려 애쓰기보다 안전하게 머물 공간이 필요합니다.',
        action: '짧은 문장으로 마음 적기',
        levels: ['44%', '36%', '58%', '40%', '48%', '34%', '46%'],
        signalTitle: '돌봄 신호',
        signal: '슬픔이 있는 날에는 혼자 버티는 시간을 줄이고, 말이나 글로 감정의 윤곽을 작게 꺼내는 것이 도움이 됩니다.',
        prompt: '오늘 마음이 가장 조용히 아팠던 장면은 무엇인가요?',
        notes: [
            '아침에는 괜찮은 척하기보다 몸에서 가장 무거운 부분을 알아차려보세요.',
            '오후에는 믿을 수 있는 사람이나 기록장에 한 문장만 꺼내도 충분합니다.',
            '오늘의 나에게 필요한 말은 “느끼는 마음도 나의 일부다”입니다.'
        ]
    },
    grateful: {
        title: '감사',
        subtitle: '작은 온기가 선명한 상태',
        copy: '오늘의 마음은 이미 받은 것들을 알아차릴 준비가 되어 있습니다. 이 감정은 크게 붙잡기보다 작은 장면으로 남길 때 오래 이어집니다.',
        action: '고마운 장면 세 가지 쓰기',
        levels: ['58%', '64%', '72%', '70%', '82%', '76%', '88%'],
        signalTitle: '확장 신호',
        signal: '감사가 느껴지는 날에는 주변과의 연결감이 높아져, 기록이나 표현이 좋은 회복 자원이 됩니다.',
        prompt: '오늘 고맙다고 느낀 작은 장면은 무엇인가요?',
        notes: [
            '아침에는 당연하게 넘긴 도움 하나를 떠올려보세요.',
            '오후에는 고마웠던 사람에게 짧은 말을 남겨도 좋습니다.',
            '오늘의 나에게 필요한 말은 “이미 내 곁에 있는 것이 있다”입니다.'
        ]
    },
    excited: {
        title: '기대',
        subtitle: '앞으로 향하는 힘이 생긴 상태',
        copy: '마음이 새로운 가능성 쪽으로 열려 있습니다. 다만 속도가 너무 빨라지면 금방 지칠 수 있으니, 설렘을 현실적인 순서로 옮기는 것이 좋습니다.',
        action: '기대되는 일의 첫 단계 정하기',
        levels: ['52%', '66%', '74%', '68%', '80%', '86%', '72%'],
        signalTitle: '집중 신호',
        signal: '기대가 큰 날에는 아이디어를 바로 늘리기보다 첫 행동을 정하면 설렘이 안정적인 추진력으로 바뀝니다.',
        prompt: '오늘 기대되는 일의 첫 장면은 무엇인가요?',
        notes: [
            '아침에는 하고 싶은 일을 전부 적은 뒤 가장 가벼운 시작점을 고르세요.',
            '오후에는 기대감이 흐트러지지 않도록 한 번에 하나씩 진행해보세요.',
            '오늘의 나에게 필요한 말은 “설렘은 천천히 현실이 된다”입니다.'
        ]
    }
};

const moodButtons = document.querySelectorAll('[data-mood]');
const moodTitle = document.querySelector('[data-mood-title]');
const moodSubtitle = document.querySelector('[data-mood-subtitle]');
const moodCopy = document.querySelector('[data-mood-copy]');
const moodAction = document.querySelector('[data-mood-action]');
const moodPrompt = document.querySelector('[data-mood-prompt]');
const moodText = document.querySelector('[data-mood-text]');
const saveStatus = document.querySelector('[data-save-status]');
const signalTitle = document.querySelector('[data-mood-signal-title]');
const signal = document.querySelector('[data-mood-signal]');
const bars = document.querySelectorAll('[data-level]');
const notes = document.querySelectorAll('[data-note]');
const saveButton = document.querySelector('.mood-save');
let currentMood = 'calm';

function updateMood(key) {
    const selected = moodData[key];

    moodTitle.textContent = selected.title;
    moodSubtitle.textContent = selected.subtitle;
    moodCopy.textContent = selected.copy;
    moodAction.textContent = selected.action;
    moodPrompt.textContent = selected.prompt;
    moodText.placeholder = selected.prompt;
    signalTitle.textContent = selected.signalTitle;
    signal.textContent = selected.signal;

    bars.forEach((bar, index) => {
        bar.style.setProperty('--level', selected.levels[index]);
    });

    notes.forEach((note, index) => {
        note.textContent = selected.notes[index];
    });
}

if (moodButtons.length && saveButton) {
    moodButtons.forEach((button) => {
        button.addEventListener('click', () => {
            currentMood = button.dataset.mood;

            moodButtons.forEach((item) => {
                const isActive = item === button;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-selected', isActive);
            });

            updateMood(currentMood);
        });
    });

    saveButton.addEventListener('click', () => {
        const text = moodText.value.trim();
        const selected = moodData[currentMood];

        if (!text) {
            saveStatus.textContent = '한 문장만 적어도 오늘의 기록이 됩니다.';
            moodText.focus();
            return;
        }

        const saved = {
            mood: selected.title,
            text,
            date: new Date().toISOString()
        };
        localStorage.setItem('innerStillnessMoodRecord', JSON.stringify(saved));
        saveStatus.textContent = `오늘의 ${selected.title} 기록이 남겨졌습니다.`;
    });
}

const routineData = {
    calm: {
        morning: [
            ['햇빛 호흡', '창가 근처에서 어깨 힘을 풀고 네 박자로 숨을 들이마십니다.'],
            ['물 한 모금 명상', '물을 천천히 마시며 입 안의 온도와 목의 움직임을 느낍니다.'],
            ['느린 시작 문장', '오늘 하루를 부드럽게 여는 한 문장을 마음속으로 반복합니다.'],
            ['손바닥 감각', '두 손을 맞대고 온기가 올라오는 지점을 조용히 바라봅니다.']
        ],
        day: [
            ['소리 거리두기', '가장 가까운 소리와 먼 소리를 번갈아 듣고 생각의 속도를 낮춥니다.'],
            ['목선 풀기', '고개를 좌우로 천천히 기울이며 굳은 감각을 흘려보냅니다.'],
            ['짧은 멈춤', '하던 일을 내려놓고 세 번의 호흡만 온전히 따라갑니다.'],
            ['화면 밖 응시', '창밖이나 벽면 한 지점에 시선을 두고 눈의 긴장을 쉽니다.']
        ],
        night: [
            ['불빛 낮추기', '주변 조명을 낮추고 방의 어두운 가장자리를 천천히 살핍니다.'],
            ['감정 내려놓기', '오늘 남은 감정을 이름 붙인 뒤 숨을 내쉬며 느슨하게 둡니다.'],
            ['느린 기록', '가장 오래 남은 장면 하나를 짧게 적고 종이를 덮습니다.'],
            ['잠 전 호흡', '등과 침구가 닿는 면을 느끼며 여섯 번 깊게 호흡합니다.']
        ]
    },
    focus: {
        morning: [
            ['첫 목표 정렬', '오늘 꼭 붙잡을 한 가지를 정하고 나머지는 잠시 뒤로 둡니다.'],
            ['박자 호흡', '네 박자 들숨과 네 박자 날숨을 반복하며 주의를 모읍니다.'],
            ['책상 정돈', '시야 안의 물건 세 개만 정리하고 시작 신호를 만듭니다.'],
            ['시작 타이머', '십 분 동안 할 일 하나만 고르고 바로 첫 문장을 엽니다.']
        ],
        day: [
            ['잡음 비우기', '머릿속에 떠오른 할 일을 모두 적고 지금 할 것 하나만 남깁니다.'],
            ['눈 감은 리셋', '눈을 감고 열 번 숨을 세며 흐려진 초점을 다시 모읍니다.'],
            ['한 화면 정리', '브라우저 탭을 줄이고 필요한 화면 하나만 남겨둡니다.'],
            ['짧은 몰입', '방해 알림을 끄고 십오 분 동안 한 작업에만 머뭅니다.']
        ],
        night: [
            ['마감선 긋기', '오늘의 일과 내일의 일을 한 줄로 나눠 마음의 경계를 만듭니다.'],
            ['완료 확인', '작게 끝낸 것 세 가지를 떠올리며 몸의 긴장을 풀어줍니다.'],
            ['내일 첫 장면', '내일 가장 먼저 볼 화면이나 문장을 미리 정합니다.'],
            ['생각 보관', '잠들기 전 떠오르는 아이디어를 짧게 적고 다시 보지 않습니다.']
        ]
    },
    restore: {
        morning: [
            ['몸 깨우기', '발바닥을 바닥에 붙이고 체중이 실리는 방향을 천천히 느낍니다.'],
            ['따뜻한 시작', '손으로 팔과 어깨를 가볍게 쓸어내리며 몸을 안심시킵니다.'],
            ['낮은 숨', '배 쪽으로 숨을 보내며 오늘 필요한 속도를 낮게 맞춥니다.'],
            ['부드러운 약속', '무리하지 않을 기준 하나를 정하고 하루를 시작합니다.']
        ],
        day: [
            ['긴장 스캔', '이마, 턱, 어깨, 손끝 순서로 힘이 들어간 곳을 찾습니다.'],
            ['자리 바꾸기', '잠시 일어나 다른 방향을 바라보고 몸의 방향감을 새로 만듭니다.'],
            ['온도 감각', '컵이나 손끝의 온도를 느끼며 생각을 몸 쪽으로 데려옵니다.'],
            ['느린 걷기', '짧은 거리라도 발이 닿는 순서를 느끼며 천천히 걷습니다.']
        ],
        night: [
            ['하루 풀기', '오늘 버텨낸 몸에게 짧게 고맙다고 말하고 숨을 내려놓습니다.'],
            ['무게 맡기기', '누운 자세에서 몸의 무게를 바닥이나 침구에 맡깁니다.'],
            ['조용한 정리', '내일로 미뤄도 되는 일을 한 문장으로 적고 닫습니다.'],
            ['편안한 끝', '가슴 위에 손을 올리고 가장 안정적인 리듬을 기다립니다.']
        ]
    }
};

const selectedRoutine = {mood: 'calm', time: 'morning'};
const titleTargets = document.querySelectorAll('[data-routine-title]');
const copyTargets = document.querySelectorAll('[data-routine-copy]');
const refreshButton = document.querySelector('.routine-refresh');

function pickRoutine() {
    const pool = [...routineData[selectedRoutine.mood][selectedRoutine.time]]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    pool.forEach((item, index) => {
        titleTargets[index].textContent = item[0];
        copyTargets[index].textContent = item[1];
    });
}

if (refreshButton) {
    document.querySelectorAll('.routine-options button').forEach((button) => {
        button.addEventListener('click', () => {
            const group = button.closest('.routine-options');
            selectedRoutine[group.dataset.routineGroup] = button.dataset.value;
            group.querySelectorAll('button').forEach((item) => item.classList.toggle('active', item === button));
            pickRoutine();
        });
    });

    refreshButton.addEventListener('click', pickRoutine);
    pickRoutine();
}
