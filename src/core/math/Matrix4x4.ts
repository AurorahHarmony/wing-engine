/**
 * Helper class to generate useful 4x4 Matrices
 */
export default class Matrix4x4 {
  private _data: number[] = [];

  private constructor() {
    // prettier-ignore
    this._data = [
      1, 0, 0, 0,//
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  }
  public get data(): number[] {
    return this._data;
  }

  /**
   * Creates a new Matrix4x4 instance
   * @returns {Matrix4x4}
   */
  public static identity(): Matrix4x4 {
    return new Matrix4x4();
  }

  /**
   * Returns a new Matrix4x4, configured for orthographic rendering.
   * @param left
   * @param right
   * @param bottom
   * @param top
   * @param nearClip
   * @param farClip
   * @returns {Matrix4x4}
   */
  public static orthographic(
    left: number,
    right: number,
    bottom: number,
    top: number,
    nearClip: number,
    farClip: number
  ): Matrix4x4 {
    const m = new Matrix4x4();

    const lr: number = 1.0 / (left - right); // Left minus right
    const bt: number = 1.0 / (bottom - top); // Bottom minus top
    const nf: number = 1.0 / (nearClip - farClip); // Near minus Far

    m._data[0] = -2.0 * lr;
    m._data[5] = -2.0 * bt;
    m._data[10] = 2.0 * nf;

    m._data[12] = (left + top) * lr;
    m._data[13] = (top + bottom) * bt;
    m._data[14] = (farClip + nearClip) * nf;

    return m;
  }
}
