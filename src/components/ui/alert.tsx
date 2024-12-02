import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/utils.ts"
import { Icons } from "@/components/ui/icons";

const alertVariants = cva(
  "relative flex w-full animate-fadeIn items-center gap-3 rounded-lg border-[0.3px] px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-info/50 bg-info/10 text-info dark:border-info [&>svg]:text-info",
        success: "border-success/50 bg-success/10 text-success dark:border-success [&>svg]:text-success",
        warning: "border-warning/50 bg-warning/10 text-warning dark:border-warning [&>svg]:text-warning",
        alert: "border-alert/50 bg-alert/10 text-alert dark:border-alert [&>svg]:text-alert",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);


const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const Message:
  React.FC<{
    message: string,
    type: "warning" | "default" | "success" | "alert" | "info",
    classNameAlert?: string,
    classnameAlertTitle?: string
  }> = ({ message, type, classNameAlert, classnameAlertTitle }) => (

  <Alert variant={type} className={"animate-fadeInSlow !border-none w-full " + classNameAlert}>
    <div className="size-[25px]">
      <Icons.warning />
    </div>
    <AlertTitle className={"mb-0 !text-[0.9rem] font-medium " + classnameAlertTitle}>{message}</AlertTitle>
  </Alert>

)
Message.displayName = "AlertMessage"

export { Alert, AlertTitle, AlertDescription, Message }
