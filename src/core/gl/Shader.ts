import { gl } from './GLUtilities';

/**
 * Represens a WebGL shader
 */
export default class Shader {
  private _name: string;
  private _program: WebGLProgram;

  /**
   * Creates a new shader
   * @param name The name of this shader
   * @param vertexSource  The source of the vertex shader
   * @param fragmentSource The source of the fragment shader
   */
  public constructor(name: string, vertexSource: string, fragmentSource: string) {
    this._name = name;
    const vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

    this.createProgram(vertexShader, fragmentShader);
  }

  /**
   * The name of this shader
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Tell WebGL that we need to use this shader.
   */
  public use(): void {
    gl.useProgram(this._program);
  }

  private loadShader(source: string, shaderType: number): WebGLShader {
    const shader = gl.createShader(shaderType);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const error = gl.getShaderInfoLog(shader);

    if (error !== '') {
      throw new Error(`Error compiling shader '${this._name}':  ${error}`);
    }

    return shader;
  }

  /**
   * Creates a WebGL program so that they can be used by the graphics card.
   * @param vertexShader
   * @param fragmentShader
   */
  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
    this._program = gl.createProgram();

    gl.attachShader(this._program, vertexShader);
    gl.attachShader(this._program, fragmentShader);

    gl.linkProgram(this._program);

    const error = gl.getProgramInfoLog(this._program);
    if (error !== '') {
      throw new Error(`Error linking shader '${this._name}':  ${error}`);
    }
  }
}
