'use client'

import { useState, useTransition } from 'react'

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const res = await fetch('/api/members/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        window.location.href = '/members'
      } else {
        const { error: msg } = await res.json()
        setError(msg ?? 'Something went wrong.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="email" className="text-sm font-medium" style={{ color: 'var(--color-ll-dark)' }}>
        Your subscriber email
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="border rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2"
        style={{ borderColor: '#d4c9b0', fontFamily: 'var(--font-body)' }}
      />
      {error && (
        <p className="text-sm" style={{ color: 'var(--color-ll-primary)' }}>
          {error}{' '}
          {error.includes('subscribe') && (
            <a href="/support" style={{ color: 'var(--color-ll-accent)', textDecoration: 'underline' }}>
              Subscribe here →
            </a>
          )}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="px-6 py-3 text-sm font-medium uppercase tracking-wide text-white rounded-sm disabled:opacity-50"
        style={{ background: 'var(--color-ll-primary)', fontFamily: 'var(--font-heading)' }}
      >
        {pending ? 'Checking…' : 'Access Members Area'}
      </button>
    </form>
  )
}
