import { ReactNode } from "react";
import { Course } from "./course";
import { LandingPage } from "./landing-page";
import { AttackVector } from "./attack-vector";
import { FilterObject } from "./general";
import { SubmissionForm } from "./form";

// export interface FilterOption {
//   label: string;
//   value: string;
//   count?: number;
// }

// export interface FilterGroup {
//   title: string;
//   key: string;
//   options: FilterOption[];
// }

// export interface Filter {
//   groups: FilterGroup[];
// }

export interface LibraryItem {
  id: string;
  name: string;
  description?: string;
  provider?: string;
  icon?: ReactNode;
  tags?: string[];
  // Common additional properties used across the application
  title?: string;
  htmlTemplate?: string;
  subject?: string;
  templateType?: "form" | "email" | "landing";
  logo?: string;
  category?: string;
  subCategory?: string;
  type?: "click" | "submission" | string;
  forms?: SubmissionForm[];
  landingPages?: LandingPage[];
  courses?: Course[];
  tropicality?: string;
  startDate?: number;
  endDate?: number;
  status?: boolean;
  htmlPage?: string;
}

export interface BulkAction<TItem = LibraryItem> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (selectedItems: TItem[]) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export interface LibraryProps {
  title?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  showBulkActions?: boolean;
  showActionButton?: boolean;
  showInModal?: boolean;
  isOpen?: boolean;
  filterGroups?: FilterObject[];
  bulkActions?: BulkAction<LibraryItem>[];
  items: LibraryItem[];
  initialSelectedItems?: string[];
  actionButtonText?: string;
  onActionButtonClick?: (selectedItems: LibraryItem[]) => void;
  onClose?: () => void;
  renderItem?: (item: AttackVector, isSelected: boolean, isSelectEnabled: boolean, showInModal: boolean) => ReactNode;
  isSingleSelect?: boolean;
  showMaxItems?: number;
  isFilterGroupsLoading?: boolean;
  isItemsLoading?: boolean;
}

export interface LibrarySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface LibraryBulkActionsProps {
  selectedCount: number;
  actions: BulkAction<LibraryItem>[];
  selectedItems: string[];
  items: LibraryItem[];
}

export interface LibraryItemsProps {
  items: LibraryItem[];
  selectedItems: string[];
  onToggleSelection: (itemId: string) => void;
  renderItem?: (item: AttackVector, isSelected: boolean, isSelectEnabled: boolean, showInModal: boolean) => ReactNode;
  isSelectEnabled?: boolean;
  showInModal?: boolean;
  showMaxItems?: number;
  isItemsLoading?: boolean;
}

export interface LibraryItemProps {
  item: LibraryItem;
  isSelected: boolean;
  onToggle: () => void;
  renderItem?: (item: AttackVector, isSelected: boolean, isSelectEnabled: boolean, showInModal: boolean) => ReactNode;
  isSelectEnabled?: boolean;
  showInModal?: boolean;
}

export interface LibraryFiltersProps {
  filterGroups: FilterObject[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string) => void;
  showSearch: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isFilterGroupsLoading?: boolean;
}
