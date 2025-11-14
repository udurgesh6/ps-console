import { FC } from "react";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";

interface TagProps {
  id: string;
  name: string;
  handleRemove: () => void;
}

export const Tag: FC<TagProps> = ({
  id,
  name,
  handleRemove,
}) => {
  return (
    <Badge
      key={id}
      variant="secondary"
      className="py-1.5 pr-2.5 pl-3 text-sm font-normal"
    >
      {name}
      <button onClick={handleRemove} className="py-0">
        <X className="ml-2 h-3.5 w-3.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
      </button>
    </Badge>
  );
};
