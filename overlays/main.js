'use strict';
/* main.js — overlay scorebar bawah
 *
 * Menerima state dari dua sumber:
 *   1. BroadcastChannel 'scoreboard_data' — full state push dari control.html (Dock)
 *   2. window.hotkeyAction(action)        — dipanggil Lua via executeScript
 */

const chIn = new BroadcastChannel('scoreboard_data');

const el = {
    scoreboard: document.getElementById('scoreboard'),
    homeName:   document.getElementById('home_name'),
    awayName:   document.getElementById('away_name'),
    homeInit:   document.getElementById('home_init'),
    awayInit:   document.getElementById('away_init'),
    homeScore:  document.getElementById('home_score'),
    awayScore:  document.getElementById('away_score'),
    periodVal:  document.getElementById('period_val'),
    timerVal:   document.getElementById('timer_val'),
    homeFoul:   document.getElementById('home_foul'),
    awayFoul:   document.getElementById('away_foul'),
    sportBadge: document.getElementById('sport_badge'),
};

const PERIOD_LABELS = {
    basketball: ['Q1', 'Q2', 'Q3', 'Q4', 'OT'],
    futsal:     ['1H', '2H'],
};
const FOUL_WARN = { basketball: 4, futsal: 5 };

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
function getPeriodLabel() {
    return (PERIOD_LABELS[state.sport] || PERIOD_LABELS.basketball)[state.period - 1] ?? '—';
}

// ── Render ────────────────────────────────────────────────
function render() {
    el.homeName.textContent  = (state.homeName  || 'Home Team').toUpperCase();
    el.awayName.textContent  = (state.awayName  || 'Away Team').toUpperCase();
    el.homeInit.textContent  = state.homeInitial || 'HOME';
    el.awayInit.textContent  = state.awayInitial || 'AWAY';
    el.homeScore.textContent = state.homeScore;
    el.awayScore.textContent = state.awayScore;
    el.periodVal.textContent = getPeriodLabel();
    el.timerVal.textContent  = pad(Math.floor(state.timerTotalSec / 60)) + ':' + pad(state.timerTotalSec % 60);
    el.timerVal.classList.toggle('running', state.timerRunning);
    el.sportBadge.textContent = state.sport === 'futsal' ? 'FUTSAL' : 'BASKETBALL';
    const warn = FOUL_WARN[state.sport] || 4;
    el.homeFoul.textContent = state.homeFoul;
    el.awayFoul.textContent = state.awayFoul;
    el.homeFoul.className = state.homeFoul > warn ? 'foul-warn' : 'foul-count';
    el.awayFoul.className = state.awayFoul > warn ? 'foul-warn' : 'foul-count';
}

// ── Timer lokal ───────────────────────────────────────────
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

// ── Visibility ────────────────────────────────────────────
function showOverlay() { el.scoreboard.classList.add('visible'); }
function hideOverlay() { el.scoreboard.classList.remove('visible'); }

// ── BroadcastChannel: full state push dari Dock ───────────
chIn.onmessage = e => {
    const msg = e.data;
    if (msg.type === 'state') {
        const wasRunning = state.timerRunning;
        Object.assign(state, msg.data);
        // Sinkronkan timer lokal dengan state dari Dock
        if (state.timerRunning && !_timerInterval) startTimer();
        else if (!state.timerRunning && _timerInterval) stopTimer();
        else render();
    } else if (msg.type === 'toggle' && msg.overlay === 'main') {
        msg.visible ? showOverlay() : hideOverlay();
    }
};

// ── Hotkey API — dipanggil Lua via executeScript ──────────
window.hotkeyAction = function (action) {
    if (action === 'toggle_main') { el.scoreboard.classList.toggle('visible'); return; }
    if (action === 'timer_start') { startTimer(); return; }
    if (action === 'timer_stop')  { stopTimer();  return; }
    if (action === 'timer_reset') { resetTimer(); return; }
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
