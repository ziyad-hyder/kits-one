# KITS One

<!-- TODO: add screenshot -->

**Live app -> [ziyadhyder.dev/kits-one](https://ziyadhyder.dev/kits-one)**

It started with a simple problem: KITSW's credit rules and grade exclusions are unique, and most generic GPA calculators just couldn't get the math right.

What began as a personal tool to calculate my own SGPA accurately gradually evolved into a complete academic companion for every student of **KITSW** under **URR24-R25 and URR26** regulations (switch inside the app).

KITS One is a complete academic companion designed to take the guesswork out of your journey at college.

***KITS One doesn't track your attendance - it helps you understand and plan it.***


## What's New in v4.0.0

- **Two regulations, one app:** URR26 and URR24-R25 are both supported. Pick your regulation from the selector at the top - the calculator, attendance table, and ESE planner all update instantly.
- **New design:** Navy, teal, and coral replace the old indigo interface. Completely redesigned from the ground up.
- **Installable PWA:** Add KITS One to your home screen and use it offline after the first load (see "Install it" below).
- **New home:** The app now lives at [ziyadhyder.dev/kits-one](https://ziyadhyder.dev/kits-one).


## What's inside?

- **Smart Bunk Buffer:** Track your attendance and know exactly how many classes you can safely skip (or need to attend) to stay above 75%.
- **Accurate SGPA Calculator:** Follows strict KITSW grading rules - F-grade credits are excluded from both the numerator and denominator. Supports all 9 branches: CSE, CSM, CSD, CSN, CSO, ECE, EEE, ME, IT, ECI.
- **Target SGPA Planner:** Input your current standing and your goal, and let the tool tell you exactly what you need to score in your endsem exams.
- **ESE Target Planner:** Enter your CIE internals (out of 150 for URR24-R25, or MSE-I/MSE-II/TA for URR26), pick your dream grade, and get the exact ESE marks you need.
- **Export as Image:** Tap "Export as Image" at the bottom of the ESE Planner to download a PNG of your target scores - ready to share to your class WhatsApp group.
- **CGPA Converter:** One-tap conversion using the official `(CGPA - 0.50) x 10` formula, plus US 4.0 scale for MS applications abroad.
- **Attendance Autofill:** Paste your UMS attendance table and auto-fill Held/Absent values instantly. Manual entry still supported.
- **Contextual Help:** Built-in guided help for each feature.
- **Dark Mode:** Because we check our grades late at night.


## Install it

**Android / Chrome** - Tap the install banner that appears at the bottom of the page, or open the browser menu and tap **Install app**.

**iPhone / Safari** - Tap the Share button (box with arrow), then **Add to Home Screen**.

Once installed, the app works offline after the first load.


## Technical Stack

- **Frontend:** HTML5, Tailwind CSS (compiled)
- **Logic:** Vanilla JavaScript (ES6+), no framework
- **PWA:** Service worker (cache-first app shell, stale-while-revalidate for data files) + Web App Manifest
- **Export:** [html2canvas](https://html2canvas.hertzen.com/) for ESE Planner image download


## Privacy

No login. No ads. Anonymous usage analytics only (Google Analytics 4).


## Contributors

- **[Simi Riza](https://github.com/SimiRiza)** - Attendance autofill feature (UMS table parsing & input automation)

### Curriculum Data (URR24-R25)

- **Md Fayazuddin** - 4CSE
- **B. Varun** - 4CSM
- **[Md Taqiuddin](https://github.com/Taqi128)** - 4CSD
- **[Salman Syed](https://github.com/Salman-a-gamer)** - 4IT
- **B. Pragnesh** - 2CSM
- **Md K Moinuddin** - 2IT

<!-- TODO: add URR26 curriculum data contributors if applicable -->


## License

**KITS One** is open-source under the **MIT License**.

## Contact

Feel free to reach out for feature requests or bug reports:

- **LinkedIn:** [Ziyad Hyder](https://www.linkedin.com/in/ziyadhyder/)
- **GitHub:** [ziyad-hyder](https://github.com/ziyad-hyder)
- **Email:** [ziyadhyder01@gmail.com](mailto:ziyadhyder01@gmail.com)
- **Found a bug?** Open an issue or a Pull Request.
- **Missing your branch data?** All curriculum PDFs are in the `/PDFs` folder for verification.

___Built by a KITSW student, for KITSW students.___
