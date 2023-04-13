export default class Color {
  private _r: number;
  private _g: number;
  private _b: number;
  private _a: number;

  public constructor(r = 255, g = 255, b = 255, a = 255) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
  }

  public get r(): number {
    return this._r;
  }
  public set r(value: number) {
    this._r = value;
  }
  public get rFloat(): number {
    return this._r / 255;
  }

  public get g(): number {
    return this._g;
  }
  public set g(value: number) {
    this._g = value;
  }
  public get gFloat(): number {
    return this._g / 255;
  }

  public get b(): number {
    return this._b;
  }
  public set b(value: number) {
    this._b = value;
  }
  public get bFloat(): number {
    return this._b / 255;
  }

  public get a(): number {
    return this._a;
  }
  public set a(value: number) {
    this._a = value;
  }
  public get aFloat(): number {
    return this._a / 255;
  }

  public toArray(): number[] {
    return [this._r, this._g, this._b, this._a];
  }

  public toFloatArray(): number[] {
    return [this.rFloat, this.gFloat, this.bFloat, this.aFloat];
  }

  public toFloat32Array(): Float32Array {
    return new Float32Array(this.toFloatArray());
  }

  public static white(): Color {
    return new Color(255, 255, 255, 255);
  }
  public static black(): Color {
    return new Color(0, 0, 0, 255);
  }
  public static red(): Color {
    return new Color(255, 0, 0, 255);
  }
  public static green(): Color {
    return new Color(0, 255, 0, 255);
  }
  public static blue(): Color {
    return new Color(0, 0, 255, 255);
  }
}
