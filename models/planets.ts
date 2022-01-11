import { join } from 'https://deno.land/std/path/mod.ts';
import { BufReader } from 'https://deno.land/std/io/mod.ts';
import { parse } from 'https://deno.land/std/encoding/csv.ts';

import * as _ from 'https://raw.githubusercontent.com/lodash/lodash/es/lodash.js';

type Planet = Record<string, string>;

let planets: Array<Planet>;

async function loadPlanetsData() {
  const path = join('data', 'planets.csv');
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: '#',
  });

  Deno.close(file.rid);

  const planets = (result as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarRadius = Number(planet["koi_srad"]);
    const stellarMass = Number(planet["koi_smass"]);

    return planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 && planetaryRadius < 1.5 &&
      stellarRadius > 0.98 && stellarRadius < 1.02 &&
      stellarMass > 0.78 && stellarMass < 1.04;
  });

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
console.log(`${planets.length} habitable planets found`);

export function getAll() {
  return planets;
}
