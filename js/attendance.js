const attendanceStoragePrefix = 'bunkBuffer_v2_';

// DOM Elements
let attTableBody, attTableContainer, attEmptyState;
let overallPctEl, overallFracEl, bufferValEl, bufferTitleEl, bufferSubEl, futureInput, futureResultEl;

function ensureAttElements() {
    if (!attTableBody) attTableBody = document.getElementById('att-table-body');
    if (!attTableContainer) attTableContainer = document.getElementById('att-table-container');
    if (!attEmptyState) attEmptyState = document.getElementById('att-empty-state');
    if (!overallPctEl) overallPctEl = document.getElementById('att-overall-pct');
    if (!overallFracEl) overallFracEl = document.getElementById('att-overall-frac');
    if (!bufferValEl) bufferValEl = document.getElementById('att-buffer-value');
    if (!bufferTitleEl) bufferTitleEl = document.getElementById('att-buffer-title');
    if (!bufferSubEl) bufferSubEl = document.getElementById('att-buffer-subtitle');
    if (!futureInput) futureInput = document.getElementById('att-future-input');
    if (!futureResultEl) futureResultEl = document.getElementById('att-future-result');
}

function initAttendance() {
    ensureAttElements();

    if (!attTableBody) return;

    // Listen for Future Planner input
    futureInput.addEventListener('input', calculateFutureBuffer);

    // Delegate input events with Sync Logic
    attTableBody.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT') {
            const idx = e.target.dataset.idx;
            const field = e.target.dataset.field;
            const val = e.target.value;

            // Sync other inputs with same idx/field
            const related = attTableBody.querySelectorAll(`input[data-idx="${idx}"][data-field="${field}"]`);
            related.forEach(inp => {
                if (inp !== e.target) inp.value = val;
            });

            updateAttendanceCalculations();
        }
    });

    // Initial Render
    renderAttendanceTable();
}

/**
 * Generates the subject list based on Branch & Semester
 * Rules:
 * - 4 Credits -> Theory + Lab (2 rows)
 * - Exclude: Practicum, SEA/SAA, ETS, Sports, Yoga, EGCAD?, UHV?
 * - Others -> 1 row
 */
function generateSubjects(branch, sem) {
    const courseData = window.COURSE_DATA || (window.REGULATIONS && window.REGULATIONS[currentRegulation] ? window.REGULATIONS[currentRegulation].COURSE_DATA : {});
    if (!courseData[branch] || !courseData[branch][sem]) return [];

    const rawCourses = courseData[branch][sem];
    const generated = [];

    rawCourses.forEach(c => {
        const name = c.n;
        const credits = c.c;
        const code = c.code; // Added for stable UMS matching using course code
        if (name.includes("Practicum") ||
            name.includes("SEA/SAA") ||
            name.includes("ETS") ||
            // name.includes("Sports") ||
            name.includes("NSS") ||
            name.includes("NCC")) {
            return;
        }

        if (credits === 4) {
            /*
             * Extended subject object with:
             * -code: official course identifier (e.g., U24CS402)
             * -type: distinguishes theory vs lab
             * Enables robust UMS auto-fill using course code 
             * Does NOT affect UI or SGPA logic.
             */
            generated.push({
                name: `${name} Theory`,
                code: code,        // Added: stable course identifier
                type: "theory",    // Added: needed to differentiate from lab
                held: 0,
                absent: 0
            });

            generated.push({
                name: `${name} Lab`,
                code: code,        // Same course code
                type: "lab",       // Marks this row as lab
                held: 0,
                absent: 0
            });

        } else {

            /*
             * For non-4 credit subjects (single component),
             * we still attach 'code' and default 'type' as "theory".
             * This ensures uniform internal structure for matching.
             */

            generated.push({
                name: name,
                code: c.code || null,
                type: c.type || "theory", // assume theory if not specified
                held: 0,
                absent: 0
            });

        }
    });

    return generated;
}

function getStorageKey() {
    const branch = document.getElementById('branch-select').value;
    const sem = document.getElementById('semester-select').value;
    if (!branch || !sem) return null;
    const reg = (typeof currentRegulation !== 'undefined') ? currentRegulation : (Store.get('selectedRegulation') || 'URR24-R25');
    return `${attendanceStoragePrefix}${reg}_${branch}_${sem}`;
}

function getAttendanceData() {
    const key = getStorageKey();
    if (!key) return null;

    let saved = Store.get(key);
    if (!saved) {
        const branch = document.getElementById('branch-select').value;
        const sem = document.getElementById('semester-select').value;
        const reg = (typeof currentRegulation !== 'undefined') ? currentRegulation : (Store.get('selectedRegulation') || 'URR24-R25');
        if (reg === 'URR24-R25') {
            saved = Store.get(`${attendanceStoragePrefix}${branch}_${sem}`);
        }
    }

    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Error parsing saved data", e);
        }
    }

    // If no data, generate fresh
    const branch = document.getElementById('branch-select').value;
    const sem = document.getElementById('semester-select').value;
    return generateSubjects(branch, sem);
}

function saveAttendanceData(data) {
    const key = getStorageKey();
    if (key) {
        Store.set(key, JSON.stringify(data));
    }
}

function renderAttendanceTable() {
    ensureAttElements();
    if (!attTableContainer || !attEmptyState) return;
    const data = getAttendanceData();
    // Safe backward compatibility (match by name, not index)
    if (data && Array.isArray(data)) {

        const freshSubjects = generateSubjects(
            document.getElementById('branch-select').value,
            document.getElementById('semester-select').value
        );

        data.forEach(oldSub => {

            // Find matching subject by name
            const match = freshSubjects.find(f => f.name === oldSub.name);

            if (match) {
                oldSub.code = match.code;
                oldSub.type = match.type;
            }
        });
    }

    if (!data) {
        // No selection made
        attTableContainer.classList.add('hidden');
        attEmptyState.classList.remove('hidden');
        resetStats();
        return;
    }

    // Show Table Container
    attTableContainer.classList.remove('hidden');
    attEmptyState.classList.add('hidden');

    // Render Table Rows (Desktop) & Mobile Cards
    // Added data-code and data-type attributes to enable reliable course-based attendance matching in both desktop and mobile view
    attTableBody.innerHTML = data.map((s, i) => `
        <tr class="group border-b border-slate-100 hover:bg-slate-50 transition-colors hidden md:table-row">
<td class="p-4 font-bold theme-text text-sm">
                ${s.name}
            </td>
            <td class="p-4 text-center">
                <input type="number" min="0" data-idx="${i}" data-code="${s.code || ''}" data-type="${s.type || ''}" data-field="held" value="${s.held}" 
                    class="w-16 p-2 text-center theme-input border theme-border rounded-lg font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm">
            </td>
            <td class="p-4 text-center">
                <input type="number" min="0" data-idx="${i}" data-code="${s.code || ''}" data-type="${s.type || ''}" data-field="absent" value="${s.absent}" 
                    class="w-16 p-2 text-center theme-input border theme-border rounded-lg font-bold focus:ring-2 focus:ring-red-500 outline-none transition text-sm">
            </td>
            <td class="p-4 text-right">
                <span id="att-pct-${i}" class="font-bold theme-muted text-sm">0%</span>
                <div id="att-warn-${i}" class="hidden text-xs text-amber-500 font-semibold mt-1">⚠ Absent &gt; Held</div>
            </td>
        </tr>


<!-- Mobile Card View -->
<tr class="md:hidden border-b theme-border last:border-0">
    <td colspan="4" class="p-4">
        <div class="flex flex-col gap-3">
            <div class="flex justify-between items-start">
                <span class="font-bold theme-text text-base">${s.name}</span>
                <span id="att-pct-mobile-${i}" class="font-bold theme-muted text-sm px-2 py-1 rounded theme-bg">0%</span>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold theme-muted uppercase mb-1">Held</label>
                    <input type="number"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        min="0"
                        data-idx="${i}"
                        data-code="${s.code || ''}"
                        data-type="${s.type || ''}"
                        data-field="held"
                        value="${s.held}"
                        class="theme-input w-full p-3 text-center border theme-border rounded-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none text-lg">
                </div>
                <div>
                    <label class="block text-xs font-bold text-red-300 uppercase mb-1">Absent</label>
                    <input type="number"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        min="0"
                        data-idx="${i}"
                        data-code="${s.code || ''}"
                        data-type="${s.type || ''}"
                        data-field="absent"
                        value="${s.absent}"
                        class="w-full p-3 text-center theme-input border theme-border rounded-xl font-bold att-absent-input focus:ring-2 focus:ring-red-500 outline-none text-lg">
                </div>
            </div>
        </div>
    </td>
</tr>
    `).join('');

    updateAttendanceCalculations(data);
}

function getCurrentTableData() {
    // Only select desktop rows (with class 'group') to avoid duplication
    const rows = attTableBody.querySelectorAll('tr.group');
    const newData = [];
    rows.forEach((row) => {
        const name = row.querySelector('td').innerText.trim();
        const heldInput = row.querySelector('input[data-field="held"]');
        const absentInput = row.querySelector('input[data-field="absent"]');

        newData.push({
            name: name,
            held: parseInt(heldInput.value) || 0,
            absent: parseInt(absentInput.value) || 0
        });
    });
    return newData;
}

function updateAttendanceCalculations(providedData = null) {
    const data = providedData || getCurrentTableData();
    let totalHeld = 0;
    let totalAbsent = 0;

    // Update row percentages
    data.forEach((s, i) => {
        // Clamp negatives and invalid values
        s.held = Math.max(0, s.held || 0);
        s.absent = Math.max(0, s.absent || 0);

        totalHeld += s.held;
        totalAbsent += s.absent;

        const isInvalid = s.absent > s.held && s.held > 0;
        const pct = s.held > 0 ? ((s.held - s.absent) / s.held) * 100 : 100;

        // Desktop Badge
        const pctEl = document.getElementById(`att-pct-${i}`);
        const warnEl = document.getElementById(`att-warn-${i}`);
        if (pctEl) {
            pctEl.textContent = isInvalid ? '⚠ Invalid' : pct.toFixed(1) + '%';
            if (isInvalid) {
                pctEl.className = 'att-badge att-badge--warn';
            } else if (pct >= 75) {
                pctEl.className = 'att-badge att-badge--safe';
            } else if (pct >= 65) {
                pctEl.className = 'att-badge att-badge--caution';
            } else {
                pctEl.className = 'att-badge att-badge--danger';
            }
        }
        if (warnEl) warnEl.classList.toggle('hidden', !isInvalid);

        // Mobile Badge
        const mobPctEl = document.getElementById(`att-pct-mobile-${i}`);
        if (mobPctEl) {
            mobPctEl.textContent = isInvalid ? '⚠ Invalid' : pct.toFixed(1) + '%';
            if (isInvalid) {
                mobPctEl.className = 'att-badge att-badge--warn';
            } else if (pct >= 75) {
                mobPctEl.className = 'att-badge att-badge--safe';
            } else if (pct >= 65) {
                mobPctEl.className = 'att-badge att-badge--caution';
            } else {
                mobPctEl.className = 'att-badge att-badge--danger';
            }
        }
    });

    if (!providedData) {
        saveAttendanceData(data);
    }

    // Overall Stats
    const overallPct = totalHeld > 0 ? ((totalHeld - totalAbsent) / totalHeld) * 100 : 0;
    overallPctEl.textContent = overallPct.toFixed(2) + '%';
    overallFracEl.textContent = `${totalHeld - totalAbsent} / ${totalHeld} Classes`;

    // Buffer Calculation (75% Rule)
    const buffer = Math.floor(0.25 * totalHeld - totalAbsent);

    if (totalHeld === 0) {
        bufferValEl.textContent = "-";
        bufferValEl.className = "text-5xl font-black theme-heading";
        bufferTitleEl.textContent = "Buffer Status";
        bufferTitleEl.className = "theme-muted text-xs font-bold uppercase tracking-widest mb-1";
        bufferSubEl.textContent = "No data";
    } else if (buffer >= 0) {
        // Safe
        bufferValEl.textContent = buffer;
        bufferValEl.className = "text-5xl font-black text-[#2DD4BF]";
        bufferTitleEl.textContent = "Bunks Available";
        bufferTitleEl.className = "text-xs font-bold text-[#2DD4BF] uppercase tracking-widest mb-1";
        bufferSubEl.textContent = "to stay above 75%";
    } else {
        // Danger
        const needed = Math.ceil(totalAbsent / 0.25 - totalHeld);
        bufferValEl.textContent = needed;
        bufferValEl.className = "text-5xl font-black text-rose-500";
        bufferTitleEl.textContent = "Classes Needed";
        bufferTitleEl.className = "text-xs font-bold text-rose-600 uppercase tracking-widest mb-1";
        bufferSubEl.textContent = "to recover to 75%";
    }

    calculateFutureBuffer();
}

function resetStats() {
    overallPctEl.textContent = "0.00%";
    overallFracEl.textContent = "0 / 0 Classes";
    bufferValEl.textContent = "-";
    bufferTitleEl.textContent = "Buffer Status";
    bufferSubEl.textContent = "Calculated";
}

function calculateFutureBuffer() {
    const extraClasses = parseInt(futureInput.value) || 0;

    // If table is hidden/empty, don't calc
    if (attTableContainer.classList.contains('hidden')) {
        futureResultEl.textContent = "...";
        return;
    }

    const data = getCurrentTableData();
    // Current totals
    const curHeld = data.reduce((a, b) => a + b.held, 0);
    const curAbsent = data.reduce((a, b) => a + b.absent, 0);

    // New total held
    const newHeld = curHeld + extraClasses;

    // Buffer logic: (Held * 0.25) - Absent
    // New Buffer: ( (CurrentHeld + FutureHeld) * 0.25 ) - CurrentAbsent
    const fBuf = Math.floor(0.25 * newHeld - curAbsent);

    if (extraClasses > 0) {
        if (fBuf >= 0) {
            futureResultEl.textContent = `${fBuf} Bunks`;
            futureResultEl.className = "ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg border border-emerald-200 text-sm";
        } else {
            futureResultEl.textContent = `${Math.abs(fBuf)} Classes Still Needed`;
            futureResultEl.className = "ml-2 px-3 py-1 bg-rose-100 text-rose-700 font-bold rounded-lg border border-rose-200 text-xs";
        }
    } else {
        futureResultEl.textContent = "...";
        futureResultEl.className = "ml-2 theme-muted font-bold text-sm";
    }
}

function resetAttendanceData() {
    if (confirm("Reset attendance data for this semester? This cannot be undone.")) {
        const key = getStorageKey();
        if (key) Store.remove(key);
        renderAttendanceTable();
    }
}
/*
 * UMS Auto-Fill (Code-Based Matching)
 * Uses official course code + type (theory/lab) for matching.
 * Avoids fragile name-based comparisons.
 * Fully overwrites existing attendance safely.
 */

// Normalize course code by removing single trailing letter (A/B/C etc.)
function normalizeCode(code) {
    if (!code) return code;
    return code.replace(/([0-9])([A-Z])$/, '$1');
}

/**
 * Attendance Modal — reuses help-modal overlay + matching CSS classes
 * @param {string} title - Modal header text
 * @param {string} bodyHTML - Inner HTML for modal body
 * @param {'success'|'warning'|'error'} type - Controls header color
 */
function showAttendanceModal(title, bodyHTML, type = 'success') {
    const overlay = document.getElementById('help-modal-overlay');
    const modal = document.getElementById('help-modal');
    if (!overlay || !modal) { alert(bodyHTML); return; } // fallback

    const headerGradient = {
        success: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        warning: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
        error: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    }[type] || 'linear-gradient(135deg, var(--primary) 0%, #6366f1 100%)';

    const icon = { success: '✓', warning: '⚠', error: '✕' }[type] || '';

    modal.innerHTML = `
        <div class="help-modal-header" style="background: ${headerGradient}">
            <span style="font-size:1.5rem">${icon}</span>
            <h3 class="help-modal-title">${title}</h3>
            <button id="att-modal-close" class="help-close-btn" aria-label="Close">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <div class="help-modal-body">
            ${bodyHTML}
        </div>
        <div class="help-modal-footer">
            <span></span>
            <button id="att-modal-ok" class="help-got-it-btn">Got it!</button>
        </div>
    `;

    overlay.classList.remove('hidden');
    requestAnimationFrame(() => overlay.classList.add('help-visible'));

    const closeModal = () => {
        overlay.classList.remove('help-visible');
        setTimeout(() => overlay.classList.add('hidden'), 200);
    };

    document.getElementById('att-modal-close').addEventListener('click', closeModal);
    document.getElementById('att-modal-ok').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); }, { once: true });

    const escHandler = (e) => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);
}

function parseUmsAttendance() {

    const textArea = document.getElementById("ums-paste");

    if (!textArea || !textArea.value.trim()) {
        showAttendanceModal(
            'No Data Pasted',
            `<div class="help-step">
                <div class="help-step-content">
                    <p>Paste your UMS attendance data in the text box first.</p>
                    <ul class="help-sub-items" style="margin-top:0.5rem">
                        <li>Open KITS UMS → Attendance Report</li>
                        <li>Select All → Copy → Paste here</li>
                    </ul>
                </div>
            </div>`,
            'warning'
        );
        return;
    }

    const lines = textArea.value.split("\n");
    const attendanceRows = lines.filter(line => /^\d+/.test(line.trim()));

    const parsedMap = {};

    attendanceRows.forEach(line => {

        const codeMatch = line.match(/U\d+[A-Z]+\d+[A-Z]*/i);
        if (!codeMatch) return;

        const rawCode = codeMatch[0].toUpperCase();
        const code = normalizeCode(rawCode);

        let type = "theory";
        if (line.toLowerCase().includes("lab")) type = "lab";

        const parts = line.trim().split(/\s+/);
        parts.pop();
        const absent = parseInt(parts.pop()) || 0;
        const held = parseInt(parts.pop()) || 0;

        const key = code + "_" + type;

        if (!parsedMap[key]) {
            parsedMap[key] = { held: 0, absent: 0 };
        }

        parsedMap[key].held += held;
        parsedMap[key].absent += absent;
    });

    const rows = attTableBody.querySelectorAll('tr.group');
    const unmatched = [];

    rows.forEach(row => {

        const heldInput = row.querySelector('input[data-field="held"]');
        const absentInput = row.querySelector('input[data-field="absent"]');

        const rawCode = heldInput.dataset.code;
        const code = normalizeCode(rawCode);

        const type = heldInput.dataset.type;

        const key = code + "_" + type;

        if (parsedMap[key]) {

            heldInput.value = parsedMap[key].held;
            absentInput.value = parsedMap[key].absent;

            const idx = heldInput.dataset.idx;

            const mobileHeld = attTableBody.querySelector(
                `tr.md\\:hidden input[data-idx="${idx}"][data-field="held"]`
            );

            const mobileAbsent = attTableBody.querySelector(
                `tr.md\\:hidden input[data-idx="${idx}"][data-field="absent"]`
            );

            if (mobileHeld) {
                mobileHeld.value = parsedMap[key].held;
                mobileHeld.classList.remove("ums-error");
            }

            if (mobileAbsent) {
                mobileAbsent.value = parsedMap[key].absent;
                mobileAbsent.classList.remove("ums-error");
            }

            heldInput.classList.remove("ums-error");
            absentInput.classList.remove("ums-error");
        }
        else {

            unmatched.push({
                name: row.querySelector("td").innerText.trim(),
                code: heldInput.dataset.code
            });

            heldInput.value = 0;
            absentInput.value = 0;

            const idx = heldInput.dataset.idx;

            const mobileHeld = attTableBody.querySelector(
                `tr.md\\:hidden input[data-idx="${idx}"][data-field="held"]`
            );

            const mobileAbsent = attTableBody.querySelector(
                `tr.md\\:hidden input[data-idx="${idx}"][data-field="absent"]`
            );

            if (mobileHeld) {
                mobileHeld.value = 0;
                mobileHeld.classList.add("ums-error");
            }

            if (mobileAbsent) {
                mobileAbsent.value = 0;
                mobileAbsent.classList.add("ums-error");
            }

            heldInput.classList.add("ums-error");
            absentInput.classList.add("ums-error");
        }
    });
    updateAttendanceCalculations();
    saveAttendanceData(getCurrentTableData()); // Fix: persist autofilled data to localStorage

    // GA4 — track UMS autofill usage
    trackEvent('ums_autofill_used', {
        matched: Object.keys(parsedMap).length,
        unmatched: unmatched.length
    });

    if (unmatched.length > 0) {
        const listHTML = unmatched.map(u =>
            `<li style="color:#ef4444; font-weight:600">• ${u.name} <span style="opacity:0.6; font-weight:400">(${u.code})</span></li>`
        ).join('');

        showAttendanceModal(
            'Some Subjects Not Matched',
            `<div class="help-step">
            <div class="help-step-content">
                <p>The following subjects could not be auto-filled:</p>
                <ul style="list-style:none; padding:0; margin:0.75rem 0 0; display:flex; flex-direction:column; gap:0.25rem">
                    ${listHTML}
                </ul>
            </div>
        </div>
        <div class="help-tip-box">
            <strong>Tip:</strong> Enter these values manually. Highlighted fields are marked in red.
        </div>`,
            'error'
        );
    } else {
        showAttendanceModal(
            'Auto-Fill Complete',
            `<div class="help-step">
            <span class="help-step-icon" style="background:#059669">✓</span>
            <div class="help-step-content">
                <p>All subjects matched and filled successfully!</p>
                <p class="help-step-tip">Your attendance data has been saved automatically.</p>
            </div>
        </div>`,
            'success'
        );
    }
}
