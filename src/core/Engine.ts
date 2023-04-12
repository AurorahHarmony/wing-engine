import GLBuffer, { AttributeInfo } from './gl/GLBuffer';
import { gl, GLUtilities } from './gl/GLUtilities';
import Shader from './gl/Shader';

/**
 * The main game engine class
 */
export default class Engine {
  private _canvas: HTMLCanvasElement;
  private _shader: Shader;
  private _buffer: GLBuffer;

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
    this.createBuffer();

    this.loop();
  }

  /**
   * Resizes the canvas to fit the window
   */
  public resize(): void {
    if (this._canvas !== undefined) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;

      gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    }
  }

  private loop(): void {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear the color buffer.

    //Set uniforms
    const colorPosition = this._shader.getUniformLocation('u_color');
    gl.uniform4f(colorPosition, 1, 0, 1, 1);

    this._buffer.bind();
    this._buffer.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  private createBuffer(): void {
    this._buffer = new GLBuffer(3);

    const positionAttribute = new AttributeInfo();
    positionAttribute.location = this._shader.getAttributeLocation('a_position');
    positionAttribute.offset = 0;
    positionAttribute.size = 3;
    this._buffer.addAttributeLocation(positionAttribute);
    const vertices = [
      // x,y,z
      0, 0, 0,
      //
      0, 0.5, 0,
      //
      0.5, 0.5, 0,
    ];
    this._buffer.pushBackData(vertices);
    this._buffer.upload();
    this._buffer.unbind();
  }

  private loadShaders(): void {
    const vertexShaderSource = `
      attribute vec3 a_position;

      void main() {
        gl_Position = vec4(a_position, 1.0);
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
