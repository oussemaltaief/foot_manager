/**
 * Creates a hash indexed by key from an array of objects.
 *
 * @param {Array} options array of objects
 *
 * @returns {Object} hash of objects indexed by keys
 */

import { SearchOutlined } from '@ant-design/icons';

function getByKey(options) {
  return options.reduce((acc, options) => {
    acc[options.key] = options;
    return acc;
  }, {});
}

export const GENDERS = [
  { key: 'm', label: 'Monsieur' },
  { key: 'f', label: 'Madame' }
];

export const GENDERS_BY_KEY = getByKey(GENDERS);

export const USER_TYPES = [{ key: 'admin', label: 'Administrateur' }];

export const USER_TYPES_BY_KEY = getByKey(USER_TYPES);

export const TICKET_TYPES = [
  { key: 'ticket', label: 'Ticket' },
  { key: 'card', label: 'Carte à unités' },
  { key: 'flat', label: 'Forfait' }
];

export const TICKET_TYPES_BY_KEY = getByKey(TICKET_TYPES);

export const SUBSCRIPTION_TYPES = [
  { key: 'fixedDate', label: 'à date fixe' },
  { key: 'regular', label: 'regulier' }
];

export const SUBSCRIPTION_TYPES_REGULAR = [
  { key: 'month', label: 'Mensuel' },
  { key: 'quarter', label: 'Trimestriel' },
  { key: 'semester', label: 'Semestriel' },
  { key: 'year', label: 'Annuel' }
];

export const SUBSCRIPTION_TYPES_BY_KEY = getByKey(SUBSCRIPTION_TYPES);

export const PERSON_STATUS = [
  { key: 'single', label: 'Célibataire' },
  { key: 'married', label: 'Marié' }
];

export const PERSON_STATUS_BY_KEY = getByKey(PERSON_STATUS);

export const ID_TYPES = [
  { key: 'id', label: 'C.I.N.' },
  { key: 'studentCard', label: 'Carte d étudiant' },
  { key: 'passport', label: 'Passeport' },
  { key: 'residencePermit', label: 'Carte de séjour' }
];

export const ID_TYPES_BY_KEY = getByKey(ID_TYPES);

export const TREE_PAGES = [
  {
    title: 'Paramétrage',
    key: 'parametre',
    children: [
      { title: 'Lecture', key: 'ReadP' },
      { title: 'Suppression', key: 'deleteP' },
      { title: 'Création/Modification', key: 'create-updateP' }
    ]
  },
  {
    title: 'Utilisateur',
    key: 'users',
    children: [
      { title: 'Lecture', key: 'ReadU' },
      { title: 'Suppression', key: 'deleteU' },
      { title: 'Création/Modification', key: 'create-updateU' }
    ]
  }
];

export const PERIOD = [
  { key: 'daily', label: 'Hebdomadaire' },
  { key: 'monthly', label: 'Mensuel ' },
  { key: 'trimestre', label: 'Trimestrie' }
];

export const STOCK_INFORMATION = [
  { key: 'boolean', label: 'Affichage booléen' },
  { key: 'color', label: 'Affichage signalétique couleurs' },
  { key: 'real', label: 'Affichage stock réel' }
];

export const PAGES = [
  {
    key: 'items',
    to: '/items',
    icon: 'bar-chart',
    label: 'items',
    access: ['admin']
  },
  {
    key: 'games',
    to: '/jeux',
    icon: 'schedule',
    label: 'Matchs',
    access: ['admin']
  },
  {
    key: 'players',
    to: '/players',
    icon: 'team',
    label: 'Gestion joueurs',
    access: ['admin']
  },
  {
    key: 'events',
    to: '/events',
    icon: 'team',
    label: 'Evénements',
    access: ['admin']
  },
  {
    key: 'teams',
    to: '/teams',
    icon: 'team',
    label: 'Gestion équipes',
    access: ['admin']
  },
  {
    key: 'categories',
    to: '/categories',
    icon: 'team',
    label: 'Categories',
    access: ['admin']
  },
  {
    key: 'lands',
    to: '/lands',
    icon: 'home',
    label: 'Gestion terrains',
    access: ['admin']
  },
  {
    key: 'users',
    to: '/users',
    icon: 'user',
    label: 'Utilisateurs',
    access: ['admin']
  },
  {
    key: 'coaches',
    to: '/coaches',
    icon: 'copy',
    label: 'Entraineurs',
    access: ['admin']
  },
  {
    key: 'products',
    to: '/products',
    icon: 'shop',
    label: 'Boutique',
    access: ['admin']
  },
  {
    key: 'partners',
    to: '/partners',
    icon: 'team',
    label: 'Partenaires',
    access: ['admin']
  }
];

export const PAGES_BY_KEY = getByKey(PAGES);

export const DEFAULT_PAGE = {
  centralCashier: PAGES_BY_KEY['users'],
  financeManager: PAGES_BY_KEY['users'],
  siteManager: PAGES_BY_KEY['users'],
  admin: PAGES_BY_KEY['users']
};

export const state = [
  { id: '1', code: '1', nom: 'Adrar' },
  { id: '2', code: '2', nom: 'Chlef' },
  { id: '3', code: '3', nom: 'Laghouat' },
  { id: '4', code: '4', nom: 'Oum El Bouaghi' },
  { id: '5', code: '5', nom: 'Batna' },
  { id: '6', code: '6', nom: 'B\u00e9ja\u00efa' },
  { id: '7', code: '7', nom: 'Biskra' },
  { id: '8', code: '8', nom: 'B\u00e9char' },
  { id: '9', code: '9', nom: 'Blida' },
  { id: '10', code: '10', nom: 'Bouira' },
  { id: '11', code: '11', nom: 'Tamanrasset' },
  { id: '12', code: '12', nom: 'T\u00e9bessa' },
  { id: '13', code: '13', nom: 'Tlemcen' },
  { id: '14', code: '14', nom: 'Tiaret' },
  {
    id: '15',
    code: '15',
    nom: 'Tizi Ouzou'
  },
  { id: '16', code: '16', nom: 'Alger' },
  { id: '17', code: '17', nom: 'Djelfa' },
  {
    id: '18',
    code: '18',
    nom: 'Jijel'
  },
  { id: '19', code: '19', nom: 'S\u00e9tif' },
  { id: '20', code: '20', nom: 'Sa\u00efda' },
  {
    id: '21',
    code: '21',
    nom: 'Skikda'
  },
  { id: '22', code: '22', nom: 'Sidi Bel Abb\u00e8s' },
  {
    id: '23',
    code: '23',
    nom: 'Annaba'
  },
  { id: '24', code: '24', nom: 'Guelma' },
  { id: '25', code: '25', nom: 'Constantine' },
  {
    id: '26',
    code: '26',
    nom: 'M\u00e9d\u00e9a'
  },
  { id: '27', code: '27', nom: 'Mostaganem' },
  { id: '28', code: '28', nom: 'M Sila' },
  {
    id: '29',
    code: '29',
    nom: 'Mascara'
  },
  { id: '30', code: '30', nom: 'Ouargla' },
  { id: '31', code: '31', nom: 'Oran' },
  {
    id: '32',
    code: '32',
    nom: 'El Bayadh'
  },
  { id: '33', code: '33', nom: 'Illizi' },
  {
    id: '34',
    code: '34',
    nom: 'Bordj Bou Arreridj'
  },
  { id: '35', code: '35', nom: 'Boumerd\u00e8s' },
  {
    id: '36',
    code: '36',
    nom: 'El Tarf'
  },
  { id: '37', code: '37', nom: 'Tindouf' },
  { id: '38', code: '38', nom: 'Tissemsilt' },
  {
    id: '39',
    code: '39',
    nom: 'El Oued'
  },
  { id: '40', code: '40', nom: 'Khenchela' },
  { id: '41', code: '41', nom: 'Souk Ahras' },
  {
    id: '42',
    code: '42',
    nom: 'Tipaza'
  },
  { id: '43', code: '43', nom: 'Mila' },
  { id: '44', code: '44', nom: 'A\u00efn Defla' },
  {
    id: '45',
    code: '45',
    nom: 'Na\u00e2ma'
  },
  { id: '46', code: '46', nom: 'A\u00efn T\u00e9mouchent' },
  {
    id: '47',
    code: '47',
    nom: 'Gharda\u00efa'
  },
  { id: '48', code: '48', nom: 'Relizane' }
];

export const CLIENTGROUPEFIELDS = [
  {
    key: 'ERP',
    label: 'ref_ERP',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'name',
    label: 'Nom',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'adress',
    label: 'Adress',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'phone',
    label: 'Téléphone',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'email',
    label: 'email',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'geospaciallocation',
    label: 'Geospaciallocation',
    required: false,
    showInList: false,
    type: 'map',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'logo',
    label: 'Logo',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'state',
    label: 'Gouvernorat/ville',
    required: false,
    showInList: false,
    type: 'cascader',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres1',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres2',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres3',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres4',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres5',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  }
];

export const CLIENTGROUPEFIELDS_BY_KEY = getByKey(CLIENTGROUPEFIELDS);

export const CLIENTFIELDS = [
  {
    key: 'ERP',
    label: 'ref_ERP',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'name',
    label: 'Nom',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'adress',
    label: 'Adress',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'phone',
    label: 'Téléphone',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'email',
    label: 'email',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'geospaciallocation',
    label: 'Geospaciallocation',
    required: false,
    showInList: false,
    type: 'map',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres1',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres2',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres3',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres4',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres5',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  }
];

export const PRODUCT = [
  {
    key: 'ref_ERP',
    label: 'Ref_ERP',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'barcode',
    label: 'Barcode',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'name',
    label: 'Nom',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'description',
    label: 'Description',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qty',
    label: 'Quantity',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'photo',
    label: 'photo',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'instock',
    label: 'Instock',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'packing',
    label: 'packing',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'netWeight',
    label: 'netweight',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'grossWeight',
    label: 'grossweight',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: true
  },
  {
    key: 'volume',
    label: 'volume',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'unity ',
    label: 'unity ',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: false,
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres1',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres2',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres3',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres4',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  },
  {
    key: 'qres5',
    label: '',
    required: false,
    showInList: false,
    type: 'string',
    listValues: [],
    defaultValue: '',
    disabled: false,
    typeDisabled: false
  }
];

export const CLIENTFIELDS_BY_KEY = getByKey(CLIENTFIELDS);

export const PRODUCT_BY_KEY = getByKey(PRODUCT);

export const ALL_FIELDS = [...CLIENTGROUPEFIELDS, ...CLIENTFIELDS, ...PRODUCT];

export const FIELDS_CONTAINERS_BY_KEY = {
  CLIENTGROUPEFIELDS: 'clientGroupe',
  CLIENTFIELDS: 'client',
  PRODUCT: 'product'
};

export const FIELDS_CONTAINERS = Object.keys(FIELDS_CONTAINERS_BY_KEY).map(
  key => FIELDS_CONTAINERS_BY_KEY[key]
);
