import SectionWrapper from "../layout/section-wrapper";

interface FormSentProps {
	type: "login" | "signup";
	email?: string;
}

export default function FormSent({ type, email }: FormSentProps) {
	return (
		<SectionWrapper>
			{type === "signup" ? (
				<>
					<h2>We've sent you a magic link to complete your signup.</h2>
					<h2>
						Please check the inbox for
						<br />
						{email ? <>{email}</> : "your email"}
						<br />
						and click the link to verify your account.
					</h2>
				</>
			) : (
				<>
					<h2>
						We've sent you a magic link
						<br />
						to log in.
					</h2>
					<h2>
						Please check the inbox for
						<br />
						{email ? <>{email}</> : "your email"}
						<br />
						and click the link to access your account.
					</h2>
				</>
			)}
		</SectionWrapper>
	);
}
