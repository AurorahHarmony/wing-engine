/**
 * Represents the data which is used to construct a behavior.
 */
export default interface IBehaviorData {
  /** The name of this behavior */
  name: string;

  /** Sets the properties of this data from the provided json
   * @param json The json to set from.
   */
  setFromJson(json: any): void;
}
