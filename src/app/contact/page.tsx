'use client';

import { useState } from 'react';
import { User, Phone, Mail, MessageSquare, Send, HeartHandshake, Briefcase } from 'lucide-react';
import styles from './ContactPage.module.css';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            // Reset form could go here
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Background animated blobs */}
            <div className={styles.blob1} />
            <div className={styles.blob2} />

            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Rejoignez le Mouvement</h1>
                    <p className={styles.subtitle}>
                        Que vous souhaitiez vous engager comme bénévole, devenir un collaborateur clé,
                        ou simplement nous contacter, nous sommes à votre écoute.
                    </p>
                </header>

                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>

                        {/* Role Selection */}
                        <div className={styles.roleSelection}>
                            <label className={styles.roleCard}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="benevole"
                                    className={styles.roleInput}
                                    defaultChecked
                                />
                                <div className={styles.roleContent}>
                                    <HeartHandshake className={styles.roleIcon} size={32} />
                                    <span className={styles.roleTitle}>Bénévole</span>
                                    <span className={styles.roleDesc}>Je souhaite offrir mon temps et mes compétences.</span>
                                </div>
                            </label>

                            <label className={styles.roleCard}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="collaborateur"
                                    className={styles.roleInput}
                                />
                                <div className={styles.roleContent}>
                                    <Briefcase className={styles.roleIcon} size={32} />
                                    <span className={styles.roleTitle}>Collaborateur</span>
                                    <span className={styles.roleDesc}>Je souhaite devenir un partenaire institutionnel.</span>
                                </div>
                            </label>
                        </div>

                        {/* Form Fields */}
                        <div className={styles.formGrid}>

                            {/* Full Name */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="fullName" className={styles.label}>Nom complet</label>
                                <div className={styles.inputWrapper}>
                                    <User className={styles.inputIcon} size={20} />
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        className={styles.input}
                                        placeholder="Votre nom et prénom"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="phone" className={styles.label}>Numéro de téléphone</label>
                                <div className={styles.inputWrapper}>
                                    <Phone className={styles.inputIcon} size={20} />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className={styles.input}
                                        placeholder="+212 6XX XX XX XX"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label htmlFor="email" className={styles.label}>Adresse Email</label>
                                <div className={styles.inputWrapper}>
                                    <Mail className={styles.inputIcon} size={20} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={styles.input}
                                        placeholder="votre.email@exemple.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label htmlFor="message" className={styles.label}>Votre Message</label>
                                <div className={styles.inputWrapper}>
                                    <MessageSquare className={`${styles.inputIcon} ${styles.textareaIcon}`} size={20} />
                                    <textarea
                                        id="message"
                                        name="message"
                                        className={styles.textarea}
                                        placeholder="Dites-nous en plus sur vos motivations..."
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
                            <Send className={styles.submitIcon} size={20} />
                        </button>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <div className={`${styles.statusMessage} ${styles.success}`}>
                                Merci ! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className={`${styles.statusMessage} ${styles.error}`}>
                                Une erreur est survenue lors de l'envoi. Veuillez réessayer.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
