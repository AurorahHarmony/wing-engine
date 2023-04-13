import AssetManager from './assets/AssetManager';
import { gl, GLUtilities } from './gl/GLUtilities';
import BasicShader from './gl/shaders/BasicShader';
import Color from './graphics/Color';
import Material from './graphics/Material';
import MaterialManager from './graphics/MaterialManager';
import Sprite from './graphics/Sprite';
import Matrix4x4 from './math/Matrix4x4';
import MessageBus from './message/MessageBus';

/**
 * The main game engine class
 */
export default class Engine {
  private _canvas: HTMLCanvasElement;
  private _basicShader: BasicShader;
  private _projection: Matrix4x4;

  private _sprite: Sprite;

  /**
   * Create a new engine
   */
  public constructor() {}

  /**
   * Starts up the game engine
   */
  public start(): void {
    this._canvas = GLUtilities.initialize();
    AssetManager.initialize();

    gl.clearColor(0, 0, 0, 1);

    this._basicShader = new BasicShader();
    this._basicShader.use();

    // Load Materials
    MaterialManager.registerMaterial(
      new Material('test', '/src/assets/textures/a-square.jpg', Color.white())
    );

    // Load
    this._projection = Matrix4x4.orthographic(
      0,
      this._canvas.width,
      this._canvas.height,
      0,
      -100,
      100
    );
    this._sprite = new Sprite('test', 'test');
    this._sprite.load();
    this._sprite.position.x = 200;

    this.loop();
  }

  /**
   * Resizes the canvas to fit the window
   */
  public resize(): void {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;

      this._projection = Matrix4x4.orthographic(
        0,
        this._canvas.width,
        this._canvas.height,
        0,
        -100,
        100
      );

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  }

  private loop(): void {
    MessageBus.update(0);

    gl.clear(gl.COLOR_BUFFER_BIT); // Clear the color buffer.

    //Set uniforms
    const projectionPosition = this._basicShader.getUniformLocation('u_projection');
    gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

    this._sprite.draw(this._basicShader);

    requestAnimationFrame(this.loop.bind(this));
  }
}
