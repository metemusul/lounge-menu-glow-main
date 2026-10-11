import { formatPrice } from "@/lib/price";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";

interface ItemBottomSheetProps {
  item: {
    name: string;
    image: string;
    imageAlt: string;
    detail?: string;
    price?: number | undefined;
    description?: string;
  } | null;
}

export function ItemBottomSheet({ item }: ItemBottomSheetProps) {
  if (!item) return null;

  return (
    <DrawerContent
      onCloseAutoFocus={(e) => {
        e.preventDefault();
      }}
      className="item-bottom-sheet z-[101] mx-auto mt-0 max-h-[90dvh] w-full max-w-2xl overflow-hidden rounded-t-3xl border-border bg-card text-card-foreground outline-none"
      overlayClassName="item-sheet-overlay z-[100] bg-overlay/70 backdrop-blur-sm"
      handleClassName="mb-4 mt-3 h-1 w-10 shrink-0 bg-muted-foreground/40"
    >
      <DrawerClose asChild>
        <Button variant="ghost" size="icon" aria-label="Kapat" title="Kapat" className="absolute right-3 top-2 z-10 size-11 rounded-full bg-card/90 text-muted-foreground hover:text-gold-light">
          <X aria-hidden="true" />
        </Button>
      </DrawerClose>
      <div className="overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <img src={item.image} alt={item.imageAlt} width={1600} height={1000} className="aspect-[16/10] max-h-[42dvh] w-full bg-secondary object-cover" />
        <div className="px-6 pt-6 sm:px-8 sm:pt-7">
          <div className="flex items-start justify-between gap-4">
            <DrawerTitle className="min-w-0 break-words font-display text-2xl font-semibold leading-tight tracking-normal sm:text-3xl">{item.name}</DrawerTitle>
            <span className="shrink-0 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-base font-bold text-gold-light">{formatPrice(item.price)}</span>
          </div>
          {item.detail && <p className="mt-2 text-sm font-medium leading-6 text-gold-light/90">{item.detail}</p>}
          <DrawerDescription className="mt-5 text-sm leading-7 text-muted-foreground">
            {item.description || (item.detail ? `${item.detail} ile özenle hazırlanmıştır.` : "Özenle seçilmiş taze malzemeler ve şefimizin özel sunumuyla hazırlanmıştır.")}
          </DrawerDescription>
        </div>
      </div>
    </DrawerContent>
  );
}