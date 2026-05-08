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
          The recipes here are ones I've made a hundred times over. Some came from professional kitchens, some from late-night cooking at home, all of them from actually wanting to eat the food. They're tested, they work, and they're laid out so you can follow along.
        </p>
        <p className="intro-body">
          Here's the thing though — anyone can make these dishes. You don't need fancy equipment or fancy training. Just put in a little time, pay attention to what you're doing, and trust the process. That's it.
        </p>
        <div className="intro-sig">
          <span>—</span>
          <span className="signature">Clint</span>
        </div>
      </div>
    </div>
  )
}
