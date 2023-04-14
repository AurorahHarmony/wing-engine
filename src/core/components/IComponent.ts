import Shader from '../gl/Shader';
import SimObject from '../world/SimObject';

export default interface IComponent {
  name: string;

  readonly owner: SimObject;

  /**
   * Set the owner of this component
   * @param owner The owner to be set
   */
  setOwner(owner: SimObject): void;

  /** Loads this component */
  load(): void;

  /** Updates this component */
  update(time: number): void;

  /** Renders this component */
  render(shader: Shader): void;
}
