import GLBuffer, { AttributeInfo } from '../gl/GLBuffer';
import { gl } from '../gl/GLUtilities';
import Shader from '../gl/Shader';
import Vector3 from '../math/Vector3';
import Texture from './Texture';
import TextureManager from './TextureManager';

/**
 * Handles loading a new sprite into the GLBuffer and drawing it.
 */
export default class Sprite {
  private _width: number;
  private _height: number;
  private _name: string;

  private _buffer: GLBuffer;
  private _textureName: string;
  private _texture: Texture;

  public position: Vector3 = new Vector3();

  /**
   * Constructs a new sprite
   * @param name An identifier for this sprite
   * @param textureName The name of the texture to use with this sprite.
   * @param width The width to render the sprite
   * @param height The height to render the sprite
   */
  public constructor(name: string, textureName: string, width = 100, height = 100) {
    this._name = name;
    this._width = width;
    this._height = height;
    this._textureName = textureName;
    this._texture = TextureManager.getTexture(this._textureName);
  }

  public get name(): string {
    return this._name;
  }

  public destroy(): void {
    this._buffer.destroy();
    TextureManager.releaseTexture(this._textureName);
  }

  /**
   * Load this sprite into a GLBuffer.
   */
  public load(): void {
    this._buffer = new GLBuffer(5);

    const positionAttribute = new AttributeInfo();
    positionAttribute.location = 0;
    positionAttribute.offset = 0;
    positionAttribute.size = 3;
    this._buffer.addAttributeLocation(positionAttribute);

    const texCoordAttribute = new AttributeInfo();
    texCoordAttribute.location = 1;
    texCoordAttribute.offset = 3;
    texCoordAttribute.size = 2;
    this._buffer.addAttributeLocation(texCoordAttribute);

    //prettier-ignore
    const vertices = [
      // x,        y,            z, u,   v
      0,           0,            0, 0,   0,
      0,           this._height, 0, 0,   1.0,
      this._width, this._height, 0, 1.0, 1.0,

      this._width, this._height, 0, 1.0, 1.0,
      this._width, 0,            0, 1.0, 0,
      0,           0,            0, 0,   0
    ];
    this._buffer.pushBackData(vertices);
    this._buffer.upload();
    this._buffer.unbind();
  }

  public update(time: number): void {}

  /**
   * Draw this sprite to the screen
   */
  public draw(shader: Shader): void {
    this._texture.activateAndBind(0);
    const diffuseLocation = shader.getUniformLocation('u_diffuse');
    gl.uniform1i(diffuseLocation, 0);

    this._buffer.bind();
    this._buffer.draw();
  }
}
