import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import MainWrapper from "@/components/layout/main-wrapper";
import PageWrapper from "@/components/layout/page-wrapper";
import Hero from "@/components/hero";
import SectionWrapper from "@/components/layout/section-wrapper";
import FormMultiFieldWrapper from "@/components/layout/form-multi-field-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { User } from "@/features/auth/types/auth.types";
import { useProfileForm } from "../hooks/use-profile-form";
import { useEmailChange } from "../hooks/use-email-change";
import { useNavigate } from "@tanstack/react-router";

export function UserProfile() {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<PageWrapper>
				<Header />
				<MainWrapper>
					<Hero>
						<h2>Loading...</h2>
					</Hero>
				</MainWrapper>
				<Footer />
			</PageWrapper>
		);
	}

	if (!user) {
		navigate({ to: "/login" });
		return;
	}

	return (
		<PageWrapper>
			<Header />
			<MainWrapper className='md:gap-28'>
				<Hero>
					<h2>Your Profile.</h2>
				</Hero>
				<ProfileForm user={user} />
				<EmailChangeSection currentEmail={user.email} />
				<AccountInfo user={user} />
			</MainWrapper>
			<Footer />
		</PageWrapper>
	);
}

function ProfileForm({ user }: { user: User }) {
	const { form, onSubmit, isSubmitting, isDirty, error, success, clearMessages } = useProfileForm(user);

	return (
		<SectionWrapper className='w-full items-start !gap-6'>
			<h3>Personal Information</h3>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-8'>
					<FormMultiFieldWrapper>
						<>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input variant='split' type='text' placeholder='First name' {...field} onFocus={clearMessages} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input variant='split' type='text' placeholder='Last name' {...field} onFocus={clearMessages} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					</FormMultiFieldWrapper>

					<Button type='submit' variant='split' disabled={isSubmitting || !isDirty}>
						{isSubmitting ? "Saving..." : "Save Changes"}
					</Button>

					{error && (
						<div className='flex w-full flex-col items-start gap-4'>
							<Alert className='self-start' variant='split_destructive' role='status' aria-live='polite'>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						</div>
					)}

					{success && (
						<div className='flex w-full flex-col'>
							<Alert className='self-center' variant='split' role='status' aria-live='polite'>
								<AlertDescription>{success}</AlertDescription>
							</Alert>
						</div>
					)}
				</form>
			</Form>
		</SectionWrapper>
	);
}

function EmailChangeSection({ currentEmail }: { currentEmail: string }) {
	const { form, onSubmit, isSubmitting, emailSent, reset, error, success, clearMessages } =
		useEmailChange(currentEmail);

	if (emailSent) {
		return (
			// TODO: abstract classes to component wrapper
			<SectionWrapper className='w-full items-start !gap-6'>
				<h3>Change Email</h3>
				<div className='flex w-full flex-col gap-4'>
					<p className='text-left'>
						A verification link has been sent to your new email address. Check your inbox and click the link to confirm
						the change.
					</p>
					<Button variant='split' onClick={reset}>
						Change to a different email
					</Button>

					{success && (
						<Alert className='self-center' variant='split' role='status' aria-live='polite'>
							<AlertDescription>{success}</AlertDescription>
						</Alert>
					)}
				</div>
			</SectionWrapper>
		);
	}

	return (
		// TODO: abstract classes to component wrapper
		<SectionWrapper className='w-full items-start !gap-6'>
			<h3>Change Email — {currentEmail}</h3>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-8'>
					<FormMultiFieldWrapper>
						<>
							<FormField
								control={form.control}
								name='newEmail'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												variant='split'
												type='email'
												placeholder='New email address'
												{...field}
												onFocus={clearMessages}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					</FormMultiFieldWrapper>

					<div className='flex flex-col gap-2'>
						<Button type='submit' variant='split' disabled={isSubmitting || !form.formState.isValid}>
							{isSubmitting ? "Sending..." : "Send Verification Email"}
						</Button>
					</div>

					{error && (
						<Alert className='self-start' variant='split_destructive' role='status' aria-live='polite'>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{success && (
						<Alert className='self-center' variant='split' role='status' aria-live='polite'>
							<AlertDescription>{success}</AlertDescription>
						</Alert>
					)}
				</form>
			</Form>
		</SectionWrapper>
	);
}

function AccountInfo({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
	return (
		<SectionWrapper className='w-full items-start !gap-6'>
			<h3>Account Information</h3>
			<div className='flex w-full flex-col gap-4'>
				{user.isAdmin && (
					<div className='flex justify-between'>
						<span className='text-base md:text-xl'>Role</span>
						<span className='text-base md:text-xl'>Admin</span>
					</div>
				)}
				<div className='flex justify-between'>
					<span className='text-base md:text-xl'>Member since</span>
					<span className='text-base md:text-xl'>{new Date(user.created_at).toLocaleDateString()}</span>
				</div>
			</div>
		</SectionWrapper>
	);
}
