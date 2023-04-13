import { gl, GLUtilities } from './gl/GLUtilities';
import Shader from './gl/Shader';
import Sprite from './graphics/Sprite';
import Matrix4x4 from './math/Matrix4x4';

/**
 * The main game engine class
 */
export default class Engine {
  private _canvas: HTMLCanvasElement;
  private _shader: Shader;
  private _projection: Matrix4x4;

  private _sprite: Sprite;

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

    this.loadShaders();
    this._shader.use();

    // Load
    this._projection = Matrix4x4.orthographic(
      0,
      this._canvas.width,
      0,
      this._canvas.height,
      -1.0,
      100
    );
    this._sprite = new Sprite('test');
    this._sprite.load();

    this.loop();
  }

  /**
   * Resizes the canvas to fit the window
   */
  public resize(): void {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;

      gl.viewport(-1, 1, 1, -1);
    }
  }

  private loop(): void {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear the color buffer.

    //Set uniforms
    const colorPosition = this._shader.getUniformLocation('u_color');
    gl.uniform4f(colorPosition, 1, 0, 1, 1);

    const projectionPosition = this._shader.getUniformLocation('u_projection');
    gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

    this._sprite.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  private loadShaders(): void {
    const vertexShaderSource = `
      attribute vec3 a_position;

      uniform mat4 u_projection;

      void main() {
        gl_Position = u_projection * vec4(a_position, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      uniform vec4 u_color;

      void main() {
        gl_FragColor = u_color;
      }
    `;
    this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
  }
}
