import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Menu,
  X,
  LogOut,
  Search,
  Bell,
  Download,
} from "lucide-react";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "@/constants/navigation";
import { User } from "@/types";
import { ContextAwareCreateButton } from "./context-aware-create-button";
import { useExportEmployees } from "@/hooks";
import toast from "react-hot-toast";

export const Navbar = ({
  onMobileMenuToggle,
  isMobileMenuOpen,
  userDetails,
  onLogout,
  isSidebarHovered = false,
}: {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  userDetails: User | null;
  onLogout: () => void;
  isSidebarHovered?: boolean;
}) => {
  const sidebarCollapsedWidth = SIDEBAR_COLLAPSED_WIDTH;
  const sidebarExpandedWidth = SIDEBAR_WIDTH;

  const exportMutation = useExportEmployees();

  const handleExportEmployees = async () => {
    try {
      const result = await exportMutation.mutateAsync();
      toast.success(result.message || "Employee report will be sent to your email");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export employees. Please try again.");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background h-16 bg-gray-100 pr-2">
      <div
        className="hidden md:block h-full transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: isSidebarHovered
            ? `${sidebarExpandedWidth}px`
            : `${sidebarCollapsedWidth}px`,
        }}
      >
        <div className="flex items-center justify-end h-full gap-3">
          {/* Right Side Icons and Profile */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <ContextAwareCreateButton />

            {/* Export Employees Button */}
            <Button
              variant="ghost"
              className="rounded-full p-0 bg-white hover:bg-gray-50 flex items-center justify-center"
              onClick={handleExportEmployees}
              disabled={exportMutation.isPending}
              title="Export Employees"
            >
              <Download
                className={`w-5 h-5 text-gray-600 ${
                  exportMutation.isPending ? "animate-pulse" : ""
                }`}
              />
              <span className="text-sm">
                {exportMutation.isPending ? "Exporting..." : "Export"}
              </span>
            </Button>

            {/* Notification Icon */}
            <Button
              variant="ghost"
              className="rounded-full w-10 h-10 p-0 bg-white hover:bg-gray-50 flex items-center justify-center"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="profile-button flex items-center !px-0 !pr-4 rounded-md gap-1"
                >
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-primary text-white">
                      {userDetails?.first_name || userDetails?.last_name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {userDetails?.first_name || userDetails?.last_name || "User"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleExportEmployees}
                  disabled={exportMutation.isPending}
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>
                    {exportMutation.isPending ? "Exporting..." : "Export Employees"}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="md:hidden h-full">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuToggle}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Mobile Export Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportEmployees}
              disabled={exportMutation.isPending}
              className="flex items-center gap-2 px-3 py-2"
              title="Export Employees"
            >
              <Download
                className={`h-4 w-4 ${
                  exportMutation.isPending ? "animate-pulse" : ""
                }`}
              />
              <span className="text-sm">
                {exportMutation.isPending ? "Exporting..." : "Export"}
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="profile-button bg-primary flex items-center px-2 rounded-md gap-1"
                >
                  <Avatar className="w-8 h-8 bg-primary">
                    <AvatarFallback className="bg-primary text-white">
                      {userDetails?.first_name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {userDetails?.first_name || userDetails?.last_name || "User"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleExportEmployees}
                  disabled={exportMutation.isPending}
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>
                    {exportMutation.isPending ? "Exporting..." : "Export Employees"}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
