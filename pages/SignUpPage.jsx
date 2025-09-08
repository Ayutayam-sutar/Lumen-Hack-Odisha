import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { AuthContext } from '../contexts/AuthContext';
import { GamificationContext } from '../contexts/GamificationContext';

const SignUpPage = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const gamification = useContext(GamificationContext);
    
    // Refs for 3D effect
    const containerRef = useRef(null);
    const cardRef = useRef(null);

    if (!authContext) throw new Error("AuthContext not found");

    // 3D mouse move effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            
            const { left, top, width, height } = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            // Apply 3D rotation based on mouse position
            cardRef.current.style.transform = `
                perspective(1000px)
                rotateX(${y * -10}deg)
                rotateY(${x * 10}deg)
                translateZ(10px)
            `;
            
            // Parallax effect for background elements
            const bgElements = document.querySelectorAll('.parallax-element');
            bgElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
                element.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`;
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            
            return () => {
                container.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []);

    // Reset transform when mouse leaves
    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
        
        // Reset background elements
        const bgElements = document.querySelectorAll('.parallax-element');
        bgElements.forEach(element => {
            element.style.transform = 'translate(0, 0)';
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // <-- ADD THIS LINE to clear old errors
    try {
        await authContext.signup(name, email, password, gamification.addXp);
        navigate('/app/dashboard');
    } catch (err) {
        console.error("Signup failed", err);
        setError(err.message); // <-- CHANGE THIS LINE to set the error message
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div 
            ref={containerRef}
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-accent-50 to-primary-100 dark:from-dark-bg dark:to-dark-bg-alt p-4"
            onMouseLeave={handleMouseLeave}
        >
            {/* 3D Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div 
                    className="parallax-element absolute top-1/4 left-1/4 w-20 h-20 bg-accent-200 rounded-full opacity-20 blur-lg"
                    data-speed="0.3"
                ></div>
                <div 
                    className="parallax-element absolute bottom-1/3 right-1/3 w-16 h-16 bg-primary-300 rounded-full opacity-20 blur-lg"
                    data-speed="0.5"
                ></div>
                <div 
                    className="parallax-element absolute top-1/3 right-1/4 w-24 h-24 bg-accent-300 rounded-full opacity-15 blur-xl"
                    data-speed="0.4"
                ></div>
                <div 
                    className="parallax-element absolute bottom-1/4 left-1/3 w-12 h-12 bg-primary-400 rounded-full opacity-20 blur-lg"
                    data-speed="0.6"
                ></div>
            </div>

            {/* Main SignUp Card with 3D effect */}
            <div 
                ref={cardRef}
                className="relative w-full max-w-md bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl p-8 shadow-2xl transition-all duration-150 ease-out border border-light-border dark:border-dark-border"
                style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                }}
            >
                {/* 3D depth effect elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-200 dark:bg-accent-800 rounded-2xl opacity-30 -z-10" style={{transform: 'translateZ(-20px)'}}></div>
           
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary-300 dark:bg-primary-700 rounded-2xl opacity-30 -z-10" style={{transform: 'translateZ(-15px)'}}></div>
                
                <div className="relative" style={{transform: 'translateZ(20px)'}}>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-primary-500 bg-clip-text text-transparent tracking-tight">
                            {t('signup.title')}
                        </h2>
                        <p className="text-light-text-muted dark:text-dark-text-muted mt-2">
                            {t('Join Lumen and start learning smarter')}
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4" style={{transform: 'translateZ(10px)'}}>
                            <Input 
                                label={t('signup.nameLabel')} 
                                id="name" 
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                required 
                                className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border rounded-xl py-3 px-4 transition-all duration-200 focus:ring-2 ring-accent-400"
                            />
                            <Input 
                                label={t('signup.emailLabel')} 
                                id="email" 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                required 
                                className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border rounded-xl py-3 px-4 transition-all duration-200 focus:ring-2 ring-accent-400"
                            />
                            <Input 
                                label={t('signup.passwordLabel')} 
                                id="password" 
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                required 
                                className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border rounded-xl py-3 px-4 transition-all duration-200 focus:ring-2 ring-accent-400"
                            />
                        </div>
                        
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="w-full !py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isLoading}
                            style={{transform: 'translateZ(15px)'}}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('signup.creatingAccountButton')}
                                </div>
                            ) : (
                                t('signup.signUpButton')
                            )}
                        </Button>
                    </form>
                    {error && (
    <p className="text-center mt-4 text-sm text-red-500 font-semibold" style={{ transform: 'translateZ(5px)' }}>
        {error}
    </p>
)}

                    <p className="text-center mt-6 text-sm text-light-text-muted dark:text-dark-text-muted" style={{transform: 'translateZ(5px)'}}>
                        {t('signup.hasAccount')}{' '}
                        <Link 
                            to="/auth/login" 
                            className="font-medium text-accent-600 dark:text-accent-400 hover:underline transition-colors duration-200"
                        >
                            {t('signup.signInLink')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;