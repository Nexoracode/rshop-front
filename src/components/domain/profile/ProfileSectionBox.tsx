const ProfileSectionBox = ({
  title,
  className,
  children,
  navigateElem,
  childrenClassName
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
  navigateElem?: React.ReactNode;
  childrenClassName?: string;
}) => {
  return (
    <div
      className={`min-w-full min-h-[348px] lg:border rounded-lg lg:p-5 ${className}`}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="relative flex items-center justify-between">
          <h1 className="text-base md:text-[17px] font-medium flex items-center gap-2">
            {title}
          </h1>
          <div className="absolute -bottom-2.5 w-[60px] h-[2.5px] bg-primary-500 rounded-full"></div>
        </div>
        {navigateElem}
      </div>

      <div className={childrenClassName}>{children}</div>
    </div>
  );
};

export default ProfileSectionBox;
