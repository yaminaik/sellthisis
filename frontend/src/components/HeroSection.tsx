import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-container flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT SIDE – Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block bg-sis-light text-sis-purple font-semibold px-4 py-1 rounded-full shadow mb-6 text-sm">
            Just launched! 🎉
          </div>

          <h1 className="text-left">
            Create a shop in <span className="text-sis-purple">30</span>{" "}
            <span className="text-sis-pink">seconds</span>,<br />
            no code needed
          </h1>

          <p className="text-left mb-6">
            Upload your products, set your prices, and share your custom link on WhatsApp or Instagram. It's that simple!
          </p>

          <Link
            to="/create"
            className="btn btn-gradient-purple"
          >
            Create My Shop
          </Link>
        </div>

        {/* RIGHT SIDE – Gradient Buttons Grid */}
        <div className="flex-1 w-full grid grid-cols-2 gap-4 justify-center">
          <div className="btn-large btn-gradient-pink">Upload</div>
          <div className="btn-large btn-gradient-blue">Price</div>
          <div className="btn-large btn-gradient-teal">Share</div>
          <div className="btn-large btn-gradient-yellow">Sell!</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
