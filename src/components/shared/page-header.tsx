import { getPageConfig } from "@/lib/page-config";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Description } from "./description";

export const PageHeader = () => {
  const pathname = usePathname();
  const pageConfig = getPageConfig(pathname);
  return (
    <div>
      {pageConfig.showTitle && pageConfig.title && (
        <Header title={pageConfig.title} />
      )}
      {pageConfig.showDescription && pageConfig.description && (
        <Description description={pageConfig.description} />
      )}
    </div>
  );
};
