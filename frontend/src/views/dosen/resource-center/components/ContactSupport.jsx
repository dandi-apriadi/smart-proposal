import React, { useState, useEffect } from 'react';
import {
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdAccessTime,
    MdHelp,
    MdSend,
    MdAttachFile,
    MdPerson,
    MdSubject,
    MdMessage,
    MdCheck,
    MdForum
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactSupport = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: '',
        message: '',
        attachment: null
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const baseURL = useSelector((state) => state.auth.baseURL);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        // Pre-fill form with user data if available
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            attachment: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Mock API request - in a real app, you would use the baseURL with proper API endpoint
        setTimeout(() => {
            console.log('Support request submitted:', formData);
            setLoading(false);
            setSubmitted(true);

            // Reset form after successful submission
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    topic: '',
                    message: '',
                    attachment: null
                });
            }, 3000);
        }, 1500);
    };

    // Support team dummy data
    const supportTeam = [
        { name: 'Dr. Andi Wijaya', role: 'Technical Support Lead', email: 'andi.wijaya@polimdo.ac.id', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Siti Rahma', role: 'User Experience Specialist', email: 'siti.rahma@polimdo.ac.id', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { name: 'Budi Santoso', role: 'System Administrator', email: 'budi.santoso@polimdo.ac.id', image: 'https://randomuser.me/api/portraits/men/3.jpg' }
    ];

    // FAQ topics
    const faqTopics = [
        { title: 'How to submit a proposal?', link: '#' },
        { title: 'Review process explained', link: '#' },
        { title: 'Common proposal format issues', link: '#' },
        { title: 'Progress report requirements', link: '#' },
        { title: 'Account access problems', link: '#' }
    ];

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
                    data-aos="fade-down"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Support</h1>
                    <p className="text-lg md:text-xl opacity-90">
                        Have questions or need assistance? Our support team is here to help you with any issues related to proposal submission and review.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div
                        className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                <MdForum className="mr-2 text-blue-600" size={24} />
                                Submit a Support Request
                            </h2>

                            {submitted ? (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
                                    <MdCheck size={24} className="mr-2" />
                                    <span>
                                        <strong>Success!</strong> Your support request has been submitted. Our team will respond shortly.
                                    </span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-gray-700 mb-2 flex items-center">
                                                <MdPerson className="mr-2 text-gray-600" />
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-700 mb-2 flex items-center">
                                                <MdEmail className="mr-2 text-gray-600" />
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-gray-700 mb-2 flex items-center">
                                            <MdSubject className="mr-2 text-gray-600" />
                                            Topic
                                        </label>
                                        <select
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="proposal">Proposal Submission</option>
                                            <option value="review">Review Process</option>
                                            <option value="technical">Technical Issues</option>
                                            <option value="account">Account Issues</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-gray-700 mb-2 flex items-center">
                                            <MdMessage className="mr-2 text-gray-600" />
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="text-gray-700 mb-2 flex items-center">
                                            <MdAttachFile className="mr-2 text-gray-600" />
                                            Attachment (optional)
                                        </label>
                                        <div className="flex items-center">
                                            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition flex items-center">
                                                <MdAttachFile className="mr-2" />
                                                <span>{formData.attachment ? formData.attachment.name : 'Choose a file'}</span>
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </label>
                                            {formData.attachment && (
                                                <button
                                                    type="button"
                                                    className="ml-3 text-red-500 hover:text-red-700"
                                                    onClick={() => setFormData(prev => ({ ...prev, attachment: null }))}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        disabled={loading}
                                    >
                                        <MdSend className="mr-2" size={20} />
                                        {loading ? 'Submitting...' : 'Submit Request'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Contact Information and FAQs */}
                    <div className="space-y-6">
                        {/* Alternative Contact Methods */}
                        <div
                            className="bg-white rounded-xl shadow-md p-6"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <MdEmail className="text-blue-600 mt-1 mr-3" size={20} />
                                    <div>
                                        <strong className="block text-gray-700">Email</strong>
                                        <a href="mailto:support@polimdo.ac.id" className="text-blue-600 hover:underline">support@polimdo.ac.id</a>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <MdPhone className="text-blue-600 mt-1 mr-3" size={20} />
                                    <div>
                                        <strong className="block text-gray-700">Phone</strong>
                                        <a href="tel:+628123456789" className="text-blue-600 hover:underline">+62 812-3456-789</a>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <MdAccessTime className="text-blue-600 mt-1 mr-3" size={20} />
                                    <div>
                                        <strong className="block text-gray-700">Working Hours</strong>
                                        <p className="text-gray-600">Monday to Friday, 8:00 AM - 4:00 PM</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <MdLocationOn className="text-blue-600 mt-1 mr-3" size={20} />
                                    <div>
                                        <strong className="block text-gray-700">Location</strong>
                                        <p className="text-gray-600">ICT Center, 2nd Floor<br />Politeknik Negeri Manado</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* FAQ Quick Links */}
                        <div
                            className="bg-white rounded-xl shadow-md p-6"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                                <MdHelp className="mr-2 text-blue-600" />
                                Frequently Asked Questions
                            </h2>
                            <ul className="space-y-2">
                                {faqTopics.map((faq, index) => (
                                    <li key={index}>
                                        <a
                                            href={faq.link}
                                            className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition text-gray-700 hover:text-blue-600"
                                        >
                                            <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                                                {index + 1}
                                            </span>
                                            {faq.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Support Team Section */}
                <div
                    className="mt-10 bg-white rounded-xl shadow-md p-6 md:p-8"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">Our Support Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {supportTeam.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-lg p-4 text-center transition-transform hover:transform hover:scale-105"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                                />
                                <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                                <p className="text-blue-600 mb-2">{member.role}</p>
                                <a href={`mailto:${member.email}`} className="text-sm text-gray-600 hover:underline">
                                    {member.email}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSupport;
