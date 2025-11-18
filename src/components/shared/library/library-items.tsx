import {FC, memo} from 'react';
import { LibraryItem } from './library-item';
import { LibraryItemsProps } from '@/types';

export const LibraryItems: FC<LibraryItemsProps> = memo(({
  items,
  selectedItems,
  onToggleSelection,
  renderItem,
  isSelectEnabled,
  showInModal,
  showMaxItems = 4,
}) => {

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No items found</p>
      </div>
    );
  }

  // Determine the grid columns class based on showMaxItems
  const getGridColsClass = () => {
    if (showInModal) {
      return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6";
    }
    
    switch (showMaxItems) {
      case 1:
        return "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-3 md:gap-6";
      case 2:
        return "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6";
      case 3:
        return "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6";
      case 4:
      default:
        return "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6";
    }
  };

  return (
    <div className={getGridColsClass()}>
      {items.map((item) => (
        <LibraryItem
          key={item.id}
          item={item}
          isSelected={selectedItems.includes(item.id)}
          onToggle={() => onToggleSelection(item.id)}
          renderItem={renderItem}
          isSelectEnabled={isSelectEnabled}
          showInModal={showInModal}
        />
      ))}
    </div>
  );
});

LibraryItems.displayName = 'LibraryItems';
