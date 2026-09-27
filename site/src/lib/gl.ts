/**
 * The smallest amount of WebGL that does the job.
 *
 * Importing a 3D engine to render ten nodes and sixty particles would add
 * ~150KB to a page whose argument is that this person knows what things cost.
 * So: two shader programs, a few draw calls, and the ~70 lines of matrix maths
 * they need.
 */

export type M4 = Float32Array;

export const m4 = (): M4 => new Float32Array(16);

export function perspective(out: M4, fovy: number, aspect: number, near: number, far: number): M4 {
  const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
  out.fill(0);
  out[0] = f / aspect; out[5] = f; out[11] = -1;
  out[10] = (far + near) * nf; out[14] = 2 * far * near * nf;
  return out;
}

export function lookAt(out: M4, eye: number[], at: number[], up: number[]): M4 {
  let z0 = eye[0] - at[0], z1 = eye[1] - at[1], z2 = eye[2] - at[2];
  let l = Math.hypot(z0, z1, z2) || 1; z0 /= l; z1 /= l; z2 /= l;
  let x0 = up[1] * z2 - up[2] * z1, x1 = up[2] * z0 - up[0] * z2, x2 = up[0] * z1 - up[1] * z0;
  l = Math.hypot(x0, x1, x2) || 1; x0 /= l; x1 /= l; x2 /= l;
  const y0 = z1 * x2 - z2 * x1, y1 = z2 * x0 - z0 * x2, y2 = z0 * x1 - z1 * x0;
  out[0] = x0; out[1] = y0; out[2] = z0; out[3] = 0;
  out[4] = x1; out[5] = y1; out[6] = z1; out[7] = 0;
  out[8] = x2; out[9] = y2; out[10] = z2; out[11] = 0;
  out[12] = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]);
  out[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]);
  out[14] = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]);
  out[15] = 1;
  return out;
}

export function mul(out: M4, a: M4, b: M4): M4 {
  for (let c = 0; c < 4; c++) {
    const b0 = b[c * 4], b1 = b[c * 4 + 1], b2 = b[c * 4 + 2], b3 = b[c * 4 + 3];
    out[c * 4]     = b0 * a[0] + b1 * a[4] + b2 * a[8]  + b3 * a[12];
    out[c * 4 + 1] = b0 * a[1] + b1 * a[5] + b2 * a[9]  + b3 * a[13];
    out[c * 4 + 2] = b0 * a[2] + b1 * a[6] + b2 * a[10] + b3 * a[14];
    out[c * 4 + 3] = b0 * a[3] + b1 * a[7] + b2 * a[11] + b3 * a[15];
  }
  return out;
}

export function program(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('shader:', gl.getShaderInfoLog(s)); gl.deleteShader(s); return null;
    }
    return s;
  };
  const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const p = gl.createProgram()!;
  gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.error('link:', gl.getProgramInfoLog(p)); return null; }
  return p;
}

/** Hex (#rrggbb) to normalised rgb. */
export function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
