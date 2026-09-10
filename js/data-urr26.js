/**
 * URR26 Regulations Data (Placeholders)
 * Fill in course details for URR26 as needed.
 * 
 * Each course object accepts:
 * - n: Course Name (string)
 * - code: Course Code (string)
 * - c: Credits (number)
 * - type: "theory" | "lab" (optional string, defaults to "theory")
 */

const GRADE_POINTS_URR26 = {
    "S": 10,
    "A": 9,
    "B": 8,
    "C": 7,
    "D": 6,
    "P": 5, //same mistake, ziyad doesn't seem to learn from his mistakes
    "F": 0,
    "M": 0
};

const BRANCH_MAPPING_URR26 = {
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
const COURSE_DATA_URR26 = {
    "CSE": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EP", code: "U26PY102D", c: 3 },
            { n: "PPSC", code: "U26CS103", c: 3 },
            { n: "BEE", code: "U26EE104D", c: 3 },
            { n: "COA", code: "U26CS105", c: 3 },
            { n: "EP Lab", code: "U26PY106D", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26CS107", c: 1, type: "lab" },
            { n: "BEEE Lab", code: "U26EE108", c: 1, type: "lab" },
            { n: "ITWL", code: "U26CS109", c: 1, type: "lab" },
            { n: "ILMS", code: "U26AE110", c: 1, type: "lab" },
        ],

        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 },
            { n: "EC", code: "U26CY202C", c: 3 },
            { n: "OS", code: "U26CS203", c: 3 },
            { n: "DSTC", code: "U26CS204", c: 3 },
            { n: "ECRW", code: "U26MH205", c: 2 },
            { n: "Sports & Yoga", code: "U26VA206", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" },
            { n: "EC Lab", code: "U26CY209C", c: 1, type: "lab" },
            { n: "DSTC Lab", code: "U26CS210", c: 1, type: "lab" },
        ],

        "Sem 3": [
            { n: "SE", code: "U26CS301", c: 3 },
            { n: "TOC", code: "U26CS302", c: 3 },
            { n: "ADS", code: "U26CS303", c: 4 },
            { n: "CN", code: "U26CS304", c: 3 },
            { n: "OOP Through Java", code: "U26CS305", c: 4 },
            { n: "QALR", code: "U26VA306A", c: 2 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" },
        ],

        "Sem 4": [
            { n: "DMPS", code: "U26MH401", c: 3 }, //data contributed by Mohammad Fayazuddin
            { n: "WP", code: "U26CS402", c: 3 },
            { n: "DBMS", code: "U26CS403", c: 3 },
            { n: "AI", code: "U26CS404", c: 3 },
            { n: "PP", code: "U26CS405", c: 3 },
            { n: "SIS", code: "U26VA406B", c: 1 },//default to "theory" in attendance.js so not required to explicitly mark as type "theory"
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" },// stanalone alone labs marked seperately 
            { n: "WP Lab", code: "U26CS408", c: 1, type: "lab" },
            { n: "DBMS Lab", code: "U26CS409", c: 1, type: "lab" },
            { n: "PP Lab", code: "U26CS410", c: 1, type: "lab" },
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501YYX", c: 3 },
            { n: "ML", code: "U26CS502", c: 4 },
            { n: "Full Stack Dev", code: "U26CS503", c: 4 },
            { n: "CD", code: "U26CS504", c: 4 },
            { n: "S&E Basket", code: "U26ST505X", c: 3 },
            { n: "EITK", code: "U26IK506A", c: 2 },
            { n: "PSD Lab-4", code: "U26SE507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26CS509", c: 1 },
        ],

        "Sem 6": [
            { n: "P-Elective 1", code: "U26CS601", c: 3 },
            { n: "CNS", code: "U26CS602", c: 3 },
            { n: "DAA", code: "U26CS603", c: 4 },
            { n: "IOT", code: "U26IN604", c: 4 },
            { n: "MCB", code: "U26MB605X", c: 3 },
            { n: "UHV-II", code: "U26IK606B", c: 2 },
            { n: "PSD Lab-5", code: "U26SE607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26CS608", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701XX", c: 3 },
            { n: "P-Elective-II", code: "U26CS702", c: 3 },
            { n: "CC", code: "U26CS703", c: 4 },
            { n: "DL", code: "U26CS704", c: 3 },
            { n: "Blockchain", code: "U26CS705", c: 3 },
            { n: "Internship", code: "U26CS706", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U26CS707", c: 4 }
        ],

        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801XX", c: 3 },
            { n: "P-Elective-III", code: "U26CS802", c: 3 },
            { n: "P-Elective-IV", code: "U26CS803", c: 3 },
            { n: "Major Project-II", code: "U26CS804", c: 6 }
        ]
    },
    "CSM": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EC", code: "U26CY102D", c: 3 },
            { n: "PPSC", code: "U26AI103", c: 3 },
            { n: "ECRW", code: "U26MH104", c: 3 },
            { n: "WD", code: "U26AI105", c: 3 },
            { n: "EC Lab", code: "U26CY106D", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26AI107", c: 1, type: "lab" },
            { n: "Sports & Yoga", code: "U26VA108", c: 1, type: "lab" },
            { n: "WD Lab", code: "U26AI109", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME110", c: 1, type: "lab" }
        ],

        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 }, //data contributed by Bonagiri Pragnesh
            { n: "EP", code: "U26PY202B", c: 3 },
            { n: "CAO", code: "U26AI203", c: 3 },
            { n: "DSTC", code: "U26AI204", c: 3 },
            { n: "BEE", code: "U26EE205B", c: 3 },
            { n: "ILMS", code: "U26AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" },
            { n: "EP Lab", code: "U26PY209B", c: 1, type: "lab" },
            { n: "DSTC Lab", code: "U26AI210", c: 1, type: "lab" },
            { n: "BEE Lab", code: "U26EE211B", c: 1, type: "lab" },
        ],

        "Sem 3": [
            { n: "EM & SML", code: "U26MH301E", c: 3 },
            { n: "ADS", code: "U26AI302", c: 4 },
            { n: "OS", code: "U26AI303", c: 3 },
            { n: "ATCD", code: "U26AI304", c: 3 },
            { n: "OOP Through Java", code: "U26AI305", c: 4 },
            { n: "SIS", code: "U26VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "DBMS", code: "U26AI401", c: 3 },
            { n: "AI", code: "U26AI402", c: 3 },
            { n: "SE", code: "U26AI403", c: 3 },
            { n: "CN", code: "U26AI404", c: 3 },
            { n: "PP", code: "U26AI405", c: 3 },
            { n: "QALR", code: "U26VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" },
            { n: "DBMS Lab", code: "U26AI408", c: 1, type: "lab" },
            { n: "PP Lab", code: "U26AI409", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501YYX", c: 3 },
            { n: "WP", code: "U26AI502", c: 4 },
            { n: "DAA", code: "U26AI503", c: 3 },
            { n: "ML", code: "U26AI504", c: 4 },
            { n: "M Basket", code: "U26MB505X", c: 3 },
            { n: "UHV-II", code: "U26IK506B", c: 2 },
            { n: "PSD Lab-4", code: "U26AI507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26AI509", c: 1 },
        ],

        "Sem 6": [
            { n: "P-Elective 1", code: "U26AI601X", c: 3 },
            { n: "CV & IP", code: "U26AI602", c: 3 },
            { n: "DL", code: "U26AI603", c: 4 },
            { n: "DevOps", code: "U26AI604", c: 4 },
            { n: "S&E Basket", code: "U26ST605X", c: 3 },
            { n: "EITK", code: "U26IK606B", c: 2 },
            { n: "PSD Lab-5", code: "U26AI607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26AI608", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26AI702X", c: 3 },
            { n: "BDA", code: "U26AI703", c: 4 },
            { n: "CC", code: "U26AI704", c: 3 },
            { n: "EH", code: "U26AI705", c: 3 },
            { n: "Internship", code: "U26AI706", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U26AI707", c: 4 }
        ],

        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26AI802X", c: 3 },
            { n: "P-Elective-IV", code: "U26AI803X", c: 3 },
            { n: "Major Project-II", code: "U26AI804", c: 6 }
        ]
    },
    "ME": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EC", code: "U26CY102B", c: 3 },
            { n: "PPSC", code: "U26ME103", c: 3 },
            { n: "ECRW", code: "U26MH104", c: 3 },
            { n: "EM", code: "U26ME105", c: 3 },
            { n: "EC Lab", code: "U26CY106B", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26ME107", c: 1, type: "lab" },
            { n: "Sports & Yoga", code: "U26VA108", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME109", c: 3 }
        ],
        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 },
            { n: "EP", code: "U26PY202A", c: 4 },
            { n: "EM & M", code: "U26ME203", c: 3 },
            { n: "DSTC", code: "U26ME204", c: 4 },
            { n: "BEEE", code: "U26EE205A", c: 4 },
            { n: "ES", code: "U26CY206", c: 0 },
            { n: "ILMS", code: "U26AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" }
        ],
        "Sem 3": [
            { n: "AM", code: "U26MH301B", c: 3 },
            { n: "MoM", code: "U26ME302", c: 4 },
            { n: "MT", code: "U26ME303", c: 3 },
            { n: "HPE", code: "U26ME304", c: 3 },
            { n: "PP", code: "U26ME305", c: 4 },
            { n: "SIS", code: "U26VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" }
        ],
        "Sem 4": [
            { n: "HT", code: "U26ME401", c: 3 },
            { n: "MD", code: "U26ME402", c: 4 },
            { n: "FM & HM", code: "U26ME403", c: 4 },
            { n: "DME", code: "U26ME404", c: 3 },
            { n: "MT & M", code: "U26ME405", c: 4 },
            { n: "QALR", code: "U26VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "", c: 3 },
            { n: "R & AC", code: "U26ME502", c: 4 },
            { n: "M & M", code: "U26ME503", c: 3 },
            { n: "AI & ML", code: "U26ME504", c: 4 },
            { n: "M Basket", code: "", c: 3 },
            { n: "UHV-II", code: "U26IK506B", c: 2 },
            { n: "CAD Lab", code: "U26ME507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26ME509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U26ME601", c: 3 },
            { n: "MM & A", code: "U26ME602", c: 4 },
            { n: "DoM", code: "U26ME603", c: 3 },
            { n: "CFD", code: "U26ME604", c: 4 },
            { n: "S&E Basket", code: "", c: 3 },
            { n: "EITK", code: "U26IK606A", c: 2 },
            { n: "AIML Lab", code: "U26ME607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26ME608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26ME702", c: 3 },
            { n: "FEM", code: "U26ME703", c: 4 },
            { n: "Additive MFG", code: "U26ME704", c: 3 },
            { n: "P & OM", code: "U26ME705", c: 3 },
            { n: "Internship", code: "U26ME706", c: 1 },
            { n: "Major Project-I", code: "U26ME707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26ME802", c: 3 },
            { n: "P-Elective-IV", code: "U26ME803", c: 3 },
            { n: "Major Project-II", code: "U26ME804", c: 6 }
        ]
    },
    "CSD": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EC", code: "U26CY102D", c: 3 },
            { n: "PPSC", code: "U26DS103", c: 3 },
            { n: "ECRW", code: "U26MH104", c: 3 },
            { n: "WD", code: "U26DS105", c: 3 },
            { n: "EC Lab", code: "U26CY106D", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26DS107", c: 1, type: "lab" },
            { n: "Sports & Yoga", code: "U26VA108", c: 1, type: "lab" },
            { n: "WD Lab", code: "U26DS109", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME110", c: 1, type: "lab" }
        ],

        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 },
            { n: "EP", code: "U26PY202B", c: 4 },
            { n: "COA", code: "U26DS203", c: 3 },
            { n: "DSTC", code: "U26DS204", c: 4 },
            { n: "BEE", code: "U26EE205B", c: 4 },
            { n: "ILMS", code: "U26AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" }
        ],

        "Sem 3": [
            { n: "EM & SD", code: "U26MH301F", c: 3 },
            { n: "ADS", code: "U26DS302", c: 4 },
            { n: "OS", code: "U26DS303", c: 3 },
            { n: "ATCD", code: "U26DS304", c: 3 },
            { n: "OOP Through Java", code: "U26DS305", c: 4 },
            { n: "SIS", code: "U26VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "DBMS", code: "U26DS401", c: 3 }, //data contributed by Mohammed Taqiuddin and K. Varun
            { n: "AI", code: "U26DS402", c: 3 },
            { n: "SE", code: "U26DS403", c: 3 },
            { n: "CN", code: "U26DS404", c: 3 },
            { n: "PP", code: "U26DS405", c: 3 },
            { n: "QALR", code: "U26VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" },
            { n: "DBMS Lab", code: "U26DS408", c: 1, type: "lab" },
            { n: "PP Lab", code: "U26DS409", c: 1, type: "lab" },
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501YYX", c: 3 },
            { n: "WP", code: "U26DS502", c: 4 },
            { n: "DAA", code: "U26DS503", c: 3 },
            { n: "ML", code: "U26DS504", c: 4 },
            { n: "M Basket", code: "U26MB505X", c: 3 },
            { n: "UHV-II", code: "U26IK506B", c: 2 },
            { n: "PSD Lab-4", code: "U26DS507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26DS509", c: 1 },
        ],

        "Sem 6": [
            { n: "P-Elective 1", code: "U26DS601X", c: 3 },
            { n: "CV & IP", code: "U26DS602", c: 3 },
            { n: "DL", code: "U26DS603", c: 4 },
            { n: "DevOps", code: "U26DS604", c: 4 },
            { n: "S&E Basket", code: "U26ST605X", c: 3 },
            { n: "EITK", code: "U26IK606B", c: 2 },
            { n: "PSD Lab-5", code: "U26DS607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26DS608", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26DS702X", c: 3 },
            { n: "BDA", code: "U26DS703", c: 4 },
            { n: "CC", code: "U26DS704", c: 3 },
            { n: "EH", code: "U26DS705", c: 3 },
            { n: "Internship", code: "U26DS706", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U26DS707", c: 4 }
        ],

        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26DS802X", c: 3 },
            { n: "P-Elective-IV", code: "U26DS803X", c: 3 },
            { n: "Major Project-II", code: "U26DS804", c: 6 }
        ]
    },
    "CSN": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EC", code: "U26CY102D", c: 3 },
            { n: "PPSC", code: "U26CN103", c: 3 },
            { n: "ECRW", code: "U26MH104", c: 3 },
            { n: "DLD", code: "U26CN105", c: 3 },
            { n: "EC Lab", code: "U26CY106D", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26CN107", c: 1, type: "lab" },
            { n: "Sports & Yoga", code: "U26VA108", c: 1, type: "lab" },
            { n: "CSN Lab", code: "U26CN109", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME110", c: 1, type: "lab" }
        ],

        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 },
            { n: "EP", code: "U26PY202B", c: 4 },
            { n: "COA", code: "U26CN203", c: 3 },
            { n: "DSTC", code: "U26CN204", c: 4 },
            { n: "BEE", code: "U26EE205B", c: 4 },
            { n: "ILMS", code: "U26AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" }
        ],

        "Sem 3": [
            { n: "ATCD", code: "U26CN301", c: 3 },
            { n: "OS", code: "U26CN302", c: 3 },
            { n: "ADS", code: "U26CN303", c: 4 },
            { n: "CN", code: "U26CN304", c: 4 },
            { n: "OOP Through Java", code: "U26CN305", c: 4 },
            { n: "SIS", code: "U26VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "DMPS", code: "U26MH401", c: 3 },
            { n: "DBMS", code: "U26CN402", c: 3 },
            { n: "DAA", code: "U26CN403", c: 3 },
            { n: "I & V", code: "U26CN404", c: 3 },
            { n: "PP", code: "U26CN405", c: 3 },
            { n: "QALR", code: "U26VA406B", c: 2 },
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" },
            { n: "DBMS Lab", code: "U26CN408", c: 1, type: "lab" },
            { n: "IV Lab", code: "U26CN409", c: 1, type: "lab" },
            { n: "PP Lab", code: "U26CN410", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501YYX", c: 3 },
            { n: "AIML", code: "U26CN502", c: 4 },
            { n: "WP", code: "U26CN503", c: 4 },
            { n: "NA", code: "U26CN504", c: 4 },
            { n: "M Basket", code: "U26MB505X", c: 3 },
            { n: "UHV-II", code: "U26IK506B", c: 2 },
            { n: "DAA Lab", code: "U26CN507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26CN509", c: 1 },
        ],

        "Sem 6": [
            { n: "P-Elective 1", code: "U26CN601X", c: 3 },
            { n: "CNS", code: "U26CN602", c: 4 },
            { n: "DevOps", code: "U26CN603", c: 4 },
            { n: "IoT", code: "U26CN604", c: 4 },
            { n: "S&E Basket", code: "U26ST605X", c: 3 },
            { n: "EITK", code: "U26IK606A", c: 2 },
            { n: "FSD Lab", code: "U26CN607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26CN608", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26CN702", c: 3 },
            { n: "CASE", code: "U26CN703", c: 4 },
            { n: "DCN", code: "U26CN704", c: 4 },
            { n: "Internship", code: "U26CN705", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U26CN706", c: 4 }
        ],

        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26CN802", c: 3 },
            { n: "P-Elective-IV", code: "U26CN803", c: 3 },
            { n: "Major Project-II", code: "U26CN804", c: 6 }
        ]
    },
    "CSO": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EC", code: "U26CY102D", c: 3 },
            { n: "PPSC", code: "U26IN103", c: 3 },
            { n: "ECRW", code: "U26MH104", c: 3 },
            { n: "DLD", code: "U26IN105", c: 3 },
            { n: "EC Lab", code: "U26CY106D", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26IN107", c: 1, type: "lab" },
            { n: "Sports & Yoga", code: "U26VA108", c: 1, type: "lab" },
            { n: "FCS Lab", code: "U26IN109", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME110", c: 1, type: "lab" }
        ],

        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 },
            { n: "EP", code: "U26PY202B", c: 4 },
            { n: "COA", code: "U26IN203", c: 3 },
            { n: "DSTC", code: "U26IN204", c: 4 },
            { n: "BEE", code: "U26EE205B", c: 4 },
            { n: "ILMS", code: "U26AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" }
        ],

        "Sem 3": [
            { n: "FIOT", code: "U26IN301", c: 4 },
            { n: "OS", code: "U26IN302", c: 3 },
            { n: "ADS", code: "U26IN303", c: 4 },
            { n: "CN", code: "U26IN304", c: 3 },
            { n: "OOP Through Java", code: "U26IN305", c: 4 },
            { n: "SIS", code: "U26VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "DMPS", code: "U26MH401D", c: 3 },
            { n: "WT", code: "U26IN402", c: 4 },
            { n: "DBMS", code: "U26IN403", c: 4 },
            { n: "IoTA & P", code: "U26IN404", c: 3 },
            { n: "PPIoT", code: "U26IN405", c: 4 },
            { n: "QALR", code: "U26VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501XX", c: 3 },
            { n: "AIoT", code: "U26IN502", c: 4 },
            { n: "ATCD", code: "U26IN503", c: 3 },
            { n: "DAA", code: "U26IN504", c: 4 },
            { n: "M Basket", code: "U26ST505X", c: 3 },
            { n: "UHV-II", code: "U26IK506B", c: 2 },
            { n: "FSD Lab", code: "U26IN507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26IN509", c: 1 },
        ],

        "Sem 6": [
            { n: "P-Elective 1", code: "U26IN601X", c: 3 },
            { n: "IoTF", code: "U26IN602", c: 4 },
            { n: "DevOps", code: "U26IN603", c: 3 },
            { n: "Industrial IoT", code: "U26IN604", c: 4 },
            { n: "S&E Basket", code: "U26MB605X", c: 3 },
            { n: "EITK", code: "U26IK606A", c: 2 },
            { n: "DevOps Lab", code: "U26IN607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26IN608", c: 1, type: "lab" },
        ],

        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26IN702", c: 3 },
            { n: "CASE", code: "U26IN703", c: 4 },
            { n: "PSIoT", code: "U26IN704", c: 3 },
            { n: "CPS", code: "U26IN705", c: 3 },
            { n: "Internship", code: "U26IN706", c: 1, type: "lab" },
            { n: "Major Project-I", code: "U26IN707", c: 4 }
        ],

        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26IN802", c: 3 },
            { n: "P-Elective-IV", code: "U26IN803", c: 3 },
            { n: "Major Project-II", code: "U26IN804", c: 6 }
        ]

    },
    "ECE": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EP", code: "U26PY102E", c: 3 },
            { n: "PPSC", code: "U26EC103", c: 3 },
            { n: "BEE", code: "U26EE104B", c: 3 },
            { n: "BE", code: "U26EC105", c: 3 },
            { n: "EP Lab", code: "U26PY106E", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26EC107", c: 1, type: "lab" },
            { n: "BEE Lab", code: "U26EE108B", c: 1, type: "lab" },
            { n: "BE Lab", code: "U26EC109", c: 1, type: "lab" },
            { n: "ILMS", code: "U26AE110", c: 1, type: "lab" },
        ],
        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 },
            { n: "EC", code: "U26CY202E", c: 4 },
            { n: "ELC", code: "U26EC203", c: 3 },
            { n: "DSTC", code: "U26EC204", c: 4 },
            { n: "ECRW", code: "U26MH205", c: 2 },
            { n: "Sports & Yoga", code: "U26VA206", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" }
        ],
        "Sem 3": [
            { n: "AM", code: "U26MH301D", c: 3 },
            { n: "ECAD", code: "U26EC302", c: 4 },
            { n: "DD", code: "U26EC303", c: 4 },
            { n: "SS", code: "U26EC304", c: 3 },
            { n: "OOP Through Java", code: "U26EC305", c: 4 },
            { n: "QALR", code: "U26VA306A", c: 2 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" }
        ],
        "Sem 4": [
            { n: "ICA", code: "U26EC401", c: 4 },
            { n: "CS", code: "U26EC402", c: 4 },
            { n: "EMWTL", code: "U26EC403", c: 3 },
            { n: "COMP", code: "U26EC404", c: 3 },
            { n: "PP", code: "U26EC405", c: 4 },
            { n: "SIS", code: "U26VA406B", c: 1 },
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501YYX", c: 3 },
            { n: "Mb-ESARM", code: "U26EC502", c: 4 },
            { n: "AWP", code: "U26EC503", c: 3 },
            { n: "AI&ML", code: "U26EC504", c: 4 },
            { n: "S&E Basket", code: "U26ST505X", c: 3 },
            { n: "EITK", code: "U26IK506A", c: 2 },
            { n: "PSD Lab-4", code: "U26SE507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1, type: "theory" },
            { n: "Seminar", code: "U26EC509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U26EC601", c: 3 },
            { n: "DSPA", code: "U26EC602", c: 4 },
            { n: "VLSI", code: "U26EC603", c: 4 },
            { n: "DC & CN", code: "U26EC604", c: 3 },
            { n: "MCB", code: "U26EC605X", c: 3 },
            { n: "UHV-II", code: "U26EC606B", c: 2 },
            { n: "AIML Lab", code: "U26EC607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26EC608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26EC702", c: 3 },
            { n: "SVDV", code: "U26EC703", c: 4 },
            { n: "MOFC", code: "U26EC704", c: 3 },
            { n: "WMC", code: "U26EC705", c: 3 },
            { n: "Internship", code: "U26EC706", c: 1 },
            { n: "Major Project-I", code: "U26EC707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26EC802", c: 3 },
            { n: "P-Elective-IV", code: "U26EC803", c: 3 },
            { n: "Major Project-II", code: "U26EC804", c: 6 }
        ]
    },
    "EEE": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EP", code: "U26PY102C", c: 3 },
            { n: "PPSC", code: "U26EE103", c: 3 },
            { n: "EC", code: "U26EE104", c: 3 },
            { n: "EMI", code: "U26EE105", c: 3 },
            { n: "EP Lab", code: "U26PY106C", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26EE107", c: 1, type: "lab" },
            { n: "EC Lab", code: "U26EE108", c: 1, type: "lab" },
            { n: "EMI Lab", code: "U26EE109", c: 1, type: "lab" },
            { n: "ILMS", code: "U26AE110", c: 1, type: "lab" },
        ],
        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 },
            { n: "EC", code: "U26CY202D", c: 4 },
            { n: "AE", code: "U26CI203", c: 3 },
            { n: "DSTC", code: "U26EE204", c: 4 },
            { n: "ECRW", code: "U26MH205", c: 2 },
            { n: "Sports & Yoga", code: "U26VA206", c: 1 },
            { n: "EGCAD", code: "U26ME207", c: 1 },
            { n: "PSD Lab-1", code: "U26SE208", c: 1 }
        ],
        "Sem 3": [
            { n: "AM", code: "U26MH301G", c: 3 },
            { n: "NA", code: "U26EE302", c: 4 },
            { n: "DEOA", code: "U26CI311", c: 4 },
            { n: "DCMT", code: "U26EE304", c: 3 },
            { n: "OOP Through Java", code: "U26EE305", c: 4 },
            { n: "QALR", code: "U26VA306A", c: 2 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1 }
        ],
        "Sem 4": [
            { n: "CSE", code: "U26EE401", c: 4 },
            { n: "ACM", code: "U26EE402", c: 4 },
            { n: "EMF", code: "U26EE403", c: 3 },
            { n: "PSGD", code: "U26EE404", c: 3 },
            { n: "PP", code: "U26EE405", c: 4 },
            { n: "SIS", code: "U26VA406B", c: 1 },
            { n: "PSD Lab-3", code: "U26SE407", c: 1 }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501YYX", c: 3 },
            { n: "PE", code: "U26EE502", c: 4 },
            { n: "PSA", code: "U26EE503", c: 3 },
            { n: "AI & ML", code: "U26EE504", c: 4 },
            { n: "S&E Basket", code: "U26ST505X", c: 3 },
            { n: "EITK", code: "U26IK506A", c: 2 },
            { n: "PSD Lab-4", code: "U26SE507", c: 1 },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26EE509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U26EE601", c: 3 },
            { n: "PSCD", code: "U26EE602", c: 4 },
            { n: "S & P", code: "U26EE603", c: 3 },
            { n: "M & M", code: "U26EE604", c: 4 },
            { n: "MCB", code: "U26MB605X", c: 3 },
            { n: "UHV-II", code: "U26IK606B", c: 2 },
            { n: "AI&ML Lab", code: "U26SE607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26EE608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26EE702", c: 3 },
            { n: "PSOC", code: "U26EE703", c: 4 },
            { n: "UEE", code: "U26EE704", c: 3 },
            { n: "EV", code: "U26EE705", c: 3 },
            { n: "Internship", code: "U26EE706", c: 1 },
            { n: "Major Project-I", code: "U26EE707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26EE802", c: 3 },
            { n: "P-Elective-IV", code: "U26EE803", c: 3 },
            { n: "Major Project-II", code: "U26EE804", c: 6 }
        ]
    },
    "IT": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EC", code: "U26CY102D", c: 3 },
            { n: "PPSC", code: "U26IT103", c: 3 },
            { n: "ECRW", code: "U26MH104", c: 3 },
            { n: "CAO", code: "U26IT105", c: 3 },
            { n: "EC Lab", code: "U26CY106D", c: 1, type: "lab" },
            { n: "PPSC Lab", code: "U26IT107", c: 1, type: "lab" },
            { n: "Sports & Yoga", code: "U26VA108", c: 1, type: "lab" },
            { n: "ITWL", code: "U26IT109", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME110", c: 1, type: "lab" }
        ],
        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 }, //data contributed by Mohammed K Moinuddin
            { n: "EP", code: "U26PY202B", c: 3 },
            { n: "CAO", code: "U26IT203", c: 3 },
            { n: "DSTC", code: "U26IT204", c: 3 },
            { n: "BEE", code: "U26EE205B", c: 3 },
            { n: "ILMS", code: "U26AE207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" },
            { n: "EP Lab", code: "U26PY209B", c: 1, type: "lab" },
            { n: "DSTC Lab", code: "U26IT210", c: 1, type: "lab" },
            { n: "BEE Lab", code: "U26EE211B", c: 1, type: "lab" },
        ],
        "Sem 3": [
            { n: "AI", code: "U26IT301", c: 3 },
            { n: "ADS", code: "U26IT302", c: 4 },
            { n: "SE", code: "U26IT303", c: 3 },
            { n: "DBMS", code: "U26IT304", c: 4 },
            { n: "OOP Through Java", code: "U26IT305", c: 4 },
            { n: "SIS", code: "U26VA306B", c: 1 },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" }
        ],
        /*
         * IT - Semester 4
         * Added course codes for robust UMS auto-fill matching.
         */
        "Sem 4": [
            { n: "DMPS", code: "U26MH401", c: 3 }, //data contributed by Salman Imran Syed
            { n: "DAA", code: "U26IT402", c: 3 },
            { n: "PP", code: "U26IT403", c: 3 },
            { n: "OS", code: "U26IT404", c: 3 },
            { n: "CN", code: "U26IT405", c: 3 },
            { n: "QALR", code: "U26VA406A", c: 2 },
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" },
            { n: "DAA Lab", code: "U26IT408", c: 1, type: "lab" },
            { n: "PP Lab", code: "U26IT409", c: 1, type: "lab" },
            { n: "OS Lab", code: "U26IT410", c: 1, type: "lab" },
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501YYX", c: 3 },
            { n: "ML", code: "U26IT502", c: 4 },
            { n: "Information Security", code: "U26IT503", c: 3 },
            { n: "Intro to IOT", code: "U26IT504", c: 4 },
            { n: "M Basket", code: "U26MB505X", c: 3 },
            { n: "UHV-II", code: "U26IK506B", c: 2 },
            { n: "PSD Lab-4", code: "U26SE507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26IT509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U26IT601X", c: 3 },
            { n: "Data Science", code: "U26IT602", c: 3 },
            { n: "CC", code: "U26IT603", c: 4 },
            { n: "Full Stack w Java", code: "U26IT604", c: 4 },
            { n: "S&E Basket", code: "U26ST605X", c: 3 },
            { n: "EITK", code: "U26IK606A", c: 2 },
            { n: "PSD Lab-5", code: "U26SE607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26IT608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26IT702X", c: 3 },
            { n: "DevOps", code: "U26IT703", c: 4 },
            { n: "BDA", code: "U26IT704", c: 3 },
            { n: "ST & QA", code: "U26IT705", c: 3 },
            { n: "Internship", code: "U26IT706", c: 1 },
            { n: "Major Project-I", code: "U26IT707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26IT802X", c: 3 },
            { n: "P-Elective-IV", code: "U26IT803X", c: 3 },
            { n: "Major Project-II", code: "U26IT804", c: 6 }
        ]
    },
    "ECI": {
        "Sem 1": [
            { n: "DCODE", code: "U26MH101", c: 3 },
            { n: "EP", code: "U26PY102B", c: 4 },
            { n: "EMI", code: "U26CI103", c: 3, },
            { n: "PPSC", code: "U26CI104", c: 4 },
            { n: "BEE", code: "U26EE105B", c: 4 },
            { n: "ES", code: "U26CY106", c: 0 },
            { n: "ILMS", c: 1, type: "lab" }
        ],
        "Sem 2": [
            { n: "MTVC", code: "U26MH201", c: 3 },
            { n: "EC", code: "U26CY202B", c: 4 },
            { n: "AE", code: "U26CI203", c: 3 },
            { n: "DSTC", code: "U26CI204", c: 4 },
            { n: "ECRW", code: "U26MH205", c: 2 },
            { n: "Sports & Yoga", code: "U26VA206", c: 1, type: "lab" },
            { n: "EGCAD", code: "U26ME207", c: 1, type: "lab" },
            { n: "PSD Lab-1", code: "U26SE208", c: 1, type: "lab" }
        ],
        "Sem 3": [
            { n: "MFSP", code: "U26MH301C", c: 3 },
            { n: "S&A", code: "U26CI302", c: 4 },
            { n: "AIC&A", code: "U26CI303", c: 4 },
            { n: "DCLD", code: "U26CI304", c: 3 },
            { n: "OOP Through Java", code: "U26CI305", c: 4 },
            { n: "QALR", code: "U26VA306A", c: 2, },
            { n: "PSD Lab-2", code: "U26SE307", c: 1, type: "lab" }
        ],

        "Sem 4": [
            { n: "VLSID", code: "U26CI401", c: 4 },
            { n: "DSP", code: "U26CI402", c: 4 },
            { n: "EMT", code: "U26CI403", c: 3 },
            { n: "CA&M", code: "U26CI404", c: 3 },
            { n: "PP", code: "U26CI405", c: 4 },
            { n: "SIS", code: "U26VA406B", c: 1 },/* need not to marks as lab as it's listed as theory in UMS*/
            { n: "PSD Lab-3", code: "U26SE407", c: 1, type: "lab" }
        ],
        "Sem 5": [
            { n: "M-Elective 1", code: "U26OE501YYX", c: 3 },
            { n: "M&ES", code: "U26CI502", c: 4 },
            { n: "LCS", code: "U26CI503", c: 3 },
            { n: "AI&ML", code: "U26CI504", c: 4 },
            { n: "S&E Basket", code: "U26ST505X", c: 3 },
            { n: "EITK", code: "U26IK506A", c: 2 },
            { n: "PSD Lab-4", code: "U26SE507", c: 1, type: "lab" },
            { n: "Tech. English", code: "U26MH508", c: 1 },
            { n: "Seminar", code: "U26CI509", c: 1 }
        ],
        "Sem 6": [
            { n: "P-Elective 1", code: "U26CI601", c: 3 },
            { n: "IoT", code: "U26CI602", c: 4 },
            { n: "BI&SP", code: "U26CI603", c: 3 },
            { n: "A&DC", code: "U26CI604", c: 4 },
            { n: "MCB", code: "U26MB605X", c: 3 },
            { n: "UHV-II", code: "U26IK606B", c: 2 },
            { n: "AI&ML Lab", code: "U26SE607", c: 1, type: "lab" },
            { n: "Mini Project", code: "U26CI608", c: 1 }
        ],
        "Sem 7": [
            { n: "M-Elective-II", code: "U26OE701YYX", c: 3 },
            { n: "P-Elective-II", code: "U26CI702", c: 3 },
            { n: "IA&C", code: "U26CI703", c: 4 },
            { n: "S&FOC", code: "U26CI704", c: 3 },
            { n: "DC&N", code: "U26CI705", c: 3 },
            { n: "Internship", code: "U26CI706", c: 1 },
            { n: "Major Project-I", code: "U26CI707", c: 4 }
        ],
        "Sem 8": [
            { n: "M-Elective-III", code: "U26OE801YYX", c: 3 },
            { n: "P-Elective-III", code: "U26CI802", c: 3 },
            { n: "P-Elective-IV", code: "U26CI803", c: 3 },
            { n: "Major Project-II", code: "U26CI804", c: 6 }
        ]
    },
};


// Generate default placeholders for any missing branch / semester combination
const COMMON_SEMESTERS_URR26 = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];
const ALL_BRANCHES_URR26 = Object.keys(BRANCH_MAPPING_URR26);

ALL_BRANCHES_URR26.forEach(branch => {
    if (!COURSE_DATA_URR26[branch]) COURSE_DATA_URR26[branch] = {};
    COMMON_SEMESTERS_URR26.forEach(sem => {
        if (!COURSE_DATA_URR26[branch][sem]) {
            COURSE_DATA_URR26[branch][sem] = [
                { n: `URR26 Subject 1 (${branch} ${sem})`, code: `U26${branch}101`, c: 3 },
                { n: `URR26 Subject 2 (${branch} ${sem})`, code: `U26${branch}102`, c: 4 },
                { n: `URR26 Lab 1 (${branch} ${sem})`, code: `U26${branch}103`, c: 1, type: "lab" }
            ];
        }
    });
});

// Register URR26 in window.REGULATIONS
window.REGULATIONS = window.REGULATIONS || {};
window.REGULATIONS['URR26'] = {
    key: 'URR26',
    title: 'URR26',
    GRADE_POINTS: GRADE_POINTS_URR26,
    BRANCH_MAPPING: BRANCH_MAPPING_URR26,
    COURSE_DATA: COURSE_DATA_URR26
};

// Bind active dataset based on user selection saved in localStorage
(function () {
    var selectedReg = 'URR24-R25';
    try {
        selectedReg = localStorage.getItem('selectedRegulation') || 'URR24-R25';
    } catch (e) { }

    var activeReg = window.REGULATIONS[selectedReg] || window.REGULATIONS['URR24-R25'];

    window.GRADE_POINTS = activeReg.GRADE_POINTS;
    window.BRANCH_MAPPING = activeReg.BRANCH_MAPPING;
    window.COURSE_DATA = activeReg.COURSE_DATA;
})();
