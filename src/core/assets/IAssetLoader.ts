import IAsset from './IAsset';

/**
 * Interface for an AssetLoader.
 * An asset loader is a definition for loading a specific type of file.
 */
export default interface IAssetLoader {
  /** Filetype extensions supported by this AssetLoader */
  readonly supportedExtensions: string[];

  /** Handles loading the specified asset */
  loadAsset(assetName: string): void;
}
