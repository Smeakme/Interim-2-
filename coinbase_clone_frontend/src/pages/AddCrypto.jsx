import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCircleInfo } from 'react-icons/fa6';
import Header from '../components/Header';

const API = `${import.meta.env.VITE_API_URL}/crypto`;

const AddCrypto = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [change24h, setChange24h] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    symbol,
                    price: Number(price),
                    image,
                    change24h: Number(change24h)
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage({ type: 'error', text: data.message || 'Failed to add cryptocurrency.' });
            } else {
                setMessage({ type: 'success', text: 'Cryptocurrency listed successfully!' });
                setTimeout(() => navigate('/explore'), 2000);
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Could not connect to the server.' });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            <div className="flex-grow bg-[#F5F8FF]/30 flex flex-col items-center py-16 px-4">
                <div className="w-full max-w-[480px]">
                    {/* Back Link */}
                    <Link 
                        to="/profile" 
                        className="flex items-center gap-2 text-gray-500 hover:text-[#0052ff] transition-all font-bold text-sm mb-8 group w-fit"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Settings
                    </Link>

                    <div className="bg-white rounded-[24px] p-10 border border-gray-200 shadow-sm">
                        <h1 className="text-2xl font-bold text-black mb-2 tracking-tight">List a new asset</h1>
                        <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
                            Provide the details below to add a new cryptocurrency to the market index.
                        </p>

                        {message.text && (
                            <div className={`p-4 rounded-xl mb-8 font-bold text-sm flex items-center gap-3 ${
                                message.type === 'error' 
                                    ? 'bg-red-50 text-red-500 border border-red-100' 
                                    : 'bg-green-50 text-green-600 border border-green-100'
                            }`}>
                                <FaCircleInfo className="shrink-0" />
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField 
                                label="Asset Name" 
                                placeholder="e.g. Bitcoin" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <InputField 
                                    label="Symbol" 
                                    placeholder="BTC" 
                                    value={symbol} 
                                    onChange={(e) => setSymbol(e.target.value)} 
                                />
                                <InputField 
                                    label="24h Change (%)" 
                                    placeholder="2.5" 
                                    type="number"
                                    value={change24h} 
                                    onChange={(e) => setChange24h(e.target.value)} 
                                />
                            </div>

                            <InputField 
                                label="Current Price (USD)" 
                                placeholder="64000.00" 
                                type="number"
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                            />

                            <InputField 
                                label="Icon URL" 
                                placeholder="https://..." 
                                type="url"
                                value={image} 
                                onChange={(e) => setImage(e.target.value)} 
                            />

                            <div className="pt-4 flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-full font-bold text-lg bg-[#0052ff] text-white hover:bg-[#004bd6] transition-all disabled:opacity-50 shadow-md shadow-blue-500/10 active:scale-95"
                                >
                                    {loading ? 'Processing...' : 'List Asset'}
                                </button>
                                <Link 
                                    to="/profile" 
                                    className="w-full py-4 rounded-full font-bold text-center text-gray-500 hover:bg-gray-50 transition-all text-sm"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Simple Tip */}
                    <div className="mt-8 flex items-start gap-3 px-6 text-gray-400">
                        <FaCircleInfo className="mt-1 shrink-0" />
                        <p className="text-xs font-medium leading-relaxed">
                            Make sure the icon URL points to a valid image. You can use standard token icons from public repositories.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, placeholder, value, onChange, type = "text" }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-black ml-1">{label}</label>
        <input
            type={type}
            step="any"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#0052ff] focus:ring-1 focus:ring-[#0052ff] outline-none transition-all font-medium text-black placeholder-gray-300 shadow-sm hover:border-gray-300"
        />
    </div>
);

export default AddCrypto;
