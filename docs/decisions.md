# Architectural & Product Decisions

## Decision Log

### 1. Project Type & Visual Identity
- **Decision**: Adopt the exact Google AI Studio UI from `C:\Users\User\Downloads\gta-6-clipping-mastery`.
- **Reason**: Clean editorial high-conversion canvas design (`#FAFAFB`), Royal Blue (`#1D4ED8`) CTA buttons with sheen hover animation, and verified green badges.

### 2. Payment Gateway & Real Cropped QR
- **Decision**: PhonePe screenshot cropped strictly to the exact square QR code (370x370 px) with centered PhonePe icon.
- **Download QR Feature**: Added `[📥 Download QR Code]` button for instant PNG download.
- **UPI Details**: `dheerajkiroriwal@ybl` (Beneficiary: Dheeraj Kiroriwal).

### 3. Pricing & Deliverables
- **Decision**: Lifetime VIP Pass at **₹1,999** (regular ₹9,999 / 80% discount) with professional English campaign features:
  - Direct High-Paying Paid Campaigns Provided (No Searching Needed)
  - Early Access Campaigns — Secret Dollar-Earning Deals Before Public Release
  - Complete A-to-Z Done-For-You Setup (Account, Approval & Payouts)
  - 100% Guaranteed Campaign Approval — Start Earning From Day 1
  - 1-on-1 Direct Mentor VIP Support & Daily Clip Audits

### 4. Deployment Strategy
- **Decision**: Deploy via GitHub integration to Vercel (`https://github.com/dheerajnewmac-hub/gta6-mentorship`).
- **Configuration**: Added `vercel.json` with client-side SPA routing rewrites.
