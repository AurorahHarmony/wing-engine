import Matrix4x4 from './Matrix4x4';
import Vector3 from './Vector3';

/**
 * Struct that stores transform informatiion
 */
export default class Transform {
  /** The position Vector */
  public position: Vector3 = Vector3.zero;

  /** The rotation Vector */
  public rotation: Vector3 = Vector3.zero;

  /** The scale Vector */
  public scale: Vector3 = Vector3.one;

  /** Copt the values from another transform to this transform. */
  public copyFrom(transform: Transform): void {
    this.position.copyFrom(transform.position);
    this.rotation.copyFrom(transform.rotation);
    this.scale.copyFrom(transform.scale);
  }

  /** Returns this transform as a Matrix4x4 */
  public getTransformationMatrix(): Matrix4x4 {
    const translation = Matrix4x4.translation(this.position);

    const rotation = Matrix4x4.rotationXYZ(this.rotation.x, this.rotation.y, this.rotation.z);
    const scale = Matrix4x4.scale(this.scale);

    return Matrix4x4.multiply(Matrix4x4.multiply(translation, rotation), scale);
  }

  public setFromJson(json: any): void {
    if (json.position !== undefined) {
      this.position.setFromJson(json.position);
    }
    if (json.rotation !== undefined) {
      this.rotation.setFromJson(json.rotation);
    }
    if (json.scale !== undefined) {
      this.scale.setFromJson(json.scale);
    }
  }
}
