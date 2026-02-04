"use client";

import { useState, forwardRef, useImperativeHandle } from 'react';
import { X, Keyboard, Palette, Layout, Gamepad2, ArrowRight, Sparkles, Lightbulb } from 'lucide-react';

export interface GuidePopupRef {
  open: () => void;
}

interface GuideStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  tip?: string;
}

const GuidePopup = forwardRef<GuidePopupRef>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const guideSteps: GuideStep[] = [
    {
      icon: <Keyboard size={28} />,
      title: 'Navigation simplifiée',
      description: 'Appuyez sur la barre Espace pour modifier rapidement l\'adresse de la page dans la barre de navigation. Utilisez Tab pour parcourir les suggestions et Entrée pour confirmer.',
      tip: 'Pratique pour se déplacer rapidement entre les pages !',
    },
    {
      icon: <Palette size={28} />,
      title: 'Personnalisation des couleurs',
      description: 'Changez l\'apparence du site selon vos préférences avec le sélecteur en bas à droite. Choisissez entre le thème clair ou sombre.',
      tip: 'Le thème s\'adapte automatiquement à vos préférences',
    },
    {
      icon: <Layout size={28} />,
      title: 'Projets détaillés',
      description: 'Cliquez sur un projet pour découvrir tous ses détails : technologies utilisées, fonctionnalités, et liens vers le code source ou la démo.',
      tip: 'Explorez tous mes projets dans la section dédiée',
    },
    {
      icon: <Gamepad2 size={28} />,
      title: 'Mini-jeu 2048',
      description: 'Relaxez-vous avec le jeu 2048 directement sur la page d\'accueil ! Utilisez les flèches du clavier pour déplacer les tuiles et atteindre le score de 2048.',
      tip: 'Votre meilleur score est sauvegardé automatiquement',
    },
  ];

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setCurrentStep(0);
    }
  }));

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('portfolio-guide-seen', 'true');
  };

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 animate-in fade-in-0 duration-300"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 10000
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: 'var(--color-base)',
          border: '1px solid var(--color-surface1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-4 sm:p-6 border-b shrink-0"
          style={{
            backgroundColor: 'var(--color-surface0)',
            borderColor: 'var(--color-surface1)',
          }}
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-lg sm:text-2xl font-bold flex items-center gap-2 sm:gap-3"
              style={{ color: 'var(--color-text)' }}
            >
              <Sparkles size={20} className="sm:w-6 sm:h-6" style={{ color: 'var(--color-accent)' }} />
              Guide du Portfolio
            </h2>
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 rounded-lg transition-all duration-200"
              style={{ color: 'var(--color-subtext0)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface1)';
                e.currentTarget.style.color = 'var(--color-text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-subtext0)';
              }}
              aria-label="Fermer"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto flex flex-col items-center justify-center min-h-[250px] sm:min-h-[350px]">
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 w-full" key={currentStep}>
            <div
              className="p-4 sm:p-6 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-surface0)',
                color: 'var(--color-accent)',
              }}
            >
              {guideSteps[currentStep].icon}
            </div>

            <div className="space-y-3 sm:space-y-4 max-w-lg px-2">
              <h3
                className="text-lg sm:text-xl font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                {guideSteps[currentStep].title}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--color-subtext0)' }}
              >
                {guideSteps[currentStep].description}
              </p>
              {guideSteps[currentStep].tip && (
                <div
                  className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg text-left"
                  style={{
                    backgroundColor: 'var(--color-surface0)',
                    borderLeft: '3px solid var(--color-accent)',
                  }}
                >
                  <p
                    className="text-xs sm:text-sm flex items-start gap-2"
                    style={{ color: 'var(--color-subtext0)' }}
                  >
                    <Lightbulb size={14} className="sm:w-4 sm:h-4" style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }} />
                    <span><span style={{ color: 'var(--color-accent)' }} className="font-semibold">Astuce : </span>{guideSteps[currentStep].tip}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-8">
              {guideSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className="h-1.5 sm:h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      index === currentStep
                        ? 'var(--color-accent)'
                        : 'var(--color-surface1)',
                    width: index === currentStep ? '24px' : '6px',
                  }}
                  onMouseEnter={(e) => {
                    if (index !== currentStep) {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentStep) {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface1)';
                    }
                  }}
                  aria-label={`Aller à l'étape ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-4 sm:p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 shrink-0"
          style={{ 
            borderColor: 'var(--color-surface1)',
            backgroundColor: 'var(--color-surface0)',
          }}
        >
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm sm:text-base order-2 sm:order-1"
            style={{
              backgroundColor: 'var(--color-surface1)',
              color: 'var(--color-text)',
            }}
            onMouseEnter={(e) => {
              if (currentStep !== 0) {
                e.currentTarget.style.backgroundColor = 'var(--color-surface2)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== 0) {
                e.currentTarget.style.backgroundColor = 'var(--color-surface1)';
              }
            }}
          >
            Précédent
          </button>

          <span
            className="text-xs sm:text-sm font-semibold order-1 sm:order-2"
            style={{ color: 'var(--color-subtext0)' }}
          >
            {currentStep + 1} / {guideSteps.length}
          </span>

          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm sm:text-base order-3"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-base)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {currentStep === guideSteps.length - 1 ? (
              'Terminer'
            ) : (
              <>
                Suivant
                <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

GuidePopup.displayName = 'GuidePopup';

export default GuidePopup;
