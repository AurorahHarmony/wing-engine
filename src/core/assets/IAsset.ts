/**
 * Interface for an Asset. An asset stores the data of a file or other asset.
 */
export default interface IAsset {
  readonly name: string;

  readonly data: any;
}
