
import { PackageCheck, Tag, Share2 } from "lucide-react";

const steps = [
    {
      icon: <PackageCheck className="w-6 h-6 text-white" />,
      title: "Upload Your Products",
      desc: "Take photos of your products and upload them. Add names and descriptions to let people know what you're selling.",
      quote: "Your creations deserve to be seen!",
    },
    {
      icon: <Tag className="w-6 h-6 text-white" />,
      title: "Set Your Prices",
      desc: "Decide how much to charge for each item. We'll help you figure out fair pricing if you're not sure.",
      quote: "Know your worth and price accordingly!",
    },
    {
      icon: <Share2 className="w-6 h-6 text-white" />,
      title: "Share & Start Selling",
      desc: "Get your custom link and share it on WhatsApp, Instagram, or anywhere else. Your shop is now open for business!",
      quote: "You've got this, entrepreneur!",
    },
  ];

const HowItWork = () =>{
return(
    <section className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div>
            <h2>How It Works</h2>
            <p>Creating your shop is as easy as 1-2-3. No technical skills required!</p>
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
              <h3>{step.title}</h3>

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