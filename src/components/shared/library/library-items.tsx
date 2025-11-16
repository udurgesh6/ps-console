import {FC, memo} from 'react';
import { LibraryItem } from './library-item';
import { LibraryItemsProps } from '@/types';
import { cn } from '@/lib/utils';

export const LibraryItems: FC<LibraryItemsProps> = memo(({
  items,
  selectedItems,
  onToggleSelection,
  renderItem,
  isSelectEnabled,
  showInModal,
}) => {

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No items found</p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6", showInModal && "md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4")}>
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
