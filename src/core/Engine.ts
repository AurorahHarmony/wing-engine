import AssetManager from './assets/AssetManager';
import { gl, GLUtilities } from './gl/GLUtilities';
import Shader from './gl/Shader';
import Sprite from './graphics/Sprite';
import Matrix4x4 from './math/Matrix4x4';
import MessageBus from './message/MessageBus';

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
  public constructor() {}

  /**
   * Starts up the game engine
   */
  public start(): void {
    this._canvas = GLUtilities.initialize();
    AssetManager.initialize();

    gl.clearColor(0, 0, 0, 1);

    this.loadShaders();
    this._shader.use();

    // Load
    this._projection = Matrix4x4.orthographic(
      0,
      this._canvas.width,
      this._canvas.height,
      0,
      -100,
      100
    );
    this._sprite = new Sprite('test', '/src/assets/textures/a-square.jpg');
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
    const colorPosition = this._shader.getUniformLocation('u_tint');
    // gl.uniform4f(colorPosition, 1, 0, 1, 1);
    gl.uniform4f(colorPosition, 1, 1, 1, 1);

    const projectionPosition = this._shader.getUniformLocation('u_projection');
    gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

    const modelLocation = this._shader.getUniformLocation('u_model');
    gl.uniformMatrix4fv(
      modelLocation,
      false,
      new Float32Array(Matrix4x4.translation(this._sprite.position).data)
    );

    this._sprite.draw(this._shader);

    requestAnimationFrame(this.loop.bind(this));
  }

  private loadShaders(): void {
    const vertexShaderSource = `
      attribute vec3 a_position;
      attribute vec2 a_texCoord;

      uniform mat4 u_projection;
      uniform mat4 u_model;

      varying vec2 v_texCoord;

      void main() {
        gl_Position = u_projection * u_model * vec4(a_position, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      uniform vec4 u_tint;
      uniform sampler2D u_diffuse;

      varying vec2 v_texCoord;

      void main() {
        gl_FragColor = u_tint * texture2D(u_diffuse, v_texCoord);
      }
    `;
    this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
  }
}
