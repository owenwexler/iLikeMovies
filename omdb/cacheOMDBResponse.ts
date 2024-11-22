import redis from '../redis/redis';

const cacheOMDBResponse = async (query: string, data: any) => {
  const key = `ilm::cached-omdb-response::${query}`;
  const time = (3600000 * 24) * 30; // cache the OMDB response for 30 days
  const setExResult = await redis.set(key, JSON.stringify(data), 'EX', time); 
  console.log(setExResult === 'OK' ? `Cache Write: ${key}` : 'Cache Error');
}

export {
  cacheOMDBResponse
}
