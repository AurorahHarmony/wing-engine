import IBehaviour from './IBehavior';

/**
 * Interface for defining a behavior builder.
 */
export default interface IBehaviorBuilder {
  /** The type of behavior this builder builds. This should be represented in the form of 'public get type()'. */
  readonly type: string;

  /**
   * Builds a behavior from the provided json.
   * @param json  The json to build from.
   */
  buildFromJson(json: any): IBehaviour;
}
