import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    FaUser, 
    FaShieldHalved, 
    FaGear, 
    FaCirclePlus, 
    FaArrowRightFromBracket,
    FaChevronRight,
    FaBell,
    FaRegCreditCard
} from 'react-icons/fa6';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const { user, loading, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin');
        }
    }, [user, loading, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/signin');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0052ff]"></div>
            </div>
        );
    }

    const SidebarItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all border-l-4 ${
                activeTab === id
                    ? 'bg-blue-50/50 text-[#0052ff] border-[#0052ff]'
                    : 'text-gray-500 border-transparent hover:bg-gray-50 hover:text-black'
            }`}
        >
            <Icon className="text-lg" />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />
            
            <div className="flex-grow bg-[#F5F8FF]/30 pb-20">
                <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-10">
                    <h1 className="text-3xl font-bold text-black mb-8 tracking-tight">Settings</h1>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Sidebar */}
                        <div className="w-full lg:w-64 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm sticky top-10">
                            <SidebarItem id="profile" icon={FaUser} label="Profile" />
                            <SidebarItem id="security" icon={FaShieldHalved} label="Security" />
                            <SidebarItem id="preferences" icon={FaGear} label="Preferences" />
                            <SidebarItem id="notifications" icon={FaBell} label="Notifications" />
                            <SidebarItem id="payment" icon={FaRegCreditCard} label="Payment methods" />
                            
                            <div className="border-t border-gray-100 mt-4 pt-4 pb-4">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-red-500 hover:bg-red-50 transition-all border-l-4 border-transparent"
                                >
                                    <FaArrowRightFromBracket className="text-lg" />
                                    Sign out
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-grow w-full">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                {/* Header Section */}
                                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-full bg-[#0052ff] flex items-center justify-center text-3xl text-white font-bold shadow-lg shadow-blue-500/20">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-black">{user?.name}</h2>
                                            <p className="text-gray-500 font-medium">{user?.email}</p>
                                        </div>
                                    </div>
                                    <Link 
                                        to="/add-crypto" 
                                        className="flex items-center gap-2 bg-[#0052ff] text-white px-6 py-3 rounded-full font-bold hover:bg-[#004bd6] transition-all shadow-md shadow-blue-500/10 active:scale-95 text-center justify-center"
                                    >
                                        <FaCirclePlus />
                                        Add Cryptocurrency
                                    </Link>
                                </div>

                                {/* Information Grid */}
                                <div className="p-8">
                                    <h3 className="text-lg font-bold text-black mb-6">Personal Information</h3>
                                    
                                    <div className="flex flex-col">
                                        <InfoRow label="Legal name" value={user?.name} />
                                        <InfoRow label="Email address" value={user?.email} />
                                        <InfoRow 
                                            label="Account status" 
                                            value={<span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-green-100">Verified</span>} 
                                        />
                                        <InfoRow 
                                            label="Joined Coinbase" 
                                            value={new Date(user?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} 
                                        />
                                    </div>

                                    <div className="mt-12">
                                        <h3 className="text-lg font-bold text-black mb-6">Identity Verification</h3>
                                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0052ff]">
                                                    <FaShieldHalved />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">Level 2 Account</p>
                                                    <p className="text-xs text-gray-500 font-medium mt-0.5">Enabled: Send and receive crypto</p>
                                                </div>
                                            </div>
                                            <button className="text-[#0052ff] font-bold text-sm hover:underline">View details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Help Banner */}
                            <div className="mt-8 bg-black rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h4 className="text-xl font-bold mb-1">Need help?</h4>
                                    <p className="text-gray-400 text-sm font-medium">Find answers to your questions in our help center.</p>
                                </div>
                                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all text-sm whitespace-nowrap">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-6 border-b border-gray-100 group">
        <div>
            <p className="text-sm font-bold text-gray-400 mb-1">{label}</p>
            <div className="text-base font-bold text-black">{value}</div>
        </div>
        <button className="p-2 text-gray-300 group-hover:text-[#0052ff] transition-colors">
            <FaChevronRight />
        </button>
    </div>
);

export default Profile;

