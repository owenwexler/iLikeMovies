import redis from "./redis";

interface CheckCacheArgs {
  key: string;
  time: number;
  callback: () => Promise<any>;
}

const checkCache = async (args: CheckCacheArgs) => {
  const {
    key,
    time,
    callback
  } = args;

  try {
    const cacheResponse = await redis.get(key);
    if (cacheResponse) {
      console.log(`Cache Hit: ${key}`);
      return JSON.parse(cacheResponse);
    } else {
      const dbResponse = await callback();
      if (!dbResponse.error) { // only cache the response if it is not errored
        const setExResult = await redis.set(key, JSON.stringify(dbResponse), 'EX', time);
        console.log(setExResult === 'OK' ? `Cache Write: ${key}` : 'Cache Error');
      }
      return dbResponse;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export {
  checkCache
}
