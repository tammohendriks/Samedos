export type RundgangRaum = {
  id: string;
  name: string;
  nameEN: string;
  beschreibung: string;
  beschreibungEN: string;
  embedUrl: string;
};

export const rundgangRaeume: RundgangRaum[] = [
  {
    id: 'eingang',
    name: 'Eingang / Ausgang',
    nameEN: 'Entrance',
    beschreibung: 'Unser Eingangsbereich — der erste Blick beim Betreten der Praxis.',
    beschreibungEN: 'Our entrance area — the first view as you enter the practice.',
    embedUrl: 'https://www.google.com/maps/embed?pb=!4v1777029261980!6m8!1m7!1sCAoSHENJQUJJaER0Z0ZGN1FQZWVJdmdrOWpORTMzei0.!2m2!1d53.0931911!2d8.8071067!3f220!4f0!5f0.7820865974627469',
  },
  {
    id: 'eingangsflur',
    name: 'Eingangsflur',
    nameEN: 'Entrance Hall',
    beschreibung: 'Der Flur, der Sie vom Eingang in unsere Praxisräume führt.',
    beschreibungEN: 'The hallway leading from the entrance into our practice rooms.',
    embedUrl: 'https://www.google.com/maps/embed?pb=!4v1777029328800!6m8!1m7!1sCAoSHENJQUJJaERjbXpqZ3dRVGowc1llUjJZMGFjaDU.!2m2!1d53.0931842!2d8.8070911!3f300!4f0!5f0.7820865974627469',
  },
  {
    id: 'praxisflur-raum-1',
    name: 'Praxis-Flur zu Raum 1',
    nameEN: 'Hallway to Room 1',
    beschreibung: 'Der Zugang zu unserem ersten Untersuchungsraum.',
    beschreibungEN: 'The access to our first examination room.',
    embedUrl: 'https://www.google.com/maps/embed?pb=!4v1777029348749!6m8!1m7!1sCAoSHENJQUJJaEJtNW40VUhqR2xHX1BRbnMzTU1WUTE.!2m2!1d53.0931822!2d8.8070779!3f239.88747!4f0.11253999999999564!5f0.7820865974627469',
  },
  {
    id: 'raum-1',
    name: 'Raum 1',
    nameEN: 'Room 1',
    beschreibung: 'Unser erster Untersuchungs- und Behandlungsraum.',
    beschreibungEN: 'Our first examination and treatment room.',
    embedUrl: 'https://www.google.com/maps/embed?pb=!4v1777029366418!6m8!1m7!1sCAoSHENJQUJJaEJvbGNFXzNRaThhRXRfMWdZMXZrVTI.!2m2!1d53.0931726!2d8.807089!3f20!4f0!5f0.7820865974627469',
  },
  {
    id: 'praxisflur-raum-2',
    name: 'Praxis-Flur zu Raum 2',
    nameEN: 'Hallway to Room 2',
    beschreibung: 'Der Zugang zu unserem zweiten Untersuchungsraum.',
    beschreibungEN: 'The access to our second examination room.',
    embedUrl: 'https://www.google.com/maps/embed?pb=!4v1777029420877!6m8!1m7!1sCAoSHENJQUJJaEQyV2ZhMllrcDJtLUhIRzdJRjlaS18.!2m2!1d53.0931785!2d8.807063!3f100!4f20!5f0.7820865974627469',
  },
  {
    id: 'raum-2',
    name: 'Raum 2',
    nameEN: 'Room 2',
    beschreibung: 'Unser zweiter Untersuchungs- und Behandlungsraum.',
    beschreibungEN: 'Our second examination and treatment room.',
    embedUrl: 'https://www.google.com/maps/embed?pb=!4v1777029399260!6m8!1m7!1sCAoSHENJQUJJaEIxRXU2OU1sNmwtQWVGS2dtSmxvN1g.!2m2!1d53.09316889999999!2d8.807065399999999!3f340!4f0!5f0.7820865974627469',
  },
];
