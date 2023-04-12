namespace WingEngine {
  export class Engine {
    private _count = 0;

    public constructor() {
      console.log('Loaded');
    }

    public start(): void {
      this.loop();
    }

    public loop(): void {
      document.title = this._count.toString();

      requestAnimationFrame(this.loop.bind(this));
    }
  }
}

window.onload = (): void => {
  const e = new WingEngine.Engine();
  e.start();

  document.body.innerHTML += 'foo';
};

export {};
