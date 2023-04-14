import Shader from '../gl/Shader';
import TestZone from './TestZone';
import Zone from './Zone';

export default class ZoneManager {
  private static _globalZoneID = -1;
  private static _zones: { [id: number]: Zone } = {};
  private static _activeZone: Zone;

  /** Hidden to enforce singleton */
  private constructor() {}

  public static createZone(name: string, description: string): number {
    ZoneManager._globalZoneID++;
    const zone = new Zone(ZoneManager._globalZoneID, name, description);
    ZoneManager._zones[ZoneManager._globalZoneID] = zone;
    return ZoneManager._globalZoneID;
  }

  // TODO: this is temporary code until file loading is supported
  public static createTestZone(): number {
    ZoneManager._globalZoneID++;
    const zone = new TestZone(ZoneManager._globalZoneID, 'test', 'simple test zone');
    ZoneManager._zones[ZoneManager._globalZoneID] = zone;
    return ZoneManager._globalZoneID;
  }

  public static changeZone(id: number): void {
    if (ZoneManager._activeZone !== undefined) {
      ZoneManager._activeZone.onDeactivated();
      ZoneManager._activeZone.unload();
    }

    if (ZoneManager._zones[id] !== undefined) {
      ZoneManager._activeZone = ZoneManager._zones[id];
      ZoneManager._activeZone.onActivated();
      ZoneManager._activeZone.load();
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
}
