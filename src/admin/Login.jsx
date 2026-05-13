import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Loader2, Lock, Mail, ChevronLeft, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase/config';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError(t('admin.login_error') || 'Email немесе құпиясөз қате');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError(t('admin.email_required') || 'Email енгізіңіз');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      console.error(err);
      setError(t('admin.reset_error') || 'Қате орын алды. Email дұрыстығын тексеріңіз');
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-dark p-4">
        <img src="/institute/hero-institute.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="islamic-pattern absolute inset-0 opacity-[0.10]" />

        <div className="premium-panel relative z-10 w-full max-w-md bg-white p-8">
          <button
            onClick={() => { setIsForgotPassword(false); setResetSent(false); setError(''); }}
            className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            {t('common.back')}
          </button>

          {!resetSent ? (
            <>
              <div className="mb-7 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-gold/10 text-accent-gold">
                  <Mail size={30} />
                </div>
                <h1 className="text-3xl font-bold">{t('admin.forgot_password')}</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Құпиясөзді қалпына келтіру сілтемесін алу үшін email мекенжайыңызды енгізіңіз
                </p>
              </div>

              {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}

              <form onSubmit={handleResetPassword} className="space-y-6">
                <label className="block">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Email Мекенжай</span>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-12 py-4 font-bold outline-none focus:border-accent-gold transition-all"
                      placeholder="admin@syganaki.kz"
                    />
                  </div>
                </label>

                <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-3 py-4 shadow-xl shadow-accent-gold/20">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  Жіберу
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Send size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Сәтті жіберілді!</h2>
              <p className="text-slate-500 mb-8">
                {email} мекенжайына құпиясөзді ауыстыру нұсқаулығы жіберілді. Поштаңызды тексеріңіз.
              </p>
              <button
                onClick={() => setIsForgotPassword(false)}
                className="btn-primary w-full"
              >
                Кіру бетіне оралу
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-dark p-4">
      <img src="/institute/hero-institute.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="islamic-pattern absolute inset-0 opacity-[0.10]" />

      <form onSubmit={handleLogin} className="premium-panel relative z-10 w-full max-w-md bg-white p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
            <Lock size={30} />
          </div>
          <h1 className="text-3xl font-bold">{t('admin.login_title')}</h1>
          <p className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-widest">{t('admin.login_subtitle')}</p>
        </div>

        {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-slate-500">Email</span>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-12 py-4 font-bold outline-none focus:border-primary transition-all"
                placeholder="admin@syganaki.kz"
              />
            </div>
          </label>

          <label className="block">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">{t('admin.password')}</span>
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-xs font-bold text-primary hover:text-accent-gold transition-colors"
              >
                Құпиясөзді ұмыттыңыз ба?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-12 py-4 font-bold outline-none focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
          </label>

          <div className="pt-2">
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-3 py-4 shadow-xl shadow-primary/20">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
              {t('admin.login')}
            </button>
          </div>

          <Link to="/" className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
            <ChevronLeft size={16} />
            {t('admin.back_site')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
