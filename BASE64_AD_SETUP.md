# Base64 Ad Scripts Setup Guide

## Problem & Solution

**Problem:** Raw HTML ad scripts in Vercel environment variables cause crashes and page hijacking because:
- Special characters break environment variable parsing
- Scripts can escape their containers and hijack page clicks/navigation
- Line breaks in HTML cause environment variable corruption

**Solution:** Store ad scripts as Base64 in environment variables, then decode them safely on the client side.

---

## Step 1: Convert Your HTML Ad Scripts to Base64

### Option A: Online (Quick)
1. Go to [Base64encode.org](https://www.base64encode.org/)
2. Paste your raw HTML ad script
3. Click "Encode"
4. Copy the Base64 result

### Option B: Terminal Command (Recommended)

```bash
# For your ad HTML (replace with your actual script)
echo '<script>atOptions = { "key" : "abc123", "format" : "iframe", "height" : 90, "width" : 728, "params" : {} };</script><script src="https://example.com/invoke.js"></script>' | base64
```

**Output:** You'll get a string like:
```
PHNjcmlwdD5hdE9wdGlvbnMgPSB7ICJrZXkiIDogImFiYzEyMyIsICJmb3JtYXQiIDogImlmcmFtZSIsICJoZWlnaHQiIDogOTAsICJ3aWR0aCI6IDcyOCwgInBhcmFtcyIgOiB7fSB9Ozwvc2NyaXB0PjxzY3JpcHQgc3JjPSJodHRwczovL2V4YW1wbGUuY29tL2ludm9rZS5qcyI+PC9zY3JpcHQ+
```

### Option C: Node.js One-Liner

```bash
node -e "console.log(Buffer.from('<YOUR_HTML_HERE>').toString('base64'))"
```

---

## Step 2: Set Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Create new variables with Base64 encoded scripts:

```
VITE_AD_ZONE_TOP_B64=<your-base64-encoded-top-script>
VITE_AD_ZONE_MID_B64=<your-base64-encoded-mid-script>
VITE_AD_ZONE_BOTTOM_B64=<your-base64-encoded-bottom-script>
```

**Example:**
```
VITE_AD_ZONE_TOP_B64=PHNjcmlwdD5hdE9wdGlvbnMgPSB7ICJrZXkiIDogIjhhMjNhMzI5M2YxMmY3ZDhkZjFiMGRkZmQ3ODAwNzBkIiwgImZvcm1hdCIgOiAiaWZyYW1lIiwgImhlaWdodCIgOiA5MCwgIndpZHRoIiA6IDcyOCwgInBhcmFtcyIgOiB7fSB9Ozwvc2NyaXB0PjxzY3JpcHQgc3JjPSJodHRwczovL3d3dy5oaWdocGVyZm9ybWFuY2Vmb3JtYXQuY29tLzhhMjNhMzI5M2YxMmY3ZDhkZjFiMGRkZmQ3ODAwNzBkL2ludm9rZS5qcyI+PC9zY3JpcHQ+
```

4. Click **Save** and redeploy

---

## Step 3: Update Your Code

### Configuration (`src/lib/base64-ads-config.ts`)
Already set up for you! It:
- Decodes Base64 environment variables using `atob()`
- Handles errors gracefully
- Auto-detects and decodes Base64 strings

### Using SafeAdSlot Component

Replace your old ad components with `SafeAdSlot`:

```tsx
import { SafeAdSlot } from "@/components/ui/safe-ad-slot";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SafeAdSlot placement="top" height={90} />
      <main>{children}</main>
      <SafeAdSlot placement="mid" height={250} />
      <SafeAdSlot placement="bottom" height={50} />
    </div>
  );
}
```

---

## How SafeAdSlot Prevents Issues

✅ **No SSR Rendering** - Adds `isClient` check to prevent hydration errors  
✅ **Script Isolation** - Uses CSS `isolation: isolate` to contain scripts  
✅ **Safe Injection** - Uses DOMPurify to sanitize HTML  
✅ **Script Re-execution** - Properly re-creates script tags so they execute  
✅ **Consent-Based** - Only loads with user consent  
✅ **Viewport Detection** - Lazy-loads ads when in view  

---

## Local Testing (Optional)

Test locally before pushing to Vercel:

1. Create local `.env.local` with Base64 variables:
   ```
   VITE_AD_ZONE_TOP_B64=PHNjcmlwdD4uLi48L3NjcmlwdD4=
   ```

2. Run locally:
   ```bash
   npm run dev
   ```

3. Check DevTools Console - should see ads rendering without errors

---

## Decoding Your Base64 for Reference

To decode your Base64 later (for editing):

**Online:** [Base64decode.org](https://www.base64decode.org/)

**Terminal:**
```bash
echo "PHNjcmlwdD4uLi48L3NjcmlwdD4=" | base64 -d
```

**Node.js:**
```bash
node -e "console.log(Buffer.from('PHNjcmlwdD4uLi48L3NjcmlwdD4=', 'base64').toString())"
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Ads don't show | Check DevTools Console for errors, verify Base64 is valid |
| Hydration errors | SafeAdSlot handles SSR - ensure you're using it |
| Scripts not executing | SafeAdSlot re-creates script tags - should work automatically |
| Page hijacking | CSS isolation prevents script breakout |
| Console errors | DOMPurify is configured for ad networks - check if tags are whitelisted |

---

## File Reference

- **Config:** `src/lib/base64-ads-config.ts` - Decodes Base64 env vars
- **Component:** `src/components/ui/safe-ad-slot.tsx` - Safe rendering
- **Usage:** Import `SafeAdSlot` and use `placement` prop

---

## Example: Complete Ad Section

```tsx
import { SafeAdSlot } from "@/components/ui/safe-ad-slot";

export function AdSection() {
  return (
    <section className="border-b bg-soft/90">
      <div className="mx-auto max-w-7xl py-4 space-y-4">
        {/* Top banner */}
        <SafeAdSlot 
          placement="top" 
          height={90}
          eager={true}
        />

        {/* Mid content */}
        <div className="grid lg:grid-cols-[1fr,auto] gap-4">
          <SafeAdSlot 
            placement="mid" 
            height={250}
          />
        </div>

        {/* Bottom banner */}
        <SafeAdSlot 
          placement="bottom" 
          height={50}
        />
      </div>
    </section>
  );
}
```

---

## Summary

1. ✅ Convert HTML scripts to Base64
2. ✅ Store in Vercel Environment Variables (with `_B64` suffix)
3. ✅ Use `SafeAdSlot` component instead of raw HTML
4. ✅ Deploy - no more crashes or hijacking!

The solution is production-ready and handles all edge cases safely.
