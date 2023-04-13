import AssetManager from './AssetManager';
import IAsset from './IAsset';
import IAssetLoader from './IAssetLoader';

/**
 * Encapsulates a loaded image asset, providing helper functionality to get image metadata.
 */
export class ImageAsset implements IAsset {
  public readonly name: string;
  public readonly data: HTMLImageElement;

  public constructor(name: string, data: HTMLImageElement) {
    this.name = name;
    this.data = data;
  }

  public get width(): number {
    return this.data.width;
  }

  public get height(): number {
    return this.data.height;
  }
}

/**
 * Loads images
 */
export default class ImageAssetLoader implements IAssetLoader {
  public get supportedExtensions(): string[] {
    return ['png', 'gif', 'jpg'];
  }

  public loadAsset(assetName: string): void {
    const image: HTMLImageElement = new Image();
    image.onload = this.onImageLoaded.bind(this, assetName, image);
    image.src = assetName;
  }

  /**
   * Sends an onAssetLoaded message to the AssetManager.
   * @param assetName
   * @param image
   */
  private onImageLoaded(assetName: string, image: HTMLImageElement): void {
    console.log('onImageLoaded: assetname/image', assetName, image);
    const asset = new ImageAsset(assetName, image);

    AssetManager.onAssetLoaded(asset);
  }
}
