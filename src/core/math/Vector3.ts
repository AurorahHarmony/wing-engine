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

  /** Create a new zero Vector3 (0,0,0) */
  public static get zero(): Vector3 {
    return new Vector3(0, 0, 0);
  }

  /** Create a new one Vector3 (1,1,1) */
  public static get one(): Vector3 {
    return new Vector3(1, 1, 1);
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
  public copyFrom(vector: Vector3): void {
    this._x = vector._x;
    this._y = vector._y;
    this._z = vector._z;
  }

  /**
   * Set the x y and/or z values with json.
   * @param json The json input
   */
  public setFromJson(json: any): void {
    if (json.x !== undefined) {
      this._x = Number(json.x);
    }
    if (json.y !== undefined) {
      this._y = Number(json.y);
    }
    if (json.z !== undefined) {
      this._z = Number(json.z);
    }
  }

  /**
   * Adds the provided Vector3 with this one.
   * @param v A Vector3
   */
  public add(v: Vector3): Vector3 {
    this._x += v._x;
    this._y += v._y;
    this._z += v._z;

    return this;
  }

  /**
   * Subtracts the provided Vector3 with this one.
   * @param v A Vector3
   */
  public subtract(v: Vector3): Vector3 {
    this._x -= v._x;
    this._y -= v._y;
    this._z -= v._z;

    return this;
  }

  /**
   * Multiplies the provided Vector3 with this one.
   * @param v A Vector3
   */
  public multiply(v: Vector3): Vector3 {
    this._x *= v._x;
    this._y *= v._y;
    this._z *= v._z;

    return this;
  }

  /**
   * Divides the provided Vector3 with this one.
   * @param v A Vector3
   */
  public divide(v: Vector3): Vector3 {
    this._x /= v._x;
    this._y /= v._y;
    this._z /= v._z;

    return this;
  }
}
