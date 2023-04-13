/**
 * Structure for storing Vector2 data
 */
export default class Vector2 {
  private _x: number;
  private _y: number;

  /**
   * Creates a new Vector2
   * @param x
   * @param y
   */
  public constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  public get x(): number {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
  }

  public get y(): number {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
  }

  /**
   * Convert the Vector3 struct to an array
   * @returns {number[]} [x,y,z]
   */
  public toArray(): number[] {
    return [this._x, this._y];
  }

  /**
   * Convert the Vector3 struct to a Float32Array
   * @returns {Float32Array}
   */
  public toFloat32Array(): Float32Array {
    return new Float32Array(this.toArray());
  }
}
