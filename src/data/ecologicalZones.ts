import { EcologicalZone } from '../types/geo';

export const ecologicalZones: EcologicalZone[] = [
  {
    id: 'ECO-01',
    name: 'Sundarbans Mangrove Delta',
    category: 'Mangrove Delta',
    coordinatesCentroid: [21.9497, 89.1833],
    areaSqKm: 10000,
    protectionStatus: 'UNESCO World Heritage / Ramsar Site',
    threatTier: 'Critical',
    keySpecies: [
      'Panthera tigris tigris (Bengal Tiger)',
      'Platanista gangetica (Ganges River Dolphin)',
      'Heritiera fomes (Sundari Mangrove)'
    ],
    primaryThreats: [
      'Salinity intrusion from upstream freshwater diversion',
      'Farakka Barrage low dry-season discharge',
      'Rampal coal plant runoff',
      'Cyclonic storm surges'
    ],
    sourceReference: 'UNESCO World Heritage Centre / Ramsar Site #560'
  },
  {
    id: 'ECO-02',
    name: 'East Kolkata Wetlands',
    category: 'Ramsar Wetland',
    coordinatesCentroid: [22.4500, 88.4500],
    areaSqKm: 125,
    protectionStatus: 'Ramsar Site (#1208)',
    threatTier: 'Critical',
    keySpecies: [
      'Indigenous waterfowl species',
      'Freshwater teleost fishes',
      'Natural sewage microphytes'
    ],
    primaryThreats: [
      'Real estate urban encroachment',
      'Untreated tannery wastewater ingress',
      'Municipal solid waste landfill dumping'
    ],
    sourceReference: 'Ramsar Wetlands Information Sheet #1208'
  },
  {
    id: 'ECO-03',
    name: 'Tanguar Haor Wetland',
    category: 'Haor Basin',
    coordinatesCentroid: [25.1200, 91.0700],
    areaSqKm: 100,
    protectionStatus: 'Ramsar Site (#1031)',
    threatTier: 'High',
    keySpecies: [
      'Tor tor (Mahseer)',
      'Aythya baeri (Baers Pochard)',
      'Freshwater swamp forest species'
    ],
    primaryThreats: [
      'Acidic coal mining runoff from Meghalaya hills',
      'Overfishing during seasonal drying',
      'Illegal vegetation cutting'
    ],
    sourceReference: 'IUCN Bangladesh / Ramsar Convention #1031'
  },
  {
    id: 'ECO-04',
    name: 'Hakaluki Haor Basin',
    category: 'Haor Basin',
    coordinatesCentroid: [24.6500, 92.0500],
    areaSqKm: 181,
    protectionStatus: 'Ecologically Critical Area (ECA)',
    threatTier: 'High',
    keySpecies: [
      'Migratory waterbirds',
      'Clarias batrachus (Walking catfish)',
      'Anas crecca (Common teal)'
    ],
    primaryThreats: [
      'Agrochemical pesticide runoff',
      'Upstream soil erosion and rapid siltation',
      'Unregulated embankment construction'
    ],
    sourceReference: 'DoE Bangladesh ECA Management Framework'
  },
  {
    id: 'ECO-05',
    name: 'Vikramshila Gangetic Dolphin Sanctuary',
    category: 'Dolphin Sanctuary',
    coordinatesCentroid: [25.2600, 87.0500],
    areaSqKm: 60,
    protectionStatus: 'National Protected Wildlife Sanctuary',
    threatTier: 'Critical',
    keySpecies: [
      'Platanista gangetica (Ganges River Dolphin)',
      'Lutrogale perspicillata (Smooth-coated otter)',
      'Freshwater riverine turtles'
    ],
    primaryThreats: [
      'Riverbed dredging for commercial navigation',
      'Accidental entanglement in monofilament gillnets',
      'Acoustic disturbance from motorized vessels',
      'Thermal power plant fly ash deposition'
    ],
    sourceReference: 'Wildlife Institute of India / MoEFCC'
  },
  {
    id: 'ECO-06',
    name: 'Upper Ganges River (Brijghat to Narora)',
    category: 'Ramsar Wetland',
    coordinatesCentroid: [28.4500, 78.2500],
    areaSqKm: 265,
    protectionStatus: 'Ramsar Site (#1571)',
    threatTier: 'High',
    keySpecies: [
      'Gavialis gangeticus (Gharial)',
      'Crocodylus palustris (Mugger Crocodile)',
      'Ganges River Dolphin'
    ],
    primaryThreats: [
      'Water abstraction for agricultural irrigation canals',
      'Agrochemical pesticide leaching',
      'Barrage structures fragmenting populations'
    ],
    sourceReference: 'WWF India Living Ganga Programme / Ramsar #1571'
  },
  {
    id: 'ECO-07',
    name: 'Kosi Dynamic Mega-Fan Floodplain',
    category: 'Alluvial Floodplain',
    coordinatesCentroid: [26.0000, 86.8000],
    areaSqKm: 15000,
    protectionStatus: 'Vulnerable Floodplain Eco-zone',
    threatTier: 'High',
    keySpecies: [
      'Floodplain wetland avifauna',
      'Sub-Himalayan alluvial fish species',
      'Riparian wetland vegetation'
    ],
    primaryThreats: [
      'Extreme coarse sediment deposition',
      'Erratic river course avulsions',
      'Embankment breach and flood hazard'
    ],
    sourceReference: 'Geological Survey of India River Basins Study'
  }
];
