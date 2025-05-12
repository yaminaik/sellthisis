const features = [
  {
    title: "Beautiful Templates",
    desc: "Your shop will look polished and professional from day one — no design skills needed.",
  },
  {
    title: "No Sign-Up Hassles",
    desc: "Jump right in. No accounts, no passwords, no barriers. Start selling in minutes.",
  },
  {
    title: "Your Own Custom Link",
    desc: "Get a personalized shop link you can proudly share on WhatsApp, Instagram, or anywhere.",
  },
  {
    title: "Friendly Support",
    desc: "Questions? Need help? Our team is here to cheer you on and guide you anytime.",
  },
];

const WhyUs = () => {
  return (
    <section className="w-full text-center py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-2 text-sis-dark">Everything You Need to Start Selling</h2>
      <p className="text-lg text-sis-dark/80 mb-12">
        You focus on your products — we’ll handle the rest.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-2 text-sis-dark">{item.title}</h3>
            <p className="text-sis-dark/80 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
