# Sanity Webhook Revalidation Setup

## Overview

This document explains how to configure Sanity webhooks to enable **instant content updates** (1-3 seconds) on your Vercel deployments. When you publish content in Sanity Studio, a webhook triggers Next.js to revalidate affected pages, ensuring your changes appear immediately in production.

## Architecture

```
Sanity Studio (Publish) 
    ↓
Sanity Webhook (HTTP POST)
    ↓
Vercel: /api/revalidate
    ↓
Next.js: revalidatePath('/')
    ↓
Fresh Content (1-3 seconds)
```

## Prerequisites

- Sanity project: `iedths1l`
- Vercel deployment with Next.js 15
- Access to Sanity project settings
- Access to Vercel project settings

---

## Step 1: Configure Environment Variables in Vercel

### 1.1 Generate a Secret Token

Generate a secure random string for the webhook secret:

```bash
# On macOS/Linux:
openssl rand -base64 32

# Or use a password generator:
# Example: kX9mP2nL8qR4sT6vW0yZ3aB5cD7eF1gH
```

### 1.2 Add Environment Variable to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `REVALIDATION_SECRET`
   - **Value**: Your generated secret (e.g., `kX9mP2nL8qR4sT6vW0yZ3aB5cD7eF1gH`)
   - **Environments**: Check both **Production** and **Preview**
4. Click **Save**

### 1.3 Verify Other Required Variables

Ensure these are also configured in Vercel:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=iedths1l
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<your-sanity-api-token>
```

### 1.4 Redeploy to Apply Changes

After adding the environment variable, you **must redeploy**:

```bash
# Option 1: Push a commit to trigger deployment
git commit --allow-empty -m "chore: trigger redeploy for env vars"
git push

# Option 2: Use Vercel dashboard
# Go to Deployments → Click "..." on latest → "Redeploy"
```

---

## Step 2: Configure Webhook in Sanity

### 2.1 Access Sanity Webhooks Settings

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project: **3lectrify Platform** (`iedths1l`)
3. Navigate to **API** → **Webhooks**
4. Click **Create webhook**

### 2.2 Configure Webhook Settings

Fill in the webhook configuration:

#### Basic Settings

- **Name**: `Vercel Production Revalidation`
- **Description**: `Triggers on-demand revalidation for 3lectrify.com`

#### Webhook URL

For **Production**:
```
https://3lectrify.com/api/revalidate?secret=YOUR_SECRET_HERE
```

For **Preview** (if you have a preview domain):
```
https://3lectrify-preview.vercel.app/api/revalidate?secret=YOUR_SECRET_HERE
```

> **Important**: Replace `YOUR_SECRET_HERE` with the actual secret you set in Vercel.

#### Dataset

- Select: `production`

#### Trigger on

Check all these events:
- ✅ **Create**
- ✅ **Update**
- ✅ **Delete**

#### Filter (Optional)

Leave empty to trigger on all document types, or add a filter if you want to limit it:

```groq
// Example: Only trigger for pages and site settings
_type in ["page", "legalPage", "siteSettings"]
```

#### Projection (Optional)

Use this to send only necessary data:

```groq
{
  _id,
  _type,
  "slug": slug.current
}
```

#### HTTP Method

- Select: **POST**

#### HTTP Headers (Optional)

You can add custom headers if needed:
```
Content-Type: application/json
```

#### API Version

- Use: **v2024-01-01** (or latest)

### 2.3 Test the Webhook

After saving, Sanity provides a **Test** button:

1. Click **Test webhook**
2. Check the response:
   - Status: `200 OK`
   - Body should contain:
     ```json
     {
       "revalidated": true,
       "paths": [
         { "path": "/", "success": true }
       ],
       "timestamp": "2025-10-31T10:30:00.000Z"
     }
     ```

3. If you get `401 Unauthorized`:
   - Verify the secret in the URL matches Vercel's `REVALIDATION_SECRET`
   - Check that Vercel has been redeployed after adding the env var

4. If you get `500 Internal Server Error`:
   - Check Vercel logs for errors
   - Verify the API route exists at `/api/revalidate/route.ts`

---

## Step 3: Test End-to-End

### 3.1 Make a Content Change

1. Open Sanity Studio (local or hosted)
2. Edit a page (e.g., change a headline on the home page)
3. Click **Publish**

### 3.2 Verify Webhook Fired

In Sanity:
1. Go to **API** → **Webhooks** → **Your webhook**
2. Click **Logs** tab
3. You should see a recent `200 OK` request

### 3.3 Verify Content Updated

1. Open your production site: `https://3lectrify.com`
2. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
3. Verify your content change appears

**Expected timeline**: 1-3 seconds from publish to live.

### 3.4 Check Vercel Logs (if issues)

1. Go to Vercel dashboard → **Deployments**
2. Click on your production deployment
3. Navigate to **Functions** → Find `/api/revalidate`
4. Check logs for webhook requests

You should see logs like:
```
[Revalidate] Webhook received: { type: 'page', slug: 'home', id: '...' }
[Revalidate] ✓ Revalidated: /
```

---

## Troubleshooting

### Issue: Changes Don't Appear After Publishing

**Possible causes:**

1. **Webhook not configured**
   - Check Sanity webhook logs
   - Ensure webhook URL is correct

2. **Wrong secret**
   - Verify `REVALIDATION_SECRET` in Vercel matches webhook URL
   - Redeploy after changing env vars

3. **Browser cache**
   - Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
   - Try in incognito mode

4. **Vercel edge cache**
   - Wait 60 seconds (CDN propagation)
   - Check Vercel logs for revalidation

### Issue: 401 Unauthorized Response

**Solution:**
- Ensure `REVALIDATION_SECRET` is set in Vercel
- Ensure the secret in the webhook URL matches exactly
- Redeploy Vercel after adding/changing env var

### Issue: 500 Internal Server Error

**Solution:**
- Check Vercel function logs for errors
- Verify `/api/revalidate/route.ts` exists and is deployed
- Check for TypeScript/build errors

### Issue: Webhook Fires but Content Still Cached

**Solution:**
- Check if `useCdn: false` in development (should be `true` in production)
- Verify `revalidate = 3600` is set in page files
- Check Vercel edge cache settings

---

## Monitoring & Maintenance

### Check Webhook Health

Regularly monitor webhook performance:

1. **Sanity Webhook Logs**
   - Go to: Sanity → API → Webhooks → [Your webhook] → Logs
   - Check for failures or slow responses

2. **Vercel Function Logs**
   - Go to: Vercel → Deployments → [Latest] → Functions → `/api/revalidate`
   - Look for errors or patterns

### Webhook Best Practices

1. **Security**
   - Never commit the secret to git
   - Rotate the secret periodically (every 6-12 months)
   - Use different secrets for Production and Preview

2. **Performance**
   - Monitor response times (should be < 500ms)
   - Check for timeout errors
   - Verify all paths are revalidating successfully

3. **Redundancy**
   - Keep the `revalidate = 3600` fallback in pages
   - This ensures content updates even if webhook fails

---

## How It Works

### The Revalidation API Route

Located at `apps/3lectrify/app/api/revalidate/route.ts`:

```typescript
export async function POST(request: NextRequest) {
  // 1. Verify secret
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // 2. Parse Sanity webhook payload
  const body = await request.json();
  const { _type, slug } = body;

  // 3. Determine paths to revalidate
  if (_type === 'siteSettings') {
    revalidatePath('/'); // Affects all pages
  } else if (slug === 'home') {
    revalidatePath('/');
  } else if (slug) {
    revalidatePath(`/${slug}`);
  }

  // 4. Return success
  return NextResponse.json({ revalidated: true });
}
```

### Fallback Time-Based Revalidation

Each page also has:

```typescript
export const revalidate = 3600; // 1 hour
```

This provides a safety net if webhooks fail.

### Why Both?

- **Webhook**: Instant updates (1-3 seconds)
- **Time-based**: Automatic updates every hour as backup
- **CDN**: Fast global delivery with smart caching

---

## Additional Resources

- [Next.js On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#on-demand-revalidation)
- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)

---

## Quick Reference

| Setting | Value |
|---------|-------|
| **Sanity Project ID** | `iedths1l` |
| **Sanity Dataset** | `production` |
| **Webhook URL (Prod)** | `https://3lectrify.com/api/revalidate?secret=...` |
| **Vercel Env Var** | `REVALIDATION_SECRET` |
| **Fallback Revalidation** | 3600 seconds (1 hour) |
| **Expected Update Time** | 1-3 seconds |

---

## Need Help?

If you encounter issues:

1. Check webhook logs in Sanity
2. Check function logs in Vercel
3. Verify all environment variables
4. Test with a hard refresh (Cmd+Shift+R)
5. Wait 60 seconds for CDN propagation

Still having issues? Check Vercel's status page or contact support.

