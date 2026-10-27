const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getCategoryBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/api/bazardor/categories/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}


export async function getAllCategories() {
  try {
    const res = await fetch(`${BASE_URL}/api/bazardor/categories`, {
      next: { revalidate: 60 }, // Cache for 60 seconds instead of uncached no-store
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : json?.data || json?.categories || [];
  } catch (err) {
    console.error("Categories fetch error:", err);
    return [];
  }
}

export async function getAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/api/bazardor/products`, {
      next: { revalidate: 60 }, // Prevents blocking prerender errors on static/auth routes
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (Array.isArray(json)) return json;
    return json?.data || json?.products || json?.result || [];
  } catch (err) {
    console.error("Products fetch error:", err);
    return [];
  }
}
export async function getProductsByCategory(categorySlug: string) {
  const res = await fetch(
    `${BASE_URL}/api/bazardor/products?category=${categorySlug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getProductByIdOrSlug(idOrSlug: string) {
  const res = await fetch(`${BASE_URL}/api/bazardor/products/${idOrSlug}`, {
    cache: "no-store",
  });
  if (res.ok) {
    const data = await res.json();
    if (data && Object.keys(data).length > 0) return data;
  }

  const all = await getAllProducts();
  const list = Array.isArray(all) ? all : all?.data || all?.products || [];
  return (
    list.find(
      (item: any) =>
        String(item.id) === String(idOrSlug) ||
        item.slug === idOrSlug
    ) || null
  );
}