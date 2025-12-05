import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Upload } from "lucide-react";

export const ContextAwareCreateButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenSidebar } = useSidebar();

  // Determine current page context
  const getPageContext = () => {
    if (pathname.startsWith("/team/groups")) {
      return { type: "group" };
    }
    if (pathname.startsWith("/team")) {
      return { type: "employee" };
    }
    // if (pathname.startsWith('/team')) {
    //   const isEmployeesPage = pathname.includes('/employees') || pathname === '/team';
    //   return {
    //     type: 'team',
    //     isEmployeesPage,
    //     buttonLabel: isEmployeesPage ? 'Employee' : 'Group'
    //   };
    // }
    if (pathname.startsWith("/attack-vector/vishing")) {
      return { type: "vishing" };
    }
    if (pathname.startsWith("/attack-vector")) {
      return { type: "phishing" };
    }
    if (pathname.startsWith("/simulation")) {
      return { type: "simulation" };
    }
    if (pathname.startsWith("/awareness")) {
      return { type: "awareness" };
    }
    if (pathname.startsWith("/templates")) {
      return { type: "templates" };
    }
    return { type: "default" };
  };

  const pageContext = getPageContext();

  console.log(pageContext);

  // Handle different create actions
  const handleCreateAction = (action: string) => {
    console.log(action, pageContext);
    switch (pageContext.type) {
      case "group":
        if (action === "add") {
          setOpenSidebar("create-group");
        } else if (action === "import") {
          setOpenSidebar("ad-sync");
        }
        break;
      case "employee":
        if (action === "add") {
          setOpenSidebar("add-employee");
        } else if (action === "import") {
          setOpenSidebar("import-employees");
        }
        break;
      case "phishing":
        router.push("/attack-vector/new");
        break;
      case "vishing":
        router.push("/attack-vector/vishing/new");
        break;
      case "simulation":
        router.push("/simulations/new");
        break;
      case "awareness":
        router.push("/awareness/new");
        break;
      case "templates":
        setOpenSidebar("add-template");
        break;
      default:
        // Default create action
        break;
    }
  };

  // Render different button types based on context
  if (pageContext.type === "group" || pageContext.type === "employee") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 px-4 flex items-center justify-center">
            <Plus className="h-4 w-4" />
            {pageContext.type === "group" ? "Group" : "Employee"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleCreateAction("add")}>
            <Plus className="h-4 w-4 mr-2" />
            {pageContext.type === "group" ? "Group" : "Employee"}
          </DropdownMenuItem>
          {pageContext.type === "employee" && (
            <>
              <DropdownMenuItem onClick={() => handleCreateAction("import")}>
                <Upload className="h-4 w-4 mr-2" />
                Import from file
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateAction("import")}>
                <Upload className="h-4 w-4 mr-2" />
                AD Sync
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (pageContext.type === "phishing") {
    return (
      <Button
        onClick={() => handleCreateAction("create")}
        className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 px-4 flex items-center justify-center"
      >
        <Plus className="h-4 w-4" />
        Phishing
      </Button>
    );
  }

  if (pageContext.type === "vishing") {
    return (
      <Button
        onClick={() => handleCreateAction("create")}
        className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 px-4 flex items-center justify-center"
      >
        <Plus className="h-4 w-4" />
        Vishing
      </Button>
    );
  }

  if (pageContext.type === "awareness") {
    return (
      <Button
        onClick={() => handleCreateAction("create")}
        className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 px-4 flex items-center justify-center"
      >
        <Plus className="h-4 w-4" />
        Awareness
      </Button>
    );
  }

  if (pageContext.type === "simulation") {
    return (
      <Button
        onClick={() => handleCreateAction("create")}
        className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 px-4 flex items-center justify-center"
      >
        <Plus className="h-4 w-4" />
        Simulation
      </Button>
    );
  }

  if (pageContext.type === "templates") {
    return (
      <Button
        onClick={() => handleCreateAction("create")}
        className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 px-4 flex items-center justify-center"
      >
        <Plus className="h-4 w-4" />
        Template
      </Button>
    );
  }

  return (
    <Button className="w-32 bg-primary hover:bg-primary/90 text-white rounded-full h-9 px-4 flex items-center justify-center">
      <Sparkles className="h-4 w-4" />
      Create
    </Button>
  );
};
