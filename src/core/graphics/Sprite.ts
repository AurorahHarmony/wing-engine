import GLBuffer, { AttributeInfo } from '../gl/GLBuffer';
import { gl } from '../gl/GLUtilities';
import Shader from '../gl/Shader';
import Matrix4x4 from '../math/Matrix4x4';
import Material from './Material';
import MaterialManager from './MaterialManager';
import Vertex from './Vertex';

/**
 * Handles loading a new sprite into the GLBuffer and drawing it.
 */
export default class Sprite {
  protected _width: number;
  protected _height: number;
  protected _name: string;

  protected _buffer: GLBuffer;
  protected _materialName: string;
  protected _material: Material;
  protected _vertices: Vertex[];

  /**
   * Constructs a new sprite
   * @param name An identifier for this sprite
   * @param textureName The name of the texture to use with this sprite.
   * @param width The width to render the sprite
   * @param height The height to render the sprite
   */
  public constructor(name: string, materialName: string, width = 100, height = 100) {
    this._name = name;
    this._width = width;
    this._height = height;
    this._materialName = materialName;
    this._material = MaterialManager.getMaterial(this._materialName);
  }

  /** The name of this sprite */
  public get name(): string {
    return this._name;
  }

  /** Destroys this sprite */
  public destroy(): void {
    this._buffer.destroy();
    MaterialManager.releaseMaterial(this._materialName);
    this._material = undefined;
    this._materialName = undefined;
  }

  /**
   * Load this sprite into a GLBuffer.
   */
  public load(): void {
    this._buffer = new GLBuffer();

    const positionAttribute = new AttributeInfo();
    positionAttribute.location = 0;
    positionAttribute.size = 3;
    this._buffer.addAttributeLocation(positionAttribute);

    const texCoordAttribute = new AttributeInfo();
    texCoordAttribute.location = 1;
    texCoordAttribute.size = 2;
    this._buffer.addAttributeLocation(texCoordAttribute);

    this._vertices = [
      new Vertex(0, 0, 0, 0, 0),
      new Vertex(0, this._height, 0, 0, 1.0),
      new Vertex(this._width, this._height, 0, 1.0, 1.0),

      new Vertex(this._width, this._height, 0, 1.0, 1.0),
      new Vertex(this._width, 0, 0, 1.0, 0),
      new Vertex(0, 0, 0, 0, 0),
    ];

    for (const v of this._vertices) {
      this._buffer.pushBackData(v.toArray());
    }
    this._buffer.upload();
    this._buffer.unbind();
  }

  public update(time: number): void {}

  /**
   * Draw this sprite to the screen
   */
  public draw(shader: Shader, model: Matrix4x4): void {
    const modelLocation = shader.getUniformLocation('u_model');
    gl.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());

    const colorLocation = shader.getUniformLocation('u_tint');
    gl.uniform4fv(colorLocation, this._material.tint.toFloat32Array());

    if (this._material.diffuseTexture !== undefined) {
      this._material.diffuseTexture.activateAndBind(0);
      const diffuseLocation = shader.getUniformLocation('u_diffuse');
      gl.uniform1i(diffuseLocation, 0);
    }

    this._buffer.bind();
    this._buffer.draw();
  }
}
