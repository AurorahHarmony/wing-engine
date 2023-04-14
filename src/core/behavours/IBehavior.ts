import SimObject from '../world/SimObject';

/**
 * Represents a Behavior. Behaviors do not get renderd but affect the object they are attached to in some way.
 */
export default interface IBehavior {
  /** The name of this behavior */
  name: string;

  /**
   * Sets the owner of this behavior
   * @param owner The owner.
   */
  setOwner(owner: SimObject): void;

  /**
   * Performs the updated procedures on this behavior
   * @param time delta time.
   */
  update(time: number): void;

  /**
   * Applies this behavior with the given user data.
   * @param userData The user data to be applied.
   */
  apply(userData: any): void;
}
