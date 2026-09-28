import { companies } from './data.js'
import { colors, spacing, radius, fontSize } from './tokens.js'

const fmt = {
  revenue: (v) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(v * 1_000_000),

  margin: (v) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`,
}

function StatusBadge({ value }) {
  const inRange = value >= 3 && value <= 7
  return (
    <span
      style={{
        display: 'inline-block',
        padding: `${spacing.xs} ${spacing.sm}`,
        borderRadius: radius.sm,
        fontSize: fontSize.xs,
        fontWeight: 600,
        letterSpacing: '0.02em',
        backgroundColor: inRange ? colors.positiveBg : colors.negativeBg,
        color: inRange ? colors.positiveText : colors.negativeText,
      }}
    >
      {inRange ? 'In range' : 'Review'}
    </span>
  )
}

function MarginBadge({ value }) {
  const positive = value >= 0
  return (
    <span
      style={{
        display: 'inline-block',
        padding: `${spacing.xs} ${spacing.sm}`,
        borderRadius: radius.sm,
        fontSize: fontSize.xs,
        fontWeight: 600,
        letterSpacing: '0.02em',
        backgroundColor: positive ? colors.positiveBg : colors.negativeBg,
        color: positive ? colors.positiveText : colors.negativeText,
      }}
    >
      {fmt.margin(value)}
    </span>
  )
}

const col = {
  th: {
    padding: `${spacing.sm} ${spacing.md}`,
    textAlign: 'left',
    fontSize: fontSize.xs,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: colors.textMuted,
    backgroundColor: colors.headerBg,
    borderBottom: `1px solid ${colors.border}`,
    whiteSpace: 'nowrap',
  },
  td: {
    padding: `${spacing.md}`,
    fontSize: fontSize.base,
    color: colors.textBody,
    borderBottom: `1px solid ${colors.border}`,
    verticalAlign: 'middle',
  },
}

export default function App() {
  return (
    <div
      className="page"
      style={{
        backgroundColor: colors.bgPage,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: spacing.xl }}>
          <h1
            style={{
              margin: 0,
              fontSize: '56px',
              fontWeight: 700,
              color: colors.textHeading,
              letterSpacing: '-0.02em',
            }}
          >
            Company Overview
          </h1>
          <p
            style={{
              margin: `${spacing.xs} 0 0`,
              fontSize: fontSize.base,
              color: colors.textMuted,
            }}
          >
            10 companies · FY 2024 financials
          </p>
        </div>

        {/* Card */}
        <div
          className="table-card"
          style={{
            backgroundColor: colors.bgCard,
            borderRadius: radius.lg,
            border: `1px solid ${colors.border}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...col.th, width: 32, paddingRight: 0 }}>#</th>
                <th style={col.th}>Entity Name</th>
                <th style={col.th}>Country</th>
                <th style={{ ...col.th, textAlign: 'right' }}>Revenue</th>
                <th style={{ ...col.th, textAlign: 'right' }}>Op. Margin</th>
                <th style={col.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c, i) => (
                <tr
                  key={c.id}
                  style={{ transition: 'background 0.1s' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.primaryLight)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <td
                    style={{
                      ...col.td,
                      width: 32,
                      paddingRight: 0,
                      color: colors.textMuted,
                      fontSize: fontSize.sm,
                    }}
                  >
                    {i + 1}
                  </td>
                  <td style={col.td}>
                    <span style={{ fontWeight: 500, color: colors.textHeading }}>
                      {c.name}
                    </span>
                  </td>
                  <td style={{ ...col.td, color: colors.textMuted }}>
                    {c.country}
                  </td>
                  <td style={{ ...col.td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {fmt.revenue(c.revenue)}
                  </td>
                  <td style={{ ...col.td, textAlign: 'right' }}>
                    <MarginBadge value={c.margin} />
                  </td>
                  <td style={col.td}>
                    <StatusBadge value={c.margin} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
