import * as migration_20260121_223425 from './20260121_223425';
import * as migration_20260128_024313 from './20260128_024313';
import * as migration_20260128_213642 from './20260128_213642';
import * as migration_20260128_233835 from './20260128_233835';
import * as migration_20260202_204115 from './20260202_204115';
import * as migration_20260204_210822 from './20260204_210822';
import * as migration_20260218_215227 from './20260218_215227';
import * as migration_20260316_204601 from './20260316_204601';

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
    name: '20260128_233835',
  },
  {
    up: migration_20260202_204115.up,
    down: migration_20260202_204115.down,
    name: '20260202_204115',
  },
  {
    up: migration_20260204_210822.up,
    down: migration_20260204_210822.down,
    name: '20260204_210822',
  },
  {
    up: migration_20260218_215227.up,
    down: migration_20260218_215227.down,
    name: '20260218_215227',
  },
  {
    up: migration_20260316_204601.up,
    down: migration_20260316_204601.down,
    name: '20260316_204601'
  },
];
