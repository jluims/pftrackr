export interface GymsResponse {
  showClubClusters: boolean;
  clubs: Club[];
  center: number[];
  placeName: string;
  clubsTotalCount: number;
  messages: Messages;
  isNewDesign: boolean;
}

export interface Club {
  id: string;
  pfClubId: string;
  posClubId: string;
  name: string;
  slug: string;
  googleAnalytics4Id: string;
  franchiseGroup: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  telephone: string;
  telephoneLink: string;
  status: string;
  indicatorProps: IndicatorProps;
  hours: Hours;
  holidayHours: any[];
  links: Links;
  linkNumbers: number;
  location: Location;
  distance: number;
  banner: any;
  amenities: Amenities;
  equipments: Equipments;
  isPresaleSoon: boolean;
  isPresale: boolean;
  topLevelDomain: string;
}

export interface IndicatorProps {
  isVisible: boolean;
}

export interface Hours {
  status: boolean;
}

export interface Links {
  careers: string;
  offersPage: OffersPage;
}

export interface OffersPage {
  en: string;
  es: string;
}

export interface Location {
  address: string;
  latitude: string;
  longitude: string;
}

export interface Amenities {
  classic: string[];
  blackCard: string[];
}

export interface Equipments {
  Cardio: string[];
  Strength: string[];
  Functional: string[];
}

export interface Messages {
  gyms: Gyms;
  header: Header;
  footer: Footer;
  labels: Labels;
}

export interface Gyms {
  searchPlaceholder: string;
  noResults: string;
  currentLocation: string;
  nearYou: string;
  showingClubs: string;
  noClubsNearby: string;
  clubDetails: string;
  preRegisterOldDesign: string;
  preRegister: string;
  reviewPlans: string;
  showMoreClubs: string;
  noClubsWithin: string;
  metaTitle: string;
  metaDescription: string;
  zoomIn: string;
  zoomOut: string;
  findLocation: string;
  locationNotAvailable: string;
  clear: string;
}

export interface Header {
  aboutPF: string;
  myAccount: string;
  search: string;
  joinUs: string;
  findCLub: string;
  englishLabel: string;
  spanishLabel: string;
  unitedStatesLabel: string;
  canadaLabel: string;
  panamaLabel: string;
  mexicoLabel: string;
  australiaLabel: string;
  logoLabelAndAlt: string;
  memberships: string;
  whyPF: string;
  whyPlanetFitness: string;
  aboutPlanetFitness: string;
  PFApp: string;
  blog: string;
  workOutWithUs: string;
  pfStore: string;
  signIn: string;
  joinNow: string;
  USEnglishLabel: string;
  USSpanishLabel: string;
  CanadaLabel: string;
  PanamaLabel: string;
  MexicoLabel: string;
  AustraliaLabel: string;
  region: string;
  needHelp: string;
  memberPerks: string;
  atTheClubLink: string;
  selectRegion: string;
  closeHamburgerMenu: string;
  openHamburgerMenu: string;
  ourClubs: string;
}

export interface Footer {
  backToTop: string;
  findClub: string;
  blog: string;
  aboutPF: string;
  careers: string;
  memberships: string;
  newsroom: string;
  PFStore: string;
  franchisee: string;
  customService: string;
  privacyPolicy: string;
  termsAndConditions: string;
  investorRelations: string;
  siteMap: string;
  oneTrustButton: string;
  EUPrivacyRights: string;
  EUPrivacyRightsNew: string;
  accessibility: string;
  facebook: string;
  facebookLink: string;
  instagram: string;
  instagramLink: string;
  youtube: string;
  youtubeLink: string;
  tiktok: string;
  tiktokLink: string;
  downloadAppLinkLabel: string;
  info: string;
  partners: string;
  legal: string;
  FAQs: string;
  pfPurpose: string;
  followUs: string;
  smallLogo: string;
  oneTrustId: string;
}

export interface Labels {
  PRESALE_label: string;
  PRESALE_SOON_label: string;
  NOW_OPEN_label: string;
  TC_label: string;
  TCWEATHER_label: string;
  TCSTORM_label: string;
  TCCONSTRUCTION_label: string;
  TCRELOCATION_label: string;
  TCPOWEROUTAGE_label: string;
  TCWATERSHUTOFF_label: string;
  TCNEWEQUIPMENT_label: string;
  PBCSPA_label: string;
  PNEWEQ_label: string;
  PNEWCARDIOEQ_label: string;
  PNEWSTRENGTHEQ_label: string;
  PNEWFUNCTIONALEQ_label: string;
  PNEWHOURS_label: string;
  POPENINGSPRING_label: string;
  POPENINGFALL_label: string;
  POPENINGSUMMER_label: string;
  POPENINGWINTER_label: string;
}
