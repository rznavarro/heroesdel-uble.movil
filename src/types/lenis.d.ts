declare module 'lenis' {
  export default class Lenis {
    constructor(options?: any);
    on(event: string, callback: Function): void;
    raf(time: number): void;
    destroy(): void;
  }
}
