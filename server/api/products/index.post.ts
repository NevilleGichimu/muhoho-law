import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const supabase = createClient(
    runtimeConfig.public.supabaseUrl,
    runtimeConfig.public.supabaseServiceRoleKey
  );

  const productsData = await readBody(event);
  if (!productsData) {
    throw createError({ statusCode: 400, message: "Missing products data" });
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .insert(productsData)
      .select()
      .single();

    if (error) {
      throw createError({ statusCode: 500, message: error.message });
    }

    return { success: true, data };
  } catch (err) {
    console.error("Error creating products:", err);
    return { success: false, message: "Internal Server Error" };
  }
});
