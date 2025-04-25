const features = [
    {
      title: "Beautiful Templates",
      desc: "Your shop will look professional from day one with our beautiful pre-designed templates.",
    },
    {
      title: "No Sign-Up Required",
      desc: "Get started immediately without creating accounts or remembering passwords.",
    },
    {
      title: "Custom Link",
      desc: "Share your unique shop link on social media, messaging apps, or anywhere online.",
    },
    {
      title: "Customer Support",
      desc: "We're here to help if you ever have questions or need assistance with your shop.",
    },
  ];
  
  const WhyUs = () => {
    return (
      <section className="w-full text-center  py-4 px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2">Everything You Need to Sell</h2>
          <p className="text-lg mb-12">
            Focus on your products, we’ll handle the tech stuff.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sis-dark/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
    
      </section>
    );
  };
  
  export default WhyUs;
  