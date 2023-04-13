import GLBuffer, { AttributeInfo } from '../gl/GLBuffer';

/**
 * Handles loading a new sprite into the GLBuffer and drawing it.
 */
export default class Sprite {
  private _width: number;
  private _height: number;
  private _name: string;

  private _buffer: GLBuffer;

  /**
   * Constructs a new sprite
   * @param name An identifier for this sprite
   * @param width The width to render the sprite
   * @param height The height to render the sprite
   */
  public constructor(name: string, width = 100, height = 100) {
    this._name = name;
    this._width = width;
    this._height = height;
  }
  /**
   * Load this sprite into a GLBuffer.
   */
  public load(): void {
    this._buffer = new GLBuffer(3);

    const positionAttribute = new AttributeInfo();
    positionAttribute.location = 0;
    positionAttribute.offset = 0;
    positionAttribute.size = 3;
    this._buffer.addAttributeLocation(positionAttribute);
    //prettier-ignore
    const vertices = [
      // x,        y,            z
      0,           0,            0,
      0,           this._height, 0,
      this._width, this._height, 0,

      this._width, this._height, 0,
      this._width, 0,            0,
      0,           0,            0,
    ];
    this._buffer.pushBackData(vertices);
    this._buffer.upload();
    this._buffer.unbind();
  }
  public update(time: number): void {}

  /**
   * Draw this sprite to the screen
   */
  public draw(): void {
    this._buffer.bind();
    this._buffer.draw();
  }
}
