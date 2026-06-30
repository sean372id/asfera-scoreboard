'use strict';
/* rest.js — overlay panel istirahat
 * Self-contained: BroadcastChannel + hotkeyAction
 */

const chIn = new BroadcastChannel('scoreboard_data');

const el = {
    restPanel:     document.getElementById('rest_panel'),
    restLabel:     document.getElementById('rest_label'),
    restPeriod:    document.getElementById('rest_period'),
    restHomeName:  document.getElementById('rest_home_name'),
    restAwayName:  document.getElementById('rest_away_name'),
    restHomeInit:  document.getElementById('rest_home_init'),
    restAwayInit:  document.getElementById('rest_away_init'),
    restHomeScore: document.getElementById('rest_home_score'),
    restAwayScore: document.getElementById('rest_away_score'),
    restHomeFoul:  document.getElementById('rest_home_foul'),
    restAwayFoul:  document.getElementById('rest_away_foul'),
};

const PERIOD_LABELS = {
    basketball: ['Q1', 'Q2', 'Q3', 'Q4', 'OT'],
    futsal:     ['1H', '2H'],
};
const FOUL_WARN   = { basketball: 4, futsal: 5 };
const REST_LABEL  = {
    basketball: { 1: 'ISTIRAHAT', 2: 'ISTIRAHAT', 3: 'ISTIRAHAT', 4: 'OVERTIME' },
    futsal:     { 1: 'HALF TIME', 2: 'FULL TIME' },
};

const state = {
    sport: 'basketball', homeScore: 0, awayScore: 0,
    homeName: 'Home Team', homeInitial: 'HOME',
    awayName: 'Away Team', awayInitial: 'AWAY',
    period: 1, homeFoul: 0, awayFoul: 0,
    timerTotalSec: 0, timerRunning: false, timerCountdown: false,
};

let _timerInterval = null;
function pad(n) { return String(Math.floor(Math.abs(n))).padStart(2, '0'); }
function maxPeriod() { return (PERIOD_LABELS[state.sport] || PERIOD_LABELS.basketball).length; }

function render() {
    const warn       = FOUL_WARN[state.sport] || 4;
    const labelMap   = REST_LABEL[state.sport] || REST_LABEL.basketball;
    const periodArr  = PERIOD_LABELS[state.sport] || PERIOD_LABELS.basketball;

    el.restLabel.textContent    = labelMap[state.period]      || 'ISTIRAHAT';
    el.restPeriod.textContent   = periodArr[state.period - 1] || '—';
    el.restHomeName.textContent = (state.homeName  || 'Home Team').toUpperCase();
    el.restAwayName.textContent = (state.awayName  || 'Away Team').toUpperCase();
    el.restHomeInit.textContent = state.homeInitial || 'HOME';
    el.restAwayInit.textContent = state.awayInitial || 'AWAY';
    el.restHomeScore.textContent = state.homeScore;
    el.restAwayScore.textContent = state.awayScore;
    el.restHomeFoul.textContent  = state.homeFoul;
    el.restAwayFoul.textContent  = state.awayFoul;
    el.restHomeFoul.className    = state.homeFoul > warn ? 'warn' : '';
    el.restAwayFoul.className    = state.awayFoul > warn ? 'warn' : '';
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

function showPanel() { el.restPanel.classList.add('visible'); }
function hidePanel() { el.restPanel.classList.remove('visible'); }

chIn.onmessage = e => {
    const msg = e.data;
    if (msg.type === 'state') {
        Object.assign(state, msg.data);
        if (state.timerRunning && !_timerInterval) startTimer();
        else if (!state.timerRunning && _timerInterval) stopTimer();
        else render();
    } else if (msg.type === 'toggle' && msg.overlay === 'rest') {
        msg.visible ? showPanel() : hidePanel();
    }
};

window.hotkeyAction = function (action) {
    if (action === 'toggle_rest')  { el.restPanel.classList.toggle('visible'); return; }
    if (action === 'timer_start')  { startTimer(); return; }
    if (action === 'timer_stop')   { stopTimer();  return; }
    if (action === 'timer_reset')  { resetTimer(); return; }
    switch (action) {
        case 'home_score_plus':  state.homeScore = Math.max(0, state.homeScore + 1); break;
        case 'home_score_minus': state.homeScore = Math.max(0, state.homeScore - 1); break;
        case 'away_score_plus':  state.awayScore = Math.max(0, state.awayScore + 1); break;
        case 'away_score_minus': state.awayScore = Math.max(0, state.awayScore - 1); break;
        case 'home_foul_plus':   state.homeFoul  = Math.max(0, state.homeFoul  + 1); break;
        case 'home_foul_minus':  state.homeFoul  = Math.max(0, state.homeFoul  - 1); break;
        case 'away_foul_plus':   state.awayFoul  = Math.max(0, state.awayFoul  + 1); break;
        case 'away_foul_minus':  state.awayFoul  = Math.max(0, state.awayFoul  - 1); break;
        case 'foul_reset':       state.homeFoul = 0; state.awayFoul = 0;             break;
        case 'period_next': state.period = Math.min(maxPeriod(), state.period + 1);  break;
        case 'period_prev': state.period = Math.max(1, state.period - 1);            break;
    }
    render();
};

render();
