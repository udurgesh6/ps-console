"use client";

import { PageHeader } from "@/components/shared/page-header";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export default function AwarenessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isEditRoute =
    pathname.startsWith("/awareness/") && pathname !== "/awareness";

  const getAwarenessId = () => {
    if (isEditRoute) {
      const segments = pathname.split("/").filter(Boolean);
      return segments[segments.length - 1] || null;
    }
    return null;
  };

  const awarenessId = getAwarenessId();

  const getAwarenessName = (id: string | null) => {
    if (!id) return "Unknown Awareness";

    const awareness = [].find((aw) => aw === id);
    return awareness ? awareness : `Awareness ${id}`;
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* {!isEditRoute && <PageHeader />} */}
        {isEditRoute && (
          <div className="">
            <Breadcrumb
              items={[
                { label: "Awareness", href: "/awareness" },
                { label: getAwarenessName(awarenessId), isActive: true },
              ]}
            />
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
