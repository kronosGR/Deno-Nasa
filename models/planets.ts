import { join, BufReader, parse } from '../debs.ts';

import * as _ from 'https://raw.githubusercontent.com/lodash/lodash/es/lodash.js';
import * as log from 'https://deno.land/std/log/mod.ts';

type Planet = Record<string, string>;

let planets: Array<Planet>;

export function filterHabitablePlanets(planets: Array<Planet>) {
  return planets.filter((planet) => {
    const planetaryRadius = Number(planet['koi_prad']);
    const stellarRadius = Number(planet['koi_srad']);
    const stellarMass = Number(planet['koi_smass']);

    return (
      planet['koi_disposition'] === 'CONFIRMED' &&
      planetaryRadius > 0.5 &&
      planetaryRadius < 1.5 &&
      stellarRadius > 0.99 &&
      stellarRadius < 1.01 &&
      stellarMass > 0.78 &&
      stellarMass < 1.04
    );
  });
}

async function loadPlanetsData() {
  const path = join('data', 'planets.csv');
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: '#',
  });

  Deno.close(file.rid);

  const planets = filterHabitablePlanets(result as Array<Planet>);

  return planets.map((planet) => {
    return _.pick(planet, [
      'koi_prad',
      'koi_smass',
      'koi_srad',
      'kepler_name',
      'koi_count',
    ]);
  });
}

planets = await loadPlanetsData();
log.info(`${planets.length} habitable planets found`);

export function getAll() {
  return planets;
}
