"use client";

import * as React from "react";
import useEmblaCarousel, {
  EmblaViewportRefType,
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/classnames";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;

  scrollSnaps: number[];
  selectedIndex: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: { ref?: EmblaViewportRefType } & React.ComponentProps<"div"> &
  CarouselProps) {
  const DEFAULT_OPTS: CarouselOptions = {
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    direction: "rtl",
    slidesToScroll: 1, // یا 1 اگر قدم‌به‌قدم می‌خوای
    loop: false,
    // dragFree: false, // (پیش‌فرض)
  };

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...DEFAULT_OPTS,
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  React.useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());

    const onChange = () => setSelectedIndex(api.selectedScrollSnap());

    api.on("select", onChange);
    api.on("reInit", onChange);

    return () => {
      api.off("select", onChange);
      api.off("reInit", onChange);
    };
  }, [api]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        scrollSnaps,
        selectedIndex,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn("overflow-hidden relative", className)}
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-mr-1" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pr-0" : "pt-4", //pr-1
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "text",
  size = "lg",
  color = "neutral",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      color={color}
      className={cn(
        "absolute disabled:hidden !w-[30px] !h-[50px] z-10 text-4xl rounded-full hidden md:flex bg-white hover:bg-white border text-neutral-500",
        orientation === "horizontal"
          ? "top-1/2 right-2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronRight className="size-7 stroke-2" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "text",
  size = "lg",
  color = "neutral",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      color={color}
      className={cn(
        "absolute z-10 disabled:hidden !w-[30px] !h-[50px] text-4xl rounded-full hidden md:flex bg-white hover:bg-white border text-neutral-500",
        orientation === "horizontal"
          ? "left-2 top-1/2  -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronLeft className="size-7 stroke-2" strokeWidth={1} />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function CarouselDots({ className }: { className?: string }) {
  const { api, selectedIndex, scrollSnaps } = useCarousel();

  if (!api || scrollSnaps.length === 1) return null;

  return (
    <div
      className={cn("flex justify-center items-center gap-1 mt-4", className)}
    >
      {[...Array(Math.min(scrollSnaps.length, 6))].map((_, index) => (
        <button
          key={index}
          onClick={() => api.scrollTo(index)}
          className={cn(
            "h-2 w-2 rounded-full bg-transparent  transition-all",
            selectedIndex === index
              ? "border-primary bg-white w-4"
              : "bg-neutral-200 hover:scale-110",
            selectedIndex > 6 &&
              "last:w-1.5 last:h-1.5 nth-last-[2]:bg-white nth-last-[2]:w-4",
            selectedIndex > 2 && "first:w-1.5 first:h-1.5",
          )}
          aria-label={`رفتن به اسلاید ${index + 1}`}
        />
      ))}
    </div>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};
