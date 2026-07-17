export type CanvasCapabilities = {
  reducedMotion: boolean;
  viewportWidth: number;
  deviceMemory?: number;
  webgl: boolean;
};

export function canUseEditorialCanvas(value: CanvasCapabilities) {
  if (!value.webgl || value.reducedMotion) return false;
  if (value.viewportWidth < 768) return false;
  if ((value.deviceMemory ?? 4) <= 2 && value.viewportWidth < 1024) return false;
  return true;
}
