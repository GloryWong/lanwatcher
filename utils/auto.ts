export class Auto<E, T = E extends Promise<infer U> ? U : E> {
  private readonly execFn;
  private callback:
    | ((error: unknown | null, value: T | undefined) => void)
    | undefined;

  public readonly defaultInterval: number = 5000;
  private interval: number | undefined;
  private timers = new Map<number, NodeJS.Timeout>();

  constructor(
    execFn: (...args: any[]) => E,
    callback?: (error: unknown | null, value: T | undefined) => void,
    defaultInterval?: number,
  ) {
    defaultInterval && this.ensureInterval('defaultInterval', defaultInterval);
    defaultInterval && (this.defaultInterval = defaultInterval);
    this.execFn = execFn;
    this.callback = callback;
  }

  private ensureInterval(name: string, value: number) {
    if (value <= 0)
      throw new Error(`${name} should be positive and greater than 0`);
  }

  private setInterval(id: number, cb: () => Promise<void>, interval: number) {
    const timer = setTimeout(async () => {
      await cb();
      if (this.timers.has(id) !== null) {
        this.setInterval(id, cb, interval);
      }
    }, interval);
    this.timers.set(id, timer);
  }

  /**
   * @param interval ms. Default to 5000
   */
  public start(interval?: number) {
    interval && this.ensureInterval('interval', interval);

    this.stop();
    this.interval = interval === undefined ? this.defaultInterval : interval;
    this.setInterval(
      new Date().getTime() * Math.random(),
      async () => {
        try {
          const result = await this.execFn();
          if (this.callback) {
            this.callback(null, result as unknown as T);
          }
        } catch (error) {
          this.callback && this.callback(error, undefined);
        }
      },
      this.interval,
    );
  }

  public stop() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

  /**
   * restart with the interval set by `start`
   */
  public restart() {
    this.start(this.interval);
  }

  public isRunning() {
    return this.timers.size > 0;
  }
}
