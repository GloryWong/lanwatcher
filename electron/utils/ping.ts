import * as basePing from 'ping';

export function ping(ips: string[]) {
  const pingPromises = ips.map((ip) => basePing.promise.probe(ip));
  return Promise.allSettled(pingPromises).then((results) => {
    const result$: basePing.PingResponse[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        result$.push(result.value);
      }
    });

    return result$;
  });
}
