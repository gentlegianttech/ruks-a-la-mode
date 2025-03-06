const abujaDeliveryFees: any = {
  airport: 7000,
  apo: 4000,
  "apo legislative": 4500,
  "apo mechanic": 4500,
  "apo resettlement": 5000,
  "area 1": 4000,
  "area 2": 4000,
  "area 3": 4000,
  "area 4": 4000,
  "area 5": 4000,
  "area 6": 4000,
  "area 7": 4000,
  "area 8": 4000,
  asokoro: 4500,
  "asokoro (naf valley)": 5000,
  bwari: 5000,
  "central area": 3000,
  "citec mbora": 4000,
  dawaki: 5000,
  durummi: 4000,
  "efab karsana": 5000,
  gaduwa: 4500,
  galadimawa: 4500,
  gishiri: 3500,
  gudu: 4500,
  guzape: 5000,
  gwarinpa: 4000,
  idu: 4500,
  jabi: 2500,
  jahi: 4000,
  kabusa: 5000,
  kado: 3500,
  kaura: 5000,
  karimo: 5000,
  karsana: 5500,
  karu: 7000,
  katampe: 3500,
  kubwa: 6000,
  kuje: 8000,
  "life camp": 3500,
  "life camp (ochaco)": 4000,
  lokogoma: 4500,
  lugbe: 4500,
  "lugbe fha": 4500,
  mabushi: 3000,
  maitama: 4000,
  mararaba: 7000,
  mpape: 3500,
  nyanya: 5500,
  "prince & princess": 4000,
  utako: 1500,
  "wuse 1-7": 3000,
  wuye: 2000,
};

const nigeriaDeliveryFees = [
  { min: 0, max: 2, standard: 9000, express: 12000 },
  { min: 2, max: 4, standard: 14000, express: 17000 },
  { min: 4, max: 6, standard: 19000, express: 22000 },
  { min: 6, max: 8, standard: 24000, express: 27000 },
  { min: 8, max: 10, standard: 29000, express: 32000 },
];

const freightDeliveryFee = { min: 0, max: 5, fee: 45000 };

const internationalDeliveryFees = [
  {
    min: 0,
    max: 2,
    UK_IRL: 65000,
    W_AFRICA: 70000,
    US_CAN: 75000,
    EUROPE: 85000,
    AFRICA: 90000,
    ARAB: 95000,
    ASIA: 100000,
    CARIBBEANS: 105000,
  },
  {
    min: 2,
    max: 2.5,
    UK_IRL: 85000,
    W_AFRICA: 90000,
    US_CAN: 100000,
    EUROPE: 110000,
    AFRICA: 110000,
    ARAB: 120000,
    ASIA: 125000,
    CARIBBEANS: 135000,
  },
  {
    min: 2.5,
    max: 3,
    UK_IRL: 95000,
    W_AFRICA: 100000,
    US_CAN: 120000,
    EUROPE: 125000,
    AFRICA: 130000,
    ARAB: 140000,
    ASIA: 150000,
    CARIBBEANS: 165000,
  },
  {
    min: 3,
    max: 3.5,
    UK_IRL: 115000,
    W_AFRICA: 120000,
    US_CAN: 140000,
    EUROPE: 145000,
    AFRICA: 150000,
    ARAB: 165000,
    ASIA: 175000,
    CARIBBEANS: 195000,
  },
  {
    min: 3.5,
    max: 4,
    UK_IRL: 130000,
    W_AFRICA: 135000,
    US_CAN: 165000,
    EUROPE: 170000,
    AFRICA: 170000,
    ARAB: 185000,
    ASIA: 195000,
    CARIBBEANS: 225000,
  },
  {
    min: 4,
    max: 4.5,
    UK_IRL: 140000,
    W_AFRICA: 145000,
    US_CAN: 185000,
    EUROPE: 190000,
    AFRICA: 190000,
    ARAB: 210000,
    ASIA: 220000,
    CARIBBEANS: 250000,
  },
  {
    min: 4.5,
    max: 5,
    UK_IRL: 155000,
    W_AFRICA: 160000,
    US_CAN: 205000,
    EUROPE: 210000,
    AFRICA: 215000,
    ARAB: 235000,
    ASIA: 240000,
    CARIBBEANS: 280000,
  },
  {
    min: 5,
    max: 5.5,
    UK_IRL: 165000,
    W_AFRICA: 170000,
    US_CAN: 210000,
    EUROPE: 220000,
    AFRICA: 225000,
    ARAB: 250000,
    ASIA: 260000,
    CARIBBEANS: 305000,
  },
  {
    min: 5.5,
    max: 6,
    UK_IRL: 180000,
    W_AFRICA: 190000,
    US_CAN: 225000,
    EUROPE: 235000,
    AFRICA: 245000,
    ARAB: 270000,
    ASIA: 275000,
    CARIBBEANS: 330000,
  },
  {
    min: 6,
    max: 6.5,
    UK_IRL: 190000,
    W_AFRICA: 200000,
    US_CAN: 240000,
    EUROPE: 250000,
    AFRICA: 265000,
    ARAB: 285000,
    ASIA: 295000,
    CARIBBEANS: 355000,
  },
  {
    min: 6.5,
    max: 7,
    UK_IRL: 205000,
    W_AFRICA: 210000,
    US_CAN: 250000,
    EUROPE: 260000,
    AFRICA: 280000,
    ARAB: 305000,
    ASIA: 310000,
    CARIBBEANS: 380000,
  },
  {
    min: 7,
    max: 7.5,
    UK_IRL: 215000,
    W_AFRICA: 220000,
    US_CAN: 260000,
    EUROPE: 270000,
    AFRICA: 295000,
    ARAB: 320000,
    ASIA: 325000,
    CARIBBEANS: 405000,
  },
  {
    min: 7.5,
    max: 8,
    UK_IRL: 230000,
    W_AFRICA: 235000,
    US_CAN: 275000,
    EUROPE: 285000,
    AFRICA: 315000,
    ARAB: 335000,
    ASIA: 340000,
    CARIBBEANS: 430000,
  },
  {
    min: 8,
    max: 8.5,
    UK_IRL: 240000,
    W_AFRICA: 245000,
    US_CAN: 285000,
    EUROPE: 295000,
    AFRICA: 330000,
    ARAB: 355000,
    ASIA: 360000,
    CARIBBEANS: 455000,
  },
  {
    min: 8.5,
    max: 9,
    UK_IRL: 250000,
    W_AFRICA: 260000,
    US_CAN: 300000,
    EUROPE: 310000,
    AFRICA: 345000,
    ARAB: 365000,
    ASIA: 375000,
    CARIBBEANS: 475000,
  },
];

const countryGroups = {
  WEST_AFRICA: [
    "Benin",
    "Burkina Faso",
    "Cabo Verde",
    "Cote D Ivoire",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea Bissau",
    "Liberia",
    "Mali",
    "Niger",
    "Senegal",
    "Sierra Leone",
    "Togo",
  ],
  AFRICA: [
    "Algeria",
    "Angola",
    "Botswana",
    "Burundi",
    "Cameroon",
    "Chad",
    "Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Ethiopia",
    "Gabon",
    "Kenya",
    "Lesotho",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Rwanda",
    "Seychelles",
    "South Africa",
    "Sudan",
    "Swaziland",
    "Tanzania",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ],
  UK: ["Ireland", "United Kingdom", "UK", "London"],
  EUROPE: [
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia & Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Faroe Islands",
    "Finland",
    "France",
    "Germany",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Hungary",
    "Iceland",
    "Italy",
    "Jersey",
    "Kazakhstan",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Malta",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Ukraine",
  ],
  US_CAN: ["United States", "Canada"],
  ASIA: [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "Hong Kong",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Lebanon",
    "Macau",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Nepal",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "South Korea",
    "Sri Lanka",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Timor L'Este",
    "Turkey",
    "Turkmenistan",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
  ],
  CARIBBEANS: [
    "Anguilla",
    "Antigua & Barbuda",
    "Aruba",
    "Bahamas",
    "Barbados",
    "Bermuda",
    "British Virgin Islands",
    "Cayman Islands",
    "Cuba",
    "Dominica",
    "Dominican Republic",
    "French West Indies",
    "Grenada",
    "Haiti",
    "Jamaica",
    "Montserrat",
    "Puerto Rico",
    "Saint Kitts & Nevis",
    "Saint Lucia",
    "Saint Vincent",
    "Trinidad & Tobago",
    "Turks & Caicos",
    "Virgin Islands (US)",
  ],
  UNKNOWN: [
    "Select Country",
    "Argentina",
    "Australia",
    "Belize",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Cook Islands",
    "Costa Rica",
    "Cruise Ship",
    "Ecuador",
    "El Salvador",
    "Falkland Islands",
    "Fiji",
    "French Polynesia",
    "French West Indies",
    "Georgia",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guyana",
    "Honduras",
    "Isle of Man",
    "Mexico",
    "Moldova",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Reunion",
    "Saint Pierre & Miquelon",
    "Samoa",
    "Satellite",
    "St. Lucia",
    "Suriname",
    "Tonga",
    "Uruguay",
    "Venezuela",
  ],
};

export {
  abujaDeliveryFees,
  nigeriaDeliveryFees,
  freightDeliveryFee,
  internationalDeliveryFees,
  countryGroups,
};
