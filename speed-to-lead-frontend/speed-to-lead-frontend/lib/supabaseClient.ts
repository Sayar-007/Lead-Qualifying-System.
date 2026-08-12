import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zwhthcoukkgvnbarornl.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_dcqTjFqfnxof4PKLY-8iPQ_6HhaMZEN";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
