const turf = require("@turf/turf");

//Create point (lon, lat) and its name
const charlotte = turf.point([-80.8431, 35.2271], {name : "Charlotte" });
const raleigh = turf.point([-78.6382, 35.7796], {name : "Raleigh" });
const atlanta = turf.point([-84.3880, 33.7490], { name: "Atlanta" });

const distanceKM = turf.distance(charlotte, raleigh, { units: "kilometers" });
console.log(`Distance from Charlotte to Raleigh: ${distanceKM.toFixed(1)} km` );

const bboxPolygon = turf.polygon([
    [
        [-85, 33],//lower left
        [-75, 33],//lower right
        [-75, 37],//upper right
        [-85, 37],//upper left
        [-85, 33],//back to start close box
    ],
], {name: "NC-ish box"});

const cities = turf.featureCollection([charlotte, raleigh, atlanta]);

const citiesInside = cities.features.filter((city) =>
    turf.booleanPointInPolygon(city, bboxPolygon)
);

console.log("Cities inside NC-ish box:");
for( const city of citiesInside)
{
    console.log(` - ${city.properties.name}`);
}

const charlotteBuffer = turf.buffer(charlotte, 50, { units: "kilometers"});

const output = turf.featureCollection([
    bboxPolygon,
    charlotteBuffer,
    ...cities.features,
]);

console.log("\nGeoJSON output (copy into a view if you want to see it on a map):");
console.log(JSON.stringify(output));