interface HeaderProps {
  showLogo?: boolean;
}

export const Header = ({ showLogo = true }: HeaderProps) => {
  if (!showLogo) return null;

  return (
    <header className="w-full py-4 px-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex justify-center">
        <img 
          src="/lovable-uploads/c347bb87-b4d2-4aaf-a3f0-06e75a01be09.png"
          alt="Growth Ring Media" 
          className="h-10 w-auto object-contain"
        />
      </div>
    </header>
  );
};