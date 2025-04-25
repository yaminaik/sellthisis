const ContactUs = () => {
    return (
      <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10 text-sis-purple">Contact Us</h1>
  
          <form className="bg-white p-8 rounded-xl shadow-md space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium text-sis-dark">Name</label>
              <input type="text" placeholder="Your name" className="input" />
            </div>
  
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-sis-dark">Email</label>
              <input type="email" placeholder="your@email.com" className="input" />
            </div>
  
            {/* Message */}
            <div>
              <label className="block mb-1 font-medium text-sis-dark">Message</label>
              <textarea rows={4} placeholder="How can we help?" className="input"></textarea>
            </div>
  
            <button
              type="submit"
              className="btn btn-gradient-purple w-full text-white font-semibold py-3"
            >
              Send Message
            </button>
          </form>
  
          <div className="mt-12 text-center text-sm text-sis-gray">
            <h2 className="text-base font-semibold mb-2 text-sis-dark">Other Ways to Reach Us</h2>
            <p>Email: <span className="text-sis-purple">hello@sellthissis.com</span></p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Monday – Friday, 9am – 5pm EST</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default ContactUs;
  