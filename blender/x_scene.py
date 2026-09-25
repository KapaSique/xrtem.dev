"""The glass x for xrtem.dev, as code.

Run from the repo root (Blender 5.0+; BlendLuxCore 2.11+ for --engine luxcore):

    /Applications/Blender.app/Contents/MacOS/Blender -b -P blender/x_scene.py -- \
        --engine luxcore --mode loop --out blender/out/loop-luxcore

Modes
    loop   frames [start, end) of a seamless quarter-turn spin -> <out>/0000.png ...
    still  a single loop frame (--frame) -> <out> (a .png path), for look-dev
    macro  the close-up for the About card -> <out> (a .png path)

Everything renders over a transparent film on purpose: encode.sh lays the frames
on pure black and the page blends the video with `lighten`, so whatever black the
codec produces loses to the page background and no rectangle shows.
"""
import argparse
import math
import os
import sys
import time

import bpy
import numpy as np
from mathutils import Euler, Quaternion

# ---------------------------------------------------------------- the look
FRAMES = 180                 # 6 s at 30 fps
SPIN_DEG = 90.0              # the x maps onto itself after a quarter turn
TILT_DEG = (-18.0, 0.0, -26.0)
IOR = 1.5
CAUCHY_B = 0.025             # LuxCore dispersion; real glass is 0.0035-0.013, this is stylised
FILM_NM, FILM_IOR = 420.0, 1.38
COLORS = {"violet": "#5B46FF", "pink": "#FF4FA3", "cyan": "#35E0FF", "warm": "#FFB36B"}
STUDIO = {
    "key": 7.0,
    "violet": 3.2,
    "cyan": 3.0,
    "pink": 3.0,
    "warm": 0.7,
    # (horizontal offset, width, strength) of the thin strips behind the object
    "strips": ((-0.42, 0.018, 9.0), (-0.12, 0.008, 12.0), (0.2, 0.012, 10.0), (0.47, 0.02, 7.0)),
}
MACRO_RES = (1096, 1240)     # the About card is 548 x 620 CSS px, at 2x
# Cycles: samples per pixel. LuxCore: seconds per frame (90 s at 1080 px measured clean
# on an M4 Pro; a noise-threshold halt never converged on dispersive glass).
DEFAULT_BUDGET = {"cycles": 256, "luxcore": 90}

HERE = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(HERE, "out", "studio.exr")


def parse():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser(prog="x_scene.py")
    p.add_argument("--engine", choices=("luxcore", "cycles"), default="luxcore")
    p.add_argument("--mode", choices=("loop", "still", "macro"), default="still")
    p.add_argument("--out", required=True)
    p.add_argument("--res", type=int, default=1080, help="side of the square frame")
    p.add_argument("--frame", type=int, default=0, help="loop frame for --mode still")
    p.add_argument("--start", type=int, default=0)
    p.add_argument("--end", type=int, default=FRAMES)
    p.add_argument("--budget", type=int, default=0, help="Cycles samples / LuxCore seconds (0 = default)")
    return p.parse_args(argv)


def hex_lin(h):
    h = h.lstrip("#")
    c = np.array([int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)])
    return np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)


def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def build_env(path, w=2048, h=1024):
    """The studio as an equirect HDR, shared by both engines."""
    u = (np.arange(w) + 0.5) / w
    v = (np.arange(h) + 0.5) / h
    U, V = np.meshgrid(u, v)
    phi = (U - 0.5) * 2 * np.pi
    el = (V - 0.5) * np.pi
    dx = -np.cos(el) * np.cos(phi)
    dy = np.cos(el) * np.sin(phi)
    dz = np.sin(el)
    s = STUDIO
    img = np.zeros((h, w, 3))
    img += s["key"] * smooth(0.62, 0.8, dz)[..., None]
    img += s["violet"] * np.exp(-((dz - 0.02) / 0.07) ** 2)[..., None] * hex_lin(COLORS["violet"])
    walls = (1 - np.abs(dz))[..., None]
    img += s["cyan"] * smooth(0.45, 0.95, -dx)[..., None] * hex_lin(COLORS["cyan"]) * walls
    img += s["pink"] * smooth(0.45, 0.95, dx)[..., None] * hex_lin(COLORS["pink"]) * walls
    img += s["warm"] * smooth(-0.35, -0.85, dz)[..., None] * hex_lin(COLORS["warm"])
    behind = smooth(0.2, 0.6, dy) * (np.abs(dz) < 0.75)
    for off, width, k in s["strips"]:
        img += (k * np.exp(-((dx - off) / width) ** 2) * behind)[..., None]
    rgba = np.concatenate([img, np.ones((h, w, 1))], axis=2).astype(np.float32)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im = bpy.data.images.new("studio", w, h, alpha=True, float_buffer=True)
    im.pixels.foreach_set(np.flipud(rgba).ravel())  # Blender stores the bottom row first
    im.filepath_raw = path
    im.file_format = "OPEN_EXR"
    im.save()
    return bpy.data.images.load(path, check_existing=False)


def clear_scene():
    # Keep the user's add-ons (LuxCore lives there), drop whatever the startup file holds.
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o)


def build_x(scene):
    """Two capsules fused by metaballs; returns the object to spin."""
    mb = bpy.data.metaballs.new("x")
    mb.resolution = 0.03
    mb.render_resolution = 0.012
    mb.threshold = 0.6
    for ang in (45, -45):
        e = mb.elements.new(type="CAPSULE")
        e.radius = 0.5
        e.size_x = 1.25
        e.stiffness = 2.2
        e.rotation = Quaternion((0, 1, 0), math.radians(ang))
    obj = bpy.data.objects.new("x", mb)
    scene.collection.objects.link(obj)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    obj = bpy.context.active_object
    bpy.ops.object.shade_smooth()

    tilt = bpy.data.objects.new("tilt", None)
    scene.collection.objects.link(tilt)
    tilt.rotation_euler = Euler(tuple(math.radians(a) for a in TILT_DEG))
    obj.parent = tilt  # spin happens in the x's own plane, the tilt stays put
    return obj


def set_spin(obj, frame):
    obj.rotation_euler = Euler((0.0, math.radians(SPIN_DEG * frame / FRAMES), 0.0))


def build_camera(scene, mode, res):
    data = bpy.data.cameras.new("cam")
    cam = bpy.data.objects.new("cam", data)
    scene.collection.objects.link(cam)
    scene.camera = cam
    if mode == "macro":
        data.lens = 110
        cam.location = (0.35, -7.2, 0.45)
        cam.rotation_euler = Euler((math.radians(86.5), 0, math.radians(2.8)))
        data.dof.use_dof = True
        data.dof.focus_distance = 7.2
        data.dof.aperture_fstop = 2.2
        scene.render.resolution_x, scene.render.resolution_y = MACRO_RES
    else:
        data.lens = 70
        cam.location = (0, -10.0, 0)
        cam.rotation_euler = Euler((math.radians(90), 0, 0))
        scene.render.resolution_x = scene.render.resolution_y = res
    return cam


def build_world(scene, engine, env):
    w = bpy.data.worlds.new("studio")
    scene.world = w
    if engine == "cycles":
        try:
            w.use_nodes = True  # deprecated in 5.0, still harmless
        except Exception:
            pass
        nt = w.node_tree
        nt.nodes.clear()
        out = nt.nodes.new("ShaderNodeOutputWorld")
        tex = nt.nodes.new("ShaderNodeTexEnvironment")
        tex.image = env
        bg = nt.nodes.new("ShaderNodeBackground")
        nt.links.new(tex.outputs["Color"], bg.inputs["Color"])
        nt.links.new(bg.outputs[0], out.inputs["Surface"])
    else:
        w.luxcore.light = "infinite"
        w.luxcore.image = env
        w.luxcore.gain = 1.0
        # pyluxcore 2.11.2 sRGB-encodes float image maps on load (measured: linear 0.8
        # comes back as 244/255 instead of 231). Gamma 2.2 undoes it and keeps HDR > 1.
        w.luxcore.gamma = 2.2


def build_glass(engine):
    mat = bpy.data.materials.new("glass")
    if engine == "cycles":
        # Cycles has no dispersion input: three glass lobes, one per RGB channel.
        try:
            mat.use_nodes = True
        except Exception:
            pass
        nt = mat.node_tree
        nt.nodes.clear()
        out = nt.nodes.new("ShaderNodeOutputMaterial")
        a1, a2 = nt.nodes.new("ShaderNodeAddShader"), nt.nodes.new("ShaderNodeAddShader")
        lobes = []
        for col, k in (((1, 0, 0, 1), -1), ((0, 1, 0, 1), 0), ((0, 0, 1, 1), 1)):
            g = nt.nodes.new("ShaderNodeBsdfGlass")
            g.inputs["Color"].default_value = col
            g.inputs["IOR"].default_value = IOR + k * 0.04
            g.inputs["Roughness"].default_value = 0.0
            g.inputs["Thin Film Thickness"].default_value = FILM_NM
            g.inputs["Thin Film IOR"].default_value = FILM_IOR
            lobes.append(g)
        nt.links.new(lobes[0].outputs[0], a1.inputs[0])
        nt.links.new(lobes[1].outputs[0], a1.inputs[1])
        nt.links.new(a1.outputs[0], a2.inputs[0])
        nt.links.new(lobes[2].outputs[0], a2.inputs[1])
        nt.links.new(a2.outputs[0], out.inputs["Surface"])
    else:
        tree = bpy.data.node_groups.new("glass", "luxcore_material_nodes")
        out = tree.nodes.new("LuxCoreNodeMatOutput")
        g = tree.nodes.new("LuxCoreNodeMatGlass")
        g.inputs["IOR"].default_value = IOR
        g.inputs["Dispersion"].default_value = CAUCHY_B
        g.use_thinfilmcoating = True  # the film sockets only exist once this is on
        g.inputs["Film Thickness (nm)"].default_value = FILM_NM
        g.inputs["Film IOR"].default_value = FILM_IOR
        tree.links.new(g.outputs["Material"], out.inputs["Material"])
        mat.luxcore.node_tree = tree
    return mat


def configure(scene, engine, budget, cam):
    r = scene.render
    r.resolution_percentage = 100
    r.film_transparent = True
    r.image_settings.file_format = "PNG"
    r.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "None"
    budget = budget or DEFAULT_BUDGET[engine]
    if engine == "cycles":
        r.engine = "CYCLES"
        prefs = bpy.context.preferences.addons["cycles"].preferences
        prefs.compute_device_type = "METAL"
        prefs.get_devices()
        for d in prefs.devices:
            d.use = d.type == "METAL"
        c = scene.cycles
        c.device = "GPU"
        c.samples = budget
        c.seed = 0
        c.use_animated_seed = False
        c.use_denoising = True
        c.max_bounces = 24
        c.transmission_bounces = 24
        c.glossy_bounces = 12
        c.transparent_max_bounces = 16
        c.blur_glossy = 0.6
        c.sample_clamp_indirect = 12
    else:
        r.engine = "LUXCORE"
        cfg = scene.luxcore.config
        cfg.engine = "PATH"
        cfg.device = "OCL"
        cfg.path.depth_total = 24
        cfg.path.depth_specular = 24
        cfg.path.depth_glossy = 8
        cfg.path.depth_diffuse = 2
        # Halt on time: every frame of the loop costs the same, so equal time gives
        # equal noise and the video does not shimmer between frames.
        halt = scene.luxcore.halt
        halt.enable = True
        halt.use_samples = False
        halt.use_noise_thresh = False
        halt.use_time = True
        halt.time = budget
        scene.luxcore.denoiser.enabled = True
        scene.luxcore.denoiser.type = "OIDN"
        cam.data.luxcore.imagepipeline.transparent_film = True


def render_to(scene, path):
    scene.render.filepath = path
    t0 = time.time()
    bpy.ops.render.render(write_still=True)
    print(f"RENDERED {path} {time.time() - t0:.1f}s", flush=True)


def main():
    args = parse()
    scene = bpy.context.scene
    clear_scene()
    env = build_env(ENV_PATH)
    x = build_x(scene)
    x.data.materials.clear()
    x.data.materials.append(build_glass(args.engine))
    cam = build_camera(scene, args.mode, args.res)
    build_world(scene, args.engine, env)
    configure(scene, args.engine, args.budget, cam)

    if args.mode == "loop":
        os.makedirs(args.out, exist_ok=True)
        for f in range(args.start, args.end):
            path = os.path.join(args.out, f"{f:04d}.png")
            if os.path.exists(path):  # resume an interrupted night
                continue
            set_spin(x, f)
            render_to(scene, path)
    elif args.mode == "still":
        set_spin(x, args.frame)
        render_to(scene, args.out)
    else:
        set_spin(x, 20)
        render_to(scene, args.out)


main()
