export function shimmer(size: number, radius = 8) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#ccc" stop-opacity="0.1" offset="20%" />
          <stop stop-color="#ccc" stop-opacity="0.2" offset="50%" />
          <stop stop-color="#ccc" stop-opacity="0.1" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#ccc" fill-opacity="0.05" stroke="#ccc" stroke-opacity="0.3" stroke-width="1" />
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="url(#g)">
        <animate attributeName="x" from="-${size}" to="${size}" dur="500ms" repeatCount="indefinite" />
      </rect>
    </svg>
  `;
}

export function toBase64(str: string): string {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
}

export function blurDataURL(s: number, radius = 8): string {
  const size = Math.max(40, s);
  return `data:image/svg+xml;base64,${toBase64(shimmer(size, radius))}`;
}
