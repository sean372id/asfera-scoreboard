'use strict';

// ═══════════════════════════════════════════════════════════
// BroadcastChannel
//   chSend : control → overlays  (state updates & toggle)
//   chRecv : overlays → control  (ready ping)
// ═══════════════════════════════════════════════════════════
const chSend = new BroadcastChannel('scoreboard_data');
const chRecv = new BroadcastChannel('scoreboard_status');

// ═══════════════════════════════════════════════════════════
// State
// ═══════════════════════════════════════════════════════════
const state = {
    sport:         'basketball', // 'basketball' | 'futsal'
    homeScore:     0,
    awayScore:     0,
    homeName:      'Home Team',
    homeInitial:   'HOME',
    awayName:      'Away Team',
    awayInitial:   'AWAY',
    period:        1,            // 1–4 (bball) | 1–2 (futsal)
    homeFoul:      0,
    awayFoul:      0,
    timerTotalSec: 0,
    timerRunning:  false,
    timerCountdown:false,
    isTimeout:     false,
    mainVisible:   false,
    restVisible:   false,
};

// ═══════════════════════════════════════════════════════════
// DOM helpers
// ═══════════════════════════════════════════════════════════
const $ = id => document.getElementById(id);

const ui = {
    mainToggle:    $('main_toggle'),
    restToggle:    $('rest_toggle'),
    playToggle:    $('play_toggle'),
    mainDot:       $('main_dot'),
    restDot:       $('rest_dot'),
    playDot:       $('play_dot'),

    btnBasketball: $('btn_basketball'),
    btnFutsal:     $('btn_futsal'),

    homeScoreDisp: $('home_score_disp'),
    awayScoreDisp: $('away_score_disp'),
    homeScorePlus: $('home_score_plus'),
    homeScoreMinus:$('home_score_minus'),
    homeScorePlus2:$('home_score_plus2'),
    homeScorePlus3:$('home_score_plus3'),
    awayScorePlus: $('away_score_plus'),
    awayScoreMinus:$('away_score_minus'),
    awayScorePlus2:$('away_score_plus2'),
    awayScorePlus3:$('away_score_plus3'),
    scoreRow:      $('score_row'),
    scoreReset:    $('score_reset'),

    periodDisp:    $('period_disp'),
    periodPrev:    $('period_prev'),
    periodNext:    $('period_next'),

    homeFoulDisp:  $('home_foul_disp'),
    awayFoulDisp:  $('away_foul_disp'),
    homeFoulPlus:  $('home_foul_plus'),
    homeFoulMinus: $('home_foul_minus'),
    awayFoulPlus:  $('away_foul_plus'),
    awayFoulMinus: $('away_foul_minus'),
    foulReset:     $('foul_reset'),

    timerDisp:     $('timer_disp'),
    timerStart:    $('timer_start'),
    timerStop:     $('timer_stop'),
    timerReset:    $('timer_reset'),
    timerAdd1:     $('timer_add1'),
    timerAdd5:     $('timer_add5'),
    timerAdd10:    $('timer_add10'),
    timerAdd15:    $('timer_add15'),
    timerSub1:     $('timer_sub1'),
    timerAdd30s:   $('timer_add30s'),
    timerAdd1s:    $('timer_add1s'),
    timerSub1s:    $('timer_sub1s'),
    timerToggleCD: $('timer_toggle_cd'),

    modeAuto:      $('mode_auto'),
    modeManual:    $('mode_manual'),
    csvPanel:      $('csv_panel'),
    csvFile:       $('csv_file'),
    csvSelect:     $('csv_select'),
    csvPrev:       $('csv_prev'),
    csvNext:       $('csv_next'),
    homeFullname:  $('home_fullname'),
    homeInitial:   $('home_initial'),
    awayFullname:  $('away_fullname'),
    awayInitial:   $('away_initial'),
    applyTeam:     $('apply_team'),
    clearTeam:     $('clear_team'),
    restTimeout:   $('rest_timeout'),
    timeoutRow:    $('timeout_row'),
};

// ═══════════════════════════════════════════════════════════
// Broadcast helpers
// ═══════════════════════════════════════════════════════════
function broadcast() {
    chSend.postMessage({ type: 'state', data: { ...state } });
}

function broadcastToggle(overlay, visible) {
    chSend.postMessage({ type: 'toggle', overlay, visible });
}

// ═══════════════════════════════════════════════════════════
// Overlay Toggle
// ═══════════════════════════════════════════════════════════
function setOverlay(overlay, visible) {
    state[overlay + 'Visible'] = visible;
    const btnMap = { main: ui.mainToggle, rest: ui.restToggle, play: ui.playToggle };
    const dotMap = { main: ui.mainDot,    rest: ui.restDot,    play: ui.playDot    };
    const btn = btnMap[overlay];
    const dot = dotMap[overlay];
    if (btn) { btn.textContent = visible ? 'Hide' : 'Show'; btn.className = visible ? 'btn-danger' : 'btn-safe'; }
    broadcastToggle(overlay, visible);
}

function toggleOverlay(overlay) {
    setOverlay(overlay, !state[overlay + 'Visible']);
}

// ═══════════════════════════════════════════════════════════
// Sport
// ═══════════════════════════════════════════════════════════
const PERIOD_LABELS = {
    basketball: ['Q1', 'Q2', 'Q3', 'Q4', 'OT'],
    futsal:     ['1H', '2H'],
};
const FOUL_WARN = { basketball: 4, futsal: 5 }; // warning threshold

function setSport(sport) {
    state.sport  = sport;
    state.period = 1;
    ui.btnBasketball.classList.toggle('active', sport === 'basketball');
    ui.btnFutsal.classList.toggle('active',     sport === 'futsal');
    // Tampilkan +2/+3 hanya untuk basketball
    ui.scoreRow.classList.toggle('basketball', sport === 'basketball');
    renderPeriod();
    renderFouls();
    broadcast();
}

function renderPeriod() {
    const labels = PERIOD_LABELS[state.sport];
    ui.periodDisp.textContent = labels[state.period - 1] ?? '?';
}

function changePeriod(dir) {
    const max = PERIOD_LABELS[state.sport].length;
    state.period = Math.max(1, Math.min(max, state.period + dir));
    renderPeriod();
    broadcast();
}

// ═══════════════════════════════════════════════════════════
// Score
// ═══════════════════════════════════════════════════════════
function changeScore(team, delta) {
    const key = team + 'Score';
    state[key] = Math.max(0, state[key] + delta);
    renderScore();
    broadcast();
}

function resetScore() {
    state.homeScore = 0;
    state.awayScore = 0;
    renderScore();
    broadcast();
}

function renderScore() {
    ui.homeScoreDisp.textContent = state.homeScore;
    ui.awayScoreDisp.textContent = state.awayScore;
}

// ═══════════════════════════════════════════════════════════
// Fouls
// ═══════════════════════════════════════════════════════════
function changeFoul(team, delta) {
    const key = team + 'Foul';
    state[key] = Math.max(0, state[key] + delta);
    renderFouls();
    broadcast();
}

function renderFouls() {
    const warn = FOUL_WARN[state.sport];
    ui.homeFoulDisp.textContent = state.homeFoul;
    ui.awayFoulDisp.textContent = state.awayFoul;
    // Color coding
    ui.homeFoulDisp.style.color = state.homeFoul > warn  ? '#ff6b6b' :
                                   state.homeFoul === warn ? '#ffd93d' : '';
    ui.awayFoulDisp.style.color = state.awayFoul > warn  ? '#ff6b6b' :
                                   state.awayFoul === warn ? '#ffd93d' : '';
}

function resetFouls() {
    state.homeFoul = 0;
    state.awayFoul = 0;
    renderFouls();
    broadcast();
}

// ═══════════════════════════════════════════════════════════
// Timer
// ═══════════════════════════════════════════════════════════
let timerInterval = null;

function pad(n) { return String(Math.floor(Math.abs(n))).padStart(2, '0'); }

function renderTimer() {
    const m = Math.floor(state.timerTotalSec / 60);
    const s = state.timerTotalSec % 60;
    ui.timerDisp.textContent = `${pad(m)} : ${pad(s)}`;
}

function startTimer() {
    if (state.timerRunning) return;
    state.timerRunning = true;
    ui.timerStart.classList.add('active');
    timerInterval = setInterval(() => {
        if (state.timerCountdown) {
            state.timerTotalSec = Math.max(0, state.timerTotalSec - 1);
            if (state.timerTotalSec === 0) { stopTimer(); return; }
        } else {
            state.timerTotalSec++;
        }
        renderTimer();
        broadcast();
    }, 1000);
    broadcast();
}

function stopTimer() {
    if (!state.timerRunning) return;
    clearInterval(timerInterval);
    timerInterval = null;
    state.timerRunning = false;
    ui.timerStart.classList.remove('active');
    broadcast();
}

function resetTimer() {
    stopTimer();
    state.timerTotalSec = 0;
    renderTimer();
    broadcast();
}

function addTime(mins) {
    state.timerTotalSec = Math.max(0, state.timerTotalSec + mins * 60);
    renderTimer();
    broadcast();
}

function addSeconds(secs) {
    state.timerTotalSec = Math.max(0, state.timerTotalSec + secs);
    renderTimer();
    broadcast();
}

function toggleCountdown() {
    state.timerCountdown = !state.timerCountdown;
    ui.timerToggleCD.classList.toggle('active', state.timerCountdown);
    ui.timerToggleCD.title = state.timerCountdown
        ? 'Hitung mundur: ON (klik untuk nonaktifkan)'
        : 'Aktifkan hitung mundur';
}

// ═══════════════════════════════════════════════════════════
// Team / CSV
// ═══════════════════════════════════════════════════════════
let csvRows = [];
let csvIdx  = 0;

function applyTeam() {
    state.homeName    = ui.homeFullname.value.trim() || 'Home Team';
    state.homeInitial = (ui.homeInitial.value.trim() || 'HOME').toUpperCase().slice(0, 4);
    state.awayName    = ui.awayFullname.value.trim() || 'Away Team';
    state.awayInitial = (ui.awayInitial.value.trim() || 'AWAY').toUpperCase().slice(0, 4);
    broadcast();
}

function fillFields(row) {
    ui.homeFullname.value = row[0] || '';
    ui.homeInitial.value  = (row[1] || '').toUpperCase().slice(0, 4);
    ui.awayFullname.value = row[2] || '';
    ui.awayInitial.value  = (row[3] || '').toUpperCase().slice(0, 4);
}

function loadCSV(file) {
    const reader = new FileReader();
    reader.onload = e => {
        const lines = e.target.result.trim().split('\n').filter(l => l.trim());
        csvRows = lines.map(l => l.split(',').map(s => s.trim()));
        ui.csvSelect.innerHTML = csvRows
            .map((r, i) => `<option value="${i}">${i + 1}. ${r[0] || '?'} vs ${r[2] || '?'}</option>`)
            .join('');
        csvIdx = 0;
        fillFields(csvRows[0]);
    };
    reader.readAsText(file);
}

function navCSV(dir) {
    if (!csvRows.length) return;
    csvIdx = Math.max(0, Math.min(csvRows.length - 1, csvIdx + dir));
    ui.csvSelect.value = csvIdx;
    fillFields(csvRows[csvIdx]);
}

// ═══════════════════════════════════════════════════════════
// Hotkey API  —  dipanggil oleh hotkeys.lua via executeScript
// ═══════════════════════════════════════════════════════════
window.hotkeyAction = function (action) {
    switch (action) {
        case 'home_score_plus':  changeScore('home',  1); break;
        case 'home_score_minus': changeScore('home', -1); break;
        case 'away_score_plus':  changeScore('away',  1); break;
        case 'away_score_minus': changeScore('away', -1); break;
        case 'home_foul_plus':   changeFoul('home',   1); break;
        case 'home_foul_minus':  changeFoul('home',  -1); break;
        case 'away_foul_plus':   changeFoul('away',   1); break;
        case 'away_foul_minus':  changeFoul('away',  -1); break;
        case 'timer_start':      startTimer();            break;
        case 'timer_stop':       stopTimer();             break;
        case 'timer_reset':      resetTimer();            break;
        case 'period_next':      changePeriod(1);         break;
        case 'period_prev':      changePeriod(-1);        break;
        case 'toggle_main':      toggleOverlay('main');   break;
        case 'toggle_rest':      toggleOverlay('rest');   break;
        case 'toggle_play':      toggleOverlay('play');   break;
        case 'foul_reset':       resetFouls();            break;
    }
};

// ═══════════════════════════════════════════════════════════
// Receive from overlays
// ═══════════════════════════════════════════════════════════
chRecv.onmessage = e => {
    if (e.data.type === 'ready') {
        const dotMap = { main: ui.mainDot, rest: ui.restDot, play: ui.playDot };
        const dot = dotMap[e.data.overlay];
        if (dot) { dot.classList.add('online'); dot.title = 'Online'; }
        broadcast();
    }
};

// ═══════════════════════════════════════════════════════════
// Event Listeners
// ═══════════════════════════════════════════════════════════

// Overlay toggle
ui.mainToggle.addEventListener('click', () => toggleOverlay('main'));
ui.restToggle.addEventListener('click', () => toggleOverlay('rest'));
ui.playToggle.addEventListener('click', () => toggleOverlay('play'));

// Sport
ui.btnBasketball.addEventListener('click', () => setSport('basketball'));
ui.btnFutsal.addEventListener('click',     () => setSport('futsal'));

// Score
ui.homeScorePlus .addEventListener('click', () => changeScore('home',  1));
ui.homeScoreMinus.addEventListener('click', () => changeScore('home', -1));
ui.homeScorePlus2.addEventListener('click', () => changeScore('home',  2));
ui.homeScorePlus3.addEventListener('click', () => changeScore('home',  3));
ui.awayScorePlus .addEventListener('click', () => changeScore('away',  1));
ui.awayScoreMinus.addEventListener('click', () => changeScore('away', -1));
ui.awayScorePlus2.addEventListener('click', () => changeScore('away',  2));
ui.awayScorePlus3.addEventListener('click', () => changeScore('away',  3));
ui.scoreReset.addEventListener('click', resetScore);

// Period
ui.periodPrev.addEventListener('click', () => changePeriod(-1));
ui.periodNext.addEventListener('click', () => changePeriod(1));

// Foul
ui.homeFoulPlus .addEventListener('click', () => changeFoul('home',  1));
ui.homeFoulMinus.addEventListener('click', () => changeFoul('home', -1));
ui.awayFoulPlus .addEventListener('click', () => changeFoul('away',  1));
ui.awayFoulMinus.addEventListener('click', () => changeFoul('away', -1));
ui.foulReset.addEventListener('click', resetFouls);

// Timer
ui.timerStart.addEventListener('click',    startTimer);
ui.timerStop.addEventListener('click',     stopTimer);
ui.timerReset.addEventListener('click',    resetTimer);
ui.timerAdd1.addEventListener('click',     () => addTime(1));
ui.timerAdd5.addEventListener('click',     () => addTime(5));
ui.timerAdd10.addEventListener('click',    () => addTime(10));
ui.timerAdd15.addEventListener('click',    () => addTime(15));
ui.timerSub1.addEventListener('click',     () => addTime(-1));
ui.timerAdd30s.addEventListener('click',   () => addSeconds(30));
ui.timerAdd1s.addEventListener('click',    () => addSeconds(1));
ui.timerSub1s.addEventListener('click',    () => addSeconds(-1));
ui.timerToggleCD.addEventListener('click', toggleCountdown);

// Timeout checkbox
ui.restTimeout.addEventListener('change', () => {
    state.isTimeout = ui.restTimeout.checked;
    ui.timeoutRow.classList.toggle('checked', state.isTimeout);
    broadcast();
});
ui.modeAuto.addEventListener('click', () => {
    ui.modeAuto.classList.add('active');
    ui.modeManual.classList.remove('active');
    ui.csvPanel.style.display = '';
});
ui.modeManual.addEventListener('click', () => {
    ui.modeManual.classList.add('active');
    ui.modeAuto.classList.remove('active');
    ui.csvPanel.style.display = 'none';
});

ui.csvFile.addEventListener('change', e => { if (e.target.files[0]) loadCSV(e.target.files[0]); });
ui.csvSelect.addEventListener('change', () => fillFields(csvRows[parseInt(ui.csvSelect.value)] || []));
ui.csvPrev.addEventListener('click', () => navCSV(-1));
ui.csvNext.addEventListener('click', () => navCSV(1));

// Initials uppercase
ui.homeInitial.addEventListener('input', () => { ui.homeInitial.value = ui.homeInitial.value.toUpperCase(); });
ui.awayInitial.addEventListener('input', () => { ui.awayInitial.value = ui.awayInitial.value.toUpperCase(); });

ui.applyTeam.addEventListener('click', applyTeam);
ui.clearTeam.addEventListener('click', () => {
    ui.homeFullname.value = '';
    ui.homeInitial.value  = '';
    ui.awayFullname.value = '';
    ui.awayInitial.value  = '';
    state.homeName    = 'Home Team';
    state.homeInitial = 'HOME';
    state.awayName    = 'Away Team';
    state.awayInitial = 'AWAY';
    broadcast();
});

// ═══════════════════════════════════════════════════════════
// Init
// ═══════════════════════════════════════════════════════════
renderScore();
renderPeriod();
renderFouls();
renderTimer();
setTimeout(broadcast, 400);
