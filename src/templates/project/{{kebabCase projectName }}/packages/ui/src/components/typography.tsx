import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "../lib/utils.js";

export const H1: FC<ComponentPropsWithoutRef<"h1"> & { asChild?: boolean }> = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "h1";
  return (
    <Comp
      data-slot="H1"
      className={cn(
        "scroll-m-20 text-5xl tracking-wide text-balance font-blackletter",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const H2: FC<ComponentPropsWithoutRef<"h2"> & { asChild?: boolean }> = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "h2";
  return (
    <Comp
      data-slot="H2"
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const H3: FC<ComponentPropsWithoutRef<"h3"> & { asChild?: boolean }> = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "h3";
  return (
    <Comp
      data-slot="H3"
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const H4: FC<ComponentPropsWithoutRef<"h4"> & { asChild?: boolean }> = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "h4";
  return (
    <Comp
      data-slot="H4"
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const P: FC<ComponentPropsWithoutRef<"p"> & { asChild?: boolean }> = ({
  children,
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      data-slot="H4"
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const Lead: FC<
  ComponentPropsWithoutRef<"p"> & { asChild?: boolean }
> = ({ children, className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      data-slot="Lead"
      className={cn("text-muted-foreground text-xl", className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const Muted: FC<
  ComponentPropsWithoutRef<"p"> & { asChild?: boolean }
> = ({ children, className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      data-slot="Muted"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const Large: FC<
  ComponentPropsWithoutRef<"p"> & { asChild?: boolean }
> = ({ children, className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      data-slot="Large"
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const Small: FC<
  ComponentPropsWithoutRef<"small"> & { asChild?: boolean }
> = ({ children, className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "small";
  return (
    <Comp
      data-slot="Small"
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const T = {
  H1,
  H2,
  H3,
  H4,
  Lead,
  Large,
  Muted,
  P,
  Small,
};
