import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'David Shumba'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// TODO: Once you have a custom OG design, replace this with a real image
// at public/og.png and reference it from metadata in layout.tsx instead.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <p
          style={{
            color: '#888888',
            fontSize: 15,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            margin: '0 0 32px 0',
          }}
        >
          davidshumba.com
        </p>
        <h1
          style={{
            color: '#EDEDED',
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.05,
            margin: '0 0 28px 0',
          }}
        >
          David Shumba
        </h1>
        <p
          style={{
            color: '#C4A75E',
            fontSize: 22,
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Data Degree Apprentice — UK
        </p>
      </div>
    ),
    size,
  )
}
