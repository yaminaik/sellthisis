import { PackageCheck, Tag, Share2 } from "lucide-react";

const steps = [
  {
    icon: <PackageCheck className="w-6 h-6 text-white" />,
    title: "Upload Your Products",
    desc: "Snap a few photos, write a short description, and let the world see what you're offering.",
    quote: "Showcase your passion to the world!",
  },
  {
    icon: <Tag className="w-6 h-6 text-white" />,
    title: "Set Fair Prices",
    desc: "Decide what your products are worth — we'll guide you if you need help!",
    quote: "Price with confidence. You’re worth it!",
  },
  {
    icon: <Share2 className="w-6 h-6 text-white" />,
    title: "Share Your Link",
    desc: "Post your custom shop link on WhatsApp, Instagram, Facebook, or anywhere your customers are.",
    quote: "The world is ready for your magic!",
  },
];

const HowItWork = () => {
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8"> {/* Slightly more breathing space */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-sis-dark mb-2">How It Works</h2>
        <p className="text-sis-dark/80">
          Create your shop in three simple steps — no tech skills needed!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center px-4">
            {/* Icon with circle */}
            <div className="relative my-8">
              <div className="bg-sis-purple p-4 rounded-full">
                {step.icon}
              </div>
              <span className="absolute -bottom-2 -right-2 text-sm font-bold bg-white text-sis-purple w-6 h-6 rounded-full flex items-center justify-center shadow">
                {index + 1}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-sis-dark">{step.title}</h3>

            {/* Description */}
            <p className="text-sis-dark/80 text-sm mt-2">{step.desc}</p>

            {/* Quote */}
            <p className="italic text-sis-pink text-sm mt-3">"{step.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
