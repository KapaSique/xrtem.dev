"""Fail loudly if a render came out empty or blown: Blender -b -P blender/check_frame.py -- <png>"""
import sys

import bpy
import numpy as np

path = sys.argv[sys.argv.index("--") + 1]
im = bpy.data.images.load(path)
px = np.array(im.pixels[:], dtype=np.float32).reshape(-1, 4)
cover = float((px[:, 3] > 0.02).mean())
peak = float(px[:, :3].max())
print(f"COVER {cover:.3f} PEAK {peak:.3f}")
if not (0.05 < cover < 0.8 and peak > 0.5):
    raise SystemExit(f"CHECK FAIL {path}: cover {cover:.3f}, peak {peak:.3f}")
print("CHECK OK")
