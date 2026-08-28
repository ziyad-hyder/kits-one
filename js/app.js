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

// Regulation Management State & Logic
let currentRegulation = Store.get('selectedRegulation') || 'URR24-R25';

function onRegulationChange(val) {
    Store.set('selectedRegulation', val);
    if (typeof trackEvent === 'function') {
        trackEvent('regulation_changed', { regulation: val });
    }
    window.location.reload();
}

function populateBranches() {
    const savedBranch = Store.get(`lastBranch_${currentRegulation}`) || Store.get('lastBranch');
    const savedSem = Store.get(`lastSem_${currentRegulation}`) || Store.get('lastSem');
    const courseData = window.COURSE_DATA || (window.REGULATIONS && window.REGULATIONS[currentRegulation] ? window.REGULATIONS[currentRegulation].COURSE_DATA : {});
    const branchMapping = window.BRANCH_MAPPING || (window.REGULATIONS && window.REGULATIONS[currentRegulation] ? window.REGULATIONS[currentRegulation].BRANCH_MAPPING : {});

    branchSelect.innerHTML = '<option value="">Select Branch</option>';
    if (branchMapping) {
        Object.keys(branchMapping).forEach(code => {
            branchSelect.innerHTML += `<option value="${code}">${branchMapping[code]} (${code})</option>`;
        });
    }

    semesterSelect.innerHTML = '<option value="">Select Semester</option>';
    semesterSelect.disabled = true;

    if (savedBranch && courseData[savedBranch]) {
        branchSelect.value = savedBranch;
        semesterSelect.disabled = false;

        Object.keys(courseData[savedBranch]).forEach(sem => {
            semesterSelect.innerHTML += `<option value="${sem}">${sem}</option>`;
        });

        if (savedSem && courseData[savedBranch][savedSem]) {
            semesterSelect.value = savedSem;
            renderCourses();
        } else {
            semesterSelect.value = '';
            courseContainer.classList.add('hidden');
            resultsSection.classList.add('hidden');
        }
    } else {
        branchSelect.value = '';
        courseContainer.classList.add('hidden');
        resultsSection.classList.add('hidden');
    }

    if (typeof renderAttendanceTable === 'function') renderAttendanceTable();
    if (typeof EseCalculator !== 'undefined') EseCalculator.render();
}

// Initialization
function init() {
    // Initialize Attendance Module first so DOM elements are available
    if (typeof initAttendance === 'function') initAttendance();

    // Setup Regulation Dropdown Listener & Title
    const regSelect = document.getElementById('regulation-select');
    if (regSelect) {
        if (!window.REGULATIONS || !window.REGULATIONS[currentRegulation]) {
            currentRegulation = 'URR24-R25';
        }
        regSelect.value = currentRegulation;
        regSelect.addEventListener('change', (e) => {
            const newReg = e.target.value;
            Store.set('selectedRegulation', newReg);
            trackEvent('regulation_changed', { regulation: newReg });
            window.location.reload();
        });
    }

    const regTitleDisplay = document.getElementById('regulation-title-display');
    if (regTitleDisplay && window.REGULATIONS && window.REGULATIONS[currentRegulation]) {
        regTitleDisplay.innerText = window.REGULATIONS[currentRegulation].title;
    }

    // Populate Branches
    populateBranches();

    const onBranchChange = () => {
        const branch = branchSelect.value;
        const courseData = window.COURSE_DATA || (window.REGULATIONS && window.REGULATIONS[currentRegulation] ? window.REGULATIONS[currentRegulation].COURSE_DATA : {});
        Store.set(`lastBranch_${currentRegulation}`, branch);
        Store.set('lastBranch', branch);
        Store.remove(`lastSem_${currentRegulation}`);
        Store.remove('lastSem');

        semesterSelect.innerHTML = '<option value="">Select Semester</option>';
        semesterSelect.disabled = !branch;

        if (branch && courseData[branch]) {
            Object.keys(courseData[branch]).forEach(sem => {
                semesterSelect.innerHTML += `<option value="${sem}">${sem}</option>`;
            });
        }
        courseContainer.classList.add('hidden');
        resultsSection.classList.add('hidden');

        if (typeof renderAttendanceTable === 'function') renderAttendanceTable();
        if (typeof EseCalculator !== 'undefined') EseCalculator.render();
    };

    branchSelect.addEventListener('change', onBranchChange);
    branchSelect.addEventListener('input', onBranchChange);

    // Render Courses on Semester Change — also persist selection
    semesterSelect.addEventListener('change', () => {
        const sem = semesterSelect.value;
        Store.set(`lastSem_${currentRegulation}`, sem);
        Store.set('lastSem', sem);
        renderCourses();
        if (typeof renderAttendanceTable === 'function') renderAttendanceTable();
        if (typeof EseCalculator !== 'undefined') EseCalculator.render();
    });

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
        setTimeout(() => hint.classList.add('hidden'), 4000);
    }
}

function renderCourses() {
    const branch = branchSelect.value;
    const sem    = semesterSelect.value;
    const courseData = window.COURSE_DATA || (window.REGULATIONS && window.REGULATIONS[currentRegulation] ? window.REGULATIONS[currentRegulation].COURSE_DATA : {});
    const gradePoints = window.GRADE_POINTS || (window.REGULATIONS && window.REGULATIONS[currentRegulation] ? window.REGULATIONS[currentRegulation].GRADE_POINTS : {});

    if (!branch || !sem || !courseData[branch] || !courseData[branch][sem]) {
        courseContainer.classList.add('hidden');
        return;
    }

    courseTableBody.innerHTML = '';
    courseData[branch][sem].forEach((course) => {
        const row = document.createElement('tr');
        row.className = "transition-colors";
        row.innerHTML = `
            <td class="p-3 text-sm font-normal theme-text">
                ${course.n}
                <div class="md:hidden text-xs theme-muted mt-0.5">Credits: ${course.c}</div>
            </td>
            <td class="p-3 text-center text-sm font-medium theme-muted hidden md:table-cell">${course.c}</td>
            <td class="p-3 max-w-[130px]">
                <select class="grade-input theme-input w-full p-2 border theme-border rounded-lg text-sm font-normal focus-ring-accent outline-none transition cursor-pointer" 
                        data-credits="${course.c}" onchange="calculateResults()">
                    <option value="" selected disabled>Grade</option>
                    ${Object.keys(gradePoints).filter(g => g !== 'F' && g !== 'M').map(g => `<option value="${gradePoints[g]}">${g} (${gradePoints[g]})</option>`).join('')}
                </select>
            </td>
        `;
        courseTableBody.appendChild(row);
    });

    courseContainer.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    const sgpaHero = document.getElementById('sgpa-hero-card');
    if (sgpaHero) sgpaHero.classList.remove('has-result');
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

    document.getElementById('sgpa-display').innerText       = result.sgpa.toFixed(2);
    document.getElementById('percentage-display').innerText = percentage + "%";
    document.getElementById('credits-display').innerText    = result.clearedCredits + " / " + result.totalRegisteredCredits;

    const sgpaHero = document.getElementById('sgpa-hero-card');
    if (sgpaHero) sgpaHero.classList.add('has-result');

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
    const resEl = document.getElementById('converter-result');
    if (isNaN(val) || val < 0 || val > 10) {
        alert("Please enter a valid SGPA/CGPA (0-10)");
        return;
    }
    const perc    = Calculator.cgpaToPercentage(val);
    const usScale = (val / 10) * 4;

    resEl.classList.add('has-result');
    resEl.innerHTML = `
        <div class="grid grid-cols-2 gap-3 w-full text-center">
            <div>
                <div class="hero-result-title text-xs uppercase font-medium tracking-wider mb-1">Percentage</div>
                <div class="hero-result-value text-3xl font-semibold">${perc}%</div>
            </div>
            <div class="border-l border-black/10 dark:border-white/10 pl-3">
                <div class="hero-result-title text-xs uppercase font-medium tracking-wider mb-1">US 4.0 Scale</div>
                <div class="hero-result-value text-3xl font-semibold">${usScale.toFixed(2)}</div>
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
        resEl.classList.remove('has-result');
        resEl.innerHTML = `<span class="text-rose-500 font-semibold text-sm">${req}</span>`;
    } else {
        resEl.classList.add('has-result');
        resEl.innerHTML = `
             <div class="hero-result-title text-xs uppercase font-medium tracking-wider mb-1">Required SGPA</div>
             <div class="hero-result-value text-4xl font-semibold">${req}</div>
        `;
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', init);
