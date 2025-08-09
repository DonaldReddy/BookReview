import ContactCards from "./ContactCards";
import { useState } from "react";



function ContactUs() {
	const [formData, setFormData] = useState({
  name: "",
  email: "",
  query: ""
});
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setFormData({
  name: "",
  email: "",
  query: ""
});
  const formContainer = document.getElementById("formContainer");
  const originalContent = formContainer?.innerHTML;

  try {
    const res = await fetch("/api/v1/query", {
      method: "POST",
      headers: {
      "Content-Type": "application/json", // Required for JSON
    },
    body: JSON.stringify(formData),
    });
			


    if (!res.ok) {
      throw new Error("Submission failed");
    }

    const data = await res.json(); // Or .text() if response is plain text

    if (formContainer) {
      formContainer.innerHTML = `<p>${data.message || "Submission successful!"}</p>`;
    }

    // Reset after 3 seconds
    setTimeout(() => {

      if (formContainer && originalContent) {
        formContainer.innerHTML = originalContent;
      }
	
    }, 3000);
  } catch (error) {
    if (formContainer) {
      formContainer.innerHTML = `<p class="text-red-500">Error submitting form</p>`;
    }

    setTimeout(() => {
		
      if (formContainer && originalContent) {
        formContainer.innerHTML = originalContent;
	}
    }, 3000);
  }
};

const handlechange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
	setFormData({...formData,[e.target.name]:e.target.value})
}



	return (
		<div className="w-full min-h-dvh bg-gray-100 p-4 sm:p-8 flex flex-col lg:flex-row items-center justify-center gap-8">
			{/* Image Section */}
			<div className="w-full lg:w-1/2">
				<ContactCards/>
			</div>

			{/* Form Section */}
			<div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
				<div className="text-center mb-6">
					<h1 className="text-3xl font-semibold">Contact Us</h1>
					<p className="text-gray-500 text-lg">
						Give Us Your Valuable Feedback
					</p>
				</div>
<div id="formContainer">
				<form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
					{/* Name */}
					<div>
						<label className="block text-lg font-medium">Name</label>
						<input
						name="name"
							type="text"
							placeholder="Enter your full name"
							className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-purple-600"
						  value={formData.name}
  onChange={(e) => handlechange(e)}
						/>
					</div>

					{/* Email */}
					<div>
						<label className="block text-lg font-medium">Email</label>
						<input
						name="email"
							type="email"
							placeholder="Enter your email"
							className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-purple-600"
						value={formData.email}
  onChange={(e) => handlechange(e)}
						/>
					</div>

					{/* Message */}
					<div>
						<label className="block text-lg font-medium">Message</label>
						<textarea
						name="query"
							rows={4}
							placeholder="Type your message here..."
							value={formData.query}
							className="w-full border-2 border-gray-300 rounded-md p-2 mt-1 resize-none focus:outline-none focus:border-purple-600"
						 onChange={(e) => handlechange(e)}
						></textarea>
					</div>

					{/* Send Button */}
					<button
						type="submit"
						className="w-full bg-purple-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-purple-700 transition"
					>
						Send Message
					</button>
				</form>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
