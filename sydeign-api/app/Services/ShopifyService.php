class ShopifyService
{
    public function products()
    {
        return Http::withHeaders([
            'X-Shopify-Access-Token' =>
                env('SHOPIFY_ADMIN_TOKEN')
        ])->get(
            env('SHOPIFY_URL')
            . '/admin/api/2025-04/products.json'
        )->json();
    }
}
