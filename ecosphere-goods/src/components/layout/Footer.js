import React from 'react';
import { Link } from 'react-router-dom';
import { FaSquareXTwitter, FaSquareYoutube, FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import Logo from '../utility/Logo';

const Footer = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <footer className="flex flex-col bg-off-white p-10 pb-0">
        <div className="flex border-b-2 pb-12">
            <div className='border-r-2 w-1/2 space-y-8'>
            <header className='text-header font-header'>Stay up to date with the latest news and offers!</header>
            <form onSubmit={handleSubmit} className="flex space-x-8 h-12">
                <input
                type="text"
                placeholder="Enter your email"
                className="rounded-full border-2 border-dark-brown pl-6 pr-6 bg-off-white text-dark-brown w-2/5"
                />
                <button type="submit" className="bg-dark-brown text-off-white p-2 rounded-full w-36 font-header h-full">
                Subscribe
                </button>
            </form>
            <div className="flex space-x-4">
                <FaSquareXTwitter className='h-10 w-10' />
                <FaSquareYoutube className='h-10 w-10' />
                <FaSquareInstagram className='h-10 w-10' />
                <FaFacebookSquare className='h-10 w-10' />
            </div>
            </div>

            <div className="flex flex-col items-end w-1/2 text-subtitle font-header space-y-4">
            <Logo />
            <div className="flex flex-col space-y-2 items-end">
                <Link href="/products">Products</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/contact-us">Contact Us</Link>
                <Link href="/faq">FAQ</Link>
            </div>
            </div>
        </div>
        
        <div className="flex justify-between pt-2 pb-2">
            <p className="font-header">© Ecosphere Goods Co 2024. All Rights Reserved</p>
            <div className='flex space-x-2'>
                <Link to="https://lordicon.com/" className="border-r-2 pr-2">Icons by Lordicon.com</Link>
                <Link to="/privacy-policy" className="border-r-2 pr-2">Privacy Policy</Link>
                <Link to="/terms-of-service">Terms of Service</Link>
            </div>
        </div>
        </footer>
    );
};

export default Footer;