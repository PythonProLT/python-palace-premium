
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type SubscriptionTier = 'free' | 'premium' | 'enterprise';

export const activateTestSubscription = async (tier: SubscriptionTier) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1); // 1 month subscription

    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        tier,
        is_active: true,
        started_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      });

    if (error) throw error;
    
    toast.success(`${tier.charAt(0).toUpperCase() + tier.slice(1)} subscription activated!`);
    return true;
  } catch (error: any) {
    toast.error("Failed to activate subscription", {
      description: error.message
    });
    return false;
  }
};

export const checkSubscriptionStatus = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return null;
  }
};
