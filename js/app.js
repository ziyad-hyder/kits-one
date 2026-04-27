/**
 * KITSW Universal SGPA Calculator - App Logic
 */

// DOM Elements
const branchSelect = document.getElementById('branch-select');
const semesterSelect = document.getElementById('semester-select');
const courseContainer = document.getElementById('course-container');
const courseTableBody = document.getElementById('course-list');
const resultsSection = document.getElementById('results-section');

// TAB_ORDER is defined in gestures.js

// Safe localStorage wrapper 
// All reads/writes go through these helpers so the app never crashes silently.
const Store = {
    get(key) {
        try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
        try { localStorage.setItem(key, value); } catch { /* silent */ }
    },
    remove(key) {
        try { localStorage.removeItem(key); } catch { /* silent */ }
    }
};

// ─── GA4 event helper ────────────────────────────────────────────────────────
function trackEvent(name, params = {}) {
    if (typeof gtag === 'function') gtag('event', name, params);
}

// Tab Switching Logic
function switchTab(tabId) {
    const currentActive = document.querySelector('.tab-content:not(.hidden)');
    const currentIndex = currentActive ? TAB_ORDER.indexOf(currentActive.id) : 0;
    const newIndex = TAB_ORDER.indexOf(tabId);

    const direction = newIndex > currentIndex ? 'right' : 'left';
    const animClass = direction === 'right' ? 'animate-slide-right' : 'animate-slide-left';

    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('animate-slide-right', 'animate-slide-left', 'animate-fade-in');
    });

    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('active');
    });

    const target = document.getElementById(tabId);
    target.classList.remove('hidden');
    void target.offsetWidth; // Force reflow
    target.classList.add(animClass);

    const activeBtn = document.querySelector(`[onclick="switchTab('${tabId}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (typeof HelpSystem !== 'undefined' && HelpSystem.content[tabId]) {
        setTimeout(() => HelpSystem.show(tabId), 300);
    }
}

// Initialization
function init() {
    // Populate Branches
    branchSelect.innerHTML = '<option value="">Select Branch</option>';
    Object.keys(BRANCH_MAPPING).forEach(code => {
        branchSelect.innerHTML += `<option value="${code}">${BRANCH_MAPPING[code]} (${code})</option>`;
    });

    // Populate Semesters on Branch Change — also persist selection
    branchSelect.addEventListener('change', () => {
        const branch = branchSelect.value;
        Store.set('lastBranch', branch);
        Store.remove('lastSem'); // reset sem when branch changes

        semesterSelect.innerHTML = '<option value="">Select Semester</option>';
        semesterSelect.disabled = !branch;

        if (branch && COURSE_DATA[branch]) {
            Object.keys(COURSE_DATA[branch]).forEach(sem => {
                semesterSelect.innerHTML += `<option value="${sem}">${sem}</option>`;
            });
        }
        courseContainer.classList.add('hidden');
        resultsSection.classList.add('hidden');

        if (typeof renderAttendanceTable === 'function') renderAttendanceTable();
        if (typeof EseCalculator !== 'undefined') EseCalculator.render();
    });

    // Render Courses on Semester Change — also persist selection
    semesterSelect.addEventListener('change', () => {
        Store.set('lastSem', semesterSelect.value);
        renderCourses();
        if (typeof renderAttendanceTable === 'function') renderAttendanceTable();
        if (typeof EseCalculator !== 'undefined') EseCalculator.render();
    });

    // ── Restore last used branch + semester ──────────────────────────────────
    const savedBranch = Store.get('lastBranch');
    const savedSem    = Store.get('lastSem');
    if (savedBranch && COURSE_DATA[savedBranch]) {
        branchSelect.value = savedBranch;
        branchSelect.dispatchEvent(new Event('change'));
        if (savedSem) {
            semesterSelect.value = savedSem;
            semesterSelect.dispatchEvent(new Event('change'));
        }
    }

    // Initialize Attendance Module
    if (typeof initAttendance === 'function') initAttendance();

    // Initialize Gestures
    if (typeof initGestures === 'function') initGestures();

    // Initialize Help System
    if (typeof HelpSystem !== 'undefined') HelpSystem.init();

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon  = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function toggleDarkMode() {
        const isDark = document.body.classList.toggle('dark-mode');
        Store.set('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    }

    function updateThemeIcons(isDark) {
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
    }

    // Load saved theme
    if (Store.get('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcons(true);
    }

    themeBtn.addEventListener('click', toggleDarkMode);

    // Show swipe hint on mobile only
    const hint = document.getElementById('swipe-hint');
    if (hint && window.innerWidth < 768) {
        hint.classList.remove('hidden');
        setTimeout(() => hint.classList.add('hidden'), 5000);
    }
}

function renderCourses() {
    const branch = branchSelect.value;
    const sem    = semesterSelect.value;

    if (!branch || !sem || !COURSE_DATA[branch][sem]) {
        courseContainer.classList.add('hidden');
        return;
    }

    courseTableBody.innerHTML = '';
    COURSE_DATA[branch][sem].forEach((course) => {
        const row = document.createElement('tr');
        row.className = "transition-colors";
        row.innerHTML = `
            <td class="p-4 text-sm font-medium theme-text">
                ${course.n}
                <div class="md:hidden text-xs theme-muted-light mt-1">Credits: ${course.c}</div>
            </td>
            <td class="p-4 text-center text-sm font-bold theme-muted hidden md:table-cell">${course.c}</td>
            <td class="p-4 max-w-[140px]">
                <select class="grade-input theme-input w-full p-2 border theme-border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" 
                        data-credits="${course.c}" onchange="calculateResults()">
                    <option value="" selected disabled>Grade</option>
                    ${Object.keys(GRADE_POINTS).filter(g => g !== 'F' && g !== 'M').map(g => `<option value="${GRADE_POINTS[g]}">${g} (${GRADE_POINTS[g]})</option>`).join('')}
                </select>
            </td>
        `;
        courseTableBody.appendChild(row);
    });

    courseContainer.classList.remove('hidden');
    resultsSection.classList.add('hidden');
}

function calculateResults() {
    const inputs = document.querySelectorAll('.grade-input');
    const grades = [];

    inputs.forEach(input => {
        if (input.value) {
            grades.push({
                credits: parseFloat(input.dataset.credits),
                gradePoint: parseFloat(input.value)
            });
        }
    });

    if (grades.length === 0) return;

    const result     = Calculator.calculateSGPA(grades);
    const percentage = Calculator.cgpaToPercentage(result.sgpa);

    document.getElementById('sgpa-display').innerText     = result.sgpa.toFixed(2);
    document.getElementById('percentage-display').innerText = percentage + "%";
    document.getElementById('credits-display').innerText  = result.clearedCredits + " / " + result.totalRegisteredCredits;

    resultsSection.classList.remove('hidden');

    // GA4 — track SGPA calculation
    trackEvent('sgpa_calculated', {
        branch: branchSelect.value,
        semester: semesterSelect.value,
        sgpa: result.sgpa.toFixed(2)
    });
}

// Converter Logic
function convertSgpaToPerc() {
    const val = parseFloat(document.getElementById('converter-input').value);
    if (isNaN(val) || val < 0 || val > 10) {
        alert("Please enter a valid SGPA/CGPA (0-10)");
        return;
    }
    const perc    = Calculator.cgpaToPercentage(val);
    const usScale = (val / 10) * 4;
    document.getElementById('converter-result').innerHTML = `
        <div class="grid grid-cols-2 gap-4 w-full">
            <div>
                <div class="text-xs theme-muted uppercase font-bold tracking-wider mb-1">Percentage</div>
                <div class="text-3xl font-black text-indigo-600">${perc}%</div>
            </div>
            <div class="border-l theme-border pl-4">
                <div class="text-xs theme-muted uppercase font-bold tracking-wider mb-1">US 4.0 Scale <span class="font-normal normal-case">(approx.)</span></div>
                <div class="text-3xl font-black text-emerald-600">${usScale.toFixed(2)}</div>
            </div>
        </div>
    `;
}

// Target Planner Logic
function calculateTarget() {
    const currentCGPA    = parseFloat(document.getElementById('current-cgpa').value);
    const currentCredits = parseFloat(document.getElementById('current-credits').value);
    const targetCGPA     = parseFloat(document.getElementById('target-cgpa').value);
    const nextCredits    = parseFloat(document.getElementById('next-credits').value);

    if ([currentCGPA, currentCredits, targetCGPA, nextCredits].some(isNaN)) {
        alert("Please fill all fields correctly.");
        return;
    }
    if (nextCredits <= 0) {
        alert("Next Semester Credits must be greater than 0.");
        return;
    }

    const req   = Calculator.calculateTargetSGPA(currentCGPA, currentCredits, targetCGPA, nextCredits);
    const resEl = document.getElementById('planner-result');

    if (typeof req === 'string') {
        resEl.innerHTML = `<span class="text-red-500 font-bold">${req}</span>`;
    } else {
        resEl.innerHTML = `
             <div class="text-sm theme-muted uppercase font-bold tracking-wider mb-1">Required SGPA</div>
             <div class="text-3xl font-black text-indigo-600">${req}</div>
        `;
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', init);

