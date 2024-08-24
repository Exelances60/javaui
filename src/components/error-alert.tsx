import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ErrorAlert = ({ error }: { error: Error }) => {
  return (
    <div className="w-full h-full items-center justify-center flex">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error?.message || "Bir hata oluştu"}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorAlert;
