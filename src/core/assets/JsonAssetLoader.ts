import AssetManager from './AssetManager';
import IAsset from './IAsset';
import IAssetLoader from './IAssetLoader';

/**
 * Encapsulates a loaded image asset, providing helper functionality to get image metadata.
 */
export class JsonAsset implements IAsset {
  public readonly name: string;
  public readonly data: any;

  public constructor(name: string, data: any) {
    this.name = name;
    this.data = data;
  }
}

/**
 * Loads images
 */
export default class JsonAssetLoader implements IAssetLoader {
  public get supportedExtensions(): string[] {
    return ['json'];
  }

  public loadAsset(assetName: string): void {
    const request: XMLHttpRequest = new XMLHttpRequest();
    request.open('GET', assetName);
    request.addEventListener('load', this.onJsonLoaded.bind(this, assetName, request));
    request.send();
  }

  /**
   * Sends an onAssetLoaded message to the AssetManager.
   * @param assetName
   * @param image
   */
  private onJsonLoaded(assetName: string, request: XMLHttpRequest): void {
    console.log('onJsonLoaded: assetname/json', assetName, request);

    if (request.readyState === request.DONE) {
      const json = JSON.parse(request.responseText);
      const asset = new JsonAsset(assetName, json);
      AssetManager.onAssetLoaded(asset);
    }
  }
}
