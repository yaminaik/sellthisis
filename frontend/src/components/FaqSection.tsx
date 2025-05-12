import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need to sign up or create an account?",
    answer: "Nope! Just upload your products, set your prices, and share your shop link. No accounts, no passwords, no hassle!",
  },
  {
    question: "How will I receive payments?",
    answer: "Right now, you can manually collect payments via your preferred method. Soon we'll offer UPI, PayPal, and easy payment links!",
  },
  {
    question: "Is there a fee for using Sell This, Sis?",
    answer: "We only charge a small transaction fee on successful orders — no upfront fees, no hidden costs.",
  },
  {
    question: "What types of products can I sell?",
    answer: "You can sell handmade items, digital goods, baked treats, crafts, printables — almost anything you create!",
  },
  {
    question: "How can I promote my shop?",
    answer: "Share your unique shop link on WhatsApp, Instagram, Facebook, or anywhere you connect with customers. We'll even provide share templates!",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold mb-2 text-sis-dark">Frequently Asked Questions</h2>
      <p className="text-center text-sis-dark/80 mb-10">
        Got questions? We’re here with answers.
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
