import { gl } from './GLUtilities';

/**
 * Represens a WebGL shader
 */
export default abstract class Shader {
  private _name: string;
  private _program: WebGLProgram;
  private _attributes: { [name: string]: number } = {};
  private _uniforms: { [name: string]: WebGLUniformLocation } = {};

  /**
   * Creates a new shader
   * @param name The name of this shader
   * @param vertexSource  The source of the vertex shader
   * @param fragmentSource The source of the fragment shader
   */
  public constructor(name: string) {
    this._name = name;
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

  /**
   * Get the location of a shader attribute by its name.
   * @param name The name of the attribute which you want to retrieve the location for
   * @returns Attribute location
   */
  public getAttributeLocation(name: string): number {
    if (this._attributes[name] == undefined) {
      throw new Error(`Unable to find attribute named '${name}' in shader '${this.name}'`);
    }
    return this._attributes[name];
  }

  public getUniformLocation(name: string): WebGLUniformLocation {
    if (this._uniforms[name] == undefined) {
      throw new Error(`Unable to find uniform named '${name}' in shader '${this.name}'`);
    }
    return this._uniforms[name];
  }

  protected load(vertexSource: string, fragmentSource: string): void {
    const vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

    this.createProgram(vertexShader, fragmentShader);
    this.detectAttributes();
    this.detectUniforms();
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

  /**
   * Get all attributes from the shader and save off their name and location {name:location}
   */
  private detectAttributes(): void {
    const attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < attributeCount; i++) {
      const info = gl.getActiveAttrib(this._program, i);
      if (!info) {
        break;
      }

      this._attributes[info.name] = gl.getAttribLocation(this._program, info.name);
    }
  }

  /**
   * Get all uniforms from the shader and save off their name and location {name:location}
   */
  private detectUniforms(): void {
    const uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(this._program, i);
      if (!info) {
        break;
      }

      this._uniforms[info.name] = gl.getUniformLocation(this._program, info.name);
    }
  }
}
