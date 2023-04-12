/** The WebGL rendering context */
export let gl: WebGLRenderingContext;

/**
 * Responsible for setting up WebGL rendering context
 */
export class GLUtilities {
  /**
   * Initializes WebGL. If a canvas ID is not provided, a new canvas will be generated.
   * @param elementId ID of a canvas element.
   * @returns
   */
  public static initialize(elementId?: string): HTMLCanvasElement {
    let canvas: HTMLCanvasElement;

    if (elementId !== undefined) {
      canvas = document.getElementById(elementId) as HTMLCanvasElement;

      if (canvas === undefined) {
        throw new Error('Cannot find a canvas element named: ' + elementId);
      }
    } else {
      canvas = document.createElement('canvas') as HTMLCanvasElement;
      document.body.appendChild(canvas);
    }

    const context = canvas.getContext('webgl');
    if (context === undefined) {
      throw new Error('Unable to initialize WebGL');
    }
    if (!(context instanceof WebGLRenderingContext)) {
      throw new Error('Invalid WebGL rendering context');
    }

    gl = context;

    return canvas;
  }
}
