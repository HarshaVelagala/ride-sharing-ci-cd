import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        
        {mode === 'login' ? (
          <LoginForm 
            onSwitchToSignup={() => setMode('signup')}
            onSuccess={handleSuccess}
          />
        ) : (
          <SignupForm 
            onSwitchToLogin={() => setMode('login')}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
