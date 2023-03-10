export class Auto<E, T = E extends Promise<infer U> ? U : E> {
  private timer: NodeJS.Timeout | null = null;
  private readonly execFn;
  private callback:
    | ((error: unknown | null, value: T | undefined) => void)
    | undefined;

  public readonly defaultInterval: number = 5000;
  private interval: number | undefined;

  constructor(execFn: (...args: any[]) => E, defaultInterval?: number) {
    defaultInterval && this.ensureInterval('defaultInterval', defaultInterval);
    defaultInterval && (this.defaultInterval = defaultInterval);
    this.execFn = execFn;
  }

  private ensureInterval(name: string, value: number) {
    if (value <= 0)
      throw new Error(`${name} should be positive and greater than 0`);
  }

  private setInterval(cb: () => void, interval: number) {
    this.timer = setTimeout(() => {
      cb();
      this.setInterval(cb, interval);
    }, interval);
  }

  /**
   * @param interval ms. Default to 5000
   */
  public start(
    callback: (error: unknown | null, value: T | undefined) => void,
    interval?: number,
  ) {
    interval && this.ensureInterval('interval', interval);

    this.stop();
    this.callback = callback;
    this.interval = interval === undefined ? this.defaultInterval : interval;
    this.setInterval(() => {
      try {
        const result = this.execFn();
        if (result instanceof Promise) {
          result.then((v) => callback(null, v));
        } else {
          callback(null, result as unknown as T);
        }
      } catch (error) {
        callback(error, undefined);
      }
    }, this.interval);
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public restart() {
    if (!this.callback) {
      console.error('Cannot trigger restart. It is not started before.');
      return;
    }

    this.start(this.callback, this.interval);
  }
}
