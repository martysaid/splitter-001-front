# Initial User Flow Screens for ShareSplit PWA

Looking at the project plan, here's the typical initial flow screens for a share house expense management PWA:

## 1. Landing/Welcome Screen
- **Hero section**: "Split expenses fairly with your housemates"
- **Value props**: 3-4 key benefits (automatic calculations, payment tracking, etc.)
- **Social proof**: "Trusted by 200+ share houses" 
- **CTA buttons**: "Get Started" (primary), "Sign In" (secondary)
- **Pricing link** in header/footer

## 2. User Type Selection
- **Question**: "What describes you best?"
- **Options**:
  - "I'm a homeowner renting out rooms" (Owner-Occupier)
  - "I manage expenses for my share house" (Head Tenant) 
  - "I'm a property manager" (Professional)
- **Each option** shows relevant benefits/features
- **Continue button** becomes active after selection

## 3. Magic Link Authentication
- **Email input** with clear label: "Enter your email to get started"
- **Send Link button**
- **Privacy note**: "We'll never spam you"
- **Back link** to previous screen
- **Already have account?** → "Sign in instead"

## 4. Check Email Screen
- **Confirmation message**: "Check your email for a magic link"
- **Email address** displayed (with edit option)
- **Resend link** (with cooldown timer)
- **Didn't receive it?** troubleshooting tips
- **Use a different email** link

## 5. Plan Selection (Post-Authentication)
- **Welcome message** with user's email
- **Pricing tiers**: Free (3 tenants), Starter ($9), Premium ($19), Manager ($49)
- **Feature comparison** table
- **Start with Free** prominent option
- **Payment form** for paid plans (Stripe integration)

## 6. House Setup (First-time Users)
- **House details**: Name, address (optional)
- **Tenant limits** based on selected plan
- **Sample data option**: "Add example expenses to explore"
- **Skip for now** vs "Complete setup"

## 7. Onboarding Tour (Optional)
- **Progressive disclosure** of key features
- **Skip anytime** option
- **3-4 key screens**: Add expense → Invite tenants → Track payments → View dashboard

Each screen should be mobile-first, load quickly, and have clear progress indicators where appropriate.