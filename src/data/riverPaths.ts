import { RiverPath } from '../types/geo';

export const riverPaths: RiverPath[] = [
  {
    id: 'riv-ganges',
    name: 'Ganges Main Stem',
    system: 'Ganges',
    color: '#48B8D0',
    width: 4,
    description: 'Primary hydrological stem flowing from Gangotri Glacier through Uttarakhand, Uttar Pradesh, Bihar, and West Bengal to Farakka Barrage.',
    lengthKm: 2525,
    dischargeM3s: 16650,
    coordinates: [
      [30.9800, 78.9300],
      [30.1460, 78.5990],
      [30.0869, 78.2676],
      [29.9457, 78.1642],
      [28.1970, 78.3810],
      [27.3820, 79.6290],
      [27.0550, 79.9180],
      [26.4499, 80.3319],
      [25.9260, 80.8120],
      [25.4299, 81.8845],
      [25.1460, 82.5690],
      [25.3176, 83.0062],
      [25.5800, 83.5800],
      [25.5700, 83.9800],
      [25.6100, 85.1400],
      [25.4000, 85.9100],
      [25.3740, 86.4730],
      [25.2500, 86.9800],
      [25.2600, 87.2300],
      [25.2500, 87.6400],
      [24.8055, 87.9255]
    ]
  },
  {
    id: 'riv-hooghly',
    name: 'Bhagirathi-Hooghly Distributary',
    system: 'Ganges',
    color: '#38BDF8',
    width: 3,
    description: 'Southern distributary branch flowing southward through West Bengal past Kolkata into Sagar Island and Bay of Bengal.',
    lengthKm: 260,
    dischargeM3s: 2800,
    coordinates: [
      [24.8055, 87.9255],
      [24.4700, 88.0700],
      [24.1800, 88.2700],
      [23.6400, 88.1300],
      [23.4100, 88.3700],
      [23.2200, 88.3600],
      [22.9900, 88.4000],
      [22.9000, 88.3900],
      [22.7500, 88.3400],
      [22.5850, 88.3460],
      [22.5410, 88.2980],
      [22.4700, 88.1800],
      [22.1900, 88.2000],
      [22.0600, 88.0600],
      [21.6500, 88.0500]
    ]
  },
  {
    id: 'riv-padma',
    name: 'Padma River Main Stem',
    system: 'Transboundary',
    color: '#0EA5E9',
    width: 4,
    description: 'Main eastern transboundary continuation of the Ganges into Bangladesh, joining Jamuna at Goalundo and Meghna at Chandpur.',
    lengthKm: 120,
    dischargeM3s: 30000,
    coordinates: [
      [24.8055, 87.9255],
      [24.4600, 88.3300],
      [24.3740, 88.6040],
      [24.2800, 88.7500],
      [24.0660, 89.0270],
      [23.9000, 89.1200],
      [23.9200, 89.4300],
      [23.8340, 89.7670],
      [23.4700, 90.2600],
      [23.2300, 90.6500]
    ]
  },
  {
    id: 'riv-brahmaputra',
    name: 'Brahmaputra River Main Stem',
    system: 'Brahmaputra',
    color: '#64B88A',
    width: 4,
    description: 'Mighty transboundary braided river draining the Tibetan Plateau through Arunachal Pradesh and the Assam Valley.',
    lengthKm: 2900,
    dischargeM3s: 19800,
    coordinates: [
      [28.0600, 95.3300],
      [27.8000, 95.6000],
      [27.4800, 94.9100],
      [26.9500, 94.2000],
      [26.6200, 92.7900],
      [26.6500, 93.3000],
      [26.1800, 91.7500],
      [26.1700, 90.6200],
      [26.0200, 89.9700]
    ]
  },
  {
    id: 'riv-jamuna',
    name: 'Jamuna River Braided Channel',
    system: 'Transboundary',
    color: '#10B981',
    width: 4,
    description: 'Braided southward course of the Brahmaputra in Bangladesh, carrying immense monsoon discharge to confluence with Padma.',
    lengthKm: 205,
    dischargeM3s: 20000,
    coordinates: [
      [25.5500, 89.6700],
      [25.2500, 89.6500],
      [24.8800, 89.6400],
      [24.4000, 89.7500],
      [23.9600, 89.7000],
      [23.8340, 89.7670]
    ]
  },
  {
    id: 'riv-surma',
    name: 'Surma River Branch',
    system: 'Meghna',
    color: '#06B6D4',
    width: 2.5,
    description: 'Northern branch of the Barak River draining the southern slopes of the Shillong Plateau and Sylhet Haor basin.',
    lengthKm: 250,
    dischargeM3s: 1200,
    coordinates: [
      [24.8800, 92.4800],
      [24.8900, 91.8700],
      [25.0700, 91.4000],
      [24.4500, 91.3800]
    ]
  },
  {
    id: 'riv-kushiyara',
    name: 'Kushiyara River Branch',
    system: 'Meghna',
    color: '#0891B2',
    width: 2.5,
    description: 'Southern branch of the Barak River flowing through Fenchuganj before reuniting with Surma to form Kalni/Meghna.',
    lengthKm: 160,
    dischargeM3s: 1100,
    coordinates: [
      [24.8800, 92.4800],
      [24.7100, 91.9300],
      [24.4500, 91.3800]
    ]
  },
  {
    id: 'riv-meghna',
    name: 'Lower Meghna River System',
    system: 'Meghna',
    color: '#22D3EE',
    width: 4,
    description: 'Expansive estuarine channel delivering combined discharge of Ganges, Brahmaputra, and Meghna into the Bay of Bengal.',
    lengthKm: 156,
    dischargeM3s: 36000,
    coordinates: [
      [24.4500, 91.3800],
      [24.0320, 91.0150],
      [23.9200, 90.7200],
      [23.5500, 90.6000],
      [23.2300, 90.6500],
      [23.0843, 90.6492],
      [22.4500, 90.7500],
      [22.1500, 90.8500]
    ]
  },
  {
    id: 'riv-yamuna',
    name: 'Yamuna River',
    system: 'Tributary',
    color: '#3B82F6',
    width: 3,
    description: 'Longest tributary of the Ganges originating from Yamunotri, flowing past Delhi and Agra to confluence at Prayagraj.',
    lengthKm: 1376,
    dischargeM3s: 2950,
    coordinates: [
      [31.0100, 78.4500],
      [30.4400, 77.6200],
      [30.3100, 77.3500],
      [29.3900, 76.9700],
      [28.7100, 77.2300],
      [28.5430, 77.3120],
      [27.4900, 77.6800],
      [27.1800, 78.0100],
      [26.4900, 79.2500],
      [25.9500, 80.1500],
      [25.7700, 80.5200],
      [25.4299, 81.8845]
    ]
  },
  {
    id: 'riv-chambal',
    name: 'Chambal River',
    system: 'Tributary',
    color: '#60A5FA',
    width: 2,
    description: 'Major southern tributary of the Yamuna draining central India and the Vindhya range, famed for riverine gharial habitat.',
    lengthKm: 960,
    dischargeM3s: 300,
    coordinates: [
      [22.4600, 75.6800],
      [24.7100, 75.7300],
      [25.1800, 75.8300],
      [26.6800, 77.8900],
      [26.4900, 79.2500]
    ]
  },
  {
    id: 'riv-gomti',
    name: 'Gomti River',
    system: 'Tributary',
    color: '#93C5FD',
    width: 2,
    description: 'Groundwater-fed northern tributary flowing through Uttar Pradesh, receiving municipal waste from Lucknow before joining Ganga.',
    lengthKm: 960,
    dischargeM3s: 230,
    coordinates: [
      [28.5800, 80.0500],
      [26.8500, 80.9400],
      [26.2600, 82.0700],
      [25.7500, 82.6800],
      [25.5100, 83.2200]
    ]
  },
  {
    id: 'riv-ghaghara',
    name: 'Ghaghara River',
    system: 'Tributary',
    color: '#2563EB',
    width: 3,
    description: 'Transboundary Himalayan river (Karnali in Nepal) providing the largest volume contribution of water to the Ganges.',
    lengthKm: 1080,
    dischargeM3s: 2990,
    coordinates: [
      [28.3200, 81.1200],
      [27.5700, 81.5900],
      [26.7900, 82.2000],
      [26.2700, 83.7400],
      [25.7700, 84.6600]
    ]
  },
  {
    id: 'riv-gandak',
    name: 'Gandak River',
    system: 'Tributary',
    color: '#1D4ED8',
    width: 2.5,
    description: 'Originates in Nepal Himalayas, entering Bihar at Valmiki Barrage and joining the Ganges opposite Patna at Sonpur.',
    lengthKm: 630,
    dischargeM3s: 1760,
    coordinates: [
      [27.4400, 83.9200],
      [27.1000, 84.0900],
      [26.4700, 84.4400],
      [25.6800, 85.1800]
    ]
  },
  {
    id: 'riv-kosi',
    name: 'Kosi River',
    system: 'Tributary',
    color: '#1E40AF',
    width: 3,
    description: 'Dynamic braided river traversing Nepal and north Bihar, characterized by high sediment yield and shifting course.',
    lengthKm: 729,
    dischargeM3s: 2160,
    coordinates: [
      [26.5300, 86.9300],
      [26.1200, 86.6000],
      [25.8800, 86.6000],
      [25.4200, 87.2500]
    ]
  },
  {
    id: 'riv-teesta',
    name: 'Teesta River',
    system: 'Tributary',
    color: '#14B8A6',
    width: 2.5,
    description: 'Transboundary tributary rising in Sikkim Himalayas, crossing West Bengal and northern Bangladesh to join Jamuna.',
    lengthKm: 414,
    dischargeM3s: 900,
    coordinates: [
      [28.0200, 88.7500],
      [27.6000, 88.6500],
      [26.8800, 88.4700],
      [26.1200, 89.0500],
      [25.5100, 89.6700]
    ]
  },
  {
    id: 'riv-son',
    name: 'Son River',
    system: 'Tributary',
    color: '#6366F1',
    width: 2.5,
    description: 'Major southern tributary originating from Amarkantak plateau in Madhya Pradesh, joining Ganga west of Patna.',
    lengthKm: 784,
    dischargeM3s: 1200,
    coordinates: [
      [22.6700, 81.7500],
      [24.1900, 81.2900],
      [24.9100, 84.1800],
      [25.6400, 84.8000]
    ]
  },
  {
    id: 'riv-damodar',
    name: 'Damodar River',
    system: 'Tributary',
    color: '#818CF8',
    width: 2,
    description: 'Industrial basin river flowing across Jharkhand and West Bengal mineral belts before discharging into the Hooghly.',
    lengthKm: 592,
    dischargeM3s: 290,
    coordinates: [
      [23.6800, 84.7300],
      [23.7800, 85.9800],
      [23.6800, 86.7500],
      [23.5200, 87.3100],
      [23.2300, 87.8600],
      [22.2800, 88.0800]
    ]
  }
];
