// Local storage utility for managing data
class LocalStorageDB {
  constructor() {
    this.storageKey = 'eikecase_db';
    this.initDB();
  }

  initDB() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({
        countries: this.getDefaultCountries(),
        visitedCountries: this.getDefaultVisitedCountries(),
        companyLogos: [],
        systemConnections: [],
        diagramNodes: [],
        diagramEdges: [],
        diagramSettings: [],
        htmlPrototypes: [],
        claudeApiKeys: [],
        cockpitData: [],
        users: []
      }));
    }
  }

  getDB() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  saveDB(db) {
    localStorage.setItem(this.storageKey, JSON.stringify(db));
  }

  getDefaultCountries() {
    // Liste der 193 UN-Mitgliedsstaaten mit Flag-URLs von flagcdn.com
    const countries = [
      { country_code: 'DE', country_name: 'Germany' },
      { country_code: 'US', country_name: 'United States' },
      { country_code: 'GB', country_name: 'United Kingdom' },
      { country_code: 'FR', country_name: 'France' },
      { country_code: 'IT', country_name: 'Italy' },
      { country_code: 'ES', country_name: 'Spain' },
      { country_code: 'NL', country_name: 'Netherlands' },
      { country_code: 'BE', country_name: 'Belgium' },
      { country_code: 'AT', country_name: 'Austria' },
      { country_code: 'CH', country_name: 'Switzerland' },
      { country_code: 'PL', country_name: 'Poland' },
      { country_code: 'CZ', country_name: 'Czech Republic' },
      { country_code: 'DK', country_name: 'Denmark' },
      { country_code: 'SE', country_name: 'Sweden' },
      { country_code: 'NO', country_name: 'Norway' },
      { country_code: 'FI', country_name: 'Finland' },
      { country_code: 'PT', country_name: 'Portugal' },
      { country_code: 'GR', country_name: 'Greece' },
      { country_code: 'IE', country_name: 'Ireland' },
      { country_code: 'RO', country_name: 'Romania' },
      { country_code: 'HU', country_name: 'Hungary' },
      { country_code: 'BG', country_name: 'Bulgaria' },
      { country_code: 'SK', country_name: 'Slovakia' },
      { country_code: 'HR', country_name: 'Croatia' },
      { country_code: 'SI', country_name: 'Slovenia' },
      { country_code: 'LT', country_name: 'Lithuania' },
      { country_code: 'LV', country_name: 'Latvia' },
      { country_code: 'EE', country_name: 'Estonia' },
      { country_code: 'LU', country_name: 'Luxembourg' },
      { country_code: 'MT', country_name: 'Malta' },
      { country_code: 'CY', country_name: 'Cyprus' },
      { country_code: 'IS', country_name: 'Iceland' },
      { country_code: 'AL', country_name: 'Albania' },
      { country_code: 'BA', country_name: 'Bosnia and Herzegovina' },
      { country_code: 'MK', country_name: 'North Macedonia' },
      { country_code: 'RS', country_name: 'Serbia' },
      { country_code: 'ME', country_name: 'Montenegro' },
      { country_code: 'XK', country_name: 'Kosovo' },
      { country_code: 'MD', country_name: 'Moldova' },
      { country_code: 'UA', country_name: 'Ukraine' },
      { country_code: 'BY', country_name: 'Belarus' },
      { country_code: 'RU', country_name: 'Russia' },
      { country_code: 'CA', country_name: 'Canada' },
      { country_code: 'MX', country_name: 'Mexico' },
      { country_code: 'BR', country_name: 'Brazil' },
      { country_code: 'AR', country_name: 'Argentina' },
      { country_code: 'CL', country_name: 'Chile' },
      { country_code: 'CO', country_name: 'Colombia' },
      { country_code: 'PE', country_name: 'Peru' },
      { country_code: 'VE', country_name: 'Venezuela' },
      { country_code: 'EC', country_name: 'Ecuador' },
      { country_code: 'BO', country_name: 'Bolivia' },
      { country_code: 'PY', country_name: 'Paraguay' },
      { country_code: 'UY', country_name: 'Uruguay' },
      { country_code: 'CR', country_name: 'Costa Rica' },
      { country_code: 'PA', country_name: 'Panama' },
      { country_code: 'CU', country_name: 'Cuba' },
      { country_code: 'DO', country_name: 'Dominican Republic' },
      { country_code: 'GT', country_name: 'Guatemala' },
      { country_code: 'HN', country_name: 'Honduras' },
      { country_code: 'NI', country_name: 'Nicaragua' },
      { country_code: 'SV', country_name: 'El Salvador' },
      { country_code: 'JM', country_name: 'Jamaica' },
      { country_code: 'TT', country_name: 'Trinidad and Tobago' },
      { country_code: 'BS', country_name: 'Bahamas' },
      { country_code: 'BB', country_name: 'Barbados' },
      { country_code: 'CN', country_name: 'China' },
      { country_code: 'JP', country_name: 'Japan' },
      { country_code: 'KR', country_name: 'South Korea' },
      { country_code: 'IN', country_name: 'India' },
      { country_code: 'ID', country_name: 'Indonesia' },
      { country_code: 'TH', country_name: 'Thailand' },
      { country_code: 'VN', country_name: 'Vietnam' },
      { country_code: 'PH', country_name: 'Philippines' },
      { country_code: 'MY', country_name: 'Malaysia' },
      { country_code: 'SG', country_name: 'Singapore' },
      { country_code: 'AU', country_name: 'Australia' },
      { country_code: 'NZ', country_name: 'New Zealand' },
      { country_code: 'PK', country_name: 'Pakistan' },
      { country_code: 'BD', country_name: 'Bangladesh' },
      { country_code: 'LK', country_name: 'Sri Lanka' },
      { country_code: 'MM', country_name: 'Myanmar' },
      { country_code: 'KH', country_name: 'Cambodia' },
      { country_code: 'LA', country_name: 'Laos' },
      { country_code: 'NP', country_name: 'Nepal' },
      { country_code: 'BT', country_name: 'Bhutan' },
      { country_code: 'MV', country_name: 'Maldives' },
      { country_code: 'AF', country_name: 'Afghanistan' },
      { country_code: 'IR', country_name: 'Iran' },
      { country_code: 'IQ', country_name: 'Iraq' },
      { country_code: 'SA', country_name: 'Saudi Arabia' },
      { country_code: 'AE', country_name: 'United Arab Emirates' },
      { country_code: 'IL', country_name: 'Israel' },
      { country_code: 'JO', country_name: 'Jordan' },
      { country_code: 'LB', country_name: 'Lebanon' },
      { country_code: 'SY', country_name: 'Syria' },
      { country_code: 'TR', country_name: 'Turkey' },
      { country_code: 'EG', country_name: 'Egypt' },
      { country_code: 'ZA', country_name: 'South Africa' },
      { country_code: 'NG', country_name: 'Nigeria' },
      { country_code: 'KE', country_name: 'Kenya' },
      { country_code: 'ET', country_name: 'Ethiopia' },
      { country_code: 'GH', country_name: 'Ghana' },
      { country_code: 'TZ', country_name: 'Tanzania' },
      { country_code: 'UG', country_name: 'Uganda' },
      { country_code: 'DZ', country_name: 'Algeria' },
      { country_code: 'MA', country_name: 'Morocco' },
      { country_code: 'TN', country_name: 'Tunisia' },
      { country_code: 'LY', country_name: 'Libya' },
      { country_code: 'SD', country_name: 'Sudan' },
      { country_code: 'SS', country_name: 'South Sudan' },
      { country_code: 'SO', country_name: 'Somalia' },
      { country_code: 'AO', country_name: 'Angola' },
      { country_code: 'MZ', country_name: 'Mozambique' },
      { country_code: 'ZM', country_name: 'Zambia' },
      { country_code: 'ZW', country_name: 'Zimbabwe' },
      { country_code: 'BW', country_name: 'Botswana' },
      { country_code: 'NA', country_name: 'Namibia' },
      { country_code: 'SN', country_name: 'Senegal' },
      { country_code: 'CI', country_name: 'Ivory Coast' },
      { country_code: 'CM', country_name: 'Cameroon' },
      { country_code: 'CD', country_name: 'Democratic Republic of the Congo' },
      { country_code: 'CG', country_name: 'Republic of the Congo' },
      { country_code: 'GA', country_name: 'Gabon' },
      { country_code: 'GQ', country_name: 'Equatorial Guinea' },
      { country_code: 'TD', country_name: 'Chad' },
      { country_code: 'CF', country_name: 'Central African Republic' },
      { country_code: 'RW', country_name: 'Rwanda' },
      { country_code: 'BI', country_name: 'Burundi' },
      { country_code: 'DJ', country_name: 'Djibouti' },
      { country_code: 'ER', country_name: 'Eritrea' },
      { country_code: 'GM', country_name: 'Gambia' },
      { country_code: 'GN', country_name: 'Guinea' },
      { country_code: 'GW', country_name: 'Guinea-Bissau' },
      { country_code: 'LR', country_name: 'Liberia' },
      { country_code: 'SL', country_name: 'Sierra Leone' },
      { country_code: 'ML', country_name: 'Mali' },
      { country_code: 'MR', country_name: 'Mauritania' },
      { country_code: 'NE', country_name: 'Niger' },
      { country_code: 'BF', country_name: 'Burkina Faso' },
      { country_code: 'TG', country_name: 'Togo' },
      { country_code: 'BJ', country_name: 'Benin' },
      { country_code: 'MW', country_name: 'Malawi' },
      { country_code: 'MG', country_name: 'Madagascar' },
      { country_code: 'MU', country_name: 'Mauritius' },
      { country_code: 'SC', country_name: 'Seychelles' },
      { country_code: 'KM', country_name: 'Comoros' },
      { country_code: 'CV', country_name: 'Cape Verde' },
      { country_code: 'ST', country_name: 'Sao Tome and Principe' },
      { country_code: 'LS', country_name: 'Lesotho' },
      { country_code: 'SZ', country_name: 'Eswatini' },
      { country_code: 'KW', country_name: 'Kuwait' },
      { country_code: 'QA', country_name: 'Qatar' },
      { country_code: 'BH', country_name: 'Bahrain' },
      { country_code: 'OM', country_name: 'Oman' },
      { country_code: 'YE', country_name: 'Yemen' },
      { country_code: 'AM', country_name: 'Armenia' },
      { country_code: 'AZ', country_name: 'Azerbaijan' },
      { country_code: 'GE', country_name: 'Georgia' },
      { country_code: 'KZ', country_name: 'Kazakhstan' },
      { country_code: 'UZ', country_name: 'Uzbekistan' },
      { country_code: 'TM', country_name: 'Turkmenistan' },
      { country_code: 'TJ', country_name: 'Tajikistan' },
      { country_code: 'KG', country_name: 'Kyrgyzstan' },
      { country_code: 'MN', country_name: 'Mongolia' },
      { country_code: 'KP', country_name: 'North Korea' },
      { country_code: 'TW', country_name: 'Taiwan' },
      { country_code: 'HK', country_name: 'Hong Kong' },
      { country_code: 'MO', country_name: 'Macau' },
      { country_code: 'BN', country_name: 'Brunei' },
      { country_code: 'TL', country_name: 'Timor-Leste' },
      { country_code: 'PG', country_name: 'Papua New Guinea' },
      { country_code: 'FJ', country_name: 'Fiji' },
      { country_code: 'SB', country_name: 'Solomon Islands' },
      { country_code: 'VU', country_name: 'Vanuatu' },
      { country_code: 'WS', country_name: 'Samoa' },
      { country_code: 'TO', country_name: 'Tonga' },
      { country_code: 'KI', country_name: 'Kiribati' },
      { country_code: 'FM', country_name: 'Micronesia' },
      { country_code: 'MH', country_name: 'Marshall Islands' },
      { country_code: 'PW', country_name: 'Palau' },
      { country_code: 'NR', country_name: 'Nauru' },
      { country_code: 'TV', country_name: 'Tuvalu' }
    ];

    return countries.map(c => ({
      ...c,
      flag_url: `https://flagcdn.com/w320/${c.country_code.toLowerCase()}.png`,
      id: this.generateId()
    }));
  }

  getDefaultVisitedCountries() {
    // Pre-visited countries for Eike Brenneisen
    const visitedCountries = [
      { country_code: 'BE', country_name: 'Belgium', visited_date: '2025-10-09' },
      { country_code: 'AR', country_name: 'Argentina', visited_date: '2025-10-09' },
      { country_code: 'AT', country_name: 'Austria', visited_date: '2025-10-09' },
      { country_code: 'BR', country_name: 'Brazil', visited_date: '2025-10-09' },
      { country_code: 'CL', country_name: 'Chile', visited_date: '2025-10-09' },
      { country_code: 'AU', country_name: 'Australia', visited_date: '2025-10-09' },
      { country_code: 'FR', country_name: 'France', visited_date: '2025-10-09' },
      { country_code: 'IT', country_name: 'Italy', visited_date: '2025-10-09' },
      { country_code: 'IE', country_name: 'Ireland', visited_date: '2025-10-09' },
      { country_code: 'HR', country_name: 'Croatia', visited_date: '2025-10-09' },
      { country_code: 'PE', country_name: 'Peru', visited_date: '2025-10-09' },
      { country_code: 'NL', country_name: 'Netherlands', visited_date: '2025-10-09' },
      { country_code: 'NZ', country_name: 'New Zealand', visited_date: '2025-10-09' },
      { country_code: 'BG', country_name: 'Bulgaria', visited_date: '2025-10-09' },
      { country_code: 'CN', country_name: 'China', visited_date: '2025-10-09' },
      { country_code: 'CO', country_name: 'Colombia', visited_date: '2025-10-09' },
      { country_code: 'CZ', country_name: 'Czech Republic', visited_date: '2025-10-09' },
      { country_code: 'DK', country_name: 'Denmark', visited_date: '2025-10-09' },
      { country_code: 'EG', country_name: 'Egypt', visited_date: '2025-10-09' },
      { country_code: 'DE', country_name: 'Germany', visited_date: '2025-10-09' },
      { country_code: 'ID', country_name: 'Indonesia', visited_date: '2025-10-09' },
      { country_code: 'VN', country_name: 'Vietnam', visited_date: '2025-10-09' },
      { country_code: 'VA', country_name: 'Vatican City', visited_date: '2025-10-09' },
      { country_code: 'GB', country_name: 'United Kingdom', visited_date: '2025-10-09' },
      { country_code: 'CH', country_name: 'Switzerland', visited_date: '2025-10-09' },
      { country_code: 'NP', country_name: 'Nepal', visited_date: '2025-10-09' },
      { country_code: 'SI', country_name: 'Slovenia', visited_date: '2025-10-09' },
      { country_code: 'PA', country_name: 'Panama', visited_date: '2025-10-09' },
      { country_code: 'NO', country_name: 'Norway', visited_date: '2025-10-09' },
      { country_code: 'MK', country_name: 'North Macedonia', visited_date: '2025-10-09' },
      { country_code: 'PH', country_name: 'Philippines', visited_date: '2025-10-09' },
      { country_code: 'PL', country_name: 'Poland', visited_date: '2025-10-09' },
      { country_code: 'PT', country_name: 'Portugal', visited_date: '2025-10-09' },
      { country_code: 'TR', country_name: 'Turkey', visited_date: '2025-10-09' },
      { country_code: 'ES', country_name: 'Spain', visited_date: '2025-10-09' },
      { country_code: 'TH', country_name: 'Thailand', visited_date: '2025-10-09' },
      { country_code: 'SE', country_name: 'Sweden', visited_date: '2025-10-09' },
      { country_code: 'LK', country_name: 'Sri Lanka', visited_date: '2025-10-09' },
      { country_code: 'MC', country_name: 'Monaco', visited_date: '2025-10-09' },
      { country_code: 'LU', country_name: 'Luxembourg', visited_date: '2025-10-09' },
      { country_code: 'MY', country_name: 'Malaysia', visited_date: '2025-10-09' },
      { country_code: 'LI', country_name: 'Liechtenstein', visited_date: '2025-10-09' },
      { country_code: 'SM', country_name: 'San Marino', visited_date: '2025-10-09' },
      { country_code: 'MX', country_name: 'Mexico', visited_date: '2025-10-09' },
      { country_code: 'IN', country_name: 'India', visited_date: '2025-10-09' }
    ];

    return visitedCountries.map(c => ({
      ...c,
      id: this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Generic CRUD operations
  list(entityName) {
    const db = this.getDB();
    return db[entityName] || [];
  }

  create(entityName, data) {
    const db = this.getDB();
    const newItem = {
      ...data,
      id: this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db[entityName] = [...(db[entityName] || []), newItem];
    this.saveDB(db);
    return newItem;
  }

  update(entityName, id, data) {
    const db = this.getDB();
    const index = db[entityName].findIndex(item => item.id === id);
    if (index !== -1) {
      db[entityName][index] = {
        ...db[entityName][index],
        ...data,
        updated_at: new Date().toISOString()
      };
      this.saveDB(db);
      return db[entityName][index];
    }
    return null;
  }

  delete(entityName, id) {
    const db = this.getDB();
    db[entityName] = db[entityName].filter(item => item.id !== id);
    this.saveDB(db);
    return true;
  }

  findById(entityName, id) {
    const db = this.getDB();
    return db[entityName].find(item => item.id === id);
  }
}

export const localDB = new LocalStorageDB();
