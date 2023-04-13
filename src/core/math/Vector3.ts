/**
 * Structure for storing Vector3 data
 */
export default class Vector3 {
  private _x: number;
  private _y: number;
  private _z: number;

  /**
   * Creates a new Vector3
   * @param x
   * @param y
   * @param z
   */
  public constructor(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
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

  public get z(): number {
    return this._z;
  }

  public set z(value: number) {
    this._z = value;
  }

  /**
   * Convert the Vector3 struct to an array
   * @returns {number[]} [x,y,z]
   */
  public toArray(): number[] {
    return [this._x, this._y, this._z];
  }

  /**
   * Convert the Vector3 struct to a Float32Array
   * @returns {Float32Array}
   */
  public toFloat32Array(): Float32Array {
    return new Float32Array(this.toArray());
  }
}
