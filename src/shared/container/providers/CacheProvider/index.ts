import { container } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import RedisProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

const providers = {
  redis: RedisProvider,
};

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  providers.redis,
);
