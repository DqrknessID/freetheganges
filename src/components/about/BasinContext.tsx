import React from 'react';
import { Globe } from 'lucide-react';

export const BasinContext: React.FC = () => {
  return (
    <section className="bg-surface border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-text-secondary" />
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
          Transboundary Hydrological Context: India & Bangladesh
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-text-secondary leading-relaxed">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text-primary">
            Upstream Diversion & The Farakka Barrage
          </h3>
          <p>
            Constructed in 1975 roughly 17 km upstream of the Bangladesh border, the Farakka Barrage diverts Ganges water 
            into the Bhagirathi-Hooghly channel to flush Kolkata Port. This artificial bifurcation has profoundly altered 
            downstream hydrology in Bangladesh's Padma branch. During dry winter months, decreased base discharge reduces 
            freshwater thrust against tidal intrusion from the Bay of Bengal, pushing salinity deep into the agricultural heartland.
          </p>
          <p>
            Under the 1996 Ganges Water Treaty, sharing formulas govern 10-day intervals from January to May. However, 
            monitoring stations on both sides frequently record discrepancies between allocated treaty volumes and actual 
            in-situ discharge arriving at Hardinge Bridge.
          </p>
          <div className="p-3 rounded bg-surface-elevated border border-border-subtle text-xs text-text-secondary">
            Key Metric: Winter low-flow discharge at Hardinge Bridge has dropped below 35,000 cusecs during acute drought periods, breaching historical environmental flow baselines.
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text-primary">
            The Estuarine Crucible: Sundarbans & Climate Compounding
          </h3>
          <p>
            The lower delta houses the Sundarbans, the world's largest contiguous mangrove forest and a UNESCO World 
            Heritage ecosystem. Upstream silt trapping behind upstream dams and barrages has precipitated a severe sediment 
            deficit. Combined with relative sea-level rise and heightened cyclone frequency, coastal islands are subsiding 
            faster than natural replenishment rates.
          </p>
          <p>
            Meanwhile, heavy metal mobilization from the industrial corridors of Kanpur, Kolkata, and Dhaka converges into 
            the estuarine mixing zone, bioaccumulating across the food web and threatening endangered keystone species, 
            notably the Ganges River Dolphin (*Platanista gangetica*) and Royal Bengal Tiger.
          </p>
          <div className="p-3 rounded bg-surface-elevated border border-border-subtle text-xs text-text-secondary">
            Ecological Threat: Inland migration of the 5 PSU estuarine salinity line affects over 150 km of coastal river reaches, threatening drinking water aquifers and Sundari tree stands.
          </div>
        </div>
      </div>
    </section>
  );
};
