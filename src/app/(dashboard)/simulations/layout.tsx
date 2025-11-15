"use client";

import { PageHeader } from "@/components/shared/page-header";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import dummySimulationProfiles from "@/constants/temporary/simulation-profiles";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export default function SimulationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isEditRoute =
    pathname.startsWith("/simulations/") && pathname !== "/simulations";

  const getSimulationId = () => {
    if (isEditRoute) {
      const segments = pathname.split("/").filter(Boolean);
      return segments[segments.length - 1] || null;
    }
    return null;
  };

  const simulationId = getSimulationId();

  const getSimulationName = (id: string | null) => {
    if (!id) return "Unknown Simulation";

    const simulation = dummySimulationProfiles.find((sim) => sim.id === id);
    return simulation ? simulation.name : `Simulation ${id}`;
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        {!isEditRoute && (
          <div className="flex items-center justify-between">
            <PageHeader />
            <div className="flex gap-2">
              <Button onClick={() => router.push("/simulations/new")}>
                <PlusIcon className="h-4 w-4 font-semibold" />
                Create New
              </Button>
            </div>
          </div>
        )}
        {isEditRoute && (
          <div className="">
            <Breadcrumb
              items={[
                { label: "Simulations", href: "/simulations" },
                { label: getSimulationName(simulationId), isActive: true },
              ]}
            />
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
