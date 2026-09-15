import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://mnylkzpvemsofohfdmrq.supabase.co";
const supabaseAnonKey = "sb_publishable_Dhes25fdpmjIw8ebM2C6Ag_BXJ96peU";
gi
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
