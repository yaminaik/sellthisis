const AboutUs = () => {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-4xl font-bold text-center text-sis-purple">About Us</h1>
  
          {/* Origin Story */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-2xl font-semibold text-sis-dark">Our Story</h2>
            <p>
              Sell This, Sis was born out of a moment of frustration, resilience, and love. After thousands of applications and rejections, our founder — a passionate builder who came from a family of helpers and role models — decided it was time to stop waiting for permission and start creating something meaningful.
            </p>
            <p>
              Inspired by a legacy of giving and growth, and the strength of women in small towns hustling to support themselves and their families, she built this platform to make entrepreneurship accessible — no tech skills needed, no ego-driven startup vibes, just love, simplicity, and joy.
            </p>
            <p className="text-sis-pink font-medium">
              We’re not here to “disrupt.” We’re here to empower — quietly, stubbornly, beautifully.
            </p>
          </div>
  
          {/* What We Do */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "No-Code Shops",
                desc: "Upload your products and share your link — that’s it. No signups, no tech skills needed.",
              },
              {
                title: "Templates That Shine",
                desc: "We provide pre-built designs that make your shop look professional from day one.",
              },
              {
                title: "For Real People",
                desc: "Whether you bake cookies, sell bangles, or teach classes — this is your space to shine.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl border border-sis-purple text-sis-dark shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
  
          {/* Optional Contact CTA */}
          <div className="text-center pt-6">
            <p className="mb-3 text-sis-dark font-medium">Want to say hello or share your story?</p>
            <a href="/contact" className="btn btn-gradient-pink">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  