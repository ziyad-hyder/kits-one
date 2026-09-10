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
        { value: 5, label: "5 (P)", minPercent: 40 }, //how the fuck did i make this mistake
        { value: 0, label: "0 (F)", minPercent: 0 }
    ],

    /**
     * Regulation-specific ESE composition. Category logic itself (which
     * subjects are 'theory' vs 'lab' vs 'credit') does NOT vary by regulation
     * - only the marks totals and what makes up the CIE portion do.
     */
    eseRules: {
        'URR24-R25': {
            totals: { theory: 250, lab: 350 },
            cieMax: { theory: 150, lab: 250 }, // 150 CIE + 60 labint + 40 labext
            cieFields(category) {
                const fields = [{ id: 'cie', label: 'CIE Total', max: 150 }];
                if (category === 'lab') {
                    fields.push(
                        { id: 'labint', label: 'Lab Internal', max: 60 },
                        { id: 'labext', label: 'Lab External (Exp.)', max: 40 }
                    );
                }
                return fields;
            },
            computeCIE(category, v) {
                return (v.cie || 0) + (v.labint || 0) + (v.labext || 0);
            }
        },
        'URR26': {
            totals: { theory: 100, lab: 100 },
            cieMax: { theory: 40, lab: 40 }, // (0.7*30 + 0.3*30) + 10 = 40, not 30+30+10=70
            cieFields(category) {
                if (category === 'lab') {
                    return [{ id: 'cie', label: 'Lab CIE', max: 40 }];
                }
                return [
                    { id: 'mse1', label: 'MSE-I', max: 30 },
                    { id: 'mse2', label: 'MSE-II', max: 30 },
                    { id: 'ta', label: "Teacher's Assessment", max: 10 }
                ];
            },
            computeCIE(category, v) {
                if (category === 'lab') return v.cie || 0;
                const best = Math.max(v.mse1 || 0, v.mse2 || 0);
                const other = Math.min(v.mse1 || 0, v.mse2 || 0);
                return (0.7 * best) + (0.3 * other) + (v.ta || 0);
            }
        }
    },

    /**
     * Returns the active regulation's ESE rule set, falling back to
     * URR24-R25 if the current regulation has none defined.
     */
    getRules() {
        return this.eseRules[currentRegulation] || this.eseRules['URR24-R25'];
    },

    /**
     * Determines subject category for ESE calculation purposes.
     * - 'lab': type === 'lab' → marks-based, lab-specific CIE fields (regardless of credit count)
     * - 'credit': credits === 1 AND not a lab → grade-only input (no CIE marks)
     * - 'theory': everything else → marks-based
     * Same across regulations - only totals/fields differ (see eseRules).
     */
    getSubjectCategory(course) {
        if (course.c === 0) return 'skip'; // 0-credit audit courses - exclude from ESE
        if (course.type === 'lab') return 'lab';
        if (course.c === 1) return 'credit';
        return 'theory';
    },

    /**
     * Gets total marks for a subject category under the active regulation.
     */
    getTotalMarks(category) {
        return this.getRules().totals[category] || 0;
    },

    /**
     * Gets the max possible ESE marks for a category under the active
     * regulation (total minus whatever the CIE fields sum to).
     */
    getEseMax(category) {
        const rules = this.getRules();
        const total = rules.totals[category] || 0;
        const cieMax = rules.cieMax[category] || 0;
        return total - cieMax;
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
        const eseHero = document.getElementById('ese-hero-card');

        if (!mainContainer || !creditContainer) return;

        mainContainer.innerHTML = '';
        creditContainer.innerHTML = '';
        if (resultsSection) resultsSection.classList.add('hidden');
        if (eseHero) eseHero.classList.remove('has-result');

        const courseData = window.COURSE_DATA || (window.REGULATIONS && window.REGULATIONS[currentRegulation] ? window.REGULATIONS[currentRegulation].COURSE_DATA : {});

        if (!branch || !sem || !courseData[branch] || !courseData[branch][sem]) {
            if (formContainer) formContainer.classList.add('hidden');
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (formContainer) formContainer.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');

        const courses = courseData[branch][sem];
        let hasMain = false;
        let hasCredit = false;

        courses.forEach((course, index) => {
            const category = this.getSubjectCategory(course);
            if (category === 'skip') return;
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
        const rules = this.getRules();
        const fields = rules.cieFields(category);
        const cieMax = rules.cieMax[category] || 0;
        const eseMax = this.getEseMax(category);
        const subtitle = `${course.c} ${course.c === 1 ? 'Credit' : 'Credits'} • CIE: ${cieMax} + ESE: ${eseMax}`;

        const fieldsHTML = `
            <div class="grid grid-cols-2 gap-2.5">
                ${fields.map(f => this.numberInput(`${subId}_${f.id}`, f.label, f.max)).join('')}
                ${this.gradeSelect(`${subId}_gp`, 'Desired Grade')}
            </div>
        `;

        return `
            <div class="theme-card p-4 rounded-xl border theme-border">
                <h4 class="text-sm font-semibold theme-text mb-0.5">${course.n}</h4>
                <p class="text-xs theme-muted mb-2.5">${subtitle}</p>
                ${fieldsHTML}
                <div id="${subId}_result" class="mt-2.5 text-center text-xs font-medium min-h-[24px]"></div>
            </div>
        `;
    },

    /**
     * Builds a card for a 1-credit subject (grade only).
     */
    buildCreditCard(course, subId) {
        return `
            <div class="theme-card p-3 rounded-xl border theme-border">
                <h4 class="text-xs font-semibold theme-text mb-0.5 truncate">${course.n}</h4>
                <p class="text-xs theme-muted mb-1.5">${course.c} Credit</p>
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
                <label for="${id}" class="block text-xs font-medium theme-muted mb-1">${label} (${max})</label>
                <input type="number" id="${id}" name="${id}" value="0" min="0" max="${max}" required
                    onblur="this.value = Math.max(0, Math.min(${max}, this.value || 0))"
                    class="theme-input w-full p-1.5 border theme-border rounded-lg text-xs font-medium text-center focus-ring-accent outline-none transition">
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
                <label for="${id}" class="block text-xs font-medium theme-muted mb-1">${label}</label>
                <select id="${id}" name="${id}"
                    class="theme-input w-full p-1.5 border theme-border rounded-lg text-xs font-normal focus-ring-accent outline-none transition cursor-pointer">
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
            if (category === 'skip') return;
            const gpSelect = document.getElementById(`${subId}_gp`);
            const desiredGP = gpSelect ? parseInt(gpSelect.value) : 10;

            allGrades.push(desiredGP);
            allCredits.push(course.c);

            if (category !== 'credit') {
                const rules = this.getRules();
                const totalMarks = this.getTotalMarks(category);
                const eseMax = this.getEseMax(category);
                const resultEl = document.getElementById(`${subId}_result`);

                const fieldValues = {};
                rules.cieFields(category).forEach(f => {
                    const raw = parseInt(document.getElementById(`${subId}_${f.id}`)?.value) || 0;
                    fieldValues[f.id] = Math.min(Math.max(raw, 0), f.max);
                });

                const currentMarks = rules.computeCIE(category, fieldValues);
                const requiredTotal = this.calculateRequiredMarks(totalMarks, desiredGP);
                const eseNeeded = requiredTotal - currentMarks;

                let resultText = '';
                let resultColor = '';
                let summaryText = '';

                if (desiredGP === 0) {
                    resultText = 'F Grade selected';
                    resultColor = 'theme-muted';
                    summaryText = `<span>${course.n}:</span> F Grade selected - no ESE target.`;
                } else if (eseNeeded <= 0) {
                    resultText = `Target already achieved (surplus: ${Math.abs(eseNeeded)})`;
                    resultColor = 'text-emerald-600 dark:text-emerald-400';
                    summaryText = `<span>${course.n}:</span> Already achieved ${desiredGP} GP target.`;
                } else if (eseNeeded > eseMax) {
                    resultText = `Needs ${eseNeeded} in ESE (not possible)`;
                    resultColor = 'text-rose-600 dark:text-rose-400';
                    summaryText = `<span>${course.n}:</span> ${desiredGP} GP not possible (needs ${eseNeeded} in ESE).`;
                    allGrades[index] = 0; // Override to F for SGPA calc
                } else {
                    resultText = `Need ${eseNeeded} in ESE`;
                    resultColor = 'text-amber-600 dark:text-amber-400';
                    summaryText = `<span>${course.n}:</span> Need <strong>${eseNeeded}</strong> in ESE for ${desiredGP} GP.`;
                }

                if (resultEl) {
                    resultEl.textContent = resultText;
                    resultEl.className = `mt-2.5 text-center text-xs font-medium min-h-[24px] ${resultColor}`;
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
        const summaryList = document.getElementById('ese-summary');
        const resultsSection = document.getElementById('ese-results');
        const eseHero = document.getElementById('ese-hero-card');

        if (sgpaDisplay) sgpaDisplay.textContent = sgpa.toFixed(2);
        if (summaryList) summaryList.innerHTML = summaryItems.map(s => `<li class="theme-muted text-xs leading-relaxed">${s}</li>`).join('');
        if (eseHero) eseHero.classList.add('has-result');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // GA4 - track ESE calculation
        trackEvent('ese_calculated', { branch, semester: sem, estimated_sgpa: sgpa.toFixed(2) });

        // Save inputs to localStorage
        this.saveInputs(branch, sem);
    },

    /**
     * Saves all ESE input values to localStorage.
     */
    saveInputs(branch, sem) {
        const courses = COURSE_DATA[branch]?.[sem];
        if (!courses) return;
        const data = {};
        const rules = this.getRules();
        courses.forEach((course, index) => {
            const category = this.getSubjectCategory(course);
            if (category === 'skip') return;
            const subId = `ese_sub${index}`;

            // Save grade select for all non-skip subjects
            const gpEl = document.getElementById(`${subId}_gp`);
            if (gpEl) data[`${subId}_gp`] = gpEl.value;

            if (category !== 'credit') {
                rules.cieFields(category).forEach(f => {
                    const el = document.getElementById(`${subId}_${f.id}`);
                    if (el) data[`${subId}_${f.id}`] = el.value;
                });
            }
        });
        Store.set(`ese_${branch}_${sem}`, JSON.stringify(data));
    },

    /**
     * Restores saved ESE input values from localStorage.
     */
    restoreInputs(branch, sem) {
        const saved = Store.get(`ese_${branch}_${sem}`);
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
        
        if (exportBtn) exportBtn.style.display = 'none';

        targetDiv.style.padding = '8px';
        targetDiv.style.background = getComputedStyle(document.body).backgroundColor;

        html2canvas(targetDiv, {
            scale: 2,
            backgroundColor: getComputedStyle(document.body).backgroundColor,
            useCORS: true
        }).then(canvas => {
            targetDiv.style.padding = '';
            targetDiv.style.background = '';
            if (exportBtn) exportBtn.style.display = originalBtnDisplay;

            const base64image = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = base64image;
            a.download = `KITS-One-ESE-Targets-${new Date().getTime()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            trackEvent('ese_exported');
        }).catch(err => {
            console.error("Export Error:", err);
            targetDiv.style.padding = '';
            targetDiv.style.background = '';
            if (exportBtn) exportBtn.style.display = originalBtnDisplay;
            alert("An error occurred while exporting the image.");
        });
    }
};