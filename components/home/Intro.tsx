'use client'

export function Intro() {
  return (
    <div className="container intro">
      <div>
        <p className="intro-quote">
          The best meal is one you cook <span className="it">for someone</span> you care about
        </p>
      </div>
      <div>
        <p className="intro-body">
          Every recipe here is written with intention — tested in my own kitchen, refined through cooking for others, and presented so you can cook it confidently at home.
        </p>
        <p className="intro-body">
          This is food made simple, but never simplified. It's about understanding what you're cooking, why you're cooking it, and knowing it will turn out well.
        </p>
        <div className="intro-sig">
          <span>—</span>
          <span className="signature">Clint</span>
        </div>
      </div>
    </div>
  )
}
