import AssetManager, { MESSAGE_ASSET_LOADER_ASSET_LOADED } from '../assets/AssetManager';
import { ImageAsset } from '../assets/ImageAssetLoader';
import { gl } from '../gl/GLUtilities';
import IMessageHandler from '../message/IMessageHandler';
import Message from '../message/Message';

const LEVEL = 0;
const BORDER = 0;
const TEMP_IMAGE_DATA = new Uint8Array([255, 255, 255, 255]);

/**
 * Representes a texture.
 */
export default class Texture implements IMessageHandler {
  private _name: string;
  private _handle: WebGLTexture;
  private _isLoaded = false;
  private _width: number;
  private _height: number;

  /**
   * Creates a new texture
   * @param name The name of this texture
   * @param width The width of this texture
   * @param height The height of this texture
   */
  public constructor(name: string, width = 1, height = 1) {
    this._name = name;
    this._width = width;
    this._height = height;

    this._handle = gl.createTexture();
    Message.subscribe(MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name, this);

    this.bind();

    gl.texImage2D(
      gl.TEXTURE_2D,
      LEVEL,
      gl.RGBA,
      1,
      1,
      BORDER,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      TEMP_IMAGE_DATA
    );

    const asset = AssetManager.getAsset(this._name) as ImageAsset;
    if (asset !== undefined) {
      this.loadTextureFromAsset(asset);
    }
  }

  /** The name of this texture */
  public get name(): string {
    return this.name;
  }

  /** Indicates if this texture is loader */
  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  /** The width of this texture */
  public get width(): number {
    return this._width;
  }

  /** The height of this texture */
  public get height(): number {
    return this._height;
  }

  /** Destroys this texture */
  public destroy(): void {
    gl.deleteTexture(this._handle);
  }

  /**
   * Activates the provided WebGL unit and binds this texture
   * @param textureUnit The texture unit to activate on. Default: 0
   */
  public activateAndBind(textureUnit = 0): void {
    gl.activeTexture(gl.TEXTURE0 + textureUnit);

    this.bind();
  }

  /** Binds this texture */
  public bind(): void {
    gl.bindTexture(gl.TEXTURE_2D, this._handle);
  }

  /** Unbinds this texture */
  public unbind(): void {
    gl.bindTexture(gl.TEXTURE_2D, undefined);
  }

  /** The message handler
   * @param message The message to be handled
   */
  public onMessage(message: Message): void {
    if (message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name) {
      this.loadTextureFromAsset(message.context as ImageAsset);
    }
  }

  private loadTextureFromAsset(asset: ImageAsset): void {
    this._width = asset.width;
    this._height = asset.height;
    this.bind();

    gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, asset.data);

    if (this.isPowerOf2()) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // Do not generate a mipmap and clamp mapping to edge.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    // TODO: Set texture filtering based on configuration.
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    this._isLoaded = true;
  }

  private isPowerOf2(): boolean {
    return this.isValuePowerOf2(this._width) && this.isValuePowerOf2(this._height);
  }
  private isValuePowerOf2(value: number): boolean {
    return (value & (value - 1)) == 0;
  }
}
