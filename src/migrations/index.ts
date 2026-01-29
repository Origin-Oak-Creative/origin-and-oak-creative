import * as migration_20260121_223425 from './20260121_223425';
import * as migration_20260128_024313 from './20260128_024313';
import * as migration_20260128_213642 from './20260128_213642';
import * as migration_20260128_233835 from './20260128_233835';

export const migrations = [
  {
    up: migration_20260121_223425.up,
    down: migration_20260121_223425.down,
    name: '20260121_223425',
  },
  {
    up: migration_20260128_024313.up,
    down: migration_20260128_024313.down,
    name: '20260128_024313',
  },
  {
    up: migration_20260128_213642.up,
    down: migration_20260128_213642.down,
    name: '20260128_213642',
  },
  {
    up: migration_20260128_233835.up,
    down: migration_20260128_233835.down,
    name: '20260128_233835'
  },
];
