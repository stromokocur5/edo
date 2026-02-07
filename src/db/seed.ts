import { CITIES_DATA } from '../lib/data';

// This script seeds the D1 database with existing data from data.ts
// Run with: npx wrangler d1 execute edo-db --local --file=./src/db/seed.sql

export function generateSeedSQL(): string {
    const statements: string[] = [];

    // Insert cities
    for (const city of CITIES_DATA) {
        statements.push(`
INSERT OR REPLACE INTO cities (id, name, lat, lng) 
VALUES ('${city.id}', '${city.name}', ${city.lat}, ${city.lng});`);

        // Insert places for each city
        for (const place of city.places) {
            const tagsJson = JSON.stringify(place.tags).replace(/'/g, "''");
            const description = place.description.replace(/'/g, "''");
            const name = place.name.replace(/'/g, "''");
            const googleMapsLink = place.googleMapsLink ? `'${place.googleMapsLink}'` : 'NULL';

            statements.push(`
INSERT OR REPLACE INTO places (id, city_id, name, category, description, lat, lng, tags, image, google_maps_link)
VALUES ('${place.id}', '${city.id}', '${name}', '${place.category}', '${description}', ${place.lat}, ${place.lng}, '${tagsJson}', '${place.image}', ${googleMapsLink});`);
        }
    }

    return statements.join('\n');
}

// For CLI usage
if (typeof process !== 'undefined' && process.argv[1]?.includes('seed')) {
    console.log(generateSeedSQL());
}
