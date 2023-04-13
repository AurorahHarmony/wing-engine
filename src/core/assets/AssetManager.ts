import Message from '../message/Message';
import IAsset from './IAsset';
import IAssetLoader from './IAssetLoader';
import ImageAssetLoader from './ImageAssetLoader';

export const MESSAGE_ASSET_LOADER_ASSET_LOADED = 'MESSAGE_ASSET_LOADER_ASSET_LOADED::';

export default class AssetManager {
  private static _loaders: IAssetLoader[] = [];
  private static _loadedAssets: { [name: string]: IAsset } = {};

  private constructor() {} // Hide the constructor so that it cannot be called

  /**
   * Initialize the asset loader.
   */
  public static initialize(): void {
    AssetManager._loaders.push(new ImageAssetLoader());
  }

  /**
   * Registers a new loader type in the AssetManager.
   * @param loader A loader class that implements IAssetLoader
   */
  public static registerLoader(loader: IAssetLoader): void {
    AssetManager._loaders.push(loader);
  }

  /**
   * Sends a event through the messageing system when when an asset is successfully loaded
   * @param asset An asset that implements IAsset
   */
  public static onAssetLoaded(asset: IAsset): void {
    AssetManager._loadedAssets[asset.name] = asset;
    Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
  }

  /**
   * Attmpts to find a IAssetLoader that supports the asset file type, and then attempts to load the asset.
   * @param assetName
   */
  public static loadAsset(assetName: string): void {
    const extension = assetName.split('.').pop().toLowerCase();
    for (const l of AssetManager._loaders) {
      if (l.supportedExtensions.indexOf(extension) !== -1) {
        l.loadAsset(assetName);
        return;
      }
    }

    console.warn(
      `Unable to load asset with extension ${extension} because there is no loader associated with it.`
    );
  }

  /**
   * Checks if an Asset is loaded
   * @param assetName
   * @returns
   */
  public static isAssetLoaded(assetName: string): boolean {
    return AssetManager._loadedAssets[assetName] !== undefined;
  }

  /**
   * Attempts to get a loaded asset. If it's not loaded, will schedule the asset for loading, then return undefined.
   * @param assetName
   * @returns The loaded asset or undefined
   */
  public static getAsset(assetName: string): IAsset {
    if (AssetManager._loadedAssets[assetName] !== undefined) {
      return AssetManager.loadAsset[assetName];
    }

    AssetManager.loadAsset(assetName);
    return undefined;
  }
}
