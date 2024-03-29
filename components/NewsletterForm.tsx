'use client'

import React, { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = () => {
	const inputEl = useRef<HTMLInputElement>(null)
	const [error, setError] = useState(false)
	const [message, setMessage] = useState('')
	const [subscribed, setSubscribed] = useState(false)
	const [loading, setLoading] = useState(false)

	const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!inputEl.current) {
			return
		}

		if (loading) {
			return
		}

		setLoading(true)

		const res = await fetch(`${siteMetadata.siteUrl}/api/emailoctopus/subscribe`, {
			body: JSON.stringify({
				email: inputEl.current.value
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})

		const { error } = await res.json()
		if (error) {
			setLoading(false)
			setError(true)
			setMessage('Your e-mail address is invalid or you are already subscribed!')
			return
		}

		inputEl.current.value = ''
		setLoading(false)
		setError(false)
		setSubscribed(true)
	}

	return (
		<section className="bg-nfh-background-secondary">
			<div className="mx-auto max-w-screen-xl px-4 py-8">
				<div className="not-prose mx-auto max-w-screen-md sm:text-center">
					<h2 className="text-nfh-text-primary mb-4 text-3xl tracking-tight sm:text-4xl">
						Sign up to the newsletter
					</h2>
					<form onSubmit={subscribe}>
						<div className="mx-auto max-w-screen-sm items-center space-y-4 sm:flex sm:space-y-0">
							<div className="relative w-full">
								<label
									htmlFor="email-input"
									className="text-nfh-text-primary mb-2 hidden text-sm font-medium"
								>
									Email address
								</label>
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<svg
										className="h-5 w-5"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Email</title>
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
								</div>
								<input
									className={`${
										subscribed
											? 'bg-nfh-background-secondary placeholder:text-nfh-text-secondary'
											: 'bg-nfh-background-primary placeholder:text-nfh-text-primary'
									} border-nfh-accent-primary bg-nfh-background-primary focus:border-nfh-accent-secondary focus:ring-nfh-accent-secondary block w-full border p-3 pl-10 text-sm`}
									autoComplete="email"
									id="email-input"
									name="email"
									placeholder={subscribed ? "You're subscribed!  🎉" : 'Enter your email'}
									ref={inputEl}
									type="email"
									disabled={subscribed}
									required
								/>
							</div>
							<div>
								{!subscribed && (
									<button
										type="submit"
										className="border-nfh-accent-primary text-nfh-text-primary focus:ring-nfh-accent-secondary w-full border px-5 py-3 text-center text-sm font-medium focus:ring-4"
										disabled={subscribed}
									>
										Subscribe
									</button>
								)}
							</div>
						</div>
						{error && (
							<div className="mx-auto mt-3 max-w-screen-sm text-left text-sm text-red-500">
								{message}
							</div>
						)}
					</form>
				</div>
			</div>
		</section>
	)
}

export default NewsletterForm
