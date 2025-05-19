'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/Modal";
import{ useCallback, useState} from "react";

const LoginModal = () => {
    
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    },[isLoading, registerModal, loginModal])

    const onSubmit = useCallback(() => {
        try{    
            setIsLoading(true);

            // todo add login

            loginModal.onClose();
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    },[loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p> First time using Twitter?  
                <span 
                    onClick={onToggle}
                    className="text-white cursor-pointer hover:underline">
                    Create an account
                </span>
            </p>
        </div>
    )

    return(
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign In"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;