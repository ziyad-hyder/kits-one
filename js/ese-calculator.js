/**
 * KITS One - ESE Target Calculator
 * Calculates required ESE marks based on CIE scores and desired grades.
 * Dynamically reads subjects from COURSE_DATA.
 */

const EseCalculator = {
    // Grade thresholds: grade point → minimum percentage required
    gradeThresholds: [
        { value: 10, label: "10 (S)", minPercent: 90 },
        { value: 9, label: "9 (A)", minPercent: 80 },
        { value: 8, label: "8 (B)", minPercent: 70 },
        { value: 7, label: "7 (C)", minPercent: 60 },
        { value: 6, label: "6 (D)", minPercent: 50 },
        { value: 4, label: "4 (P)", minPercent: 40 },
        { value: 0, label: "0 (F)", minPercent: 0 }
    ],

    /**
     * Determines subject category for ESE calculation purposes.
     * - 'lab': type === 'lab' AND credits >= 3 → total 350, has Lab CIE + Lab Ext fields
     * - 'theory': credits >= 2 AND NOT lab → total 250, has Mid1 + Mid2 + GCBAA
     * - 'credit': credits === 1 → grade-only input (no CIE marks)
     * 
     * Special: credits >= 4 with no explicit type → theory+lab combo (total 350)
     */
    getSubjectCategory(course) {
        if (course.c === 0) return 'skip'; // 0-credit audit courses — exclude from ESE
        if (course.c === 1) return 'credit';
        if (course.type === 'lab' && course.c >= 3) return 'lab';
        if (course.c >= 4 && course.type !== 'lab') return 'theorylab'; // theory+lab combo
        return 'theory';
    },

    /**
     * Gets total marks for a subject category.
     */
    getTotalMarks(category) {
        if (category === 'lab' || category === 'theorylab') return 350;
        if (category === 'theory') return 250;
        return 0; // credit subjects don't have marks
    },

    /**
     * Calculates minimum total marks needed for a desired grade point.
     */
    calculateRequiredMarks(totalMarks, desiredGradePoint) {
        const grade = this.gradeThresholds.find(g => g.value === desiredGradePoint);
        if (!grade || grade.value === 0) return 9999;
        return Math.floor((grade.minPercent / 100.0) * totalMarks);
    },

    /**
     * Renders the ESE subject cards based on selected branch/semester.
     */
    render() {
        const branch = document.getElementById('branch-select').value;
        const sem = document.getElementById('semester-select').value;
        const mainContainer = document.getElementById('ese-main-subjects');
        const creditContainer = document.getElementById('ese-credit-subjects');
        const formContainer = document.getElementById('ese-form-container');
        const emptyState = document.getElementById('ese-empty-state');
        const resultsSection = document.getElementById('ese-results');

        if (!mainContainer || !creditContainer) return;

        mainContainer.innerHTML = '';
        creditContainer.innerHTML = '';
        if (resultsSection) resultsSection.classList.add('hidden');

        if (!branch || !sem || !COURSE_DATA[branch] || !COURSE_DATA[branch][sem]) {
            if (formContainer) formContainer.classList.add('hidden');
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (formContainer) formContainer.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');

        const courses = COURSE_DATA[branch][sem];
        let hasMain = false;
        let hasCredit = false;

        courses.forEach((course, index) => {
            const category = this.getSubjectCategory(course);
            if (category === 'skip') return; // Skip 0-credit audit courses
            const subId = `ese_sub${index}`;

            if (category === 'credit') {
                hasCredit = true;
                creditContainer.innerHTML += this.buildCreditCard(course, subId);
            } else {
                hasMain = true;
                mainContainer.innerHTML += this.buildMainCard(course, subId, category);
            }
        });

        // Restore saved inputs from localStorage
        this.restoreInputs(branch, sem);

        // Show/hide section headers
        const mainHeader = document.getElementById('ese-main-header');
        const creditHeader = document.getElementById('ese-credit-header');
        if (mainHeader) mainHeader.classList.toggle('hidden', !hasMain);
        if (creditHeader) creditHeader.classList.toggle('hidden', !hasCredit);
    },

    /**
     * Builds a card for a main subject (theory, lab, or theorylab).
     */
    buildMainCard(course, subId, category) {
        const totalMarks = this.getTotalMarks(category);
        const isLab = (category === 'lab' || category === 'theorylab');
        const subtitle = isLab
            ? `${course.c} Credits • CIE: 150 + ESE: 100 + Lab: 100`
            : `${course.c} Credits • CIE: 150 + ESE: 100`;

        let fieldsHTML = `
            <div class="grid grid-cols-2 gap-3">
                ${this.numberInput(`${subId}_cie`, 'CIE Total', 150)}
                ${isLab ? this.numberInput(`${subId}_labint`, 'Lab Internal', 60) : ''}
                ${isLab ? this.numberInput(`${subId}_labext`, 'Lab External (Expected)', 40) : ''}
                ${this.gradeSelect(`${subId}_gp`, 'Desired Grade')}
            </div>
        `;

        return `
            <div class="theme-card p-5 rounded-xl border theme-border">
                <h4 class="text-base font-bold theme-text mb-1">${course.n}</h4>
                <p class="text-xs theme-muted mb-3">${subtitle}</p>
                ${fieldsHTML}
                <div id="${subId}_result" class="mt-3 text-center text-sm font-semibold min-h-[28px]"></div>
            </div>
        `;
    },

    /**
     * Builds a card for a 1-credit subject (grade only).
     */
    buildCreditCard(course, subId) {
        return `
            <div class="theme-card p-4 rounded-xl border theme-border">
                <h4 class="text-sm font-bold theme-text mb-1">${course.n}</h4>
                <p class="text-xs theme-muted mb-2">${course.c} Credit</p>
                ${this.gradeSelect(`${subId}_gp`, 'Expected Grade')}
            </div>
        `;
    },

    /**
     * Creates a number input field HTML.
     */
    numberInput(id, label, max) {
        return `
            <div>
                <label for="${id}" class="block text-xs font-bold theme-muted mb-1">${label} (${max})</label>
                <input type="number" id="${id}" name="${id}" value="0" min="0" max="${max}" required
                    onblur="this.value = Math.max(0, Math.min(${max}, this.value || 0))"
                    class="theme-input w-full p-2 border theme-border rounded-lg text-sm font-medium text-center focus:ring-2 focus:ring-indigo-500 outline-none transition">
            </div>
        `;
    },

    /**
     * Creates a grade select dropdown HTML.
     */
    gradeSelect(id, label) {
        const options = this.gradeThresholds.map(gp =>
            `<option value="${gp.value}" ${gp.value === 10 ? 'selected' : ''}>${gp.label}</option>`
        ).join('');

        return `
            <div class="col-span-2">
                <label for="${id}" class="block text-xs font-bold text-indigo-500 mb-1">${label}</label>
                <select id="${id}" name="${id}"
                    class="theme-input w-full p-2 border theme-border rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition cursor-pointer">
                    ${options}
                </select>
            </div>
        `;
    },

    /**
     * Calculates ESE requirements and estimated SGPA.
     */
    calculate() {
        const branch = document.getElementById('branch-select').value;
        const sem = document.getElementById('semester-select').value;

        if (!branch || !sem || !COURSE_DATA[branch] || !COURSE_DATA[branch][sem]) {
            alert('Please select Branch and Semester first.');
            return;
        }

        const courses = COURSE_DATA[branch][sem];
        const allGrades = [];
        const allCredits = [];
        const summaryItems = [];

        courses.forEach((course, index) => {
            const subId = `ese_sub${index}`;
            const category = this.getSubjectCategory(course);
            if (category === 'skip') return; // Skip 0-credit audit courses
            const gpSelect = document.getElementById(`${subId}_gp`);
            const desiredGP = gpSelect ? parseInt(gpSelect.value) : 10;

            allGrades.push(desiredGP);
            allCredits.push(course.c);

            if (category !== 'credit') {
                const totalMarks = this.getTotalMarks(category);
                const isLab = (category === 'lab' || category === 'theorylab');
                const resultEl = document.getElementById(`${subId}_result`);

                const cieTotal = Math.min(Math.max(parseInt(document.getElementById(`${subId}_cie`)?.value) || 0, 0), 150);
                const labInt = isLab ? Math.min(Math.max(parseInt(document.getElementById(`${subId}_labint`)?.value) || 0, 0), 60) : 0;
                const labExt = isLab ? Math.min(Math.max(parseInt(document.getElementById(`${subId}_labext`)?.value) || 0, 0), 40) : 0;

                const currentMarks = cieTotal + labInt + labExt;
                const requiredTotal = this.calculateRequiredMarks(totalMarks, desiredGP);
                const eseNeeded = requiredTotal - currentMarks;

                let resultText = '';
                let resultTextColor = '';
                let resultBg = '';
                let summaryText = '';

                if (desiredGP === 0) {
                    resultText = 'F Grade selected';
                    resultTextColor = 'text-slate-500 dark:text-slate-400';
                    resultBg = 'rgba(100, 116, 139, 0.1)';
                    summaryText = `<strong>${course.n}:</strong> F Grade selected — no ESE target.`;
                } else if (eseNeeded <= 0) {
                    resultText = `Already achieved! (surplus: ${Math.abs(eseNeeded)})`;
                    resultTextColor = 'text-green-600 dark:text-green-400';
                    resultBg = 'rgba(34, 197, 94, 0.1)';
                    summaryText = `<strong>${course.n}:</strong> Already achieved ${desiredGP} GP target.`;
                } else if (eseNeeded > 100) {
                    resultText = `Needs ${eseNeeded} in ESE (not possible)`;
                    resultTextColor = 'text-red-500 dark:text-red-400';
                    resultBg = 'rgba(239, 68, 68, 0.1)';
                    summaryText = `<strong>${course.n}:</strong> ${desiredGP} GP not possible (needs ${eseNeeded} in ESE).`;
                    allGrades[index] = 0; // Override to F for SGPA calc
                } else {
                    resultText = `Need ${eseNeeded} in ESE`;
                    resultTextColor = 'text-amber-600 dark:text-amber-500';
                    resultBg = 'rgba(245, 158, 11, 0.1)';
                    summaryText = `<strong>${course.n}:</strong> Need <strong>${eseNeeded}</strong> in ESE for ${desiredGP} GP.`;
                }

                if (resultEl) {
                    resultEl.textContent = resultText;
                    resultEl.className = `mt-3 p-2 theme-input w-full border theme-border rounded-lg text-center text-sm font-bold transition ${resultTextColor}`;
                    resultEl.style.backgroundColor = resultBg;
                }
                summaryItems.push(summaryText);
            }
        });

        // Calculate estimated SGPA
        let totalPoints = 0;
        let totalCredits = 0;
        for (let i = 0; i < allGrades.length; i++) {
            if (allCredits[i] > 0) {
                totalPoints += allGrades[i] * allCredits[i];
                totalCredits += allCredits[i];
            }
        }
        const sgpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits);

        // Update results UI
        const sgpaDisplay = document.getElementById('ese-sgpa-display');
        const sgpaTitle = document.getElementById('ese-sgpa-title');
        const summaryList = document.getElementById('ese-summary');
        const resultsSection = document.getElementById('ese-results');
        const summaryHeading = document.getElementById('ese-summary-heading');

        if (sgpaDisplay) sgpaDisplay.textContent = sgpa.toFixed(2);
        if (sgpaTitle) sgpaTitle.textContent = "Estimated SGPA";
        if (summaryHeading) summaryHeading.classList.remove('hidden');
        if (summaryList) summaryList.innerHTML = summaryItems.map(s => `<li class="theme-muted text-sm leading-relaxed">${s}</li>`).join('');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Save inputs to localStorage
        this.saveInputs(branch, sem);
    },
    calculatePassMode() {
        const branch = document.getElementById('branch-select').value;
        const sem = document.getElementById('semester-select').value;

        if (!branch || !sem || !COURSE_DATA[branch] || !COURSE_DATA[branch][sem]) {
            alert('Please select Branch and Semester first.');
            return;
        }

        const courses = COURSE_DATA[branch][sem];
        const grades = [];
        const summaryItems = [];
        
        const getGrade = (percent) => {
            if (percent >= 90) return { point: 10, letter: 'S' };
            if (percent >= 80) return { point: 9, letter: 'A' };
            if (percent >= 70) return { point: 8, letter: 'B' };
            if (percent >= 60) return { point: 7, letter: 'C' };
            if (percent >= 50) return { point: 6, letter: 'D' };
            if (percent >= 40) return { point: 4, letter: 'P' };
            return { point: 0, letter: 'F' };
        };

        courses.forEach((course, index) => {
            const subId = `ese_sub${index}`;
            const category = this.getSubjectCategory(course);
            if (category === 'skip') return;

            const resultEl = document.getElementById(`${subId}_result`);
            let resultText = '';
            let resultTextColor = '';
            let resultBg = '';
            let summaryText = '';

            if (category === 'credit') {
                const gpSelect = document.getElementById(`${subId}_gp`);
                const gp = gpSelect ? parseInt(gpSelect.value) : 10;
                grades.push({ credits: course.c, gradePoint: gp });
                resultText = `1-Credit Evaluated (GP: ${gp})`;
                summaryText = `<strong>${course.n}:</strong> 1-Credit evaluated as ${gp} GP.`;
            } else {
                const isLab = (category === 'lab' || category === 'theorylab');
                const cie = parseInt(document.getElementById(`${subId}_cie`)?.value) || 0;
                const labInt = isLab ? (parseInt(document.getElementById(`${subId}_labint`)?.value) || 0) : 0;
                const labExt = isLab ? (parseInt(document.getElementById(`${subId}_labext`)?.value) || 0) : 0;

                const current = cie + labInt + labExt;
                const minESE = 40;
                const minTotal = isLab ? 140 : 100;
                const totalMarks = this.getTotalMarks(category);

                const eseNeeded = Math.max(minESE, minTotal - current);

                let projectedGP = 0;

                if (eseNeeded > 100) {
                    resultText = `Fail: Needs ${eseNeeded} ESE`;
                    resultTextColor = 'text-red-500 dark:text-red-400';
                    resultBg = 'rgba(239, 68, 68, 0.1)';
                    summaryText = `<strong>${course.n}:</strong> Not possible to pass (needs ${eseNeeded} in ESE).`;
                    if (resultEl) resultEl.removeAttribute('title');
                } else {
                    const finalMarks = current + eseNeeded;
                    const percent = (finalMarks / totalMarks) * 100;
                    const gradeInfo = getGrade(percent);
                    projectedGP = gradeInfo.point;

                    resultText = `Pass @ ${eseNeeded} ESE (Grade ${gradeInfo.letter})`;
                    if (eseNeeded === minESE) {
                        resultTextColor = 'text-green-600 dark:text-green-400';
                        resultBg = 'rgba(34, 197, 94, 0.1)';
                    } else {
                        resultTextColor = 'text-amber-600 dark:text-amber-500';
                        resultBg = 'rgba(245, 158, 11, 0.1)';
                    }
                    
                    summaryText = `<strong>${course.n}:</strong> Need <strong>${eseNeeded}</strong> in ESE to pass with ${projectedGP} GP (Grade ${gradeInfo.letter}).`;
                    
                    if (resultEl) {
                        resultEl.title = `Minimum required to pass: Grade ${gradeInfo.letter} (${eseNeeded}/100 in ESE)`;
                    }
                }

                grades.push({ credits: course.c, gradePoint: projectedGP });

                if (resultEl) {
                    resultEl.textContent = resultText;
                    resultEl.className = `mt-3 p-2 theme-input w-full border theme-border rounded-lg text-center text-sm font-bold transition ${resultTextColor}`;
                    resultEl.style.backgroundColor = resultBg;
                }
            }
            if (summaryText) {
                summaryItems.push(summaryText);
            }
        });

        const sgpaResult = Calculator.calculateSGPA(grades);
        
        document.getElementById('ese-sgpa-display').textContent = sgpaResult.sgpa.toFixed(2);
        const sgpaTitle = document.getElementById('ese-sgpa-title');
        if (sgpaTitle) sgpaTitle.textContent = "Estimated SGPA (Minimum to Pass)";

        const summaryHeading = document.getElementById('ese-summary-heading');
        if (summaryHeading) summaryHeading.classList.remove('hidden');

        const summaryUl = document.getElementById('ese-summary');
        if (summaryUl) summaryUl.innerHTML = summaryItems.map(s => `<li class="theme-muted text-sm leading-relaxed">${s}</li>`).join('');
        
        // Show results block
        const resultsSection = document.getElementById('ese-results');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
        }
    },
    /**
     * Saves all ESE input values to localStorage.
     */
    saveInputs(branch, sem) {
        const courses = COURSE_DATA[branch]?.[sem];
        if (!courses) return;
        const data = {};
        courses.forEach((course, index) => {
            const category = this.getSubjectCategory(course);
            if (category === 'skip') return;
            const subId = `ese_sub${index}`;
            const isLab = (category === 'lab' || category === 'theorylab');

            // Save grade select for all non-skip subjects
            const gpEl = document.getElementById(`${subId}_gp`);
            if (gpEl) data[`${subId}_gp`] = gpEl.value;

            if (category !== 'credit') {
                ['_cie'].forEach(suffix => {
                    const el = document.getElementById(`${subId}${suffix}`);
                    if (el) data[`${subId}${suffix}`] = el.value;
                });
                if (isLab) {
                    ['_labint', '_labext'].forEach(suffix => {
                        const el = document.getElementById(`${subId}${suffix}`);
                        if (el) data[`${subId}${suffix}`] = el.value;
                    });
                }
            }
        });
        localStorage.setItem(`ese_${branch}_${sem}`, JSON.stringify(data));
    },

    /**
     * Restores saved ESE input values from localStorage.
     */
    restoreInputs(branch, sem) {
        const saved = localStorage.getItem(`ese_${branch}_${sem}`);
        if (!saved) return;
        try {
            const data = JSON.parse(saved);
            Object.entries(data).forEach(([id, value]) => {
                const el = document.getElementById(id);
                if (el) el.value = value;
            });
        } catch (e) {
            // Ignore corrupted data
        }
    },

    /**
     * Exports the ESE Results Summary as a PNG Image
     */
    exportToImage() {
        if (typeof html2canvas === 'undefined') {
            alert("Export failed: required library is loading or blocked by your browser. Please try again.");
            return;
        }
        
        const targetDiv = document.getElementById('ese-results');
        const exportBtn = document.getElementById('ese-export-btn');
        const originalBtnDisplay = exportBtn ? exportBtn.style.display : '';
        
        // Hide the export button temporarily during screenshot
        if (exportBtn) exportBtn.style.display = 'none';

        // Add a slight padding for aesthetics
        targetDiv.style.padding = '10px';
        targetDiv.style.background = getComputedStyle(document.body).backgroundColor;

        html2canvas(targetDiv, {
            scale: 2, // 2x resolution for sharpness
            backgroundColor: getComputedStyle(document.body).backgroundColor,
            useCORS: true
        }).then(canvas => {
            // Restore styles
            targetDiv.style.padding = '';
            targetDiv.style.background = '';
            if (exportBtn) exportBtn.style.display = originalBtnDisplay;

            // Trigger Download
            const base64image = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = base64image;
            a.download = `KITS-One-ESE-Targets-${new Date().getTime()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }).catch(err => {
            console.error("Export Error:", err);
            // Restore styles just in case
            targetDiv.style.padding = '';
            targetDiv.style.background = '';
            if (exportBtn) exportBtn.style.display = originalBtnDisplay;
            alert("An error occurred while exporting the image.");
        });
    }
};
