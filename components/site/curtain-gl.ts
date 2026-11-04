/**
 * Telón de tela en WebGL. Un sol shader per a l'obertura i el tancament: la tela està
 * penjada de dalt i `hem` és l'alçada del baix (1.15 = tancat, -0.2 = recollit a dalt).
 * Pujar i baixar el baix és, físicament, obrir i tancar el mateix teló.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uHem;
uniform float uTime;
uniform float uWave;
uniform float uScallops;
uniform sampler2D uPrint;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Quant es recull la tela: 0 amb el teló estès, 1 quan ja puja
float lift() { return smoothstep(1.12, 0.8, uHem); }

// El baix fa festons entre els cordills d'elevació
float hemAt(float x01) {
  float s = abs(sin(3.14159265 * x01 * uScallops));
  float swag = 0.095 * lift() * (1.0 - pow(s, 0.72));
  float sway = 0.005 * sin(x01 * 8.0 + uTime * 1.2) * lift();
  return uHem - swag + sway;
}

float cloth(float qx, float x01, float y) {
  float x = qx + 0.24 * sin(y * 3.0 + qx * 0.35) + 0.1 * sin(y * 7.0 - qx * 0.6 + uTime * 0.35);
  float a = 0.5 + 0.5 * sin(x * 6.28318);
  float b = 0.5 + 0.5 * sin(x * 2.95 + 1.3 + 0.8 * sin(x * 0.9));
  float c = 0.5 + 0.5 * sin(x * 14.4 + y * 2.0);
  float h = pow(a, 1.5) * 0.62 + b * 0.3 + c * 0.08;
  // Plecs horitzontals que segueixen el festó, com més a prop del baix, més marcats
  float d = hemAt(x01) - y;
  float g = lift() * exp(-max(d, 0.0) * 5.0);
  h += g * 0.6 * (0.5 + 0.5 * sin(d * 88.0 + 2.0 * sin(x * 0.7)));
  return h;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float x01 = fc.x / uRes.x;
  float y = 1.0 - fc.y / uRes.y;
  float qx = fc.x / uWave;
  float hemY = hemAt(x01);
  float px = 1.5 / uRes.y;
  float alpha = 1.0 - smoothstep(hemY - px, hemY + px, y);

  // Ombra que la tela projecta sobre l'escena
  float below = max(y - hemY, 0.0);
  float shadow = 0.55 * exp(-below * 12.0) * smoothstep(1.16, 1.0, uHem) * smoothstep(-0.2, -0.05, uHem);

  float ex = 0.06;
  float ey = 2.0 / uRes.y;
  float h = cloth(qx, x01, y);
  float dx = cloth(qx + ex, x01, y) - cloth(qx - ex, x01, y);
  float dy = cloth(qx, x01, y + ey) - cloth(qx, x01, y - ey);

  vec3 n = normalize(vec3(-dx * 3.2, dy * 0.16, 1.0));
  vec3 L = normalize(vec3(-0.5, 0.55, 0.68));
  vec3 V = vec3(0.0, 0.0, 1.0);
  float diff = max(dot(n, L), 0.0);
  float ao = mix(0.42, 1.0, smoothstep(0.0, 0.8, h));
  float shade = diff * ao;
  float spec = pow(max(dot(n, normalize(L + V)), 0.0), 26.0);

  vec3 deep = vec3(0.004, 0.075, 0.2);
  vec3 mid = vec3(0.0, 0.298, 0.588);
  vec3 high = vec3(0.13, 0.47, 0.82);
  vec3 col = mix(deep, mid, smoothstep(0.08, 0.62, shade));
  col = mix(col, high, smoothstep(0.62, 1.0, shade) * 0.75);
  col += vec3(0.1, 0.17, 0.26) * spec * ao;

  // Fosc a dalt, com sota la bambolina, i trama del teixit
  col *= mix(0.62, 1.0, smoothstep(0.0, 0.3, y));
  col *= 0.975 + 0.05 * hash(floor(fc * 0.75));

  // Retolació impresa: es desplaça amb els plecs i puja amb la tela
  float v = y + (1.0 - clamp(uHem, -0.3, 1.0));
  vec2 puv = vec2(x01 + dx * 0.004, v);
  if (puv.y >= 0.0 && puv.y <= 1.0) {
    vec4 ink = texture2D(uPrint, puv);
    vec3 lit = ink.rgb * (0.78 + 0.3 * shade + 0.1 * spec);
    col = mix(col, lit, ink.a);
  }

  // Vora del baix: doblec cosit, més fosc, amb un fil clar
  float d = hemY - y;
  col *= mix(0.72, 1.0, smoothstep(0.004, 0.022, d));
  col += vec3(0.16, 0.26, 0.36) * (1.0 - smoothstep(0.0, 0.0018, abs(d - 0.026)));

  float a = alpha + shadow * (1.0 - alpha);
  gl_FragColor = vec4(col * alpha, a);
}
`

export type CurtainGL = {
  render: (hem: number, time: number) => void
  resize: () => void
  destroy: () => void
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
    setTimeout(() => resolve(null), 900)
  })
}

async function fontFamily() {
  const family = getComputedStyle(document.body).fontFamily
  const first = family.split(",")[0]
  await Promise.race([
    document.fonts?.load(`800 100px ${first}`),
    new Promise((resolve) => setTimeout(resolve, 700)),
  ])
  return family
}

/** Dibuixa la retolació de la tela: logo i nom, amb el nom partit en dues línies si la pantalla és vertical. */
function paintPrint(canvas: HTMLCanvasElement, logo: HTMLImageElement | null, family: string) {
  const ctx = canvas.getContext("2d")!
  const { width: w, height: h } = canvas
  const narrow = w / h < 1
  const lines = narrow ? ["FJM", "Transportes"] : ["FJM Transportes"]
  ctx.clearRect(0, 0, w, h)
  ctx.font = `800 100px ${family}`
  ;(ctx as unknown as { fontStretch: string }).fontStretch = "expanded"
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width))
  const size = (100 * w * (narrow ? 0.84 : 0.72)) / widest
  ctx.font = `800 ${size}px ${family}`
  ctx.textAlign = "center"
  ctx.textBaseline = "alphabetic"
  ctx.fillStyle = "#fff"

  const logoSize = logo ? Math.min(w, h) * (narrow ? 0.2 : 0.17) : 0
  const gap = logo ? size * 0.42 : 0
  const lineH = size * 1.02
  const block = logoSize + gap + lineH * lines.length
  let y = (h - block) / 2
  if (logo) {
    ctx.drawImage(logo, w / 2 - logoSize / 2, y, logoSize, logoSize)
    y += logoSize + gap
  }
  lines.forEach((line, i) => ctx.fillText(line, w / 2, y + lineH * (i + 0.82)))
}

export async function createCurtain(canvas: HTMLCanvasElement): Promise<CurtainGL | null> {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false })
  if (!gl) return null

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
  }
  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(program, "p")
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const u = (name: string) => gl.getUniformLocation(program, name)
  const uRes = u("uRes")
  const uHem = u("uHem")
  const uTime = u("uTime")
  const uWave = u("uWave")
  const uScallops = u("uScallops")

  const [logo, family] = await Promise.all([loadImage("/media/web/logo-512.webp"), fontFamily()])

  const print = document.createElement("canvas")
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width === w && canvas.height === h) return
    canvas.width = w
    canvas.height = h
    gl.viewport(0, 0, w, h)
    gl.uniform2f(uRes, w, h)
    gl.uniform1f(uWave, Math.max(64, canvas.clientWidth / 17) * dpr)
    gl.uniform1f(uScallops, canvas.clientWidth < 700 ? 3 : 7)
    print.width = w
    print.height = h
    paintPrint(print, logo, family)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, print)
  }
  resize()
  window.addEventListener("resize", resize)

  return {
    resize,
    render(hem, time) {
      gl.uniform1f(uHem, hem)
      gl.uniform1f(uTime, time)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    destroy() {
      window.removeEventListener("resize", resize)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
}
