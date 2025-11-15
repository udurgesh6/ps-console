import { ReactNode } from "react";
import { Form } from "./form";
import { Course } from "./course";
import { LandingPage } from "./landing-page";
import { AttackVector } from "./attack-vector";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  title: string;
  key: string;
  options: FilterOption[];
}

export interface Filter {
  groups: FilterGroup[];
}

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
  forms?: Form[];
  landingPages?: LandingPage[];
  courses?: Course[];
  tropicality?: string;
  startDate?: Date;
  endDate?: Date;
  status?: boolean;
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
  filterGroups?: FilterGroup[];
  bulkActions?: BulkAction<LibraryItem>[];
  items: LibraryItem[];
  actionButtonText?: string;
  onActionButtonClick?: (selectedItems: LibraryItem[]) => void;
  onClose?: () => void;
  renderItem?: (item: AttackVector, isSelected: boolean, isSelectEnabled: boolean, showInModal: boolean) => ReactNode;
  isSingleSelect?: boolean;
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
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string) => void;
  showSearch: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
