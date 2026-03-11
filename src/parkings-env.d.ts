interface Parking {
  id: string;
  name: string;
  lastupdate: string;
  totalcapacity: number;
  availablecapacity: number;
  occupation: number;
  type: string;
  description: string;
  openingtimesdescription: string;
  isopennow: number;
  temporaryclosed: number;
  operatorinformation: string;
  freeparking: number;
  urllinkaddress: string;
  occupancytrend: string;
  locationanddimension: string;
  location: {
    lon: number;
    lat: number;
  };
  text: string | null;
  categorie: string;
  dashboard: string;
}