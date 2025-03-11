/** @format */

import React, { useState } from "react";
import signupimg from "../../Images/pexels-photo-4238493.jpeg";
import { postApihandler } from "../../Apihandler";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "@mui/material";
const countryCodeList = [
  {
    code: "AF",
    countryFlag: "🇦🇫",
    phoneCode: 93,
    countryName: "Afghanistan",
  },
  {
    code: "AL",
    countryFlag: "🇦🇱",
    phoneCode: 355,
    countryName: "Albania",
  },
  {
    code: "DZ",
    countryFlag: "🇩🇿",
    phoneCode: 213,
    countryName: "Algeria",
  },
  {
    code: "AS",
    countryFlag: "🇦🇸",
    phoneCode: 1684,
    countryName: "American Samoa",
  },
  {
    code: "AD",
    countryFlag: "🇦🇩",
    phoneCode: 376,
    countryName: "Andorra",
  },
  {
    code: "AO",
    countryFlag: "🇦🇴",
    phoneCode: 244,
    countryName: "Angola",
  },
  {
    code: "AI",
    countryFlag: "🇦🇮",
    phoneCode: 1264,
    countryName: "Anguilla",
  },
  {
    code: "AQ",
    countryFlag: "🇦🇶",
    phoneCode: 0,
    countryName: "Antarctica",
  },
  {
    code: "AR",
    countryFlag: "🇦🇷",
    phoneCode: 54,
    countryName: "Argentina",
  },
  {
    code: "AM",
    countryFlag: "🇦🇲",
    phoneCode: 374,
    countryName: "Armenia",
  },
  {
    code: "AW",
    countryFlag: "🇦🇼",
    phoneCode: 297,
    countryName: "Aruba",
  },
  {
    code: "AU",
    countryFlag: "🇦🇺",
    phoneCode: 61,
    countryName: "Australia",
  },
  {
    code: "AT",
    countryFlag: "🇦🇹",
    phoneCode: 43,
    countryName: "Austria",
  },
  {
    code: "AZ",
    countryFlag: "🇦🇿",
    phoneCode: 994,
    countryName: "Azerbaijan",
  },
  {
    code: "BH",
    countryFlag: "🇧🇭",
    phoneCode: 973,
    countryName: "Bahrain",
  },
  {
    code: "BD",
    countryFlag: "🇧🇩",
    phoneCode: 880,
    countryName: "Bangladesh",
  },
  {
    code: "BB",
    countryFlag: "🇧🇧",
    phoneCode: 1246,
    countryName: "Barbados",
  },
  {
    code: "BY",
    countryFlag: "🇧🇾",
    phoneCode: 375,
    countryName: "Belarus",
  },
  {
    code: "BE",
    countryFlag: "🇧🇪",
    phoneCode: 32,
    countryName: "Belgium",
  },
  {
    code: "BZ",
    countryFlag: "🇧🇿",
    phoneCode: 501,
    countryName: "Belize",
  },
  {
    code: "BJ",
    countryFlag: "🇧🇯",
    phoneCode: 229,
    countryName: "Benin",
  },
  {
    code: "BM",
    countryFlag: "🇧🇲",
    phoneCode: 1441,
    countryName: "Bermuda",
  },
  {
    code: "BT",
    countryFlag: "🇧🇹",
    phoneCode: 975,
    countryName: "Bhutan",
  },
  {
    code: "BO",
    countryFlag: "🇧🇴",
    phoneCode: 591,
    countryName: "Bolivia",
  },
  {
    code: "BW",
    countryFlag: "🇧🇼",
    phoneCode: 267,
    countryName: "Botswana",
  },
  {
    code: "BV",
    countryFlag: "🇧🇻",
    phoneCode: 0,
    countryName: "Bouvet Island",
  },
  {
    code: "BR",
    countryFlag: "🇧🇷",
    phoneCode: 55,
    countryName: "Brazil",
  },
  {
    code: "IO",
    countryFlag: "🇮🇴",
    phoneCode: 246,
    countryName: "British Indian Ocean Territory",
  },
  {
    code: "BN",
    countryFlag: "🇧🇳",
    phoneCode: 673,
    countryName: "Brunei",
  },
  {
    code: "BG",
    countryFlag: "🇧🇬",
    phoneCode: 359,
    countryName: "Bulgaria",
  },
  {
    code: "BF",
    countryFlag: "🇧🇫",
    phoneCode: 226,
    countryName: "Burkina Faso",
  },
  {
    code: "BI",
    countryFlag: "🇧🇮",
    phoneCode: 257,
    countryName: "Burundi",
  },
  {
    code: "KH",
    countryFlag: "🇰🇭",
    phoneCode: 855,
    countryName: "Cambodia",
  },
  {
    code: "CM",
    countryFlag: "🇨🇲",
    phoneCode: 237,
    countryName: "Cameroon",
  },
  {
    code: "CA",
    countryFlag: "🇨🇦",
    phoneCode: 1,
    countryName: "Canada",
  },
  {
    code: "CV",
    countryFlag: "🇨🇻",
    phoneCode: 238,
    countryName: "Cape Verde",
  },
  {
    code: "KY",
    countryFlag: "🇰🇾",
    phoneCode: 1345,
    countryName: "Cayman Islands",
  },
  {
    code: "CF",
    countryFlag: "🇨🇫",
    phoneCode: 236,
    countryName: "Central African Republic",
  },
  {
    code: "TD",
    countryFlag: "🇹🇩",
    phoneCode: 235,
    countryName: "Chad",
  },
  {
    code: "CL",
    countryFlag: "🇨🇱",
    phoneCode: 56,
    countryName: "Chile",
  },
  {
    code: "CN",
    countryFlag: "🇨🇳",
    phoneCode: 86,
    countryName: "China",
  },
  {
    code: "CX",
    countryFlag: "🇨🇽",
    phoneCode: 61,
    countryName: "Christmas Island",
  },
  {
    code: "CC",
    countryFlag: "🇨🇨",
    phoneCode: 672,
    countryName: "Cocos (Keeling) Islands",
  },
  {
    code: "CO",
    countryFlag: "🇨🇴",
    phoneCode: 57,
    countryName: "Colombia",
  },
  {
    code: "KM",
    countryFlag: "🇰🇲",
    phoneCode: 269,
    countryName: "Comoros",
  },
  {
    code: "CK",
    countryFlag: "🇨🇰",
    phoneCode: 682,
    countryName: "Cook Islands",
  },
  {
    code: "CR",
    countryFlag: "🇨🇷",
    phoneCode: 506,
    countryName: "Costa Rica",
  },
  {
    code: "CU",
    countryFlag: "🇨🇺",
    phoneCode: 53,
    countryName: "Cuba",
  },
  {
    code: "CY",
    countryFlag: "🇨🇾",
    phoneCode: 357,
    countryName: "Cyprus",
  },
  {
    code: "DK",
    countryFlag: "🇩🇰",
    phoneCode: 45,
    countryName: "Denmark",
  },
  {
    code: "DJ",
    countryFlag: "🇩🇯",
    phoneCode: 253,
    countryName: "Djibouti",
  },
  {
    code: "DM",
    countryFlag: "🇩🇲",
    phoneCode: 1767,
    countryName: "Dominica",
  },
  {
    code: "DO",
    countryFlag: "🇩🇴",
    phoneCode: 1809,
    countryName: "Dominican Republic",
  },
  {
    code: "EC",
    countryFlag: "🇪🇨",
    phoneCode: 593,
    countryName: "Ecuador",
  },
  {
    code: "EG",
    countryFlag: "🇪🇬",
    phoneCode: 20,
    countryName: "Egypt",
  },
  {
    code: "SV",
    countryFlag: "🇸🇻",
    phoneCode: 503,
    countryName: "El Salvador",
  },
  {
    code: "GQ",
    countryFlag: "🇬🇶",
    phoneCode: 240,
    countryName: "Equatorial Guinea",
  },
  {
    code: "ER",
    countryFlag: "🇪🇷",
    phoneCode: 291,
    countryName: "Eritrea",
  },
  {
    code: "EE",
    countryFlag: "🇪🇪",
    phoneCode: 372,
    countryName: "Estonia",
  },
  {
    code: "ET",
    countryFlag: "🇪🇹",
    phoneCode: 251,
    countryName: "Ethiopia",
  },
  {
    code: "FK",
    countryFlag: "🇫🇰",
    phoneCode: 500,
    countryName: "Falkland Islands",
  },
  {
    code: "FO",
    countryFlag: "🇫🇴",
    phoneCode: 298,
    countryName: "Faroe Islands",
  },
  {
    code: "FI",
    countryFlag: "🇫🇮",
    phoneCode: 358,
    countryName: "Finland",
  },
  {
    code: "FR",
    countryFlag: "🇫🇷",
    phoneCode: 33,
    countryName: "France",
  },
  {
    code: "GF",
    countryFlag: "🇬🇫",
    phoneCode: 594,
    countryName: "French Guiana",
  },
  {
    code: "PF",
    countryFlag: "🇵🇫",
    phoneCode: 689,
    countryName: "French Polynesia",
  },
  {
    code: "TF",
    countryFlag: "🇹🇫",
    phoneCode: 0,
    countryName: "French Southern Territories",
  },
  {
    code: "GA",
    countryFlag: "🇬🇦",
    phoneCode: 241,
    countryName: "Gabon",
  },
  {
    code: "GE",
    countryFlag: "🇬🇪",
    phoneCode: 995,
    countryName: "Georgia",
  },
  {
    code: "DE",
    countryFlag: "🇩🇪",
    phoneCode: 49,
    countryName: "Germany",
  },
  {
    code: "GH",
    countryFlag: "🇬🇭",
    phoneCode: 233,
    countryName: "Ghana",
  },
  {
    code: "GI",
    countryFlag: "🇬🇮",
    phoneCode: 350,
    countryName: "Gibraltar",
  },
  {
    code: "GR",
    countryFlag: "🇬🇷",
    phoneCode: 30,
    countryName: "Greece",
  },
  {
    code: "GL",
    countryFlag: "🇬🇱",
    phoneCode: 299,
    countryName: "Greenland",
  },
  {
    code: "GD",
    countryFlag: "🇬🇩",
    phoneCode: 1473,
    countryName: "Grenada",
  },
  {
    code: "GP",
    countryFlag: "🇬🇵",
    phoneCode: 590,
    countryName: "Guadeloupe",
  },
  {
    code: "GU",
    countryFlag: "🇬🇺",
    phoneCode: 1671,
    countryName: "Guam",
  },
  {
    code: "GT",
    countryFlag: "🇬🇹",
    phoneCode: 502,
    countryName: "Guatemala",
  },
  {
    code: "GN",
    countryFlag: "🇬🇳",
    phoneCode: 224,
    countryName: "Guinea",
  },
  {
    code: "GW",
    countryFlag: "🇬🇼",
    phoneCode: 245,
    countryName: "Guinea-Bissau",
  },
  {
    code: "GY",
    countryFlag: "🇬🇾",
    phoneCode: 592,
    countryName: "Guyana",
  },
  {
    code: "HT",
    countryFlag: "🇭🇹",
    phoneCode: 509,
    countryName: "Haiti",
  },
  {
    code: "HN",
    countryFlag: "🇭🇳",
    phoneCode: 504,
    countryName: "Honduras",
  },
  {
    code: "HU",
    countryFlag: "🇭🇺",
    phoneCode: 36,
    countryName: "Hungary",
  },
  {
    code: "IS",
    countryFlag: "🇮🇸",
    phoneCode: 354,
    countryName: "Iceland",
  },
  {
    code: "IN",
    countryFlag: "🇮🇳",
    phoneCode: 91,
    countryName: "India",
  },
  {
    code: "ID",
    countryFlag: "🇮🇩",
    phoneCode: 62,
    countryName: "Indonesia",
  },
  {
    code: "IR",
    countryFlag: "🇮🇷",
    phoneCode: 98,
    countryName: "Iran",
  },
  {
    code: "IQ",
    countryFlag: "🇮🇶",
    phoneCode: 964,
    countryName: "Iraq",
  },
  {
    code: "IE",
    countryFlag: "🇮🇪",
    phoneCode: 353,
    countryName: "Ireland",
  },
  {
    code: "IL",
    countryFlag: "🇮🇱",
    phoneCode: 972,
    countryName: "Israel",
  },
  {
    code: "IT",
    countryFlag: "🇮🇹",
    phoneCode: 39,
    countryName: "Italy",
  },
  {
    code: "JM",
    countryFlag: "🇯🇲",
    phoneCode: 1876,
    countryName: "Jamaica",
  },
  {
    code: "JP",
    countryFlag: "🇯🇵",
    phoneCode: 81,
    countryName: "Japan",
  },
  {
    code: "JO",
    countryFlag: "🇯🇴",
    phoneCode: 962,
    countryName: "Jordan",
  },
  {
    code: "KZ",
    countryFlag: "🇰🇿",
    phoneCode: 7,
    countryName: "Kazakhstan",
  },
  {
    code: "KE",
    countryFlag: "🇰🇪",
    phoneCode: 254,
    countryName: "Kenya",
  },
  {
    code: "KI",
    countryFlag: "🇰🇮",
    phoneCode: 686,
    countryName: "Kiribati",
  },
  {
    code: "KW",
    countryFlag: "🇰🇼",
    phoneCode: 965,
    countryName: "Kuwait",
  },
  {
    code: "KG",
    countryFlag: "🇰🇬",
    phoneCode: 996,
    countryName: "Kyrgyzstan",
  },
  {
    code: "LA",
    countryFlag: "🇱🇦",
    phoneCode: 856,
    countryName: "Laos",
  },
  {
    code: "LV",
    countryFlag: "🇱🇻",
    phoneCode: 371,
    countryName: "Latvia",
  },
  {
    code: "LB",
    countryFlag: "🇱🇧",
    phoneCode: 961,
    countryName: "Lebanon",
  },
  {
    code: "LS",
    countryFlag: "🇱🇸",
    phoneCode: 266,
    countryName: "Lesotho",
  },
  {
    code: "LR",
    countryFlag: "🇱🇷",
    phoneCode: 231,
    countryName: "Liberia",
  },
  {
    code: "LY",
    countryFlag: "🇱🇾",
    phoneCode: 218,
    countryName: "Libya",
  },
  {
    code: "LI",
    countryFlag: "🇱🇮",
    phoneCode: 423,
    countryName: "Liechtenstein",
  },
  {
    code: "LT",
    countryFlag: "🇱🇹",
    phoneCode: 370,
    countryName: "Lithuania",
  },
  {
    code: "LU",
    countryFlag: "🇱🇺",
    phoneCode: 352,
    countryName: "Luxembourg",
  },
  {
    code: "MK",
    countryFlag: "🇲🇰",
    phoneCode: 389,
    countryName: "Macedonia",
  },
  {
    code: "MG",
    countryFlag: "🇲🇬",
    phoneCode: 261,
    countryName: "Madagascar",
  },
  {
    code: "MW",
    countryFlag: "🇲🇼",
    phoneCode: 265,
    countryName: "Malawi",
  },
  {
    code: "MY",
    countryFlag: "🇲🇾",
    phoneCode: 60,
    countryName: "Malaysia",
  },
  {
    code: "MV",
    countryFlag: "🇲🇻",
    phoneCode: 960,
    countryName: "Maldives",
  },
  {
    code: "ML",
    countryFlag: "🇲🇱",
    phoneCode: 223,
    countryName: "Mali",
  },
  {
    code: "MT",
    countryFlag: "🇲🇹",
    phoneCode: 356,
    countryName: "Malta",
  },
  {
    code: "MH",
    countryFlag: "🇲🇭",
    phoneCode: 692,
    countryName: "Marshall Islands",
  },
  {
    code: "MQ",
    countryFlag: "🇲🇶",
    phoneCode: 596,
    countryName: "Martinique",
  },
  {
    code: "MR",
    countryFlag: "🇲🇷",
    phoneCode: 222,
    countryName: "Mauritania",
  },
  {
    code: "MU",
    countryFlag: "🇲🇺",
    phoneCode: 230,
    countryName: "Mauritius",
  },
  {
    code: "YT",
    countryFlag: "🇾🇹",
    phoneCode: 269,
    countryName: "Mayotte",
  },
  {
    code: "MX",
    countryFlag: "🇲🇽",
    phoneCode: 52,
    countryName: "Mexico",
  },
  {
    code: "FM",
    countryFlag: "🇫🇲",
    phoneCode: 691,
    countryName: "Micronesia",
  },
  {
    code: "MD",
    countryFlag: "🇲🇩",
    phoneCode: 373,
    countryName: "Moldova",
  },
  {
    code: "MC",
    countryFlag: "🇲🇨",
    phoneCode: 377,
    countryName: "Monaco",
  },
  {
    code: "MN",
    countryFlag: "🇲🇳",
    phoneCode: 976,
    countryName: "Mongolia",
  },
  {
    code: "MS",
    countryFlag: "🇲🇸",
    phoneCode: 1664,
    countryName: "Montserrat",
  },
  {
    code: "MA",
    countryFlag: "🇲🇦",
    phoneCode: 212,
    countryName: "Morocco",
  },
  {
    code: "MZ",
    countryFlag: "🇲🇿",
    phoneCode: 258,
    countryName: "Mozambique",
  },
  {
    code: "NA",
    countryFlag: "🇳🇦",
    phoneCode: 264,
    countryName: "Namibia",
  },
  {
    code: "NR",
    countryFlag: "🇳🇷",
    phoneCode: 674,
    countryName: "Nauru",
  },
  {
    code: "NP",
    countryFlag: "🇳🇵",
    phoneCode: 977,
    countryName: "Nepal",
  },
  {
    code: "NC",
    countryFlag: "🇳🇨",
    phoneCode: 687,
    countryName: "New Caledonia",
  },
  {
    code: "NZ",
    countryFlag: "🇳🇿",
    phoneCode: 64,
    countryName: "New Zealand",
  },
  {
    code: "NI",
    countryFlag: "🇳🇮",
    phoneCode: 505,
    countryName: "Nicaragua",
  },
  {
    code: "NE",
    countryFlag: "🇳🇪",
    phoneCode: 227,
    countryName: "Niger",
  },
  {
    code: "NG",
    countryFlag: "🇳🇬",
    phoneCode: 234,
    countryName: "Nigeria",
  },
  {
    code: "NU",
    countryFlag: "🇳🇺",
    phoneCode: 683,
    countryName: "Niue",
  },
  {
    code: "NF",
    countryFlag: "🇳🇫",
    phoneCode: 672,
    countryName: "Norfolk Island",
  },
  {
    code: "MP",
    countryFlag: "🇲🇵",
    phoneCode: 1670,
    countryName: "Northern Mariana Islands",
  },
  {
    code: "NO",
    countryFlag: "🇳🇴",
    phoneCode: 47,
    countryName: "Norway",
  },
  {
    code: "OM",
    countryFlag: "🇴🇲",
    phoneCode: 968,
    countryName: "Oman",
  },
  {
    code: "PK",
    countryFlag: "🇵🇰",
    phoneCode: 92,
    countryName: "Pakistan",
  },
  {
    code: "PW",
    countryFlag: "🇵🇼",
    phoneCode: 680,
    countryName: "Palau",
  },
  {
    code: "PA",
    countryFlag: "🇵🇦",
    phoneCode: 507,
    countryName: "Panama",
  },
  {
    code: "PY",
    countryFlag: "🇵🇾",
    phoneCode: 595,
    countryName: "Paraguay",
  },
  {
    code: "PE",
    countryFlag: "🇵🇪",
    phoneCode: 51,
    countryName: "Peru",
  },
  {
    code: "PH",
    countryFlag: "🇵🇭",
    phoneCode: 63,
    countryName: "Philippines",
  },
  {
    code: "PL",
    countryFlag: "🇵🇱",
    phoneCode: 48,
    countryName: "Poland",
  },
  {
    code: "PT",
    countryFlag: "🇵🇹",
    phoneCode: 351,
    countryName: "Portugal",
  },
  {
    code: "PR",
    countryFlag: "🇵🇷",
    phoneCode: 1787,
    countryName: "Puerto Rico",
  },
  {
    code: "QA",
    countryFlag: "🇶🇦",
    phoneCode: 974,
    countryName: "Qatar",
  },
  {
    code: "RO",
    countryFlag: "🇷🇴",
    phoneCode: 40,
    countryName: "Romania",
  },
  {
    code: "RU",
    countryFlag: "🇷🇺",
    phoneCode: 70,
    countryName: "Russia",
  },
  {
    code: "RW",
    countryFlag: "🇷🇼",
    phoneCode: 250,
    countryName: "Rwanda",
  },
  {
    code: "WS",
    countryFlag: "🇼🇸",
    phoneCode: 684,
    countryName: "Samoa",
  },
  {
    code: "SM",
    countryFlag: "🇸🇲",
    phoneCode: 378,
    countryName: "San Marino",
  },
  {
    code: "SA",
    countryFlag: "🇸🇦",
    phoneCode: 966,
    countryName: "Saudi Arabia",
  },
  {
    code: "SN",
    countryFlag: "🇸🇳",
    phoneCode: 221,
    countryName: "Senegal",
  },
  {
    code: "RS",
    countryFlag: "🇷🇸",
    phoneCode: 381,
    countryName: "Serbia",
  },
  {
    code: "SC",
    countryFlag: "🇸🇨",
    phoneCode: 248,
    countryName: "Seychelles",
  },
  {
    code: "SL",
    countryFlag: "🇸🇱",
    phoneCode: 232,
    countryName: "Sierra Leone",
  },
  {
    code: "SG",
    countryFlag: "🇸🇬",
    phoneCode: 65,
    countryName: "Singapore",
  },
  {
    code: "SK",
    countryFlag: "🇸🇰",
    phoneCode: 421,
    countryName: "Slovakia",
  },
  {
    code: "SI",
    countryFlag: "🇸🇮",
    phoneCode: 386,
    countryName: "Slovenia",
  },
  {
    code: "SB",
    countryFlag: "🇸🇧",
    phoneCode: 677,
    countryName: "Solomon Islands",
  },
  {
    code: "SO",
    countryFlag: "🇸🇴",
    phoneCode: 252,
    countryName: "Somalia",
  },
  {
    code: "ZA",
    countryFlag: "🇿🇦",
    phoneCode: 27,
    countryName: "South Africa",
  },
  {
    code: "SS",
    countryFlag: "🇸🇸",
    phoneCode: 211,
    countryName: "South Sudan",
  },
  {
    code: "ES",
    countryFlag: "🇪🇸",
    phoneCode: 34,
    countryName: "Spain",
  },
  {
    code: "LK",
    countryFlag: "🇱🇰",
    phoneCode: 94,
    countryName: "Sri Lanka",
  },
  {
    code: "SD",
    countryFlag: "🇸🇩",
    phoneCode: 249,
    countryName: "Sudan",
  },
  {
    code: "SR",
    countryFlag: "🇸🇷",
    phoneCode: 597,
    countryName: "Suriname",
  },
  {
    code: "SZ",
    countryFlag: "🇸🇿",
    phoneCode: 268,
    countryName: "Swaziland",
  },
  {
    code: "SE",
    countryFlag: "🇸🇪",
    phoneCode: 46,
    countryName: "Sweden",
  },
  {
    code: "CH",
    countryFlag: "🇨🇭",
    phoneCode: 41,
    countryName: "Switzerland",
  },
  {
    code: "SY",
    countryFlag: "🇸🇾",
    phoneCode: 963,
    countryName: "Syria",
  },
  {
    code: "TW",
    countryFlag: "🇹🇼",
    phoneCode: 886,
    countryName: "Taiwan",
  },
  {
    code: "TJ",
    countryFlag: "🇹🇯",
    phoneCode: 992,
    countryName: "Tajikistan",
  },
  {
    code: "TZ",
    countryFlag: "🇹🇿",
    phoneCode: 255,
    countryName: "Tanzania",
  },
  {
    code: "TH",
    countryFlag: "🇹🇭",
    phoneCode: 66,
    countryName: "Thailand",
  },
  {
    code: "TG",
    countryFlag: "🇹🇬",
    phoneCode: 228,
    countryName: "Togo",
  },
  {
    code: "TK",
    countryFlag: "🇹🇰",
    phoneCode: 690,
    countryName: "Tokelau",
  },
  {
    code: "TO",
    countryFlag: "🇹🇴",
    phoneCode: 676,
    countryName: "Tonga",
  },
  {
    code: "TN",
    countryFlag: "🇹🇳",
    phoneCode: 216,
    countryName: "Tunisia",
  },
  {
    code: "TR",
    countryFlag: "🇹🇷",
    phoneCode: 90,
    countryName: "Turkey",
  },
  {
    code: "TM",
    countryFlag: "🇹🇲",
    phoneCode: 7370,
    countryName: "Turkmenistan",
  },
  {
    code: "TV",
    countryFlag: "🇹🇻",
    phoneCode: 688,
    countryName: "Tuvalu",
  },
  {
    code: "UG",
    countryFlag: "🇺🇬",
    phoneCode: 256,
    countryName: "Uganda",
  },
  {
    code: "UA",
    countryFlag: "🇺🇦",
    phoneCode: 380,
    countryName: "Ukraine",
  },
  {
    code: "AE",
    countryFlag: "🇦🇪",
    phoneCode: 971,
    countryName: "United Arab Emirates",
  },
  {
    code: "GB",
    countryFlag: "🇬🇧",
    phoneCode: 44,
    countryName: "United Kingdom",
  },
  {
    code: "US",
    countryFlag: "🇺🇸",
    phoneCode: 1,
    countryName: "United States",
  },
  {
    code: "UY",
    countryFlag: "🇺🇾",
    phoneCode: 598,
    countryName: "Uruguay",
  },
  {
    code: "UZ",
    countryFlag: "🇺🇿",
    phoneCode: 998,
    countryName: "Uzbekistan",
  },
  {
    code: "VU",
    countryFlag: "🇻🇺",
    phoneCode: 678,
    countryName: "Vanuatu",
  },
  {
    code: "VE",
    countryFlag: "🇻🇪",
    phoneCode: 58,
    countryName: "Venezuela",
  },
  {
    code: "VN",
    countryFlag: "🇻🇳",
    phoneCode: 84,
    countryName: "Vietnam",
  },
  {
    code: "EH",
    countryFlag: "🇪🇭",
    phoneCode: 212,
    countryName: "Western Sahara",
  },
  {
    code: "YE",
    countryFlag: "🇾🇪",
    phoneCode: 967,
    countryName: "Yemen",
  },
  {
    code: "ZM",
    countryFlag: "🇿🇲",
    phoneCode: 260,
    countryName: "Zambia",
  },
  {
    code: "ZW",
    countryFlag: "🇿🇼",
    phoneCode: 26,
    countryName: "Zimbabwe",
  },
];
export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // console.log("name is --->", name);

  const [email, setEmail] = useState("");
  // console.log("email is --->", email);

  const [password, setPassword] = useState("");
  // console.log("password is --->", password);

  const [confirmpassword, setConfirmPassword] = useState("");
  // console.log("confirmpassword is --->", confirmpassword);
  const [phonenumber, setphonenumber] = useState("");

  const [country_code, setCountryCode] = React.useState();
  const userSignup = async (e) => {
    e.preventDefault();

    const data = {
      user_FullName: name,
      user_Email: email,
      password: password,
      confirmPassword: confirmpassword,
      mobile_no: phonenumber,
      country_code: country_code,
    };

    console.log("Signup data is ---->", data);

    try {
      const res = await postApihandler("/userSignup", data);
      console.log("Signup API response is ----->", res);

      if (res.status === 200) {
        swal("Success", "Successfully Signed Up!", "success");
        navigate("/");
      } else if (res.status === 400) {
        swal(
          "Error",
          res.error.response.data.message || "Bad Request. Please check your details.",
          "error"
        );
      } else if (res.status === 401) {
        swal(
          "Unauthorized",
          "You are not authorized to perform this action.",
          "warning"
        );
      } else if (res.status === 500) {
        swal(
          "Server Error",
          "Something went wrong. Please try again later.",
          "error"
        );
      } else {
        swal("Error", res.error.response.data.message || "An unknown error occurred.", "error");
      }
    } catch (error) {
      swal(
        "Network Error",
        "Failed to connect to the server. Please try again later.",
        "error"
      );
      console.error("Error during signup:", error);
    }
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ********* artist signup ***********

  const [artistname, setArtistName] = useState("");
  const [artistemail, setArtistEmail] = useState("");
  const [artistpassword, setArtistPassword] = useState("");
  const [artistconfirmpassword, setArtistConfirmPassword] = useState("");
  const [artistnumber, setArtistNumber] = useState("");
  const [artistcountrycode, setArtistCountryCode] = useState("");
  const artistSignup = async (e) => {
    e.preventDefault();

    const data = {
      user_FullName: artistname,
      user_Email: artistemail,
      password: artistpassword,
      confirmPassword: artistconfirmpassword,
      mobile_no: artistnumber,
      country_code: artistcountrycode,
    };

    console.log("Signup data is ---->", data);

    try {
      const res = await postApihandler("/artistSignup", data);
      console.log("Signup API response is ----->", res);

      if (res.status === 200) {
        swal("Success", "Successfully Signed Up!", "success");
        navigate("/");
      } else if (res.status === 400) {
        swal(
          "Error",
          res.message || "Bad Request. Please check your details.",
          "error"
        );
      } else if (res.status === 401) {
        swal(
          "Unauthorized",
          "You are not authorized to perform this action.",
          "warning"
        );
      } else if (res.status === 500) {
        swal(
          "Server Error",
          "Something went wrong. Please try again later.",
          "error"
        );
      } else {
        swal("Error", res.message || "An unknown error occurred.", "error");
      }
    } catch (error) {
      swal(
        "Network Error",
        "Failed to connect to the server. Please try again later.",
        "error"
      );
      console.error("Error during signup:", error);
    }
  };
  return (
    <div>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="signup_img">
                <img src={signupimg} alt="" width="100%" />
              </div>
            </div>
            <div class="col-md-6">
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="User" value="1" />
                      <Tab label="Artist" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div class="signup-box">
                      <h4>User</h4>
                      <h5>Sign Up Here to access your account</h5>

                      <form onSubmit={userSignup}>
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Full Name"
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div class="mb-3">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Email Address"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          {/* <Typography sx={{ textAlign: "start", fontSize: "20px" }}>
                      Mobile
                    </Typography> */}
                          <div className="row">
                            <div className="col-md-5">
                              <select
                                id="country_code"
                                name="country_code"
                                required
                                className="w-full px-4 py-2  form-control focus:outline-none focus:ring-2 focus:ring-purple-600"
                                onChange={(e) => setCountryCode(e.target.value)}
                              >
                                {countryCodeList.map((val, ind) => (
                                  <option value={`+${val.phoneCode}`} key={ind}>
                                    {val.countryFlag} +{val.phoneCode}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className=" col-md-7">
                              <input
                                class="form-control"
                                type="tel"
                                placeholder="Enter your Mobile"
                                fullWidth
                                onChange={(e) => setphonenumber(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div class="mb-3 position-relative">
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i
                            class="fa fa-eye password-toggle"
                            onclick="togglePassword('password')"
                          ></i>
                        </div>
                        <div class="mb-3 position-relative">
                          <input
                            type="password"
                            class="form-control"
                            id="confirm-password"
                            placeholder="Confirm Password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <i
                            class="fa fa-eye password-toggle"
                            onclick="togglePassword('confirm-password')"
                          ></i>
                        </div>
                        <button type="submit" class="btn btn-custom w-100">
                          PROCEED TO SIGN UP
                        </button>

                        <p class="mt-3">
                          Already have an account?{" "}
                          <a
                            href="/"
                            class="fw-bold"
                            style={{ color: "#4c1f7a" }}
                          >
                            Login
                          </a>
                        </p>
                        <div className="mt-4">
                          <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                              backgroundColor: "#5a2d82",
                              color: "white",
                              border: "none",
                              padding: "7px 20px",
                            }}
                          >
                            Login With Google
                          </Button>
                        </div>
                        <div className="mt-3">
                          <Button
                            variant="outlined"
                            startIcon={<FacebookIcon />}
                            sx={{
                              backgroundColor: "#5a2d82",
                              color: "white",
                              border: "none",
                            }}
                          >
                            Login With Facebook
                          </Button>
                        </div>
                      </form>
                    </div>
                  </TabPanel>
                  <TabPanel value="2">
                    <div class="signup-box">
                      <h4>Artist</h4>
                      <h5>Sign Up Here to access your account</h5>

                      <form onSubmit={artistSignup}>
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Full Name"
                            required
                            onChange={(e) => setArtistName(e.target.value)}
                          />
                        </div>
                        <div class="mb-3">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Email Address"
                            required
                            onChange={(e) => setArtistEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          {/* <Typography sx={{ textAlign: "start", fontSize: "20px" }}>
                      Mobile
                    </Typography> */}
                          <div className="row">
                            <div className="col-md-5">
                              <select
                                id="country_code"
                                name="country_code"
                                required
                                className="w-full px-4 py-2  form-control focus:outline-none focus:ring-2 focus:ring-purple-600"
                                onChange={(e) =>
                                  setArtistCountryCode(e.target.value)
                                }
                              >
                                {countryCodeList.map((val, ind) => (
                                  <option value={`+${val.phoneCode}`} key={ind}>
                                    {val.countryFlag} +{val.phoneCode}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className=" col-md-7">
                              <input
                                class="form-control"
                                type="tel"
                                placeholder="Enter your Mobile"
                                fullWidth
                                onChange={(e) =>
                                  setArtistNumber(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div class="mb-3 position-relative">
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setArtistPassword(e.target.value)}
                          />
                          <i
                            class="fa fa-eye password-toggle"
                            onclick="togglePassword('password')"
                          ></i>
                        </div>
                        <div class="mb-3 position-relative">
                          <input
                            type="password"
                            class="form-control"
                            id="confirm-password"
                            placeholder="Confirm Password"
                            required
                            onChange={(e) =>
                              setArtistConfirmPassword(e.target.value)
                            }
                          />
                          <i
                            class="fa fa-eye password-toggle"
                            onclick="togglePassword('confirm-password')"
                          ></i>
                        </div>
                        <button type="submit" class="btn btn-custom w-100">
                          PROCEED TO SIGN UP
                        </button>
                        <p class="mt-3">
                          Already have an account?{" "}
                          <a
                            href="/"
                            class="fw-bold"
                            style={{ color: "#4c1f7a" }}
                          >
                            Login
                          </a>
                        </p>
                      </form>
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
