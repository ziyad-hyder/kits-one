
// Grading Scale Constants (URR24-R25)
var GRADE_POINTS_URR24_R25 = {
    "S": 10,
    "A": 9,
    "B": 8,
    "C": 7,
    "D": 6,
    "P": 4,
    "F": 0,
    "M": 0
};

var BRANCH_MAPPING_URR24_R25 = {
    "CSE": "Computer Science & Engineering",
    "CSM": "CSE (AI & ML)",
    "CSD": "CSE (Data Science)",
    "CSN": "CSE (Networks)",
    "CSO": "CSE (IoT)",
    "ECE": "Electronics & Comm. Engg",
    "EEE": "Electrical & Electronics Engg",
    "ME": "Mechanical Engineering",
    "IT": "Information Technology",
    "ECI": "Electronics Comm. & Instrumentation Engg"
};

// n: Name, c: Credits
var COURSE_DATA_URR24_R25 = {
    "CSE": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EP", code: "U24PY102C", c: 4 },
            { n: "COA", code: "U24CS103", c: 3 },
            { n: "PPSC", code: "U24CS104", c: 4 },
            { n: "BEE", code: "U24EE105C", c: 4 },
            { n: "ILMS", code: "U24AE107", c: 1, type: "lab" },
        ],

        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 },
            { n: "EC", code: "U24CY202C", c: 3 },
            { n: "OS", code: "U24CS203", c: 3 },
            { n: "DSTC", code: "U24CS204", c: 3 },
            { n: "ECRW", code: "U24MH205", c: 2 },
            { n: "Sports & Yoga", code: "U24VA206", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24ME207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" },
            { n: "EC Lab", code: "U24CY209C", c: 1, type: "lab" },
            { n: "DSTC Lab", code: "U24CS210", c: 1, type: "lab" },
        ],

        "Sem 3": [
            { n: "SE", code: "U24CS301-R25", c: 3 },
            { n: "TOC", code: "U24CS302-R25", c: 3 },
            { n: "ADS", code: "U24CS303-R25", c: 3 },
            { n: "CN", code: "U24CS304-R25", c: 3 },
            { n: "OOPJ", code: "U24CS305-R25", c: 3 },
            // { n: "QALR", code: "U24VA306A-R25", c: 2 }, //idk why they removed this, ass clg
            { n: "PSD Lab-2", code: "U24SE307-R25", c: 1, type: "lab" },
            { n: "ADS Lab", code: "U24CS308-R25", c: 1, type: "lab" },
            { n: "Java Lab", code: "U24CS309-R25", c: 1, type: "lab" },
        ],

        "Sem 4": [
            { n: "DMPS", code: "U24MH401-R25", c: 3 }, //data contributed by Mohammad Fayazuddin
            { n: "WP", code: "U24CS402-R25", c: 3 },
            { n: "DBMS", code: "U24CS403-R25", c: 3 },
            { n: "AI", code: "U24CS404-R25", c: 3 },
            { n: "PP", code: "U24CS405-R25", c: 3 },
            { n: "SIS", code: "U24VA406B-R25", c: 1 },//default to "theory" in attendance.js so not required to explicitly mark as type "theory"
            { n: "PSD Lab-3", code: "U24SE407-R25", c: 1, type: "lab" },// stanalone alone labs marked seperately 
            { n: "WP Lab", code: "U24CS408-R25", c: 1, type: "lab" },
            { n: "DBMS Lab", code: "U24CS409-R25", c: 1, type: "lab" },
            { n: "PP Lab", code: "U24CS410-R25", c: 1, type: "lab" },
        ],
        "Sem 5": [
            { n: "DT", code: "U24OE501A-SEB", c: 3 },
            { n: "ML", code: "U24CS502", c: 3 },
            { n: "FSD", code: "U24CS503", c: 4 },
            { n: "DAA", code: "U24CS504", c: 3 },
            { n: "QC", code: "U24CS505", c: 3 },
            { n: "EITK", code: "U24IK506A", c: 2 },
            { n: "Tech. English", code: "U24MH507", c: 1 },
            { n: "ML Lab", code: "U24CS508", c: 1, type: "lab" },
            { n: "FSD Lab", code: "U24CS509", c: 1, type: "lab" },
            { n: "Seminar", code: "U24CS510", c: 1 },
        ],

        "Sem 6": [
            { n: "OE-Management Basket 1", code: "U24OE601X-MB", c: 3 },
            { n: "P-Elective 1", code: "U24CS602", c: 3 },
            { n: "DL", code: "U24CS603", c: 3 },
            { n: "CD", code: "U24CS604", c: 3 },
            { n: "IOT", code: "U24CS605", c: 3 },
            { n: "UHV-II", code: "U24IK606B", c: 2 },
            // { n: "MCB", code: "U24MB606", c: 3 },
            { n: "PSD Lab-5", code: "U24SE607", c: 1, type: "lab" },
            { n: "CD Lab", code: "U24SE608", c: 1, type: "lab" },
            { n: "IOT Lab", code: "U24SE609", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24CS610", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "OE-SDG", code: "U24OE701X", c: 3 },
            { n: "P-Elective-II", code: "U24CS702", c: 3 },
            { n: "CC", code: "U24CS703", c: 3 },
            { n: "Gen AI", code: "U24CS704", c: 3 },
            { n: "DS", code: "U24CS705", c: 3 },
            { n: "CC Lab", code: "U24CS706", c: 1, type: "lab" },
            { n: "DS Lab", code: "U24CS707", c: 1, type: "lab" },
            { n: "Internship", code: "U24CS708", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U24CS709", c: 4 }
        ],

        "Sem 8": [
            { n: "P-Elective-III", code: "U24CS801", c: 3 },
            { n: "P-Elective-IV", code: "U24CS802", c: 3 },
            { n: "M-Elective-III", code: "U24OE803", c: 3 },
            { n: "Major Project-II", code: "U24CS804", c: 6 }
        ]
    },
    "CSM": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EC", code: "U24CY102B", c: 4 },
            { n: "STLD", code: "U24EC111", c: 3 },
            { n: "PPSC", code: "U24AI104", c: 4 },
            { n: "ECRW", code: "U24MH105", c: 2 },
            { n: "Sports & Yoga", code: "U24VA106", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24ME107", c: 1, type: "lab" }
        ],

        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 }, //data contributed by Bonagiri Pragnesh
            { n: "EP", code: "U24PY202B", c: 3 },
            { n: "CAO", code: "U24AI203", c: 3 },
            { n: "DSTC", code: "U24AI204", c: 3 },
            { n: "BEE", code: "U24EE205B", c: 3 },
            { n: "ILMS", code: "U24AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" },
            { n: "EP Lab", code: "U24PY209B", c: 1, type: "lab" },
            { n: "DSTC Lab", code: "U24AI210", c: 1, type: "lab" },
            { n: "BEE Lab", code: "U24EE211B", c: 1, type: "lab" },
        ],

        "Sem 3": [
            { n: "EM & SML", code: "U24MH301E", c: 3 },
            { n: "ADS", code: "U24AI302", c: 3 },
            { n: "OS", code: "U24AI303", c: 3 },
            { n: "ATCD", code: "U24AI304", c: 3 },
            { n: "OOPJ", code: "U24AI305", c: 3 },
            { n: "SIS Lab", code: "U24VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U24SE307", c: 1, type: "lab" },
            { n: "ADS Lab", code: "U24AI308", c: 1, type: "lab" },
            { n: "OOPJ Lab", code: "U24AI309", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "DBMS", code: "U24AI401", c: 4 }, //data contributed by Zuu
            { n: "AI", code: "U24AI402", c: 3 },
            { n: "SE", code: "U24AI403", c: 3 },
            { n: "CN", code: "U24AI404", c: 3 },
            { n: "PP", code: "U24AI405", c: 3 },
            { n: "DAA", code: "U24VA406", c: 3 },
            { n: "DBMS Lab", code: "U24AI407_R25", c: 1, type: "lab" },
            { n: "AI Lab", code: "U24AI408_R25", c: 1, type: "lab" },
            { n: "PP Lab", code: "U24AI409", c: 1, type: "lab" },
            // { n: "PSD Lab-3", code: "U24SE407", c: 1, type: "lab" },
        ],
        "Sem 5": [
            { n: "SDG", code: "U24OE501A", c: 3 },
            { n: "WP", code: "U24AI502", c: 3 },
            { n: "DAA", code: "U24AI503", c: 3 },
            { n: "ML", code: "U24AI504", c: 4 },
            // { n: "M Basket", code: "U24MB505X", c: 3 },
            { n: "UHV-II", code: "U24IK506B", c: 2 },
            { n: "WP Lab", code: "U24AI509", c: 1, type: "lab" },
            { n: "DAA Lab", code: "U24AI510", c: 1, type: "lab" },
            { n: "ML Lab", code: "U24AI511", c: 1, type: "lab" },
            // { n: "Tech. English", code: "U24MH508", c: 1 },
            { n: "Seminar", code: "U24AI512", c: 1 },
        ],

        "Sem 6": [
            { n: "DT", code: "U24AI601A", c: 3 },
            { n: "P-Elective 1", code: "U24AI602", c: 3 },,
            { n: "DL", code: "U24AI603", c: 3 },
            { n: "MLOps", code: "U24AI604", c: 3 },
            { n: "BDA", code: "U24ST605", c: 3 },
            { n: "EITK", code: "U24IK606B", c: 2 },
            { n: "TE", code: "U24MH608", c: 1 },
            { n: "DL Lab", code: "U24AI609", c: 1, type: "lab" },
            { n: "MLOps Lab", code: "U24AI610", c: 1, type: "lab" },
            { n: "BDA Lab", code: "U24AI611", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24AI612", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "OE - MB", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24AI702", c: 3 },
            { n: "QC", code: "U24AI703", c: 3 },
            { n: "CC", code: "U24AI704", c: 3 },
            { n: "GAI & LLM", code: "U24AI705", c: 3 },
            { n: "CC Lab", code: "U24AI706", c: 1, type: "lab" },
            { n: "LLM Lab", code: "U24AI707", c: 1, type: "lab" },
            { n: "Internship", code: "U24AI708", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U24AI707", c: 4 }
        ],

        "Sem 8": [
            { n: "P-Elective-III", code: "U24OE801", c: 3 },
            { n: "P-Elective-IV", code: "U24AI802", c: 3 },
            { n: "CDF", code: "U24AI803", c: 3 },
            { n: "Major Project-II", code: "U24AI804", c: 6 }
        ]
    },
    "ME": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EC", code: "U24CY102A", c: 4 },
            { n: "TD", code: "U24ME103", c: 3 },
            { n: "PPSC", code: "U24ME104", c: 4 },
            { n: "ECRW", code: "U24MH105", c: 2 },
            { n: "Sports & Yoga", code: "U24VA106", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24ME107", c: 1, type: "lab" }
        ],
        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 },
            { n: "EP", code: "U24PY202A", c: 4 },
            { n: "EM & M", code: "U24ME203", c: 3 },
            { n: "DSTC", code: "U24ME204", c: 4 },
            { n: "BEEE", code: "U24EE205A", c: 4 },
            { n: "ES", code: "U24CY206", c: 0 },
            { n: "ILMS", code: "U24AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" }
        ],
        "Sem 3": [
            { n: "AM", code: "U24MH301B", c: 3 },
            { n: "MoM", code: "U24ME302", c: 4 },
            { n: "MT", code: "U24ME303", c: 3 },
            { n: "HPE", code: "U24ME304", c: 3 },
            { n: "PP", code: "U24ME305", c: 4 },
            { n: "SIS", code: "U24VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U24SE307", c: 1, type: "lab" }
        ],
        "Sem 4": [
            { n: "HT", code: "U24ME401", c: 3 },
            { n: "MD", code: "U24ME402", c: 4 },
            { n: "FM & HM", code: "U24ME403", c: 4 },
            { n: "DME", code: "U24ME404", c: 3 },
            { n: "MT & M", code: "U24ME405", c: 4 },
            { n: "QALR", code: "U24VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U24SE407", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "", c: 3 },
            { n: "R & AC", code: "U24ME502", c: 4 },
            { n: "M & M", code: "U24ME503", c: 3 },
            { n: "AI & ML", code: "U24ME504", c: 4 },
            { n: "M Basket", code: "", c: 3 },
            { n: "UHV-II", code: "U24IK506B", c: 2 },
            { n: "CAD Lab", code: "U24ME507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U24MH508", c: 1 },
            { n: "Seminar", code: "U24ME509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U24ME601", c: 3 },
            { n: "MM & A", code: "U24ME602", c: 4 },
            { n: "DoM", code: "U24ME603", c: 3 },
            { n: "CFD", code: "U24ME604", c: 4 },
            { n: "S&E Basket", code: "", c: 3 },
            { n: "EITK", code: "U24IK606A", c: 2 },
            { n: "AIML Lab", code: "U24ME607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24ME608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24ME702", c: 3 },
            { n: "FEM", code: "U24ME703", c: 4 },
            { n: "Additive MFG", code: "U24ME704", c: 3 },
            { n: "P & OM", code: "U24ME705", c: 3 },
            { n: "Internship", code: "U24ME706", c: 1 },
            { n: "Major Project-I", code: "U24ME707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U24OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U24ME802", c: 3 },
            { n: "P-Elective-IV", code: "U24ME803", c: 3 },
            { n: "Major Project-II", code: "U24ME804", c: 6 }
        ]
    },
    "CSD": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EC", code: "U24CY102B", c: 4 },
            { n: "STLD", code: "U24EC111", c: 3 },
            { n: "PPSC", code: "U24DS104", c: 4 },
            { n: "ECRW", code: "U24MH105", c: 2 },
            { n: "Sports & Yoga", code: "U24VA106", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24ME107", c: 1, type: "lab" }
        ],

        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 },
            { n: "EP", code: "U24PY202B", c: 4 },
            { n: "COA", code: "U24DS203", c: 3 },
            { n: "DSTC", code: "U24DS204", c: 4 },
            { n: "BEE", code: "U24EE205B", c: 4 },
            { n: "ILMS", code: "U24AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" }
        ],

        "Sem 3": [
            { n: "EM & SD", code: "U24MH301F", c: 3 },
            { n: "ADS", code: "U24DS302", c: 4 },
            { n: "OS", code: "U24DS303", c: 3 },
            { n: "ATCD", code: "U24DS304", c: 3 },
            { n: "OOPJ", code: "U24DS305", c: 3 },
            { n: "SIS Lab", code: "U24VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U24SE307", c: 1, type: "lab" },
            { n: "ADS Lab", code: "U24SE308", c: 1, type: "lab" },
            { n: "OOPJ Lab", code: "U24SE309", c: 1, type: "lab" },
        ],

        "Sem 4": [
            { n: "DBMS", code: "U24DS401", c: 3 }, //data contributed by Mohammed Taqiuddin and K. Varun
            { n: "AI", code: "U24DS402", c: 3 },
            { n: "SE", code: "U24DS403", c: 3 },
            { n: "CN", code: "U24DS404", c: 3 },
            { n: "PP", code: "U24DS405", c: 3 },
            { n: "QALR", code: "U24VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U24SE407", c: 1, type: "lab" },
            { n: "DBMS Lab", code: "U24DS408", c: 1, type: "lab" },
            { n: "PP Lab", code: "U24DS409", c: 1, type: "lab" },
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U24OE501YYX", c: 3 },
            { n: "WP", code: "U24DS502", c: 4 },
            { n: "DAA", code: "U24DS503", c: 3 },
            { n: "ML", code: "U24DS504", c: 4 },
            { n: "M Basket", code: "U24MB505X", c: 3 },
            { n: "UHV-II", code: "U24IK506B", c: 2 },
            { n: "PSD Lab-4", code: "U24DS507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U24MH508", c: 1 },
            { n: "Seminar", code: "U24DS509", c: 1 },
        ],

        "Sem 6": [
            { n: "P-Elective 1", code: "U24DS601X", c: 3 },
            { n: "CV & IP", code: "U24DS602", c: 3 },
            { n: "DL", code: "U24DS603", c: 4 },
            { n: "DevOps", code: "U24DS604", c: 4 },
            { n: "S&E Basket", code: "U24ST605X", c: 3 },
            { n: "EITK", code: "U24IK606B", c: 2 },
            { n: "PSD Lab-5", code: "U24DS607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24DS608", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "M-Elective-II", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24DS702X", c: 3 },
            { n: "BDA", code: "U24DS703", c: 4 },
            { n: "CC", code: "U24DS704", c: 3 },
            { n: "EH", code: "U24DS705", c: 3 },
            { n: "Internship", code: "U24DS706", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U24DS707", c: 4 }
        ],

        "Sem 8": [
            { n: "M-Elective-III", code: "U24OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U24DS802X", c: 3 },
            { n: "P-Elective-IV", code: "U24DS803X", c: 3 },
            { n: "Major Project-II", code: "U24DS804", c: 6 }
        ]
    },
    "CSN": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EC", code: "U24CY102B", c: 4 },
            { n: "DLD", code: "U24CI111", c: 3 },
            { n: "PPSC", code: "U24CN104", c: 4 },
            { n: "ECRW", code: "U24MH105", c: 2 },
            { n: "Sports & Yoga", code: "U24VA106", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24AE107", c: 1, type: "lab" }
        ],

        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 },
            { n: "EP", code: "U24PY202B", c: 4 },
            { n: "COA", code: "U24CN203", c: 3 },
            { n: "DSTC", code: "U24CN204", c: 4 },
            { n: "BEE", code: "U24EE205B", c: 4 },
            { n: "ILMS", code: "U24AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" }
        ],

        "Sem 3": [
            { n: "ATCD", code: "U24CN301", c: 3 },
            { n: "OS", code: "U24CN302", c: 3 },
            { n: "ADS", code: "U24CN303", c: 4 },
            { n: "CN", code: "U24CN304", c: 4 },
            { n: "OOP Through Java", code: "U24CN305", c: 4 },
            { n: "SIS", code: "U24VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U24SE307", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "DMPS", code: "U24MH401", c: 3 },
            { n: "DBMS", code: "U24CN402", c: 3 },
            { n: "DAA", code: "U24CN403", c: 3 },
            { n: "I & V", code: "U24CN404", c: 3 },
            { n: "PP", code: "U24CN405", c: 3 },
            { n: "QALR", code: "U24VA406B", c: 2 },
            { n: "PSD Lab-3", code: "U24SE407", c: 1, type: "lab" },
            { n: "DBMS Lab", code: "U24CN408", c: 1, type: "lab" },
            { n: "IV Lab", code: "U24CN409", c: 1, type: "lab" },
            { n: "PP Lab", code: "U24CN410", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U24OE501YYX", c: 3 },
            { n: "AIML", code: "U24CN502", c: 4 },
            { n: "WP", code: "U24CN503", c: 4 },
            { n: "NA", code: "U24CN504", c: 4 },
            { n: "M Basket", code: "U24MB505X", c: 3 },
            { n: "UHV-II", code: "U24IK506B", c: 2 },
            { n: "DAA Lab", code: "U24CN507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U24MH508", c: 1 },
            { n: "Seminar", code: "U24CN509", c: 1 },
        ],

        "Sem 6": [
            { n: "P-Elective 1", code: "U24CN601X", c: 3 },
            { n: "CNS", code: "U24CN602", c: 4 },
            { n: "DevOps", code: "U24CN603", c: 4 },
            { n: "IoT", code: "U24CN604", c: 4 },
            { n: "S&E Basket", code: "U24ST605X", c: 3 },
            { n: "EITK", code: "U24IK606A", c: 2 },
            { n: "FSD Lab", code: "U24CN607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24CN608", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "M-Elective-II", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24CN702", c: 3 },
            { n: "CASE", code: "U24CN703", c: 4 },
            { n: "DCN", code: "U24CN704", c: 4 },
            { n: "Internship", code: "U24CN705", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U24CN706", c: 4 }
        ],

        "Sem 8": [
            { n: "M-Elective-III", code: "U24OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U24CN802", c: 3 },
            { n: "P-Elective-IV", code: "U24CN803", c: 3 },
            { n: "Major Project-II", code: "U24CN804", c: 6 }
        ]
    },
    "CSO": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EC", code: "U24CY102B", c: 4 },
            { n: "DLD", code: "U24CI111", c: 3 },
            { n: "PPSC", code: "U24IN104", c: 4 },
            { n: "ECRW", code: "U24MH105", c: 2 },
            { n: "Sports & Yoga", code: "U24VA106", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24ME107", c: 1, type: "lab" }
        ],

        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 },
            { n: "EP", code: "U24PY202B", c: 4 },
            { n: "COA", code: "U24IN203", c: 3 },
            { n: "DSTC", code: "U24IN204", c: 4 },
            { n: "BEE", code: "U24EE205B", c: 4 },
            { n: "ILMS", code: "U24AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" }
        ],

        "Sem 3": [
            { n: "FIOT", code: "U24IN301", c: 4 },
            { n: "OS", code: "U24IN302", c: 3 },
            { n: "ADS", code: "U24IN303", c: 4 },
            { n: "CN", code: "U24IN304", c: 3 },
            { n: "OOP Through Java", code: "U24IN305", c: 4 },
            { n: "SIS", code: "U24VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U24SE307", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "DMPS", code: "U24MH401D", c: 3 },
            { n: "WT", code: "U24IN402", c: 4 },
            { n: "DBMS", code: "U24IN403", c: 4 },
            { n: "IoTA & P", code: "U24IN404", c: 3 },
            { n: "PPIoT", code: "U24IN405", c: 4 },
            { n: "QALR", code: "U24VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U24SE407", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U24OE501XX", c: 3 },
            { n: "AIoT", code: "U24IN502", c: 4 },
            { n: "ATCD", code: "U24IN503", c: 3 },
            { n: "DAA", code: "U24IN504", c: 4 },
            { n: "M Basket", code: "U24ST505X", c: 3 },
            { n: "UHV-II", code: "U24IK506B", c: 2 },
            { n: "FSD Lab", code: "U24IN507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U24MH508", c: 1 },
            { n: "Seminar", code: "U24IN509", c: 1 },
        ],

        "Sem 6": [
            { n: "P-Elective 1", code: "U24IN601X", c: 3 },
            { n: "IoTF", code: "U24IN602", c: 4 },
            { n: "DevOps", code: "U24IN603", c: 3 },
            { n: "Industrial IoT", code: "U24IN604", c: 4 },
            { n: "S&E Basket", code: "U24MB605X", c: 3 },
            { n: "EITK", code: "U24IK606A", c: 2 },
            { n: "DevOps Lab", code: "U24IN607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24IN608", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "M-Elective-II", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24IN702", c: 3 },
            { n: "CASE", code: "U24IN703", c: 4 },
            { n: "PSIoT", code: "U24IN704", c: 3 },
            { n: "CPS", code: "U24IN705", c: 3 },
            { n: "Internship", code: "U24IN706", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U24IN707", c: 4 }
        ],

        "Sem 8": [
            { n: "M-Elective-III", code: "U24OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U24IN802", c: 3 },
            { n: "P-Elective-IV", code: "U24IN803", c: 3 },
            { n: "Major Project-II", code: "U24IN804", c: 6 }
        ]

    },
    "ECE": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EP", code: "U24PY102E", c: 4 },
            { n: "STLD", code: "U24EC103", c: 3 },
            { n: "PPSC", code: "U24EC104", c: 4 },
            { n: "BEE", code: "U24EE105B", c: 4 },
            { n: "ES", code: "U24CY106", c: 0 },
            { n: "ILMS", code: "U24AE107", c: 1, type: "lab" }
        ],
        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 },
            { n: "EC", code: "U24CY202E", c: 4 },
            { n: "ELC", code: "U24EC203", c: 3 },
            { n: "DSTC", code: "U24EC204", c: 4 },
            { n: "ECRW", code: "U24MH205", c: 2 },
            { n: "Sports & Yoga", code: "U24VA206", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24ME207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" }
        ],
        "Sem 3": [
            { n: "AM", code: "U24MH301D", c: 3 },
            { n: "ECAD", code: "U24EC302", c: 4 },
            { n: "DD", code: "U24EC303", c: 4 },
            { n: "SS", code: "U24EC304", c: 3 },
            { n: "OOP Through Java", code: "U24EC305", c: 4 },
            { n: "QALR", code: "U24VA306A", c: 2 },
            { n: "PSD Lab-2", code: "U24SE307", c: 1, type: "lab" }
        ],
        "Sem 4": [
            { n: "ICA", code: "U24EC401", c: 4 },
            { n: "CS", code: "U24EC402", c: 4 },
            { n: "EMWTL", code: "U24EC403", c: 3 },
            { n: "COMP", code: "U24EC404", c: 3 },
            { n: "PP", code: "U24EC405", c: 4 },
            { n: "SIS", code: "U24VA406B", c: 1 },
            { n: "PSD Lab-3", code: "U24SE407", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U24OE501YYX", c: 3 },
            { n: "Mb-ESARM", code: "U24EC502", c: 4 },
            { n: "AWP", code: "U24EC503", c: 3 },
            { n: "AI&ML", code: "U24EC504", c: 4 },
            { n: "S&E Basket", code: "U24ST505X", c: 3 },
            { n: "EITK", code: "U24IK506A", c: 2 },
            { n: "PSD Lab-4", code: "U24SE507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U24MH508", c: 1, type: "theory" },
            { n: "Seminar", code: "U24EC509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U24EC601", c: 3 },
            { n: "DSPA", code: "U24EC602", c: 4 },
            { n: "VLSI", code: "U24EC603", c: 4 },
            { n: "DC & CN", code: "U24EC604", c: 3 },
            { n: "MCB", code: "U24EC605X", c: 3 },
            { n: "UHV-II", code: "U24EC606B", c: 2 },
            { n: "AIML Lab", code: "U24EC607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24EC608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24EC702", c: 3 },
            { n: "SVDV", code: "U24EC703", c: 4 },
            { n: "MOFC", code: "U24EC704", c: 3 },
            { n: "WMC", code: "U24EC705", c: 3 },
            { n: "Internship", code: "U24EC706", c: 1 },
            { n: "Major Project-I", code: "U24EC707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U24OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U24EC802", c: 3 },
            { n: "P-Elective-IV", code: "U24EC803", c: 3 },
            { n: "Major Project-II", code: "U24EC804", c: 6 }
        ]
    },
    "EEE": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EP", code: "U24PY102D", c: 4 },
            { n: "EMS", code: "U24EE103", c: 3 },
            { n: "PPSC", code: "U24EE104", c: 4 },
            { n: "BEE", code: "U24EE105D", c: 4 },
            { n: "ES", code: "U24CY106", c: 0 },
            { n: "ILMS", code: "U24AE107", c: 1 }
        ],
        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 },
            { n: "EC", code: "U24CY202D", c: 4 },
            { n: "AE", code: "U24CI203", c: 3 },
            { n: "DSTC", code: "U24EE204", c: 4 },
            { n: "ECRW", code: "U24MH205", c: 2 },
            { n: "Sports & Yoga", code: "U24VA206", c: 1 },
            { n: "EGCAD", code: "U24ME207", c: 1 },
            { n: "PSD Lab-1", code: "U24SE208", c: 1 }
        ],
        "Sem 3": [
            { n: "AM", code: "U24MH301G", c: 3 },
            { n: "NA", code: "U24EE302", c: 4 },
            { n: "DEOA", code: "U24CI311", c: 4 },
            { n: "DCMT", code: "U24EE304", c: 3 },
            { n: "OOP Through Java", code: "U24EE305", c: 4 },
            { n: "QALR", code: "U24VA306A", c: 2 },
            { n: "PSD Lab-2", code: "U24SE307", c: 1 }
        ],
        "Sem 4": [
            { n: "CSE", code: "U24EE401", c: 4 },
            { n: "ACM", code: "U24EE402", c: 4 },
            { n: "EMF", code: "U24EE403", c: 3 },
            { n: "PSGD", code: "U24EE404", c: 3 },
            { n: "PP", code: "U24EE405", c: 4 },
            { n: "SIS", code: "U24VA406B", c: 1 },
            { n: "PSD Lab-3", code: "U24SE407", c: 1 }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U24OE501YYX", c: 3 },
            { n: "PE", code: "U24EE502", c: 4 },
            { n: "PSA", code: "U24EE503", c: 3 },
            { n: "AI & ML", code: "U24EE504", c: 4 },
            { n: "S&E Basket", code: "U24ST505X", c: 3 },
            { n: "EITK", code: "U24IK506A", c: 2 },
            { n: "PSD Lab-4", code: "U24SE507", c: 1 },
            { n: "Tech. English", code: "U24MH508", c: 1 },
            { n: "Seminar", code: "U24EE509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U24EE601", c: 3 },
            { n: "PSCD", code: "U24EE602", c: 4 },
            { n: "S & P", code: "U24EE603", c: 3 },
            { n: "M & M", code: "U24EE604", c: 4 },
            { n: "MCB", code: "U24MB605X", c: 3 },
            { n: "UHV-II", code: "U24IK606B", c: 2 },
            { n: "AI&ML Lab", code: "U24SE607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24EE608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24EE702", c: 3 },
            { n: "PSOC", code: "U24EE703", c: 4 },
            { n: "UEE", code: "U24EE704", c: 3 },
            { n: "EV", code: "U24EE705", c: 3 },
            { n: "Internship", code: "U24EE706", c: 1 },
            { n: "Major Project-I", code: "U24EE707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U24OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U24EE802", c: 3 },
            { n: "P-Elective-IV", code: "U24EE803", c: 3 },
            { n: "Major Project-II", code: "U24EE804", c: 6 }
        ]
    },
    "IT": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3, },
            { n: "EC", code: "U24CY102B", c: 4 },
            { n: "DLD", code: "U24IT103", c: 3 },
            { n: "PPSC", code: "U24IT104", c: 4 },
            { n: "ECRW", code: "U24MH105", c: 2 },
            { n: "Sports & Yoga", code: "U24VA106", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24ME107", c: 1, type: "lab" }
        ],
        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 }, //data contributed by Mohammed K Moinuddin
            { n: "EP", code: "U24PY202B", c: 3 },
            { n: "CAO", code: "U24IT203", c: 3 },
            { n: "DSTC", code: "U24IT204", c: 3 },
            { n: "BEE", code: "U24EE205B", c: 3 },
            { n: "ILMS", code: "U24AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" },
            { n: "EP Lab", code: "U24PY209B", c: 1, type: "lab" },
            { n: "DSTC Lab", code: "U24IT210", c: 1, type: "lab" },
            { n: "BEE Lab", code: "U24EE211B", c: 1, type: "lab" },
        ],
        "Sem 3": [
            { n: "AI", code: "U24IT301", c: 3 },
            { n: "ADS", code: "U24IT302", c: 4 },
            { n: "SE", code: "U24IT303", c: 3 },
            { n: "DBMS", code: "U24IT304", c: 4 },
            { n: "OOP Through Java", code: "U24IT305", c: 4 },
            { n: "SIS", code: "U24VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U24SE307", c: 1, type: "lab" }
        ],
        /*
         * IT - Semester 4
         * Added course codes for robust UMS auto-fill matching.
         */
        "Sem 4": [
            { n: "DMPS", code: "U24MH401", c: 3 }, //data contributed by Salman Imran Syed
            { n: "DAA", code: "U24IT402", c: 3 },
            { n: "PP", code: "U24IT403", c: 3 },
            { n: "OS", code: "U24IT404", c: 3 },
            { n: "CN", code: "U24IT405", c: 3 },
            { n: "QALR", code: "U24VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U24SE407", c: 1, type: "lab" },
            { n: "DAA Lab", code: "U24IT408", c: 1, type: "lab" },
            { n: "PP Lab", code: "U24IT409", c: 1, type: "lab" },
            { n: "OS Lab", code: "U24IT410", c: 1, type: "lab" },
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U24OE501YYX", c: 3 },
            { n: "ML", code: "U24IT502", c: 4 },
            { n: "Information Security", code: "U24IT503", c: 3 },
            { n: "Intro to IOT", code: "U24IT504", c: 4 },
            { n: "M Basket", code: "U24MB505X", c: 3 },
            { n: "UHV-II", code: "U24IK506B", c: 2 },
            { n: "PSD Lab-4", code: "U24SE507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U24MH508", c: 1 },
            { n: "Seminar", code: "U24IT509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U24IT601X", c: 3 },
            { n: "Data Science", code: "U24IT602", c: 3 },
            { n: "CC", code: "U24IT603", c: 4 },
            { n: "Full Stack w Java", code: "U24IT604", c: 4 },
            { n: "S&E Basket", code: "U24ST605X", c: 3 },
            { n: "EITK", code: "U24IK606A", c: 2 },
            { n: "PSD Lab-5", code: "U24SE607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24IT608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24IT702X", c: 3 },
            { n: "DevOps", code: "U24IT703", c: 4 },
            { n: "BDA", code: "U24IT704", c: 3 },
            { n: "ST & QA", code: "U24IT705", c: 3 },
            { n: "Internship", code: "U24IT706", c: 1 },
            { n: "Major Project-I", code: "U24IT707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U24OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U24IT802X", c: 3 },
            { n: "P-Elective-IV", code: "U24IT803X", c: 3 },
            { n: "Major Project-II", code: "U24IT804", c: 6 }
        ]
    },
    "ECI": {
        "Sem 1": [
            { n: "DCODE", code: "U24MH101", c: 3 },
            { n: "EP", code: "U24PY102B", c: 4 },
            { n: "EMI", code: "U24CI103", c: 3, },
            { n: "PPSC", code: "U24CI104", c: 4 },
            { n: "BEE", code: "U24EE105B", c: 4 },
            { n: "ES", code: "U24CY106", c: 0 },
            { n: "ILMS", c: 1, type: "lab" }
        ],
        "Sem 2": [
            { n: "MTVC", code: "U24MH201", c: 3 },
            { n: "EC", code: "U24CY202B", c: 4 },
            { n: "AE", code: "U24CI203", c: 3 },
            { n: "DSTC", code: "U24CI204", c: 4 },
            { n: "ECRW", code: "U24MH205", c: 2 },
            { n: "Sports & Yoga", code: "U24VA206", c: 1, type: "lab" },
            { n: "EGCAD", code: "U24ME207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U24SE208", c: 1, type: "lab" }
        ],
        "Sem 3": [
            { n: "MFSP", code: "U24MH301C", c: 3 },
            { n: "S&A", code: "U24CI302", c: 4 },
            { n: "AIC&A", code: "U24CI303", c: 4 },
            { n: "DCLD", code: "U24CI304", c: 3 },
            { n: "OOP Through Java", code: "U24CI305", c: 4 },
            { n: "QALR", code: "U24VA306A", c: 2, },
            { n: "PSD Lab-2", code: "U24SE307", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "VLSID", code: "U24CI401", c: 4 },
            { n: "DSP", code: "U24CI402", c: 4 },
            { n: "EMT", code: "U24CI403", c: 3 },
            { n: "CA&M", code: "U24CI404", c: 3 },
            { n: "PP", code: "U24CI405", c: 4 },
            { n: "SIS", code: "U24VA406B", c: 1 },/* need not to marks as lab as it's listed as theory in UMS*/
            { n: "PSD Lab-3", code: "U24SE407", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U24OE501YYX", c: 3 },
            { n: "M&ES", code: "U24CI502", c: 4 },
            { n: "LCS", code: "U24CI503", c: 3 },
            { n: "AI&ML", code: "U24CI504", c: 4 },
            { n: "S&E Basket", code: "U24ST505X", c: 3 },
            { n: "EITK", code: "U24IK506A", c: 2 },
            { n: "PSD Lab-4", code: "U24SE507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U24MH508", c: 1 },
            { n: "Seminar", code: "U24CI509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U24CI601", c: 3 },
            { n: "IoT", code: "U24CI602", c: 4 },
            { n: "BI&SP", code: "U24CI603", c: 3 },
            { n: "A&DC", code: "U24CI604", c: 4 },
            { n: "MCB", code: "U24MB605X", c: 3 },
            { n: "UHV-II", code: "U24IK606B", c: 2 },
            { n: "AI&ML Lab", code: "U24SE607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U24CI608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U24OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U24CI702", c: 3 },
            { n: "IA&C", code: "U24CI703", c: 4 },
            { n: "S&FOC", code: "U24CI704", c: 3 },
            { n: "DC&N", code: "U24CI705", c: 3 },
            { n: "Internship", code: "U24CI706", c: 1 },
            { n: "Major Project-I", code: "U24CI707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U24OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U24CI802", c: 3 },
            { n: "P-Elective-IV", code: "U24CI803", c: 3 },
            { n: "Major Project-II", code: "U24CI804", c: 6 }
        ]
    },
};



// placeholders to avoid crashes
const COMMON_SEMESTERS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];
const ALL_BRANCHES = Object.keys(BRANCH_MAPPING_URR24_R25);

ALL_BRANCHES.forEach(branch => {
    if (!COURSE_DATA_URR24_R25[branch]) COURSE_DATA_URR24_R25[branch] = {};
    COMMON_SEMESTERS.forEach(sem => {
        if (!COURSE_DATA_URR24_R25[branch][sem]) {
            COURSE_DATA_URR24_R25[branch][sem] = [
                { n: `Course 1 (${branch} ${sem})`, c: 3 },
                { n: `Course 2 (${branch} ${sem})`, c: 3 },
                { n: `Course 3 (${branch} ${sem})`, c: 4 },
                { n: `Course 4 (${branch} ${sem})`, c: 4 },
                { n: `Lab 1 (${branch} ${sem})`, c: 1.5 },
                { n: `Lab 2 (${branch} ${sem})`, c: 1.5 }
            ];
        }
    });
});

// Register URR24-R25 in window.REGULATIONS
window.REGULATIONS = window.REGULATIONS || {};
window.REGULATIONS['URR24-R25'] = {
    key: 'URR24-R25',
    title: 'URR24-R25',
    GRADE_POINTS: GRADE_POINTS_URR24_R25,
    BRANCH_MAPPING: BRANCH_MAPPING_URR24_R25,
    COURSE_DATA: COURSE_DATA_URR24_R25
};

