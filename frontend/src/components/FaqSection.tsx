import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need to create an account?",
    answer: "Nope! You can start selling instantly without creating an account. Just upload, price, and share.",
  },
  {
    question: "How do I receive payments?",
    answer: "For now its manual in future we will support easy payment links like UPI, PayPal, and bank transfers. Just add your preferred method!",
  },
  {
    question: "Is there a fee for using the platform?",
    answer: "We charge a small transaction fee on successful orders. No upfront or monthly costs!",
  },
  {
    question: "What kinds of products can I sell?",
    answer: "Anything handmade, digital, or small-scale — like crafts, food items, printables, and more!",
  },
  {
    question: "How do I promote my shop?",
    answer: "Share your unique shop link on WhatsApp, Instagram, or Facebook. We'll give you templates too!",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-center text-sis-dark/80 mb-10">
          Got questions? We've got answers.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 cursor-pointer transition"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openIndex === index && (
                <p className="text-sis-dark/80 text-sm mt-3">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
   
    </section>
  );
};

export default FaqSection;
