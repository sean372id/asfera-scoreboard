'use strict';

const chIn = new BroadcastChannel('scoreboard_data');

const el = {
    hud:          document.getElementById('hud'),
    hudTimer:     document.getElementById('hud_timer'),
    hudPeriod:    document.getElementById('hud_period'),
    hudHomeInit:  document.getElementById('hud_home_init'),
    hudAwayInit:  document.getElementById('hud_away_init'),
    hudHomeScore: document.getElementById('hud_home_score'),
    hudAwayScore: document.getElementById('hud_away_score'),
};

const PERIOD_LABELS = {
    basketball: ['Q1', 'Q2', 'Q3', 'Q4', 'OT'],
    futsal:     ['1H', '2H'],
};

const state = {
    sport: 'basketball', homeScore: 0, awayScore: 0,
    homeInitial: 'HOME', awayInitial: 'AWAY',
    period: 1, timerTotalSec: 0, timerRunning: false, timerCountdown: false,
};

let _timerInterval = null;
function pad(n) { return String(Math.floor(Math.abs(n))).padStart(2, '0'); }
function maxPeriod() { return (PERIOD_LABELS[state.sport] || PERIOD_LABELS.basketball).length; }

function render() {
    // Timer
    el.hudTimer.textContent = pad(Math.floor(state.timerTotalSec / 60)) + ':' + pad(state.timerTotalSec % 60);
    el.hudTimer.classList.toggle('running', state.timerRunning);

    // Period — teks + toggle class basketball pada root .hud
    const arr = PERIOD_LABELS[state.sport] || PERIOD_LABELS.basketball;
    el.hudPeriod.textContent = arr[state.period - 1] ?? '—';
    el.hud.classList.toggle('basketball', state.sport === 'basketball');

    // Skor & inisial
    el.hudHomeInit.textContent  = state.homeInitial || 'HOME';
    el.hudAwayInit.textContent  = state.awayInitial || 'AWAY';
    el.hudHomeScore.textContent = state.homeScore;
    el.hudAwayScore.textContent = state.awayScore;
}

function startTimer() {
    if (_timerInterval) return;
    state.timerRunning = true;
    _timerInterval = setInterval(() => {
        if (state.timerCountdown) {
            state.timerTotalSec = Math.max(0, state.timerTotalSec - 1);
            if (state.timerTotalSec === 0) { stopTimer(); return; }
        } else { state.timerTotalSec++; }
        render();
    }, 1000);
}
function stopTimer() {
    if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
    state.timerRunning = false; render();
}
function resetTimer() { stopTimer(); state.timerTotalSec = 0; render(); }

function showHUD() { el.hud.classList.add('visible'); }
function hideHUD() { el.hud.classList.remove('visible'); }

chIn.onmessage = e => {
    const msg = e.data;
    if (msg.type === 'state') {
        Object.assign(state, msg.data);
        if (state.timerRunning && !_timerInterval) startTimer();
        else if (!state.timerRunning && _timerInterval) stopTimer();
        else render();
    } else if (msg.type === 'toggle' && msg.overlay === 'play') {
        msg.visible ? showHUD() : hideHUD();
    }
};

window.hotkeyAction = function (action) {
    if (action === 'toggle_play')  { el.hud.classList.toggle('visible'); return; }
    if (action === 'timer_start')  { startTimer(); return; }
    if (action === 'timer_stop')   { stopTimer();  return; }
    if (action === 'timer_reset')  { resetTimer(); return; }
    switch (action) {
        case 'home_score_plus':  state.homeScore = Math.max(0, state.homeScore + 1); break;
        case 'home_score_minus': state.homeScore = Math.max(0, state.homeScore - 1); break;
        case 'away_score_plus':  state.awayScore = Math.max(0, state.awayScore + 1); break;
        case 'away_score_minus': state.awayScore = Math.max(0, state.awayScore - 1); break;
        case 'period_next': state.period = Math.min(maxPeriod(), state.period + 1);  break;
        case 'period_prev': state.period = Math.max(1, state.period - 1);            break;
    }
    render();
};

render();
