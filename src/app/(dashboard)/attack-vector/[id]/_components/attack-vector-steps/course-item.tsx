import { Course, LibraryItem } from "@/types";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export const CourseItem = (
  item: LibraryItem,
  isSelected: boolean,
  isSelectEnabled: boolean,
  showInModal: boolean
) => {
  const router = useRouter();
  const course = item as Course;

  console.log(course)

  const onCourseClick = () => {
    if (isSelectEnabled || showInModal) {
      return;
    }
    // router.push(`/templates/course/${item.id}`);
  };

  return (
    <Card
      onClick={onCourseClick}
      className={`cursor-pointer py-0 relative aspect-square rounded-lg transition-all hover:shadow-md group overflow-hidden ${
        isSelected 
          ? "border-2 border-primary" 
          : ""
      }`}
    >
      {!isSelected && (
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      )}
      
      <div className="w-full h-full relative overflow-hidden">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzE4My40MzEgMTUwIDE3MCAyMzYuNTY5IDE3MCAyNTNDMTcwIDI2OS40MzEgMTgzLjQzMSAyODMgMjAwIDI4M0MyMTYuNTY5IDI4MyAyMzAgMjY5LjQzMSAyMzAgMjUzQzIzMCAyMzYuNTY5IDIxNi41NjkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=';
            }}
            width={600}
            height={600}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 text-4xl">📚</div>
          </div>
        )}
      </div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-black/80 p-4 py-2 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <p className="text-white text-sm font-semibold truncate">{course.name}</p>
        {course.description && (
          <p className="text-white/80 text-xs truncate mt-1">{course.description}</p>
        )}
        {/* <div className="flex items-center gap-2 mt-2">
          <span className="text-white/60 text-xs px-2 py-1 bg-white/20 rounded-full capitalize">
            {course.level}
          </span>
          <span className="text-white/60 text-xs px-2 py-1 bg-white/20 rounded-full capitalize">
            {course.category}
          </span>
        </div> */}
      </div>
    </Card>
  );
};