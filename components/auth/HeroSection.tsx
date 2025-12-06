interface HeroSectionProps {
  title: string;
  subtitle: string;
  image?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  image,
}) => (
  <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
    <div className="absolute inset-0 bg-black/20"></div>

    {/* Animated background elements */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-12">
      {image && (
        <div className="mb-8 relative">
          <div className="w-64 h-64 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            {image}
          </div>
        </div>
      )}

      <h2 className="text-4xl font-bold mb-4 leading-tight">{title}</h2>
      <p className="text-xl text-white/80 max-w-md leading-relaxed">
        {subtitle}
      </p>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full"></div>
      <div className="absolute top-8 right-8 w-8 h-8 bg-white/20 rounded-full"></div>
    </div>
  </div>
);
export default HeroSection;
