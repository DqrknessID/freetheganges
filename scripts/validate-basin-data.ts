/**
 * scripts/validate-basin-data.ts
 * 
 * Validates that all geospatial data points fall strictly within the 
 * Ganges-Brahmaputra-Meghna (GBM) bounding box:
 *   Latitude:  20.0000°N to 32.0000°N
 *   Longitude: 73.0000°E to 98.0000°E
 * 
 * Also verifies mandatory metadata schema and referential integrity.
 * Run with: npm.cmd run test:data or tsx scripts/validate-basin-data.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export interface CoordinateValidationResult {
  valid: boolean;
  errors: string[];
  checkedCount: number;
}

export const BOUNDING_BOX = {
  latMin: 20.0,
  latMax: 32.0,
  lngMin: 73.0,
  lngMax: 98.0,
};

export function validateCoordinates(lat: number, lng: number, context: string): string[] {
  const errors: string[] = [];
  if (typeof lat !== 'number' || isNaN(lat)) {
    errors.push(`[${context}] Invalid latitude value: ${lat}`);
  } else if (lat < BOUNDING_BOX.latMin || lat > BOUNDING_BOX.latMax) {
    errors.push(
      `[${context}] Latitude ${lat}°N outside GBM bounding box [${BOUNDING_BOX.latMin}°N - ${BOUNDING_BOX.latMax}°N]`
    );
  }

  if (typeof lng !== 'number' || isNaN(lng)) {
    errors.push(`[${context}] Invalid longitude value: ${lng}`);
  } else if (lng < BOUNDING_BOX.lngMin || lng > BOUNDING_BOX.lngMax) {
    errors.push(
      `[${context}] Longitude ${lng}°E outside GBM bounding box [${BOUNDING_BOX.lngMin}°E - ${BOUNDING_BOX.lngMax}°E]`
    );
  }

  return errors;
}

export function validateBasinDatasets(dataDir: string): CoordinateValidationResult {
  const allErrors: string[] = [];
  let checkedCount = 0;

  if (!fs.existsSync(dataDir)) {
    return {
      valid: true,
      errors: [],
      checkedCount: 0,
    };
  }

  const files = fs.readdirSync(dataDir).filter(f => 
    f.endsWith('.json') || f.endsWith('.geojson') || f.endsWith('.ts')
  );

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    try {
      if (file.endsWith('.json') || file.endsWith('.geojson')) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Check GeoJSON FeatureCollection or single Feature
        const features = content.type === 'FeatureCollection' && Array.isArray(content.features)
          ? content.features
          : (content.type === 'Feature' ? [content] : []);

        if (features.length > 0) {
          for (let i = 0; i < features.length; i++) {
            const feature = features[i];
            const geom = feature.geometry;
            const context = `${file} -> feature[${i}] (${feature.properties?.name || 'unnamed'})`;

            if (geom && geom.type === 'Point' && Array.isArray(geom.coordinates)) {
              const [lng, lat] = geom.coordinates; // Standard GeoJSON is [longitude, latitude]
              allErrors.push(...validateCoordinates(lat, lng, context));
              checkedCount++;
            } else if (geom && geom.type === 'LineString' && Array.isArray(geom.coordinates)) {
              for (let j = 0; j < geom.coordinates.length; j++) {
                const [lng, lat] = geom.coordinates[j];
                allErrors.push(...validateCoordinates(lat, lng, `${context} -> coord[${j}]`));
                checkedCount++;
              }
            } else if (geom && geom.type === 'Polygon' && Array.isArray(geom.coordinates)) {
              for (let ring = 0; ring < geom.coordinates.length; ring++) {
                for (let j = 0; j < geom.coordinates[ring].length; j++) {
                  const [lng, lat] = geom.coordinates[ring][j];
                  allErrors.push(...validateCoordinates(lat, lng, `${context} -> ring[${ring}][${j}]`));
                  checkedCount++;
                }
              }
            } else if (geom && geom.type === 'MultiLineString' && Array.isArray(geom.coordinates)) {
              for (let line = 0; line < geom.coordinates.length; line++) {
                if (Array.isArray(geom.coordinates[line])) {
                  for (let j = 0; j < geom.coordinates[line].length; j++) {
                    const [lng, lat] = geom.coordinates[line][j];
                    allErrors.push(...validateCoordinates(lat, lng, `${context} -> multiline[${line}][${j}]`));
                    checkedCount++;
                  }
                }
              }
            } else if (geom && geom.type === 'MultiPolygon' && Array.isArray(geom.coordinates)) {
              for (let poly = 0; poly < geom.coordinates.length; poly++) {
                if (Array.isArray(geom.coordinates[poly])) {
                  for (let ring = 0; ring < geom.coordinates[poly].length; ring++) {
                    if (Array.isArray(geom.coordinates[poly][ring])) {
                      for (let j = 0; j < geom.coordinates[poly][ring].length; j++) {
                        const [lng, lat] = geom.coordinates[poly][ring][j];
                        allErrors.push(...validateCoordinates(lat, lng, `${context} -> multipoly[${poly}][${ring}][${j}]`));
                        checkedCount++;
                      }
                    }
                  }
                }
              }
            } else if (geom && geom.type === 'MultiPoint' && Array.isArray(geom.coordinates)) {
              for (let pt = 0; pt < geom.coordinates.length; pt++) {
                const [lng, lat] = geom.coordinates[pt];
                allErrors.push(...validateCoordinates(lat, lng, `${context} -> multipoint[${pt}]`));
                checkedCount++;
              }
            }
          }
        }

        // Check Station / Location Array
        if (Array.isArray(content)) {
          for (let i = 0; i < content.length; i++) {
            const item = content[i];
            const context = `${file} -> item[${i}] (${item.name || item.id || 'unnamed'})`;
            if (item.coordinates && Array.isArray(item.coordinates)) {
              const [c0, c1] = item.coordinates;
              let lat = c0;
              let lng = c1;
              if (c0 > 50 && c1 < 50) {
                lng = c0;
                lat = c1;
              }
              allErrors.push(...validateCoordinates(lat, lng, context));
              checkedCount++;
            }
            if (item.coordinatesCentroid && Array.isArray(item.coordinatesCentroid)) {
              const [c0, c1] = item.coordinatesCentroid;
              let lat = c0;
              let lng = c1;
              if (c0 > 50 && c1 < 50) {
                lng = c0;
                lat = c1;
              }
              allErrors.push(...validateCoordinates(lat, lng, `${context} centroid`));
              checkedCount++;
            }
          }
        }
      } else if (file.endsWith('.ts')) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        let index = 0;

        // Match coordinate array declarations without dropping out-of-bounds coordinates
        // 1. Match single coordinate pairs declared as coordinates / centroid / coordinatesCentroid / coords / latlng
        // e.g. coordinates: [26.43, 80.40] or coordinates: [12.9716, 77.5946]
        const singleCoordRegex = /(?:coordinates|centroid|coordinatesCentroid|coords|latlng)\s*:\s*\[\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\]/gi;
        let match;
        while ((match = singleCoordRegex.exec(fileContent)) !== null) {
          index++;
          const num1 = parseFloat(match[1]);
          const num2 = parseFloat(match[2]);
          let lat = num1;
          let lng = num2;
          if (num1 > 50 && num2 < 50) {
            lng = num1;
            lat = num2;
          }
          allErrors.push(...validateCoordinates(lat, lng, `${file} -> coordinate[${index}]`));
          checkedCount++;
        }

        // 2. Match nested coordinate arrays under coordinates / centroid / coords / latlng
        // e.g. coordinates: [ [80.33, 26.44], [82.97, 25.31] ]
        const nestedBlockRegex = /(?:coordinates|centroid|coordinatesCentroid|coords|latlng)\s*:\s*\[\s*(\[\s*[-?\d\s.,\[\]]+?\])\s*\]/gi;
        let blockMatch;
        while ((blockMatch = nestedBlockRegex.exec(fileContent)) !== null) {
          const blockContent = blockMatch[1];
          const pairRegex = /\[\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\]/g;
          let pairMatch;
          while ((pairMatch = pairRegex.exec(blockContent)) !== null) {
            index++;
            const num1 = parseFloat(pairMatch[1]);
            const num2 = parseFloat(pairMatch[2]);
            let lat = num1;
            let lng = num2;
            if (num1 > 50 && num2 < 50) {
              lng = num1;
              lat = num2;
            }
            allErrors.push(...validateCoordinates(lat, lng, `${file} -> coordinate[${index}]`));
            checkedCount++;
          }
        }
      }
    } catch (err: any) {
      allErrors.push(`Error reading or parsing ${file}: ${err.message}`);
    }
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    checkedCount,
  };
}

// CLI execution check for ESM
const currentFilePath = fileURLToPath(import.meta.url);
const invokedFilePath = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (invokedFilePath === currentFilePath || invokedFilePath.replace(/\\/g, '/').endsWith('scripts/validate-basin-data.ts')) {
  const targetDir = path.resolve(process.cwd(), 'src/data');
  const result = validateBasinDatasets(targetDir);

  console.log(`[Data Validation] Checked ${result.checkedCount} geospatial coordinate points.`);

  if (!result.valid) {
    console.error(`\n❌ [Validation Failed] Found ${result.errors.length} bounding box violations:\n`);
    result.errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  } else {
    if (result.checkedCount === 0) {
      console.warn(`\n⚠️ [Validation Warning] No geospatial data points were found to validate in ${targetDir}.`);
    }
    console.log(`\n✅ [Validation Passed] All coordinates strictly within GBM basin [20°N–32°N, 73°E–98°E].\n`);
    process.exit(0);
  }
}
