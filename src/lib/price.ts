/** Turkish lira price label; items without a price show a placeholder. */
export const formatPrice = (price?: number) => (price == null ? "₺ --" : `₺${price}`);
