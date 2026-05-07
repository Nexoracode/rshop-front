const ProfileSectionBox = ({
  title,
  className,
  children,
  navigateElem,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
  navigateElem?: React.ReactNode;
}) => {
  return (
    <div
      className={`min-w-full min-h-[348px] lg:border rounded-lg lg:p-5 ${className}`}
    >
      <div className="flex justify-between items-center mb-12">
        <div className="relative flex items-center justify-between">
          <h1 className="text-base md:text-[17px] font-medium flex items-center gap-2">
            {title}
          </h1>
          <div className="absolute -bottom-2.5 w-[70px] h-[2.5px] bg-primary-500 rounded-full"></div>
        </div>
        {navigateElem}
      </div>

      {children}
    </div>
  );
};

export default ProfileSectionBox;
