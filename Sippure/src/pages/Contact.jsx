import React from "react";

const Contact = () => {
  return (
    <div id="contact" className="bg-[#f3f8e9] py-20 px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-16">
        <h3 className="text-base font-semibold text-[#74a92a] uppercase tracking-wider mb-2">
          Let’s Talk
        </h3>
        <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
        {[
          { icon: "✉️", label: "Email Address", value: "sippure.tea@gmail.com" },
          { icon: "📍", label: "Address", value: "Khusibu,Nayabazar" },
          { icon: "📞", label: "Phone Number", value: "+977 9804328885" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl text-[#74a92a] mb-3">{item.icon}</div>
            <h4 className="text-lg font-semibold text-[#74a92a] mb-1">{item.label}</h4>
            <p className="text-sm text-gray-700">{item.value}</p>
          </div>
        ))}
      </div>

      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
       
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="Images/Label.png"
            alt="Sippure Herbal Tea"
            className="rounded-2xl shadow-md w-full max-w-md"
          />
        </div>

        
        <div className="w-full lg:w-1/2 bg-white p-7 rounded-2xl">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Send Us a Message
          </h3>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4d977]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4d977]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Message</label>
              <textarea
                className="w-full px-4 py-3 bg-gray-100 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#a4d977]"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#a4d977] text-[#333] font-semibold px-8 py-3 rounded-full hover:bg-[#94c967] shadow-md hover:shadow-lg transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;