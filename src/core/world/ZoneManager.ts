import AssetManager, { MESSAGE_ASSET_LOADER_ASSET_LOADED } from '../assets/AssetManager';
import { JsonAsset } from '../assets/JsonAssetLoader';
import Shader from '../gl/Shader';
import IMessageHandler from '../message/IMessageHandler';
import Message from '../message/Message';
import TestZone from './TestZone';
import Zone from './Zone';

export default class ZoneManager implements IMessageHandler {
  private static _globalZoneID = -1;
  // private static _zones: { [id: number]: Zone } = {};
  private static _registeredZones: { [id: number]: string } = {};
  private static _activeZone: Zone;
  private static _instance: ZoneManager;

  /** Hidden to enforce singleton */
  private constructor() {}

  public static initialize(): void {
    ZoneManager._instance = new ZoneManager();
    // TEMPORARY
    ZoneManager._registeredZones[0] = 'src/assets/zones/testZone.json';
  }

  public static changeZone(id: number): void {
    if (ZoneManager._activeZone !== undefined) {
      ZoneManager._activeZone.onDeactivated();
      ZoneManager._activeZone.unload();
      ZoneManager._activeZone = undefined;
    }

    if (ZoneManager._registeredZones[id] !== undefined) {
      if (AssetManager.isAssetLoaded(ZoneManager._registeredZones[id])) {
        const asset = AssetManager.getAsset(ZoneManager._registeredZones[id]);
        ZoneManager.loadZone(asset);
      } else {
        Message.subscribe(
          MESSAGE_ASSET_LOADER_ASSET_LOADED + ZoneManager._registeredZones[id],
          ZoneManager._instance
        );
        AssetManager.loadAsset(ZoneManager._registeredZones[id]);
      }
    } else {
      throw new Error(`Zone id: ${id.toString()} does not exist.`);
    }
  }

  public static update(time: number): void {
    if (ZoneManager._activeZone !== undefined) {
      ZoneManager._activeZone.update(time);
    }
  }

  public static render(shader: Shader): void {
    if (ZoneManager._activeZone !== undefined) {
      ZoneManager._activeZone.render(shader);
    }
  }

  public onMessage(message: Message): void {
    if (message.code.indexOf(MESSAGE_ASSET_LOADER_ASSET_LOADED)) {
      const asset = message.context as JsonAsset;
      ZoneManager.loadZone(asset);
    }
  }

  private static loadZone(asset: JsonAsset): void {
    const zoneData = asset.data;

    // Extract ID
    let zoneId: number;
    if (zoneData.id === undefined) {
      throw new Error('Zone file format exception: Zone id is not present');
    } else {
      zoneId = Number(zoneData.id);
    }

    // Extract name
    let zoneName: string;
    if (zoneData.name === undefined) {
      throw new Error('Zone file format exception: Zone name is not present');
    } else {
      zoneName = String(zoneData.name);
    }

    // Extract Description
    let zoneDescription: string;
    if (zoneData.description !== undefined) {
      zoneDescription = String(zoneData.description);
    }

    ZoneManager._activeZone = new Zone(zoneId, zoneName, zoneDescription);
    ZoneManager._activeZone.initialize(zoneData);
    ZoneManager._activeZone.onActivated();
    ZoneManager._activeZone.load();
  }
}
