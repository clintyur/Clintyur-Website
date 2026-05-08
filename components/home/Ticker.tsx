'use client'

export function Ticker() {
  const items = [
    "Recipes",
    "Goods",
    "The art of eating well",
    "From New York",
  ]

  const content = (
    <>
      {items.map((item, i) => (
        <div key={i}>
          <span className={i % 2 ? "it" : ""}>{item}</span>
          <span className="sep"></span>
        </div>
      ))}
    </>
  )

  return (
    <div className="ticker">
      <div className="ticker-track">
        {content}
        {content}
      </div>
    </div>
  )
}
