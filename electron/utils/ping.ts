import * as basePing from 'ping'

export async function ping(ips: string[]) {
  const pingPromises = ips.map(ip => basePing.promise.probe(ip))
  const results = await Promise.allSettled(pingPromises)
  const result$: basePing.PingResponse[] = []
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      result$.push(result.value)
    }
  })
  return result$
}
