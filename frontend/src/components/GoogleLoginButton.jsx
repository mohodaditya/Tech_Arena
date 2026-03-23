import React from 'react';

const GoogleLoginButton = ({ onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-3 w-full bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 ${className}`}
        >
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
            />
            <span>Continue with Google</span>
        </button>
    );
};

export default GoogleLoginButton;
