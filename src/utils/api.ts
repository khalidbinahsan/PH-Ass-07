export async function getAllCategories() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryBySlug(slug: string) {
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getAllProducts() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductsByCategory(categorySlug: string) {
  const res = await fetch(
    `"https://openapi.programming-hero.com/api/bazardor/products?category=${categorySlug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getProductByIdOrSlug(idOrSlug: string) {
  // First try direct endpoint /api/bazardor/products/[id]
  const res = await fetch(`"https://openapi.programming-hero.com/api/bazardor/products/${idOrSlug}`, {
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