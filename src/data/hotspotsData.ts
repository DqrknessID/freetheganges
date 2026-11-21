import { HotspotLocation } from '../types/geo';

export const hotspotsData: HotspotLocation[] = [
  {
    id: 'HS-01',
    name: 'Kanpur Jajmau & Sisamau Industrial Reach',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    country: 'India',
    coordinates: [26.4300, 80.4000],
    category: 'Industrial Tannery Effluent & Heavy Metals',
    severity: 'Critical',
    trajectory: 'Worsening',
    primaryPollutants: ['Hexavalent Chromium (Cr-VI)', 'Tannery Sludge', 'BOD', 'COD'],
    dischargeMld: 450,
    indicators: [
      {
        name: 'Hexavalent Chromium (Cr-VI)',
        value: 48.5,
        unit: 'mg/L',
        standard: 0.05,
        standardSource: 'WHO Drinking Limit',
        exceeded: true
      },
      {
        name: 'Biochemical Oxygen Demand (BOD)',
        value: 84.0,
        unit: 'mg/L',
        standard: 3.0,
        standardSource: 'CPCB Class B Standard',
        exceeded: true
      },
      {
        name: 'Chemical Oxygen Demand (COD)',
        value: 340.0,
        unit: 'mg/L',
        standard: 25.0,
        standardSource: 'CPCB Surface Baseline',
        exceeded: true
      },
      {
        name: 'Total Dissolved Solids (TDS)',
        value: 3850.0,
        unit: 'mg/L',
        standard: 1000.0,
        standardSource: 'WHO Permissible Limit',
        exceeded: true
      }
    ],
    context: 'Over 400 tanneries cluster along the Jajmau reach. Despite the 36 MLD Common Effluent Treatment Plant (CETP), extreme hydraulic overloading leads to chronic unmetered discharges via Sisamau Nala directly into the main stem of the Ganges.',
    sources: [
      'CPCB Real-Time Water Quality Network',
      'National Mission for Clean Ganga (NMCG)'
    ],
    confidenceScore: 94,
    affectedPopulation: 2900000,
    keyDrivers: 'Tannery beamhouse processing, chrome tanning washings, unlined sludge storage, municipal wastewater mixing'
  },
  {
    id: 'HS-02',
    name: 'Varanasi Assi & Varuna Ghats',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    coordinates: [25.3176, 83.0062],
    category: 'Municipal Sewage & Ritual Loading',
    severity: 'Critical',
    trajectory: 'Worsening',
    primaryPollutants: ['Fecal Coliform', 'BOD', 'Ammonia', 'Cremation Residues'],
    dischargeMld: 320,
    indicators: [
      {
        name: 'Fecal Coliform',
        value: 64000,
        unit: 'MPN/100mL',
        standard: 500,
        standardSource: 'CPCB Bathing Standard',
        exceeded: true
      },
      {
        name: 'Biochemical Oxygen Demand (BOD)',
        value: 16.4,
        unit: 'mg/L',
        standard: 3.0,
        standardSource: 'CPCB Bathing Limit',
        exceeded: true
      },
      {
        name: 'Dissolved Oxygen (DO)',
        value: 3.8,
        unit: 'mg/L',
        standard: 5.0,
        standardSource: 'CPCB Minimum Class B',
        exceeded: true
      }
    ],
    context: 'Assi Nala and Varuna River empty untreated sewage and ritual crematorium residues along the historic ghats, causing immense microbial contamination and organic deoxygenation.',
    sources: [
      'CPCB Real-Time Water Quality Network',
      'Uttar Pradesh Pollution Control Board (UPPCB)'
    ],
    confidenceScore: 91,
    affectedPopulation: 1450000,
    keyDrivers: 'Urban sewage overflow, pilgrimage bathing surges, crematorium ash and bio-matter deposition'
  },
  {
    id: 'HS-03',
    name: 'Prayagraj Sangam & Salori Reach',
    city: 'Prayagraj',
    state: 'Uttar Pradesh',
    country: 'India',
    coordinates: [25.4299, 81.8845],
    category: 'Pilgrimage Load & Sewage Bypass',
    severity: 'High',
    trajectory: 'Unchanging',
    primaryPollutants: ['BOD', 'COD', 'Phosphates', 'Nitrates'],
    dischargeMld: 260,
    indicators: [
      {
        name: 'Biochemical Oxygen Demand (BOD)',
        value: 7.2,
        unit: 'mg/L',
        standard: 3.0,
        standardSource: 'CPCB Bathing Standard',
        exceeded: true
      },
      {
        name: 'Fecal Coliform',
        value: 18000,
        unit: 'MPN/100mL',
        standard: 500,
        standardSource: 'CPCB Bathing Standard',
        exceeded: true
      },
      {
        name: 'Phosphates',
        value: 1.8,
        unit: 'mg/L',
        standard: 0.5,
        standardSource: 'CPCB Eutrophication Limit',
        exceeded: true
      }
    ],
    context: 'The confluence of Ganga and Yamuna faces intermittent municipal sewer bypass from Salori and Rasoolabad drains, compounded during mass bathing festivals.',
    sources: [
      'CPCB Confluence Monitoring Group',
      'National Green Tribunal Dossiers'
    ],
    confidenceScore: 89,
    affectedPopulation: 1200000,
    keyDrivers: 'Intermittent treatment bypass, urban runoff, religious congregations'
  },
  {
    id: 'HS-04',
    name: 'Patna Urban Outfalls (Digha & Mandiri)',
    city: 'Patna',
    state: 'Bihar',
    country: 'India',
    coordinates: [25.6100, 85.1400],
    category: 'Urban Raw Sewage & Plastic Accumulation',
    severity: 'Critical',
    trajectory: 'Worsening',
    primaryPollutants: ['Untreated Sewage', 'Microplastics', 'Lead', 'BOD'],
    dischargeMld: 340,
    indicators: [
      {
        name: 'Biochemical Oxygen Demand (BOD)',
        value: 24.5,
        unit: 'mg/L',
        standard: 3.0,
        standardSource: 'CPCB Class C Standard',
        exceeded: true
      },
      {
        name: 'Total Suspended Solids (TSS)',
        value: 280,
        unit: 'mg/L',
        standard: 50,
        standardSource: 'CPCB Effluent Standard',
        exceeded: true
      },
      {
        name: 'Lead (Pb)',
        value: 0.04,
        unit: 'mg/L',
        standard: 0.01,
        standardSource: 'WHO Drinking Limit',
        exceeded: true
      }
    ],
    context: 'Major open city drains including Digha and Mandiri discharge untreated raw municipal wastewater and storm debris directly into the Ganges riverbank.',
    sources: [
      'Bihar State Pollution Control Board',
      'Mahavir Cancer Sansthan Research'
    ],
    confidenceScore: 88,
    affectedPopulation: 2050000,
    keyDrivers: 'Deficit in sewage interception network, high density urban runoff, hospital waste leaching'
  },
  {
    id: 'HS-05',
    name: 'Kolkata Hooghly Industrial Belt',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    coordinates: [22.5726, 88.3639],
    category: 'Tidal Estuary Industrial & Urban Surcharge',
    severity: 'Critical',
    trajectory: 'Worsening',
    primaryPollutants: ['Industrial Organochlorines', 'Mercury', 'Heavy Metals', 'Untreated Sewage'],
    dischargeMld: 800,
    indicators: [
      {
        name: 'Chemical Oxygen Demand (COD)',
        value: 185.0,
        unit: 'mg/L',
        standard: 25.0,
        standardSource: 'CPCB Baseline',
        exceeded: true
      },
      {
        name: 'Fecal Coliform',
        value: 110000,
        unit: 'MPN/100mL',
        standard: 500,
        standardSource: 'CPCB Bathing Standard',
        exceeded: true
      },
      {
        name: 'Mercury (Hg)',
        value: 2.4,
        unit: 'µg/L',
        standard: 1.0,
        standardSource: 'WHO Drinking Standard',
        exceeded: true
      }
    ],
    context: 'Dozens of jute mills, paper manufacturing units, chemical plants, and municipal canals discharge immense toxic and organic loads along both banks of the Hooghly tidal corridor.',
    sources: [
      'West Bengal Pollution Control Board',
      'School of Environmental Studies JU'
    ],
    confidenceScore: 92,
    affectedPopulation: 4500000,
    keyDrivers: 'Heavy industrial concentration, legacy canal discharges, estuarine tidal sloshing trapping pollutants'
  },
  {
    id: 'HS-06',
    name: 'Haldia Industrial & Petrochem Estuary',
    city: 'Haldia',
    state: 'West Bengal',
    country: 'India',
    coordinates: [22.0600, 88.0600],
    category: 'Petrochemical & Shipping Hydrocarbons',
    severity: 'High',
    trajectory: 'Developing',
    primaryPollutants: ['Phenols', 'Hydrocarbons', 'Lead', 'Oil and Grease'],
    dischargeMld: 180,
    indicators: [
      {
        name: 'Phenolic Compounds',
        value: 1.2,
        unit: 'mg/L',
        standard: 0.001,
        standardSource: 'CPCB Surface Water Norm',
        exceeded: true
      },
      {
        name: 'Oil and Grease',
        value: 18.5,
        unit: 'mg/L',
        standard: 10.0,
        standardSource: 'CPCB Inland Water Standards',
        exceeded: true
      },
      {
        name: 'Total Dissolved Solids (TDS)',
        value: 14500,
        unit: 'mg/L',
        standard: 2100,
        standardSource: 'Marine Influx Standard',
        exceeded: true
      }
    ],
    context: 'Major petrochemical refining, battery fabrication, and commercial deepwater shipping generate chemical wastewater in the sensitive estuarine mangrove transition.',
    sources: [
      'Haldia Port Trust Environmental Cell',
      'West Bengal PCB Coastal Cell'
    ],
    confidenceScore: 87,
    affectedPopulation: 200000,
    keyDrivers: 'Refinery cooling effluents, chemical tanker ballasting, coastal battery manufacturing runoffs'
  },
  {
    id: 'HS-07',
    name: 'Dhaka Buriganga River (Hazaribagh-Sadarghat)',
    city: 'Dhaka',
    state: 'Dhaka',
    country: 'Bangladesh',
    coordinates: [23.7080, 90.4120],
    category: 'Biological Anoxia & Legacy Heavy Metals',
    severity: 'Critical',
    trajectory: 'Worsening',
    primaryPollutants: ['Chromium', 'Lead', 'Raw Sewage', 'Ammonia'],
    dischargeMld: 500,
    indicators: [
      {
        name: 'Dissolved Oxygen (DO)',
        value: 0.2,
        unit: 'mg/L',
        standard: 5.0,
        standardSource: 'Bangladesh ECR Standard',
        exceeded: true
      },
      {
        name: 'Biochemical Oxygen Demand (BOD)',
        value: 125.0,
        unit: 'mg/L',
        standard: 6.0,
        standardSource: 'Bangladesh ECR Limit',
        exceeded: true
      },
      {
        name: 'Total Chromium',
        value: 4.8,
        unit: 'mg/L',
        standard: 0.05,
        standardSource: 'WHO Guideline',
        exceeded: true
      }
    ],
    context: 'Buriganga suffers complete biological death during dry season with DO falling below 0.5 mg/L due to combined urban outfalls, plastic sludge, and historic tannery sediment leaching.',
    sources: [
      'Department of Environment (DoE) Bangladesh',
      'BUET Environmental Engineering'
    ],
    confidenceScore: 95,
    affectedPopulation: 10200000,
    keyDrivers: 'Massive untreated municipal sewerage, unlined riverbed chemical sludge, commercial ferry bunkering'
  },
  {
    id: 'HS-08',
    name: 'Tongi Khal & Turag River Corridor',
    city: 'Gazipur',
    state: 'Dhaka',
    country: 'Bangladesh',
    coordinates: [23.8900, 90.3950],
    category: 'Textile Wet Processing & Azo Dyes',
    severity: 'Critical',
    trajectory: 'Worsening',
    primaryPollutants: ['Textile Dyes', 'Cadmium', 'Surfactants', 'High Alkalinity'],
    dischargeMld: 220,
    indicators: [
      {
        name: 'Chemical Oxygen Demand (COD)',
        value: 420.0,
        unit: 'mg/L',
        standard: 200.0,
        standardSource: 'Bangladesh ECR Limit',
        exceeded: true
      },
      {
        name: 'Cadmium (Cd)',
        value: 0.035,
        unit: 'mg/L',
        standard: 0.003,
        standardSource: 'WHO Standard',
        exceeded: true
      },
      {
        name: 'Dissolved Oxygen (DO)',
        value: 0.8,
        unit: 'mg/L',
        standard: 5.0,
        standardSource: 'Bangladesh ECR Standard',
        exceeded: true
      }
    ],
    context: 'Dense cluster of textile dyeing and garment washing factories discharging intense alkaline synthetic dye wastewater into Tongi Khal and upper Turag.',
    sources: [
      'DoE Dhaka Division Monitoring Unit',
      'Waterkeeper Alliance Bangladesh'
    ],
    confidenceScore: 90,
    affectedPopulation: 2500000,
    keyDrivers: 'Rapid industrial expansion, illegal overnight wastewater discharges, lack of centralized ETP management'
  },
  {
    id: 'HS-09',
    name: 'Narayanganj Shitalakshya River',
    city: 'Narayanganj',
    state: 'Dhaka',
    country: 'Bangladesh',
    coordinates: [23.6200, 90.5000],
    category: 'Knitwear Dyeing & Industrial Effluent',
    severity: 'Critical',
    trajectory: 'Worsening',
    primaryPollutants: ['Reactive Dyes', 'Lead', 'Cadmium', 'High pH'],
    dischargeMld: 350,
    indicators: [
      {
        name: 'Dissolved Oxygen (DO)',
        value: 1.1,
        unit: 'mg/L',
        standard: 5.0,
        standardSource: 'Bangladesh ECR Standard',
        exceeded: true
      },
      {
        name: 'Biochemical Oxygen Demand (BOD)',
        value: 68.0,
        unit: 'mg/L',
        standard: 6.0,
        standardSource: 'Bangladesh ECR Standard',
        exceeded: true
      },
      {
        name: 'Lead (Pb)',
        value: 0.08,
        unit: 'mg/L',
        standard: 0.01,
        standardSource: 'WHO Drinking Limit',
        exceeded: true
      }
    ],
    context: 'Major knitwear, garment dyeing, and chemical washing belt discharging deeply colored, untreated industrial effluent directly threatening municipal water intakes.',
    sources: [
      'DoE Narayanganj District Office',
      'BWDB Hydrology Directorate'
    ],
    confidenceScore: 92,
    affectedPopulation: 1600000,
    keyDrivers: 'Export-oriented dyeing mills, river transport loading leaks, insufficient regulatory enforcement'
  },
  {
    id: 'HS-10',
    name: 'Chattogram Karnaphuli Industrial Belt',
    city: 'Chittagong',
    state: 'Chittagong',
    country: 'Bangladesh',
    coordinates: [22.3300, 91.8300],
    category: 'Maritime Industrial & Pulp Mill Effluent',
    severity: 'High',
    trajectory: 'Developing',
    primaryPollutants: ['Organochlorines', 'Heavy Metals', 'Petroleum Sludge'],
    dischargeMld: 280,
    indicators: [
      {
        name: 'Chemical Oxygen Demand (COD)',
        value: 240.0,
        unit: 'mg/L',
        standard: 200.0,
        standardSource: 'Bangladesh ECR Limit',
        exceeded: true
      },
      {
        name: 'Oil and Grease',
        value: 26.0,
        unit: 'mg/L',
        standard: 10.0,
        standardSource: 'Bangladesh ECR Standard',
        exceeded: true
      },
      {
        name: 'Total Suspended Solids (TSS)',
        value: 310,
        unit: 'mg/L',
        standard: 150,
        standardSource: 'Bangladesh ECR Standard',
        exceeded: true
      }
    ],
    context: 'Shipbreaking activities, upstream paper pulp discharge, and urban petrochemical bunkering impact the Karnaphuli river corridor before marine outflow.',
    sources: [
      'DoE Chattogram Regional Laboratory',
      'Chittagong University Marine Sciences'
    ],
    confidenceScore: 89,
    affectedPopulation: 3100000,
    keyDrivers: 'Ship recycling yards at Sitakunda, upstream paper bleaching chemicals, seaport bunkering spillage'
  },
  {
    id: 'HS-11',
    name: 'Delhi Yamuna Reach (Wazirabad to Okhla)',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    coordinates: [28.6139, 77.2400],
    category: 'Severe Sewage Anoxia & Toxic Detergent Foam',
    severity: 'Critical',
    trajectory: 'Worsening',
    primaryPollutants: ['Toxic Foam (Surfactants)', 'Ammonia', 'Lead', 'BOD'],
    dischargeMld: 1800,
    indicators: [
      {
        name: 'Biochemical Oxygen Demand (BOD)',
        value: 58.0,
        unit: 'mg/L',
        standard: 3.0,
        standardSource: 'CPCB Class B Standard',
        exceeded: true
      },
      {
        name: 'Dissolved Oxygen (DO)',
        value: 0.0,
        unit: 'mg/L',
        standard: 5.0,
        standardSource: 'CPCB Bathing Limit',
        exceeded: true
      },
      {
        name: 'Ammoniacal Nitrogen',
        value: 32.5,
        unit: 'mg/L',
        standard: 1.2,
        standardSource: 'CPCB Inland Water Limit',
        exceeded: true
      },
      {
        name: 'Surfactants (MBAS)',
        value: 8.4,
        unit: 'mg/L',
        standard: 1.0,
        standardSource: 'CPCB Threshold',
        exceeded: true
      }
    ],
    context: 'Najafgarh and Shahdara storm drains convey over 75% of Delhi municipal and industrial effluent into the 22 km reach between Wazirabad and Okhla barrages.',
    sources: [
      'Delhi Pollution Control Committee (DPCC)',
      'CPCB RTWQMS Yamuna Network'
    ],
    confidenceScore: 96,
    affectedPopulation: 19000000,
    keyDrivers: 'Nearly zero ecological environmental flow released past Wazirabad, dense open wastewater drains, phosphate-rich detergents'
  }
];
