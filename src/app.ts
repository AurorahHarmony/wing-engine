import Engine from './Engine';

const engine = new Engine();

// The main entry point to the application
window.onload = function (): void {
  engine.start();
  engine.resize();
};

window.onresize = (): void => {
  engine.resize();
};
