import { gl, GLUtilities } from './GLUtilities';

/**
 * The main game engine class
 */
export default class Engine {
  private _canvas: HTMLCanvasElement;

  /**
   * Create a new engine
   */
  public constructor() {
    console.log('Loaded!');
  }

  /**
   * Starts up the game engine
   */
  public start(): void {
    this._canvas = GLUtilities.initialize();

    gl.clearColor(0, 0, 0, 1);

    this.loop();
  }

  /**
   * Resizes the canvas to fit the window
   */
  public resize(): void {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
    }
  }

  private loop(): void {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear the color buffer.

    requestAnimationFrame(this.loop.bind(this));
  }
}
