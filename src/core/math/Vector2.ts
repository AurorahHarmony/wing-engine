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

  /** Create a new zero Vector2 (0,0,0) */
  public static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  /** Create a new one Vector2 (1,1,1) */
  public static get one(): Vector2 {
    return new Vector2(1, 1);
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

  public setFromJson(json: any): void {
    if (json.x !== undefined) {
      this._x = Number(json.x);
    }
    if (json.y !== undefined) {
      this._y = Number(json.y);
    }
  }

  public copyFrom(v: Vector2): void {
    this._x = v._x;
    this._y = v._y;
  }
}
