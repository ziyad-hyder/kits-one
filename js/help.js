/**
 * KITS One - Help Modal System
 * Shows contextual help for each feature until user dismisses it
 */

const HelpSystem = {
    // Help content for each feature
    content: {
        // Global step shown on first visit (once per session)
        'global': {
            title: 'Before Using Any Feature',
            icon: '',
            steps: [
                {
                    icon: '1',
                    text: '<strong>Select your Branch & Semester</strong>',
                    subItems: [
                        'This selection applies to all features during this session.',
                        'You don\'t need to select it again unless you refresh the page.'
                    ]
                }
            ],
            tip: ''
        },
        'tab-attend': {
            title: 'How to use Bunk Buffer',
            icon: '',
            steps: [
                {
                    icon: '1',
                    text: 'Open the official <a href="https://tscms-kitsw.aptonline.in/UMS" class="text-accent underline font-medium" target="_blank">KITS UMS</a> portal',
                    tip: 'Tap the link to open the portal'
                },
                {
                    icon: '2',
                    text: 'Login and go to:<br><strong>Report → Attendance Report</strong>'
                },
                {
                    icon: '3',
                    text: 'Quick mode! We’ll auto-fill Held & Absent for you.',
                    subItems: [
                        'Open KITS UMS → Attendance Report and paste the copied text in the autofill box.',
                        'Desktop: Ctrl + A → Ctrl + C',
                        'Mobile: Select All → Copy → Paste',
                        'You can still edit everything manually below.',
                    ]
                },
                {
                    icon: '4',
                    text: 'Click anywhere on the page to instantly see your bunk buffer.'
                }
            ],
            tip: 'Your attendance data is saved locally on this device, so you won\'t lose it after refresh.'
        },
        'tab-calc': {
            title: 'How to use Expected SGPA Calculator',
            icon: '',
            steps: [
                {
                    icon: '1',
                    text: 'Enter the grade you are expecting in each subject<br>(S / A / B / C / D etc.)'
                },
                {
                    icon: '2',
                    text: 'The tool will automatically calculate:',
                    subItems: [
                        'Your expected SGPA',
                        'Your semester performance estimate'
                    ]
                },
                {
                    icon: '',
                    text: 'This helps you understand where you currently stand before results.'
                }
            ],
            tip: 'You can adjust grades multiple times to test different scenarios.'
        },
        'tab-plan': {
            title: 'How to use Target Planner',
            icon: '',
            steps: [
                {
                    icon: '1',
                    text: 'Open <a href="https://www.kitswexams.com" class="text-accent underline font-medium" target="_blank">KITSW Exams</a> portal'
                },
                {
                    icon: '2',
                    text: 'Login using <strong>Student Login</strong>'
                },
                {
                    icon: '3',
                    text: 'Go to:<br><strong>Marks Details → Overall Marks</strong><br>Note your current CGPA and credits.'
                },
                {
                    icon: '4',
                    text: 'Now come back to KITS One and enter:',
                    subItems: [
                        '<strong>Current CGPA</strong> → Your CGPA till now',
                        '<strong>Current Credits</strong> → Total credits earned so far',
                        '<strong>Target CGPA</strong> → CGPA you aim to achieve',
                        '<strong>Next Semester Credits</strong> → Credits in the upcoming semester'
                    ]
                },
                {
                    icon: '',
                    text: 'The planner will tell you what SGPA you must score to reach your goal.'
                }
            ],
            tip: 'This feature is ideal for: planning 8/9+ cutoff for placements, avoiding last-minute panic, and tracking long-term goals.'
        },
        'tab-ese': {
            title: 'How to use ESE Target Calculator',
            icon: '',
            steps: [
                {
                    icon: '1',
                    text: '<strong>Select your Branch & Semester</strong> from the dropdowns above',
                    subItems: [
                        'Subject cards will appear automatically based on your selection.'
                    ]
                },
                {
                    icon: '2',
                    text: 'Enter your marks for each subject:',
                    subItems: [
                        '<strong>CIE Total</strong> — From UMS "Total (out of 150)" column',
                        '<strong>Lab Internal</strong> — From UMS (for lab subjects only)',
                        '<strong>Lab External</strong> — Your expected lab external marks'
                    ]
                },
                {
                    icon: '3',
                    text: 'Select a <strong>Desired Grade</strong> for each subject (S, A, B, C, D, P)'
                },
                {
                    icon: '4',
                    text: 'Click <strong>Calculate ESE Targets</strong>',
                    subItems: [
                        'You\'ll see the required ESE marks for each subject',
                        'An estimated SGPA based on your desired grades'
                    ]
                }
            ],
            tip: 'If required ESE marks exceed 100, that grade is mathematically unattainable. Focus on maximizing your Internal Marks (CIE) to lower your ESE burden!'
        }
    },

    // Check if help should show for a feature (not dismissed)
    shouldShow(featureId) {
        return (() => { try { return localStorage.getItem(`help_dismissed_${featureId}`) !== 'true'; } catch { return true; } })();
    },

    // Check if global step was shown this session
    globalShownThisSession: false,

    // Dismiss help for a feature forever
    dismiss(featureId) {
        (() => { try { localStorage.setItem(`help_dismissed_${featureId}`, 'true'); } catch {} })();
    },

    // Reset all dismissals (for testing)
    resetAll() {
        Object.keys(this.content).forEach(id => {
            (() => { try { localStorage.removeItem(`help_dismissed_${id}`); } catch {} })();
        });
    },

    // Show help modal for a feature
    show(featureId, forceShow = false) {
        const helpContent = this.content[featureId];
        if (!helpContent) return;

        // Don't show if already dismissed (unless forced via ? button)
        if (!forceShow && !this.shouldShow(featureId)) return;

        const overlay = document.getElementById('help-modal-overlay');
        const modal = document.getElementById('help-modal');
        if (!overlay || !modal) return;

        // Build modal content
        modal.innerHTML = this.buildModalHTML(featureId, helpContent);

        // Show overlay with animation
        overlay.classList.remove('hidden');
        requestAnimationFrame(() => {
            overlay.classList.add('help-visible');
        });

        // Attach event listeners
        this.attachEvents(featureId);
    },

    // Show global step first, then feature help
    showWithGlobal(featureId, forceShow = false) {
        // If global step not shown this session and not dismissed, show it first
        if (!this.globalShownThisSession && this.shouldShow('global') && !forceShow) {
            this.globalShownThisSession = true;
            this.show('global', false);
            // After global is closed, show feature help
            this.pendingFeatureHelp = featureId;
        } else {
            this.show(featureId, forceShow);
        }
    },

    pendingFeatureHelp: null,

    // Close the modal
    close() {
        const overlay = document.getElementById('help-modal-overlay');
        if (!overlay) return;

        overlay.classList.remove('help-visible');
        setTimeout(() => {
            overlay.classList.add('hidden');
            // If there's pending feature help after global step, show it
            if (this.pendingFeatureHelp) {
                const featureId = this.pendingFeatureHelp;
                this.pendingFeatureHelp = null;
                setTimeout(() => this.show(featureId), 200);
            }
        }, 200);
    },

    // Build modal HTML content
    buildModalHTML(featureId, content) {
        const stepsHTML = content.steps.map(step => {
            // Skip steps with empty icon and text that are just informational
            const iconDisplay = step.icon ? `<span class="help-step-icon">${step.icon}</span>` : '';

            let stepContent = `
                <div class="help-step ${!step.icon ? 'help-step-no-icon' : ''}">
                    ${iconDisplay}
                    <div class="help-step-content">
                        <p>${step.text}</p>
                        ${step.tip ? `<p class="help-step-tip">${step.tip}</p>` : ''}
                        ${step.subItems ? `
                            <ul class="help-sub-items">
                                ${step.subItems.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
            `;
            return stepContent;
        }).join('');

        return `
            <div class="help-modal-header">
                ${content.icon ? `<span class="help-modal-icon">${content.icon}</span>` : ''}
                <h3 class="help-modal-title">${content.title}</h3>
                <button id="help-close-btn" class="help-close-btn" aria-label="Close">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="help-modal-body">
                ${stepsHTML}
                ${content.tip ? `
                    <div class="help-tip-box">
                        <strong>Tip:</strong> ${content.tip}
                    </div>
                ` : ''}
            </div>
            <div class="help-modal-footer">
                <label class="help-dismiss-label">
                    <input type="checkbox" id="help-dismiss-checkbox" class="help-dismiss-checkbox">
                    <span>Don't show this again</span>
                </label>
                <button id="help-got-it-btn" class="btn-primary py-2 px-5 text-sm">Got it</button>
            </div>
        `;
    },

    // Attach event listeners to modal
    attachEvents(featureId) {
        const overlay = document.getElementById('help-modal-overlay');
        const closeBtn = document.getElementById('help-close-btn');
        const gotItBtn = document.getElementById('help-got-it-btn');
        const dismissCheckbox = document.getElementById('help-dismiss-checkbox');

        const handleClose = () => {
            if (dismissCheckbox && dismissCheckbox.checked) {
                this.dismiss(featureId);
            }
            this.close();
        };

        if (closeBtn) closeBtn.addEventListener('click', handleClose);
        if (gotItBtn) gotItBtn.addEventListener('click', handleClose);

        // Close on overlay click (outside modal)
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) handleClose();
            });
        }

        // Close on Escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                handleClose();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    },

    // Initialize - attach FAB button listener
    init() {
        const fab = document.getElementById('help-fab');
        if (fab) {
            fab.addEventListener('click', () => {
                // Show help for current active tab
                const activeTab = document.querySelector('.tab-content:not(.hidden)');
                if (activeTab && this.content[activeTab.id]) {
                    this.show(activeTab.id, true); // Force show
                }
            });
        }

        // Show global step + help for initially active tab (Bunk Buffer by default)
        setTimeout(() => {
            const activeTab = document.querySelector('.tab-content:not(.hidden)');
            if (activeTab && this.content[activeTab.id]) {
                this.showWithGlobal(activeTab.id);
            }
        }, 500);
    }
};
