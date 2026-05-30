/**
 * Browser-based Base64 encoding/decoding utility
 * Use this in browser console for quick conversions
 */

/**
 * Encode HTML string to Base64
 * Useful for converting ad scripts to env var format
 */
export function encodeAdToBase64(htmlString: string): string {
  try {
    return btoa(htmlString);
  } catch (error) {
    console.error("Failed to encode to Base64:", error);
    return "";
  }
}

/**
 * Decode Base64 to HTML string
 * This is what SafeAdSlot uses internally
 */
export function decodeAdFromBase64(base64String: string): string {
  try {
    return atob(base64String);
  } catch (error) {
    console.error("Failed to decode from Base64:", error);
    return "";
  }
}

/**
 * Test if a string is valid Base64
 */
export function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

/**
 * Convert ad HTML snippet to Base64 for environment variables
 * Usage in browser console:
 * 
 * const htmlScript = `<script>atOptions = {...}</script><script src="..."></script>`;
 * const base64 = convertAdToEnvVar(htmlScript);
 * console.log(base64); // Copy this to Vercel env vars
 */
export function convertAdToEnvVar(htmlScript: string): {
  base64: string;
  length: number;
  preview: string;
} {
  const base64 = encodeAdToBase64(htmlScript);
  const preview = decodeAdFromBase64(base64).substring(0, 50) + "...";

  return {
    base64,
    length: base64.length,
    preview,
  };
}

/**
 * Verify Base64 environment variable
 * Usage in browser console:
 * 
 * const envValue = "PHNjcmlwdD4uLi48L3NjcmlwdD4=";
 * const result = verifyEnvBase64(envValue);
 * console.log(result); // Shows decoded HTML and status
 */
export function verifyEnvBase64(base64EnvValue: string): {
  isValid: boolean;
  decoded: string;
  length: number;
  error?: string;
} {
  try {
    if (!base64EnvValue) {
      return {
        isValid: false,
        decoded: "",
        length: 0,
        error: "Environment variable is empty",
      };
    }

    if (!isValidBase64(base64EnvValue)) {
      return {
        isValid: false,
        decoded: "",
        length: 0,
        error: "Invalid Base64 format",
      };
    }

    const decoded = decodeAdFromBase64(base64EnvValue);

    return {
      isValid: true,
      decoded,
      length: decoded.length,
    };
  } catch (error) {
    return {
      isValid: false,
      decoded: "",
      length: 0,
      error: String(error),
    };
  }
}

/**
 * Example: How to use in browser console
 * 
 * ==========================================
 * STEP 1: Encode your ad HTML to Base64
 * ==========================================
 * 
 * import { convertAdToEnvVar } from '@/lib/base64-ad-utils';
 * 
 * const myAdHtml = `<script>atOptions = {
 *   'key' : '8a23a3293f12f7d8df1b0ddfd780070d',
 *   'format' : 'iframe',
 *   'height' : 90,
 *   'width' : 728,
 *   'params' : {}
 * };</script><script src="https://www.highperformanceformat.com/8a23a3293f12f7d8df1b0ddfd780070d/invoke.js"></script>`;
 * 
 * const result = convertAdToEnvVar(myAdHtml);
 * console.log('Base64:', result.base64);
 * console.log('Length:', result.length);
 * console.log('Preview:', result.preview);
 * 
 * // Copy result.base64 to Vercel → Settings → Environment Variables
 * // Create variable: VITE_AD_ZONE_TOP_B64=<result.base64>
 * 
 * ==========================================
 * STEP 2: Verify the environment variable
 * ==========================================
 * 
 * import { verifyEnvBase64 } from '@/lib/base64-ad-utils';
 * 
 * // After deployment, verify it decoded correctly:
 * const envValue = import.meta.env.VITE_AD_ZONE_TOP_B64;
 * const verification = verifyEnvBase64(envValue);
 * console.log(verification);
 * 
 * // Should show:
 * // {
 * //   isValid: true,
 * //   decoded: "<script>atOptions = {...}</script>...",
 * //   length: 248
 * // }
 */
