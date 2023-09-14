import * as ping from 'ping';
import * as ip from 'ip';

export async function pingRange(start: number, end: number) {
  const pingPromises: Promise<ping.PingResponse>[] = [];
  for (let i = start; i <= end; i++) {
    pingPromises.push(ping.promise.probe(ip.fromLong(i)));
  }

  const results = await Promise.allSettled(pingPromises);
  const result$: ping.PingResponse[] = [];
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      result$.push(result.value);
    }
  });

  return result$;
}
